using System.Collections.Generic;
using App.Models;
using System;

namespace App.DataAccess
{
    public interface IAppDbRepository
    {
        IEnumerable<Demand> GetDemands();

        Demand GetDemand(Guid id);

        IEnumerable<Candidate> GetDemandCandidates(Guid id);

        Demand AddDemand(Demand d);
		
		Demand EditDemand(Demand d);
		
		Demand DeleteDemand(Guid id);
    }
}
