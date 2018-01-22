using System.Collections.Generic;
using App.Models;
using System;
using System.Threading.Tasks;
using System.Web.Http;

namespace App.DataAccess
{
    public interface IAppDbRepository
    {
        IEnumerable<Demand> GetDemands();

        Task<Demand> GetDemand(int id);

        Task<Demand> AddDemand(Demand d);

        Task<Demand> EditDemand(Demand d);

        Task<Demand> DeleteDemand(int id);

        IEnumerable<Candidate> GetCandidates();

        Task<Candidate> GetCandidate(int id);

        Task<Candidate> AddCandidate(Candidate d);

        Task<Candidate> EditCandidate(Candidate d);

        Task<Candidate> DeleteCandidate(int id);

        Task EditCandidateResumePath(int id, string path);

        Task EditCandidateSummaryPath(int id, string path);

        Task EditCandidateInterviewPath(int id, string path);

        IEnumerable<StaffMember> GetStaff();

        Task<StaffMember> GetStaffMember(int id);

        Task<StaffMember> AddStaffMember(StaffMember d);

        Task<StaffMember> EditStaffMember(StaffMember d);

        Task<StaffMember> DeleteStaffMember(int id);

        Task EditStaffMemberResumePath(int id, string path);

        IEnumerable<Vacancy> GetVacancies();

        Task<Vacancy> GetVacancy(int id);

        Task<IEnumerable<CheckedCandidate>> GetVacancyCandidates(int id);

        Task<IEnumerable<Candidate>> GetOtherVacancyCandidates(int id);

        Task<Vacancy> AddVacancy(Vacancy d);

        Task<Vacancy> EditVacancy(Vacancy d);

        Task<Vacancy> DeleteVacancy(int id);

        Task<Candidate> RemoveCandidateFromVacancy(int idCandidate, int idVacancy);

        Task<Candidate> AddVacancyCandidate(VacancyIdCouple couple);

        Task<IEnumerable<StaffMember>> GetDemandStaff(int id);

        Task<IEnumerable<StaffMember>> GetOtherDemandStaff(int id);

        Task<StaffMember> RemoveStaffMemberFromDemand(int idStaffMember, int idDemand);

        Task<StaffMember> AddDemandStaffMember(DemandIdCouple couple);

        Task<Candidate> CheckCandidate(VacancyIdCouple couple, bool status);

        Task<Candidate> CheckCandidateInterview(VacancyIdCouple couple, bool status);
    }
}
