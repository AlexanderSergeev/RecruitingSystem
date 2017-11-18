using System;
using App.DataAccess;
using App.Models;
using System.Collections.Generic;
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
        public Vacancy GetVacancy(Guid id)
        {
            return repository.GetVacancy(id);
        }

        [Route("candidates/{id}")]
        [HttpGet]
        public IEnumerable<Candidate> GetVacancyCandidates(Guid id)
        {
            return repository.GetVacancyCandidates(id);
        }

        [Route]
        [HttpPost]
        public Vacancy AddVacancy([FromBody]Vacancy d)
        {
            return repository.AddVacancy(d);
        }

        [Route]
        [HttpPut]
        public Vacancy EditVacancy([FromBody]Vacancy d)
        {
            return repository.EditVacancy(d);
        }

        [Route("{id}")]
        [HttpDelete]
        public Vacancy DeleteVacancy(Guid id)
        {
            return repository.DeleteVacancy(id);
        }
    }
}