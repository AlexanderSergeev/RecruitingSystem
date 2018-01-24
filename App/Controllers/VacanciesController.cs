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
        public async Task<Vacancy> GetVacancy(int id)
        {
            return await repository.GetVacancy(id);
        }

        [Route("candidates/{id}")]
        [HttpGet]
        public async Task<IEnumerable<CheckedCandidate>> GetVacancyCandidates(int id)
        {
            return await repository.GetVacancyCandidates(id);
        }

        [Route("otherCandidates/{id}")]
        [HttpGet]
        public async Task<IEnumerable<Candidate>> GetOtherVacancyCandidates(int id)
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

        [Route("candidates/{status}")]
        [HttpPut]
        public async Task<Candidate> CheckCandidate(bool status, [FromBody]VacancyIdCouple couple)
        {
            return await repository.CheckCandidate(couple, status);
        }

        [Route("candidates/interview/{status}")]
        [HttpPut]
        public async Task<Candidate> CheckCandidateInterview(bool status, [FromBody]VacancyIdCouple couple)
        {
            return await repository.CheckCandidateInterview(couple, status);
        }

        [Route("candidates/status/{status}")]
        [HttpPut]
        public async Task<Candidate> ChangeCandidateStatus(int status, [FromBody]VacancyIdCouple couple)
        {
            return await repository.ChangeCandidateStatus(couple, status);
        }

        [Route]
        [HttpPut]
        public async Task<Vacancy> EditVacancy([FromBody]Vacancy d)
        {
            return await repository.EditVacancy(d);
        }

        [Route("{id}")]
        [HttpDelete]
        public async Task<Vacancy> DeleteVacancy(int id)
        {
            return await repository.DeleteVacancy(id);
        }

        [Route("{idCandidate}/{idVacancy}")]
        [HttpDelete]
        public async Task<Candidate> RemoveCandidateFromVacancy(int idCandidate, int idVacancy)
        {
            return await repository.RemoveCandidateFromVacancy(idCandidate, idVacancy);
        }
    }
}