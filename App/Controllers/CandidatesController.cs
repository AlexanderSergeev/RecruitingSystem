using System;
using App.DataAccess;
using App.Models;
using System.Collections.Generic;
using System.Web.Http;

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

        [Route("{id}")]
        [HttpDelete]
        public Candidate DeleteCandidate(Guid id)
        {
            return repository.DeleteCandidate(id);
        }
    }
}