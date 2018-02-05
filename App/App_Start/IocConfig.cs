using System.Configuration;
using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using App.DataAccess;
using App.Services;

namespace App
{
    public class IocConfig
    {
        public static IContainer ConfigureContainer()
        {

            var builder = new ContainerBuilder();

            builder.RegisterApiControllers(typeof(Global).Assembly);

            builder.RegisterType<AppDbContext>().As<AppDbContext>().WithParameter("connectionString",
                ConfigurationManager.ConnectionStrings["PrimaryConnectionString"].ConnectionString);

            builder.RegisterControllers(typeof(Global).Assembly);

            builder.RegisterType<CandidatesRepository>().As<ICandidatesRepository>();
            builder.RegisterType<DemandsRepository>().As<IDemandsRepository>();
            builder.RegisterType<StaffRepository>().As<IStaffRepository>();
            builder.RegisterType<VacanciesRepository>().As<IVacanciesRepository>();
            builder.RegisterType<AuthentificationService>().As<IAuthentificationService>();
            builder.RegisterType<UserRepository>().As<IUserRepository>();

            return builder.Build();
        }
    }
}