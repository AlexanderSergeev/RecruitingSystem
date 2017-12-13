using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Results;
using App.Controllers;
using App.Models;

namespace App.DataAccess
{
    public class AppDbRepository : IAppDbRepository
    {
        private readonly AppDbContext context;

        public AppDbRepository(AppDbContext contextInstance)
        {
            if (contextInstance == null)
            {
                throw new Exception("Context is null!");
            }
            context = contextInstance;
        }

        public IEnumerable<Demand> GetDemands()
        {
            return context.Demands;
        }

        public async Task<Demand> GetDemand(Guid id)
        {
            return await context.Demands.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Demand> AddDemand(Demand d)
        {
            context.Demands.Add(d);
            await context.SaveChangesAsync();
            return d;
        }

        public async Task<Demand> EditDemand(Demand d)
        {
            var demand = await context.Demands.FirstOrDefaultAsync(x => x.Id == d.Id);

            if (demand != null)
            {
                demand.Name = d.Name;
                demand.DemandLocation = d.DemandLocation;
                await context.SaveChangesAsync();
                return d;
            }
            return null;
        }

        public async Task<Demand> DeleteDemand(Guid id)
        {
            Demand result = null;
            foreach (var tmp in context.Demands)
            {
                if (tmp.Id == id)
                {
                    result = tmp;
                    context.Demands.Remove(tmp);
                    break;
                }
            }
            await context.SaveChangesAsync();
            return result;
        }

        public IEnumerable<Candidate> GetCandidates()
        {
            return context.Candidates;
        }

        public async Task<Candidate> GetCandidate(Guid id)
        {
            return await context.Candidates.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Candidate> AddCandidate(Candidate d)
        {
            context.Candidates.Add(d);
            await context.SaveChangesAsync();
            return d;
        }

        public async Task<Candidate> EditCandidate(Candidate d)
        {
            var candidate = await context.Candidates.FirstOrDefaultAsync(x => x.Id == d.Id);

            if (candidate != null)
            {
                candidate.Name = d.Name;
                candidate.Surname = d.Surname;
                candidate.Patronym = d.Patronym;
                await context.SaveChangesAsync();
                return d;
            }
            return null;
        }

        public async Task<Candidate> DeleteCandidate(Guid id)
        {
            Candidate result = null;
            foreach (Candidate tmp in context.Candidates)
            {
                if (tmp.Id == id)
                {
                    result = tmp;
                    context.Candidates.Remove(tmp);
                    break;
                }
            }
            await context.SaveChangesAsync();
            return result;
        }

        public async Task EditCandidateResumePath(Guid id, string path)
        {
            var candidate = await context.Candidates.FirstOrDefaultAsync(x => x.Id == id);

            if (candidate != null)
            {
                candidate.ResumePath = path;
                await context.SaveChangesAsync();
            }
        }

        public IEnumerable<Vacancy> GetVacancies()
        {
            return context.Vacancies;
        }

        public async Task<Vacancy> GetVacancy(Guid id)
        {
            return await context.Vacancies.FirstOrDefaultAsync(x => x.Id == id);
        }

        public IEnumerable<Candidate> GetVacancyCandidates(Guid id)
        {
            var arr = context.Vacancies.Include(t => t.Candidates);

            foreach (Vacancy t in arr)
            {
                if (t.Id == id)
                {
                    return t.Candidates;
                }
            }

            return null;
        }

        public async Task<Vacancy> AddVacancy(Vacancy d)
        {
            context.Vacancies.Add(d);
            await context.SaveChangesAsync();
            return d;
        }

        public async Task<Vacancy> EditVacancy(Vacancy d)
        {
            var vacancy = await context.Vacancies.FirstOrDefaultAsync(x => x.Id == d.Id);
            if (vacancy != null)
            {
                vacancy.Name = d.Name;
                vacancy.VacancyStatus = d.VacancyStatus;
                vacancy.VacancyLocation = d.VacancyLocation;
                await context.SaveChangesAsync();
                return d;
            }
            return null;
        }

        public async Task<Vacancy> DeleteVacancy(Guid id)
        {
            Vacancy result = null;
            foreach (Vacancy tmp in context.Vacancies)
            {
                if (tmp.Id == id)
                {
                    result = tmp;
                    context.Vacancies.Remove(tmp);
                    break;
                }
            }
            await context.SaveChangesAsync();
            return result;
        }

    }
}