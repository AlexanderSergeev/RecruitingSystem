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
        public Candidate GetCandidate(Guid id)
        {
            return repository.GetCandidate(id);
        }

        [Route]
        [HttpPost]
        public Candidate AddCandidate([FromBody]Candidate d)
        {
            return repository.AddCandidate(d);
        }

        [Route]
        [HttpPut]
        public Candidate EditCandidate([FromBody]Candidate d)
        {
            return repository.EditCandidate(d);
        }

        [Route("uploadResume/{id}")]
        [HttpPost]
        public async Task<IHttpActionResult> UploadResume(Guid id)
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                return BadRequest();
            }
            var provider = new MultipartMemoryStreamProvider();
            string root = HttpContext.Current.Server.MapPath("~/Content/" + id.ToString() + "/");
            await Request.Content.ReadAsMultipartAsync(provider);

            var file = provider.Contents[0];
            var filename = file.Headers.ContentDisposition.FileName.Trim('\"');
            byte[] fileArray = await file.ReadAsByteArrayAsync();

            if (!Directory.Exists(root))
                Directory.CreateDirectory(root);

            using (FileStream fs = new FileStream(root + filename, FileMode.Create))
            {
                await fs.WriteAsync(fileArray, 0, fileArray.Length);
            }

            return Ok("Файл загружен");
        }


        [Route("{id}")]
        [HttpDelete]
        public Candidate DeleteCandidate(Guid id)
        {
            return repository.DeleteCandidate(id);
        }
    }
}