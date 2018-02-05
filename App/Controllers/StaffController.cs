using System;
using App.DataAccess;
using App.Models;
using System.Collections.Generic;
using System.Web.Http;
using System.Threading.Tasks;
using System.Net.Http;
using System.IO;
using System.Web;

namespace App.Controllers
{

    [RoutePrefix("api/staff")]
    public class StaffController : ApiController
    {
        private IStaffRepository repository;

        public StaffController(IStaffRepository repoInstance)
        {
            if (repoInstance == null)
            {
                throw new Exception("Repository is null!");
            }
            repository = repoInstance;
        }

        [Route]
        [HttpGet]
        public IEnumerable<StaffMember> GetStaff()
        {
            return repository.GetStaff();
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<StaffMember> GetStaffMember(int id)
        {
            return await repository.GetStaffMember(id);
        }

        [Route]
        [HttpPost]
        public async Task<StaffMember> AddStaffMember([FromBody]StaffMember d)
        {
            return await repository.AddStaffMember(d);
        }

        [Route]
        [HttpPut]
        public async Task<StaffMember> EditStaffMember([FromBody]StaffMember d)
        {
            return await repository.EditStaffMember(d);
        }

        [Route("{id}")]
        [HttpDelete]
        public async Task<StaffMember> DeleteStaffMember(int id)
        {
            return await repository.DeleteStaffMember(id);
        }

        [Route("uploadResume/{id}")]
        [HttpPost]
        public async Task<IHttpActionResult> UploadResume(int id)
        {
            try
            {
                if (!Request.Content.IsMimeMultipartContent())
                {
                    return BadRequest();
                }
                var provider = new MultipartMemoryStreamProvider();
                var root = HttpContext.Current.Server.MapPath("~/Content/Staff/" + id + "/Resume/");
                await Request.Content.ReadAsMultipartAsync(provider);

                if (!Directory.Exists(root))
                    Directory.CreateDirectory(root);

                var dirInfo = new DirectoryInfo(root);
                foreach (var f in dirInfo.GetFiles())
                    f.Delete();

                var file = provider.Contents[0];
                var filename = file.Headers.ContentDisposition.FileName.Trim('\"');
                byte[] fileArray = await file.ReadAsByteArrayAsync();

                using (FileStream fs = new FileStream(root + filename, FileMode.Create))
                {
                    await fs.WriteAsync(fileArray, 0, fileArray.Length);
                }
                var filePath = "/Content/Staff/" + id + "/Resume/" + filename;
                await repository.EditStaffMemberResumePath(id, filePath);
                return Ok(filePath);
            }
            catch (Exception)
            {
                return BadRequest("Произошла ошибка при загрузке резюме");
            }
        }
    }
}