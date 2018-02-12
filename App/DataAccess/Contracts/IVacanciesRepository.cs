using System.Collections.Generic;
using System.Threading.Tasks;
using App.Models;

namespace App.DataAccess
{
    public interface IVacanciesRepository
    {
        IEnumerable<Vacancy> GetVacancies();

        Task<Vacancy> GetVacancy(int id);

        Task<IEnumerable<CheckedCandidate>> GetVacancyCandidates(int id);

        Task<IEnumerable<Candidate>> GetOtherVacancyCandidates(int id);

        Task<Vacancy> AddVacancy(Vacancy d);

        Task<Vacancy> EditVacancy(Vacancy d);

        Task<Vacancy> DeleteVacancy(int id);

        Task<Candidate> RemoveCandidateFromVacancy(int idCandidate, int idVacancy);

        Task<Candidate> AddVacancyCandidate(VacancyIdCouple couple);

        Task<Candidate> CheckCandidate(VacancyIdCouple couple, bool status);

        Task<Candidate> CheckCandidateInterview(VacancyIdCouple couple, bool status);

        Task<Candidate> ChangeCandidateStatus(VacancyIdCouple couple, int status);
    }
}