﻿using System;
using App.DataAccess;
using App.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

namespace App.Controllers
{

    [RoutePrefix("api/vacancies")]
    public class VacanciesController : ApiController
    {
        private IAppDbRepository repository;

        public VacanciesController(IAppDbRepository repoInstance)
        {
            if (repoInstance == null)
            {
                throw new Exception("Repository is null!");
            }
            repository = repoInstance;
        }

        [Route]
        [HttpGet]
        public IEnumerable<Vacancy> GetVacancies()
        {
            return repository.GetVacancies();
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<Vacancy> GetVacancy(Guid id)
        {
            return await repository.GetVacancy(id);
        }

        [Route("candidates/{id}")]
        [HttpGet]
        public IEnumerable<Candidate> GetVacancyCandidates(Guid id)
        {
            return repository.GetVacancyCandidates(id);
        }

        [Route]
        [HttpPost]
        public async Task<Vacancy> AddVacancy([FromBody]Vacancy d)
        {
            return await repository.AddVacancy(d);
        }

        [Route]
        [HttpPut]
        public async Task<Vacancy> EditVacancy([FromBody]Vacancy d)
        {
            return await repository.EditVacancy(d);
        }

        [Route("{id}")]
        [HttpDelete]
        public async Task<Vacancy> DeleteVacancy(Guid id)
        {
            return await repository.DeleteVacancy(id);
        }
    }
}