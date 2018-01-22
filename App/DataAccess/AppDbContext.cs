﻿using App.Models;
using System.Data.Entity;

namespace App.DataAccess
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(string connectionString)
            : base(connectionString)
        {
            Database.SetInitializer(new DropCreateDatabaseIfModelChanges<AppDbContext>());
        }

        public DbSet<Demand> Demands { get; set; }

        public DbSet<Candidate> Candidates { get; set; }

        public DbSet<StaffMember> Staff { get; set; }

        public DbSet<Vacancy> Vacancies { get; set; }

        public DbSet<VacancyCandidate> VacancyCandidates { get; set; }
    }
}