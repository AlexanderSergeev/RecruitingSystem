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

        Task<Demand> GetDemand(Guid id);

        Task<Demand> AddDemand(Demand d);

        Task<Demand> EditDemand(Demand d);

        Task<Demand> DeleteDemand(Guid id);

        IEnumerable<Candidate> GetCandidates();

        Task<Candidate> GetCandidate(Guid id);

        Task<Candidate> AddCandidate(Candidate d);

        Task<Candidate> EditCandidate(Candidate d);

        Task<Candidate> DeleteCandidate(Guid id);

        Task EditCandidateResumePath(Guid id, string path);

        IEnumerable<Vacancy> GetVacancies();

        Task<Vacancy> GetVacancy(Guid id);

        Task<IEnumerable<Candidate>> GetVacancyCandidates(Guid id);

        Task<IEnumerable<Candidate>> GetOtherVacancyCandidates(Guid id);

        Task<Vacancy> AddVacancy(Vacancy d);

        Task<Vacancy> EditVacancy(Vacancy d);

        Task<Vacancy> DeleteVacancy(Guid id);

        Task<Candidate> RemoveCandidateFromVacancy(Guid idCandidate, Guid idVacancy);
    }
}
