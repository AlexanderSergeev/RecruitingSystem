﻿using System;
using App.DataAccess;
using App.Models;
using System.Collections.Generic;
using System.Web.Http;

namespace App.Controllers
{

    [RoutePrefix("api/demands")]
    public class DemandsController : ApiController
    {
        private IAppDbRepository repository;

        public DemandsController(IAppDbRepository repoInstance)
        {
            if (repoInstance == null)
            {
                throw new Exception("Repository is null!");
            }
            repository = repoInstance;
        }

        [Route]
        [HttpGet]
        public IEnumerable<Demand> GetDemands()
        {
            return repository.GetDemands();
        }

        [Route("{id}")]
        [HttpGet]
        public Demand GetDemand(Guid id)
        {
            return repository.GetDemand(id);
        }

        [Route("candidates/{id}")]
        [HttpGet]
        public IEnumerable<Candidate> GetDemandCandidates(Guid id)
        {
            return repository.GetDemandCandidates(id);
        }

        [Route]
        [HttpPost]
        public Demand AddDemand([FromBody]Demand d)
        {
            return repository.AddDemand(d);
        }
		
		[Route]
        [HttpPut]
        public Demand EditDemand([FromBody]Demand d)
        {
            return repository.EditDemand(d);
        }
		
		[Route("{id}")]
        [HttpDelete]
        public Demand DeleteDemand(Guid id)
        {
            return repository.DeleteDemand(id);
        }
    }
}