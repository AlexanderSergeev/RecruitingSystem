using System;
using App.DataAccess;
using App.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using App.Services;

namespace App.Controllers
{

    [RoutePrefix("api/demands")]
    public class DemandsController : ApiController
    {
        private IDemandsRepository repository;
        private IVacanciesRepository vacanciesRepository;

        public DemandsController(IDemandsRepository repoInstance, IVacanciesRepository vacanciesRepoInstance)
        {
            if (repoInstance == null || vacanciesRepoInstance == null)
            {
                throw new Exception("Repository is null!");
            }
            repository = repoInstance;
            vacanciesRepository = vacanciesRepoInstance;
        }

        [Route]
        [HttpGet]
        [Authorize(Roles = "Administrator" + "," + "HR" + "," + "ProjectManager" + "," + "Director")]
        public IEnumerable<Demand> GetDemands()
        {
            return repository.GetDemands();
        }

        [Route("{id}")]
        [HttpGet]
        [Authorize(Roles = "Administrator" + "," + "HR" + "," + "ProjectManager" + "," + "Director")]
        public async Task<Demand> GetDemand(int id)
        {
            return await repository.GetDemand(id);
        }

        [Route]
        [HttpPost]
        [Authorize(Roles = "Administrator" + "," + "ProjectManager" + "," + "Director")]
        public async Task<Demand> AddDemand([FromBody]Demand d)
        {
            return await repository.AddDemand(d);
        }
		
		[Route]
        [HttpPut]
		[Authorize(Roles = "Administrator" + "," + "ProjectManager" + "," + "Director")]
        public async Task<Demand> EditDemand([FromBody]Demand d)
        {
            return await repository.EditDemand(d);
        }
		
		[Route("{id}")]
        [HttpDelete]
		[Authorize(Roles = "Administrator" + "," + "ProjectManager" + "," + "Director")]
        public async Task<Demand> DeleteDemand(int id)
        {
            return await repository.DeleteDemand(id);
        }

        [Route("convert")]
        [HttpPost]
        [Authorize(Roles = "Administrator" + "," + "ProjectManager" + "," + "Director")]
        public async Task<Vacancy> ConvertToVacancy([FromBody]Demand d)
        {
            await repository.DeleteDemand(d.Id); 
            var result = await vacanciesRepository.AddVacancy(new Vacancy { Name = d.Name, VacancyLocation = d.DemandLocation, VacancyStatus = 0});
            var location = d.DemandLocation!=null ? d.DemandLocation : "N/A";
            var body = "<p>Запрос " + d.Id + " был конвертирован в вакансию.</p><p>Название: " + d.Name + "</p><p>Локация: " + location + "</p>";
            EmailSender.SendEmail("FlsRecruiting@fls.com", "hr@hr.ru", "Конвертация запроса в вакансию", body);
            return result;
        }

        [Route("staff/{id}")]
        [HttpGet]
        [Authorize(Roles = "Administrator" + "," + "HR" + "," + "ProjectManager" + "," + "Director")]
        public async Task<IEnumerable<StaffMember>> GetDemandStaff(int id)
        {
            return await repository.GetDemandStaff(id);
        }

        [Route("otherStaff/{id}")]
        [HttpGet]
        [Authorize(Roles = "Administrator" + "," + "HR" + "," + "ProjectManager" + "," + "Director")]
        public async Task<IEnumerable<StaffMember>> GetOtherDemandStaff(int id)
        {
            return await repository.GetOtherDemandStaff(id);
        }

        [Route("staff")]
        [HttpPost]
        [Authorize(Roles = "Administrator" + "," + "ProjectManager" + "," + "Director")]
        public async Task<StaffMember> AddDemandStaffMember([FromBody]DemandIdCouple couple)
        {
            return await repository.AddDemandStaffMember(couple);
        }

        [Route("{idStaffMember}/{idDemand}")]
        [HttpDelete]
        [Authorize(Roles = "Administrator" + "," + "ProjectManager" + "," + "Director")]
        public async Task<StaffMember> RemoveStaffMemberFromDemand(int idStaffMember, int idDemand)
        {
            return await repository.RemoveStaffMemberFromDemand(idStaffMember, idDemand);
        }
    }
}