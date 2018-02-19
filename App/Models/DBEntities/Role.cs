using System;
using App.DataAccess;
using Microsoft.AspNet.Identity.EntityFramework;

namespace App.Models
{
    public class Role : IdentityRole<int, CustomClasses.CustomUserRole>
    {
        public Role()
        {
        }

        public Role(string name) : this()
        {
            Name = name;
        }

        public RoleType RoleType()
        {
            return RoleType(Name);
        }

        public static RoleType RoleType(string roleName)
        {
            if (roleName.Equals("Administrator"))
                return Models.RoleType.Administrator;

            if (roleName.Equals("HR"))
                return Models.RoleType.HR;

            if (roleName.Equals("Director"))
                return Models.RoleType.Director;

            if (roleName.Equals("ProjectManager"))
                return Models.RoleType.ProjectManager;

            if (roleName.Equals("Technical"))
                return Models.RoleType.Technical;


            throw new ArgumentOutOfRangeException();
        }
    }
}