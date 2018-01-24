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

    [RoutePrefix("api/candidates")]
    public class CandidatesController : ApiController
    {
        private IAppDbRepository repository;

        public CandidatesController(IAppDbRepository repoInstance)
        {
            if (repoInstance == null)
            {
                throw new Exception("Repository is null!");
            }
            repository = repoInstance;
        }

        [Route]
        [HttpGet]
        public IEnumerable<Candidate> GetCandidates()
        {
            return repository.GetCandidates();
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<Candidate> GetCandidate(int id)
        {
            return await repository.GetCandidate(id);
        }

        [Route]
        [HttpPost]
        public async Task<Candidate> AddCandidate([FromBody]Candidate d)
        {
            return await repository.AddCandidate(d);
        }

        [Route]
        [HttpPut]
        public async Task<Candidate> EditCandidate([FromBody]Candidate d)
        {
            return await repository.EditCandidate(d);
        }

        [Route("{id}")]
        [HttpDelete]
        public async Task<Candidate> DeleteCandidate(int id)
        {
            return await repository.DeleteCandidate(id);
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
                var root = HttpContext.Current.Server.MapPath("~/Content/Candidates/" + id + "/Resume/");
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
                var filePath = "/Content/Candidates/" + id + "/Resume/" + filename;
                await repository.EditCandidateResumePath(id, filePath);
                return Ok(filePath);
            }
            catch (Exception)
            {
                return BadRequest("Произошла ошибка при загрузке резюме");
            }
        }

        [Route("uploadSummary/{id}")]
        [HttpPost]
        public async Task<IHttpActionResult> UploadSummary(int id)
        {
            try
            {
                if (!Request.Content.IsMimeMultipartContent())
                {
                    return BadRequest();
                }
                var provider = new MultipartMemoryStreamProvider();
                var root = HttpContext.Current.Server.MapPath("~/Content/Candidates/" + id + "/Summary/");
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
                var filePath = "/Content/Candidates/" + id + "/Summary/" + filename;
                await repository.EditCandidateSummaryPath(id, filePath);
                return Ok(filePath);
            }
            catch (Exception)
            {
                return BadRequest("Произошла ошибка при загрузке HR-конспекта");
            }
        }

        [Route("uploadInterview/{id}")]
        [HttpPost]
        public async Task<IHttpActionResult> UploadInterview(int id)
        {
            try
            {
                if (!Request.Content.IsMimeMultipartContent())
                {
                    return BadRequest();
                }
                var provider = new MultipartMemoryStreamProvider();
                var root = HttpContext.Current.Server.MapPath("~/Content/Candidates/" + id + "/Interview/");
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
                var filePath = "/Content/Candidates/" + id + "/Interview/" + filename;
                await repository.EditCandidateInterviewPath(id, filePath);
                return Ok(filePath);
            }
            catch (Exception)
            {
                return BadRequest("Произошла ошибка при загрузке технического конспекта");
            }
        }
    }
}