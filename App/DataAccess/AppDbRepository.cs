using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System.IO;
using System.Threading.Tasks;
using System.Web;
using App.Models;

namespace App.DataAccess
{
    public class AppDbRepository : IAppDbRepository
    {
        private readonly AppDbContext context;

        public AppDbRepository(AppDbContext contextInstance)
        {
            if (contextInstance == null)
            {
                throw new Exception("Context is null!");
            }
            context = contextInstance;
        }

        public IEnumerable<Demand> GetDemands()
        {
            return context.Demands;
        }

        public async Task<Demand> GetDemand(int id)
        {
            return await context.Demands.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Demand> AddDemand(Demand d)
        {
            context.Demands.Add(d);
            await context.SaveChangesAsync();
            return d;
        }

        public async Task<Demand> EditDemand(Demand d)
        {
            var demand = await context.Demands.FirstOrDefaultAsync(x => x.Id == d.Id);

            if (demand != null)
            {
                demand.Name = d.Name;
                demand.DemandLocation = d.DemandLocation;
                await context.SaveChangesAsync();
                return d;
            }
            return null;
        }

        public async Task<Demand> DeleteDemand(int id)
        {
            Demand result = null;
            foreach (var tmp in context.Demands)
            {
                if (tmp.Id == id)
                {
                    result = tmp;
                    context.Demands.Remove(tmp);
                    break;
                }
            }
            await context.SaveChangesAsync();
            return result;
        }

        public IEnumerable<Candidate> GetCandidates()
        {
            return context.Candidates;
        }

        public async Task<Candidate> GetCandidate(int id)
        {
            return await context.Candidates.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Candidate> AddCandidate(Candidate d)
        {
            context.Candidates.Add(d);
            await context.SaveChangesAsync();
            return d;
        }

        public async Task<Candidate> EditCandidate(Candidate d)
        {
            var candidate = await context.Candidates.FirstOrDefaultAsync(x => x.Id == d.Id);

            if (candidate != null)
            {
                candidate.Name = d.Name;
                candidate.Surname = d.Surname;
                candidate.Patronym = d.Patronym;
                await context.SaveChangesAsync();
                return candidate;
            }
            return null;
        }

        public async Task<Candidate> DeleteCandidate(int id)
        {
            Candidate result = null;
            foreach (Candidate tmp in context.Candidates)
            {
                if (tmp.Id == id)
                {
                    result = tmp;
                    context.Candidates.Remove(tmp);
                    var root = HttpContext.Current.Server.MapPath("~/Content/Candidates/" + id);
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
            await context.SaveChangesAsync();
            return result;
        }

        public async Task EditCandidateResumePath(int id, string path)
        {
            var candidate = await context.Candidates.FirstOrDefaultAsync(x => x.Id == id);

            if (candidate != null)
            {
                candidate.ResumePath = path;
                await context.SaveChangesAsync();
            }
        }

        public async Task EditCandidateSummaryPath(int id, string path)
        {
            var candidate = await context.Candidates.FirstOrDefaultAsync(x => x.Id == id);

            if (candidate != null)
            {
                candidate.SummaryPath = path;
                await context.SaveChangesAsync();
            }
        }

        public async Task EditCandidateInterviewPath(int id, string path)
        {
            var candidate = await context.Candidates.FirstOrDefaultAsync(x => x.Id == id);

            if (candidate != null)
            {
                candidate.InterviewPath = path;
                await context.SaveChangesAsync();
            }
        }

        public IEnumerable<StaffMember> GetStaff()
        {
            return context.Staff;
        }

        public async Task<StaffMember> GetStaffMember(int id)
        {
            return await context.Staff.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<StaffMember> AddStaffMember(StaffMember d)
        {
            context.Staff.Add(d);
            await context.SaveChangesAsync();
            return d;
        }

        public async Task<StaffMember> EditStaffMember(StaffMember d)
        {
            var staffMember = await context.Staff.FirstOrDefaultAsync(x => x.Id == d.Id);

            if (staffMember != null)
            {
                staffMember.Name = d.Name;
                staffMember.Surname = d.Surname;
                staffMember.Patronym = d.Patronym;
                await context.SaveChangesAsync();
                return staffMember;
            }
            return null;
        }

        public async Task<StaffMember> DeleteStaffMember(int id)
        {
            StaffMember result = null;
            foreach (StaffMember tmp in context.Staff)
            {
                if (tmp.Id == id)
                {
                    result = tmp;
                    context.Staff.Remove(tmp);
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
            await context.SaveChangesAsync();
            return result;
        }

        public async Task EditStaffMemberResumePath(int id, string path)
        {
            var staffMember = await context.Staff.FirstOrDefaultAsync(x => x.Id == id);

            if (staffMember != null)
            {
                staffMember.ResumePath = path;
                await context.SaveChangesAsync();
            }
        }

        public IEnumerable<Vacancy> GetVacancies()
        {
            return context.Vacancies;
        }

        public async Task<Vacancy> GetVacancy(int id)
        {
            return await context.Vacancies.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<CheckedCandidate>> GetVacancyCandidates(int id)
        {
            List<CheckedCandidate> result = new List<CheckedCandidate>();
            var vacancyCandidates = context.VacancyCandidates.Where(x => x.IdVacancy == id);
            foreach (var vacancyCandidate in vacancyCandidates)
            {
                var candidate = await context.Candidates.FirstOrDefaultAsync(x => x.Id == vacancyCandidate.IdCandidate);
                result.Add(new CheckedCandidate{ Id = candidate.Id, Name = candidate.Name, Surname = candidate.Surname, Patronym = candidate.Patronym, ResumePath = candidate.ResumePath, InterviewPath = candidate.InterviewPath, SummaryPath = candidate.SummaryPath, Checked = vacancyCandidate.Checked, InterviewRequired = vacancyCandidate.InterviewRequired });
            }
            return result;
        }

        public async Task<IEnumerable<Candidate>> GetOtherVacancyCandidates(int id)
        {
            var vacancyCandidates = context.VacancyCandidates.Where(x => x.IdVacancy == id).Select(p => p.IdCandidate);
            var candidates = context.Candidates;
            var result = candidates.ToList().Where(x => !vacancyCandidates.ToList().Contains(x.Id));
            return result;
        }

        public async Task<Vacancy> AddVacancy(Vacancy d)
        {
            context.Vacancies.Add(d);
            await context.SaveChangesAsync();
            return d;
        }

        public async Task<Candidate> AddVacancyCandidate(VacancyIdCouple couple)
        {
            Candidate result = null;
            var vacancy = await context.Vacancies.FirstOrDefaultAsync(x => x.Id == couple.IdVacancy);
            if (vacancy != null)
            {
                var candidate = await context.Candidates.FirstOrDefaultAsync(x => x.Id == couple.IdCandidate);
                if (candidate != null)
                {
                    context.VacancyCandidates.Add(new VacancyCandidate {IdCandidate = candidate.Id, IdVacancy = vacancy.Id, InterviewRequired = false, Checked = false });
                    result = candidate;
                }
            }
            await context.SaveChangesAsync();
            return result;
        }

        public async Task<Vacancy> EditVacancy(Vacancy d)
        {
            var vacancy = await context.Vacancies.FirstOrDefaultAsync(x => x.Id == d.Id);
            if (vacancy != null)
            {
                vacancy.Name = d.Name;
                vacancy.VacancyStatus = d.VacancyStatus;
                vacancy.VacancyLocation = d.VacancyLocation;
                await context.SaveChangesAsync();
                return d;
            }
            return null;
        }

        public async Task<Vacancy> DeleteVacancy(int id)
        {
            Vacancy result = null;
            foreach (Vacancy tmp in context.Vacancies)
            {
                if (tmp.Id == id)
                {
                    result = tmp;
                    context.Vacancies.Remove(tmp);
                    break;
                }
            }
            await context.SaveChangesAsync();
            return result;
        }

        public async Task<Candidate> RemoveCandidateFromVacancy(int idCandidate, int idVacancy)
        {
            Candidate result = null;
            var vacancyCandidate = await context.VacancyCandidates.FirstOrDefaultAsync(x => x.IdVacancy == idVacancy && x.IdCandidate == idCandidate);
            if (vacancyCandidate != null)
            {
                result = await context.Candidates.FirstOrDefaultAsync(x=> x.Id==vacancyCandidate.IdCandidate);
                context.VacancyCandidates.Remove(vacancyCandidate);
            }
            await context.SaveChangesAsync();
            return result;
        }

        public async Task<IEnumerable<StaffMember>> GetDemandStaff(int id)
        {
            var demand = await context.Demands.Include(t => t.Staff).FirstOrDefaultAsync(x => x.Id == id);
            if (demand != null)
            {
                return demand.Staff;
            }
            return null;
        }

        public async Task<IEnumerable<StaffMember>> GetOtherDemandStaff(int id)
        {
            var demand = await context.Demands.Include(t => t.Staff).FirstOrDefaultAsync(x => x.Id == id);
            if (demand != null)
            {
                var demandStaff = demand.Staff;
                var staff = context.Staff;
                var result = staff.ToList().Where(x => !demandStaff.Contains(x));
                return result;
            }
            return null;
        }

        public async Task<StaffMember> RemoveStaffMemberFromDemand(int idStaffMember, int idDemand)
        {
            StaffMember result = null;

            var demand = await context.Demands.Include(t => t.Staff).FirstOrDefaultAsync(x => x.Id == idDemand);
            if (demand != null)
            {
                var staff = demand.Staff.FirstOrDefault(x => x.Id == idStaffMember);
                if (staff != null)
                {
                    result = staff;
                    demand.Staff.Remove(staff);
                }
            }

            await context.SaveChangesAsync();
            return result;
        }

        public async Task<StaffMember> AddDemandStaffMember(DemandIdCouple couple)
        {
            StaffMember result = null;
            var demand = await context.Demands.Include(t => t.Staff)
                .FirstOrDefaultAsync(x => x.Id == couple.IdDemand);
            if (demand != null)
            {
                var staff = await context.Staff.FirstOrDefaultAsync(x => x.Id == couple.IdStaffMember);
                if (staff != null)
                {
                    demand.Staff.Add(staff);
                    result = staff;
                }
            }
            await context.SaveChangesAsync();
            return result;
        }

        public async Task<Candidate> CheckCandidate(VacancyIdCouple couple, bool status)
        {
            Candidate result = null;
            var vacancyCandidate = await context.VacancyCandidates.FirstOrDefaultAsync(x => x.IdVacancy == couple.IdVacancy && x.IdCandidate == couple.IdCandidate);
            if (vacancyCandidate != null)
            {
                vacancyCandidate.Checked = status;
                result = await context.Candidates.FirstOrDefaultAsync(x=>x.Id==vacancyCandidate.IdCandidate);
            }
            await context.SaveChangesAsync();
            return result;
        }

        public async Task<Candidate> CheckCandidateInterview(VacancyIdCouple couple, bool status)
        {
            Candidate result = null;
            var vacancyCandidate = await context.VacancyCandidates.FirstOrDefaultAsync(x => x.IdVacancy == couple.IdVacancy && x.IdCandidate == couple.IdCandidate);
            if (vacancyCandidate != null)
            {
                vacancyCandidate.InterviewRequired = status;
                result = await context.Candidates.FirstOrDefaultAsync(x => x.Id == vacancyCandidate.IdCandidate);
            }
            await context.SaveChangesAsync();
            return result;
        }

    }
}