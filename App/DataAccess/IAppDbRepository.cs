using System.Collections.Generic;
using App.Models;
using System;

namespace App.DataAccess
{
    public interface IAppDbRepository
    {
        IEnumerable<Demand> GetDemands();

        Demand GetDemand(Guid id);

        Demand AddDemand(Demand d);
		
		Demand EditDemand(Demand d);
		
		Demand DeleteDemand(Guid id);

        IEnumerable<Candidate> GetCandidates();

        Candidate GetCandidate(Guid id);

        Candidate AddCandidate(Candidate d);

        Candidate EditCandidate(Candidate d);

        Candidate DeleteCandidate(Guid id);

        IEnumerable<Vacancy> GetVacancies();

        Vacancy GetVacancy(Guid id);

        IEnumerable<Candidate> GetVacancyCandidates(Guid id);

        Vacancy AddVacancy(Vacancy d);

        Vacancy EditVacancy(Vacancy d);

        Vacancy DeleteVacancy(Guid id);
    }
}
