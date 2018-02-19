using System;
using App.DataAccess;
using App.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using App.Services;

namespace App.Controllers
{

    [RoutePrefix("api/vacancies")]
    public class VacanciesController : ApiController
    {
        private IVacanciesRepository repository;

        public VacanciesController(IVacanciesRepository repoInstance)
        {
            if (repoInstance == null)
            {
                throw new Exception("Repository is null!");
            }
            repository = repoInstance;
        }

        [Route]
        [HttpGet]
        [Authorize(Roles = "Administrator" + "," + "Director" + "," + "HR")]
        public IEnumerable<Vacancy> GetVacancies()
        {
            return repository.GetVacancies();
        }

        [Route("{id}")]
        [HttpGet]
        [Authorize(Roles = "Administrator" + "," + "Director" + "," + "HR")]
        public async Task<Vacancy> GetVacancy(int id)
        {
            return await repository.GetVacancy(id);
        }

        [Route("candidates/{id}")]
        [HttpGet]
        [Authorize(Roles = "Administrator" + "," + "Director" + "," + "HR")]
        public async Task<IEnumerable<CheckedCandidate>> GetVacancyCandidates(int id)
        {
            return await repository.GetVacancyCandidates(id);
        }

        [Route("otherCandidates/{id}")]
        [HttpGet]
        [Authorize(Roles = "Administrator" + "," + "Director" + "," + "HR")]
        public async Task<IEnumerable<Candidate>> GetOtherVacancyCandidates(int id)
        {
            return await repository.GetOtherVacancyCandidates(id);
        }

        [Route]
        [HttpPost]
        [Authorize(Roles = "Administrator" + "," + "Director")]
        public async Task<Vacancy> AddVacancy([FromBody]Vacancy d)
        {
            return await repository.AddVacancy(d);
        }

        [Route("candidates")]
        [HttpPost]
        [Authorize(Roles = "Administrator" + "," + "Director" + "," + "HR")]
        public async Task<Candidate> AddVacancyCandidate([FromBody]VacancyIdCouple couple)
        {
            return await repository.AddVacancyCandidate(couple);
        }

        [Route("candidates/{status}")]
        [HttpPut]
        [Authorize(Roles = "Administrator" + "," + "Director")]
        public async Task<Candidate> CheckCandidate(bool status, [FromBody]VacancyIdCouple couple)
        {
            return await repository.CheckCandidate(couple, status);
        }

        [Route("candidates/interview/{status}")]
        [HttpPut]
        [Authorize(Roles = "Administrator" + "," + "Director" + "," + "HR")]
        public async Task<Candidate> CheckCandidateInterview(bool status, [FromBody]VacancyIdCouple couple)
        {
            var result = await repository.CheckCandidateInterview(couple, status);
            if (status)
            {
                var body = "Требуется проведение собеседования с кандидатом " + couple.IdCandidate + " по вакансии " +
                           couple.IdVacancy + ".";
                EmailSender.SendEmail("FlsRecruiting@fls.com", "tech@tech.ru", "Проведение собеседования", body);
            }
            return result;
        }

        [Route("candidates/status/{status}")]
        [HttpPut]
        [Authorize(Roles = "Administrator" + "," + "Director" + "," + "HR")]
        public async Task<Candidate> ChangeCandidateStatus(int status, [FromBody]VacancyIdCouple couple)
        {
            return await repository.ChangeCandidateStatus(couple, status);
        }

        [Route]
        [HttpPut]
        [Authorize(Roles = "Administrator" + "," + "Director")]
        public async Task<Vacancy> EditVacancy([FromBody]Vacancy d)
        {
            return await repository.EditVacancy(d);
        }

        [Route("{id}")]
        [HttpDelete]
        [Authorize(Roles = "Administrator" + "," + "Director")]
        public async Task<Vacancy> DeleteVacancy(int id)
        {
            return await repository.DeleteVacancy(id);
        }

        [Route("{idCandidate}/{idVacancy}")]
        [HttpDelete]
        [Authorize(Roles = "Administrator" + "," + "Director" + "," + "HR")]
        public async Task<Candidate> RemoveCandidateFromVacancy(int idCandidate, int idVacancy)
        {
            return await repository.RemoveCandidateFromVacancy(idCandidate, idVacancy);
        }
    }
}