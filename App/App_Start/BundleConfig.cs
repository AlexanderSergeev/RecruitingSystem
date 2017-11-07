using System.Web.Optimization;

namespace App
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/external/Scripts/jquery").Include(
                         "~/external/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/external/Scripts/jqueryval").Include(
                        "~/external/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/external/Scripts/modernizr").Include(
                        "~/external/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/external/Scripts/bootstrap").Include(
                      "~/external/Scripts/bootstrap.js",
                      "~/external/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/external/Styles/css").Include(
                      "~/external/Styles/bootstrap.css",
                      "~/external/Styles/site.css"));
        }
    }
}
