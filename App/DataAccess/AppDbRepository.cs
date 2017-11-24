using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
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

        public Demand GetDemand(Guid id)
        { 
            foreach (Demand t in context.Demands)
            {
                if (t.Id == id)
                {
                    return t;
                }
            }
            return null;
        }
      
        public Demand AddDemand(Demand d)
        {
            context.Demands.Add(d);
            context.SaveChanges();
            return d;
        }

        public Demand EditDemand(Demand d)
        {
            var demand = context.Demands
                .Where(c => c.Id == d.Id)
                .FirstOrDefault();
            if (demand != null)
            {
                demand.Name = d.Name;
                demand.DemandLocation = d.DemandLocation;
                context.SaveChanges();
                return d;
            }
            return null;
        }

        public Demand DeleteDemand(Guid id)
        {
            Demand result = null;
            foreach (Demand tmp in context.Demands)
            {
                if (tmp.Id == id)
                {
                    result = tmp;
                    context.Demands.Remove(tmp);
                    break;
                }
            }
            context.SaveChanges();
            return result;
        }

        public IEnumerable<Candidate> GetCandidates()
        {
            return context.Candidates;
        }

        public Candidate GetCandidate(Guid id)
        {
            foreach (Candidate t in context.Candidates)
            {
                if (t.Id == id)
                {
                    return t;
                }
            }
            return null;
        }

        public Candidate AddCandidate(Candidate d)
        {
            context.Candidates.Add(d);
            context.SaveChanges();
            return d;
        }

        public Candidate EditCandidate(Candidate d)
        {
            var candidate = context.Candidates
                .Where(c => c.Id == d.Id)
                .FirstOrDefault();
            if (candidate != null)
            {
                candidate.Name = d.Name;
                candidate.Surname = d.Surname;
                candidate.Patronym = d.Patronym;
                context.SaveChanges();
                return d;
            }
            return null;
        }

        public Candidate DeleteCandidate(Guid id)
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
            context.SaveChanges();
            return result;
        }

        public IEnumerable<Vacancy> GetVacancies()
        {
            return context.Vacancies;
        }

        public Vacancy GetVacancy(Guid id)
        {
            foreach (Vacancy t in context.Vacancies)
            {
                if (t.Id == id)
                {
                    return t;
                }
            }
            return null;
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

        public Vacancy AddVacancy(Vacancy d)
        {
            context.Vacancies.Add(d);
            context.SaveChanges();
            return d;
        }

        public Vacancy EditVacancy(Vacancy d)
        {
            var vacancy = context.Vacancies
                .Where(c => c.Id == d.Id)
                .FirstOrDefault();
            if (vacancy != null)
            {
                vacancy.Name = d.Name;
                vacancy.VacancyStatus = d.VacancyStatus;
                vacancy.VacancyLocation = d.VacancyLocation;
                context.SaveChanges();
                return d;
            }
            return null;
        }

        public Vacancy DeleteVacancy(Guid id)
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
            context.SaveChanges();
            return result;
        }

    }
}