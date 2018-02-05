using App.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;

namespace App.DataAccess
{
    public class AppDbContext : IdentityDbContext<User, Role, int, CustomClasses.CustomUserLogin, CustomClasses.CustomUserRole, CustomClasses.CustomUserClaim>
    {
        public AppDbContext(string connectionString) : base(connectionString)
        {
            Database.SetInitializer(new DropCreateDatabaseIfModelChanges<AppDbContext>());
        }

        public static AppDbContext Create()
        {
            return new AppDbContext("name=PrimaryConnectionString");
        }

        public DbSet<Demand> Demands { get; set; }

        public DbSet<Candidate> Candidates { get; set; }

        public DbSet<StaffMember> Staff { get; set; }

        public DbSet<Vacancy> Vacancies { get; set; }

        public DbSet<VacancyCandidate> VacancyCandidates { get; set; }
    }
}