﻿using System;
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
        public async Task<Candidate> GetCandidate(Guid id)
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

        [Route("uploadResume/{id}")]
        [HttpPost]
        public async Task<IHttpActionResult> UploadResume(Guid id)
        {
            try
            {
                if (!Request.Content.IsMimeMultipartContent())
                {
                    return BadRequest();
                }
                var provider = new MultipartMemoryStreamProvider();
                var root = HttpContext.Current.Server.MapPath("~/Content/" + id + "/Resume/");
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

                await repository.EditCandidateResumePath(id, "/Content/" + id + "/Resume/" + filename);
                return Ok("Файл загружен");
            }
            catch (Exception)
            {
                return BadRequest("Произошла ошибка при загрузке резюме");
            }
        }


        [Route("{id}")]
        [HttpDelete]
        public async Task<Candidate> DeleteCandidate(Guid id)
        {
            return await repository.DeleteCandidate(id);
        }
    }
}