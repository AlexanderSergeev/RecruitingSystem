using System.Collections.Generic;
using App.Models;

namespace App.DataAccess
{
    public interface IAppDbRepository
    {
        IEnumerable<Demand> GetDemands();

        IEnumerable<Candidate> GetDemandCandidates(System.Guid id);

        Demand AddDemand(Demand d);
    }
}
