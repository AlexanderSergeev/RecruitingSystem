using System.Collections.Generic;
using System.Threading.Tasks;
using App.Models;

namespace App.DataAccess
{
    public interface ICandidatesRepository
    {
        IEnumerable<Candidate> GetCandidates();

        Task<Candidate> GetCandidate(int id);

        Task<Candidate> AddCandidate(Candidate d);

        Task<Candidate> EditCandidate(Candidate d);

        Task<Candidate> DeleteCandidate(int id);

        Task EditCandidateResumePath(int id, string path);

        Task EditCandidateSummaryPath(int id, string path);

        Task EditCandidateInterviewPath(int id, string path);
    }
}