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
    }
}