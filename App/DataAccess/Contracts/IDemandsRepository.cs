using System.Collections.Generic;
using System.Threading.Tasks;
using App.Models;

namespace App.DataAccess
{
    public interface IDemandsRepository
    {
        IEnumerable<Demand> GetDemands();

        Task<Demand> GetDemand(int id);

        Task<Demand> AddDemand(Demand d);

        Task<Demand> EditDemand(Demand d);

        Task<Demand> DeleteDemand(int id);

        Task<IEnumerable<StaffMember>> GetDemandStaff(int id);

        Task<IEnumerable<StaffMember>> GetOtherDemandStaff(int id);

        Task<StaffMember> RemoveStaffMemberFromDemand(int idStaffMember, int idDemand);

        Task<StaffMember> AddDemandStaffMember(DemandIdCouple couple);
    }
}