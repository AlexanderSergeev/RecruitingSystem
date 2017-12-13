using System;
using App.DataAccess;
using App.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
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
        public async Task<Demand> GetDemand(Guid id)
        {
            return await repository.GetDemand(id);
        }

        [Route]
        [HttpPost]
        public async Task<Demand> AddDemand([FromBody]Demand d)
        {
            return await repository.AddDemand(d);
        }
		
		[Route]
        [HttpPut]
        public async Task<Demand> EditDemand([FromBody]Demand d)
        {
            return await repository.EditDemand(d);
        }
		
		[Route("{id}")]
        [HttpDelete]
        public async Task<Demand> DeleteDemand(Guid id)
        {
            return await repository.DeleteDemand(id);
        }

        [Route("convert")]
        [HttpPost]
        public async Task<Vacancy> ConvertToVacancy([FromBody]Demand d)
        {
            await repository.DeleteDemand(d.Id);
            return await repository.AddVacancy(new Vacancy { Name = d.Name, VacancyLocation = d.DemandLocation, VacancyStatus = 0});
        }
    }
}