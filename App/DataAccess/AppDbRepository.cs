using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System.Threading.Tasks;
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

        public async Task<Demand> GetDemand(Guid id)
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

        public async Task<Demand> DeleteDemand(Guid id)
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

        public async Task<Candidate> GetCandidate(Guid id)
        {
            return await context.Candidates.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Candidate> AddCandidate(Candidate d)
        {
            d.Checked = false;
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

        public async Task<Candidate> DeleteCandidate(Guid id)
        {
            Candidate result = null;
            foreach (Candidate tmp in context.Candidates)
            {
                if (tmp.Id == id)
                {
                    result = tmp;
                    context.Candidates.Remove(tmp);
                    break;
                }
            }
            await context.SaveChangesAsync();
            return result;
        }

        public async Task EditCandidateResumePath(Guid id, string path)
        {
            var candidate = await context.Candidates.FirstOrDefaultAsync(x => x.Id == id);

            if (candidate != null)
            {
                candidate.ResumePath = path;
                await context.SaveChangesAsync();
            }
        }

        public IEnumerable<StaffMember> GetStaff()
        {
            return context.Staff;
        }

        public async Task<StaffMember> GetStaffMember(Guid id)
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

        public async Task<StaffMember> DeleteStaffMember(Guid id)
        {
            StaffMember result = null;
            foreach (StaffMember tmp in context.Staff)
            {
                if (tmp.Id == id)
                {
                    result = tmp;
                    context.Staff.Remove(tmp);
                    break;
                }
            }
            await context.SaveChangesAsync();
            return result;
        }

        public async Task EditStaffMemberResumePath(Guid id, string path)
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

        public async Task<Vacancy> GetVacancy(Guid id)
        {
            return await context.Vacancies.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<Candidate>> GetVacancyCandidates(Guid id)
        {
            var vacancy = await context.Vacancies.Include(t => t.Candidates).FirstOrDefaultAsync(x => x.Id == id);
            if (vacancy != null)
            {
                return vacancy.Candidates;
            }
            return null;
        }

        public async Task<IEnumerable<Candidate>> GetOtherVacancyCandidates(Guid id)
        {
            var vacancy = await context.Vacancies.Include(t => t.Candidates).FirstOrDefaultAsync(x => x.Id == id);
            if (vacancy != null)
            {
                var vacancyCandidates = vacancy.Candidates;
                var candidates = context.Candidates;
                var result = candidates.ToList().Where(x=> !vacancyCandidates.Contains(x));
                return result;
            }
            return null;
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
            var vacancy = await context.Vacancies.Include(t => t.Candidates)
                .FirstOrDefaultAsync(x => x.Id == couple.IdVacancy);
            if (vacancy != null)
            {
                var candidate = await context.Candidates.FirstOrDefaultAsync(x => x.Id == couple.IdCandidate);
                if (candidate != null)
                {
                    vacancy.Candidates.Add(candidate);
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

        public async Task<Vacancy> DeleteVacancy(Guid id)
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

        public async Task<Candidate> RemoveCandidateFromVacancy(Guid idCandidate, Guid idVacancy)
        {
            Candidate result = null;

            var vacancy = await context.Vacancies.Include(t => t.Candidates).FirstOrDefaultAsync(x => x.Id == idVacancy);
            if (vacancy != null)
            {
                var candidate = vacancy.Candidates.FirstOrDefault(x => x.Id == idCandidate);
                if (candidate != null)
                {
                    result = candidate;
                    vacancy.Candidates.Remove(candidate);
                }
            }

            await context.SaveChangesAsync();
            return result;
        }

        public async Task<IEnumerable<StaffMember>> GetDemandStaff(Guid id)
        {
            var demand = await context.Demands.Include(t => t.Staff).FirstOrDefaultAsync(x => x.Id == id);
            if (demand != null)
            {
                return demand.Staff;
            }
            return null;
        }

        public async Task<IEnumerable<StaffMember>> GetOtherDemandStaff(Guid id)
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

        public async Task<StaffMember> RemoveStaffMemberFromDemand(Guid idStaffMember, Guid idDemand)
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

    }
}