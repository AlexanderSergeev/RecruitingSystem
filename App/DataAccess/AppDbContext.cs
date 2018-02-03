using App.Models;
using System.Configuration;
using System.Data.Entity;

namespace App.DataAccess
{
    public class AppDbContext : DbContext
    {
        public AppDbContext() : base(ConfigurationManager.ConnectionStrings["PrimaryConnectionString"].ConnectionString)
        {
            Database.SetInitializer(new DropCreateDatabaseIfModelChanges<AppDbContext>());
        }

        public static AppDbContext Create()
        {
            return new AppDbContext();
        }

        public DbSet<Demand> Demands { get; set; }

        public DbSet<Candidate> Candidates { get; set; }

        public DbSet<StaffMember> Staff { get; set; }

        public DbSet<Vacancy> Vacancies { get; set; }

        public DbSet<VacancyCandidate> VacancyCandidates { get; set; }
    }
}