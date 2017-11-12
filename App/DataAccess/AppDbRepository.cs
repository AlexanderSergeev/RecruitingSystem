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
        public IEnumerable<Candidate> GetDemandCandidates(Guid id)
        {
            var arr = context.Demands.Include(t => t.Candidates);

            foreach (Demand t in arr)
            {
                if (t.Id == id)
                {
                    return t.Candidates;
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
                demand = d;
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

    }
}