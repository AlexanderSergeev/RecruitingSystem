using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using App.Models;

namespace App.DataAccess
{
    public class DemandsRepository : IDemandsRepository
    {
        private readonly AppDbContext _context;

        public DemandsRepository(AppDbContext contextInstance)
        {
            if (contextInstance == null)
            {
                throw new Exception("Context is null!");
            }
            _context = contextInstance;
        }

        public IEnumerable<Demand> GetDemands()
        {
            return _context.Demands;
        }

        public async Task<Demand> GetDemand(int id)
        {
            return await _context.Demands.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Demand> AddDemand(Demand d)
        {
            _context.Demands.Add(d);
            await _context.SaveChangesAsync();
            return d;
        }

        public async Task<Demand> EditDemand(Demand d)
        {
            var demand = await _context.Demands.FirstOrDefaultAsync(x => x.Id == d.Id);

            if (demand != null)
            {
                demand.Name = d.Name;
                demand.DemandLocation = d.DemandLocation;
                await _context.SaveChangesAsync();
                return d;
            }
            return null;
        }

        public async Task<Demand> DeleteDemand(int id)
        {
            Demand result = null;
            foreach (var tmp in _context.Demands)
            {
                if (tmp.Id == id)
                {
                    result = tmp;
                    _context.Demands.Remove(tmp);
                    break;
                }
            }
            await _context.SaveChangesAsync();
            return result;
        }

        public async Task<IEnumerable<StaffMember>> GetDemandStaff(int id)
        {
            var demand = await _context.Demands.Include(t => t.Staff).FirstOrDefaultAsync(x => x.Id == id);
            if (demand != null)
            {
                return demand.Staff;
            }
            return null;
        }

        public async Task<IEnumerable<StaffMember>> GetOtherDemandStaff(int id)
        {
            var demand = await _context.Demands.Include(t => t.Staff).FirstOrDefaultAsync(x => x.Id == id);
            if (demand != null)
            {
                var demandStaff = demand.Staff;
                var staff = _context.Staff;
                var result = staff.ToList().Where(x => !demandStaff.Contains(x));
                return result;
            }
            return null;
        }

        public async Task<StaffMember> RemoveStaffMemberFromDemand(int idStaffMember, int idDemand)
        {
            StaffMember result = null;

            var demand = await _context.Demands.Include(t => t.Staff).FirstOrDefaultAsync(x => x.Id == idDemand);
            if (demand != null)
            {
                var staff = demand.Staff.FirstOrDefault(x => x.Id == idStaffMember);
                if (staff != null)
                {
                    result = staff;
                    demand.Staff.Remove(staff);
                }
            }

            await _context.SaveChangesAsync();
            return result;
        }

        public async Task<StaffMember> AddDemandStaffMember(DemandIdCouple couple)
        {
            StaffMember result = null;
            var demand = await _context.Demands.Include(t => t.Staff)
                .FirstOrDefaultAsync(x => x.Id == couple.IdDemand);
            if (demand != null)
            {
                var staff = await _context.Staff.FirstOrDefaultAsync(x => x.Id == couple.IdStaffMember);
                if (staff != null)
                {
                    demand.Staff.Add(staff);
                    result = staff;
                }
            }
            await _context.SaveChangesAsync();
            return result;
        }
    }
}