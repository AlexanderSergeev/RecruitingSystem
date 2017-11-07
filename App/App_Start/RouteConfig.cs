using System.Web.Mvc;
using System.Web.Routing;

namespace App
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                        name: "Default",
                        url: "{name}/{id}",
                        defaults: new { controller = "App", action = "Index", id = UrlParameter.Optional, name = UrlParameter.Optional }
                    );
        }
    }
}
