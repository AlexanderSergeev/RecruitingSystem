using System;
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
        public async Task<IEnumerable<Candidate>> GetVacancyCandidates(Guid id)
        {
            return await repository.GetVacancyCandidates(id);
        }

        [Route("otherCandidates/{id}")]
        [HttpGet]
        public async Task<IEnumerable<Candidate>> GetOtherVacancyCandidates(Guid id)
        {
            return await repository.GetOtherVacancyCandidates(id);
        }

        [Route]
        [HttpPost]
        public async Task<Vacancy> AddVacancy([FromBody]Vacancy d)
        {
            return await repository.AddVacancy(d);
        }

        [Route("candidates")]
        [HttpPost]
        public async Task<Candidate> AddVacancyCandidate([FromBody]VacancyIdCouple couple)
        {
            return await repository.AddVacancyCandidate(couple);
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

        [Route("{idCandidate}/{idVacancy}")]
        [HttpDelete]
        public async Task<Candidate> RemoveCandidateFromVacancy(Guid idCandidate, Guid idVacancy)
        {
            return await repository.RemoveCandidateFromVacancy(idCandidate, idVacancy);
        }
    }
}