using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using App.DataAccess;

namespace App
{
  public class IocConfig
  {
    public static IContainer ConfigureContainer()
    {
      
      var builder = new ContainerBuilder();
      
      builder.RegisterApiControllers(typeof(Global).Assembly);

      builder.RegisterControllers(typeof(Global).Assembly);

      builder.RegisterType<AppDbRepository>().As<IAppDbRepository>();

      return builder.Build();
    }
  }
}