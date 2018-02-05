using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Threading.Tasks;
using System.Web;
using App.Models;

namespace App.DataAccess
{
    public class StaffRepository: IStaffRepository
    {
        private readonly AppDbContext _context;

        public StaffRepository(AppDbContext contextInstance)
        {
            if (contextInstance == null)
            {
                throw new Exception("Context is null!");
            }
            _context = contextInstance;
        }

        public IEnumerable<StaffMember> GetStaff()
        {
            return _context.Staff;
        }

        public async Task<StaffMember> GetStaffMember(int id)
        {
            return await _context.Staff.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<StaffMember> AddStaffMember(StaffMember d)
        {
            _context.Staff.Add(d);
            await _context.SaveChangesAsync();
            return d;
        }

        public async Task<StaffMember> EditStaffMember(StaffMember d)
        {
            var staffMember = await _context.Staff.FirstOrDefaultAsync(x => x.Id == d.Id);

            if (staffMember != null)
            {
                staffMember.Name = d.Name;
                staffMember.Surname = d.Surname;
                staffMember.Patronym = d.Patronym;
                await _context.SaveChangesAsync();
                return staffMember;
            }
            return null;
        }

        public async Task<StaffMember> DeleteStaffMember(int id)
        {
            StaffMember result = null;
            foreach (StaffMember tmp in _context.Staff)
            {
                if (tmp.Id == id)
                {
                    result = tmp;
                    _context.Staff.Remove(tmp);
                    var root = HttpContext.Current.Server.MapPath("~/Content/Staff/" + id);
                    if (Directory.Exists(root))
                    {
                        var dirInfo = new DirectoryInfo(root);
                        foreach (var d in dirInfo.GetDirectories())
                        {
                            foreach (var f in d.GetFiles())
                            {
                                f.Delete();
                            }
                            d.Delete();
                        }
                        dirInfo.Delete();
                    }
                    break;
                }
            }
            await _context.SaveChangesAsync();
            return result;
        }

        public async Task EditStaffMemberResumePath(int id, string path)
        {
            var staffMember = await _context.Staff.FirstOrDefaultAsync(x => x.Id == id);

            if (staffMember != null)
            {
                staffMember.ResumePath = path;
                await _context.SaveChangesAsync();
            }
        }
    }
}