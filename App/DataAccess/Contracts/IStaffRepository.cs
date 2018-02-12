using System.Collections.Generic;
using System.Threading.Tasks;
using App.Models;

namespace App.DataAccess
{
    public interface IStaffRepository
    {
        IEnumerable<StaffMember> GetStaff();

        Task<StaffMember> GetStaffMember(int id);

        Task<StaffMember> AddStaffMember(StaffMember d);

        Task<StaffMember> EditStaffMember(StaffMember d);

        Task<StaffMember> DeleteStaffMember(int id);

        Task EditStaffMemberResumePath(int id, string path);
    }
}