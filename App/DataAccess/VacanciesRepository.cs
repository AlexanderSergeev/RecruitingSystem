using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using App.Models;

namespace App.DataAccess
{
    public class VacanciesRepository: IVacanciesRepository
    {

        private readonly AppDbContext _context;

        public VacanciesRepository(AppDbContext contextInstance)
        {
            if (contextInstance == null)
            {
                throw new Exception("Context is null!");
            }
            _context = contextInstance;
        }

        public IEnumerable<Vacancy> GetVacancies()
        {
            return _context.Vacancies;
        }

        public async Task<Vacancy> GetVacancy(int id)
        {
            return await _context.Vacancies.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<CheckedCandidate>> GetVacancyCandidates(int id)
        {
            List<CheckedCandidate> result = new List<CheckedCandidate>();
            var vacancyCandidates = _context.VacancyCandidates.Where(x => x.IdVacancy == id);
            foreach (var vacancyCandidate in vacancyCandidates)
            {
                var candidate = await _context.Candidates.FirstOrDefaultAsync(x => x.Id == vacancyCandidate.IdCandidate);
                result.Add(new CheckedCandidate { Id = candidate.Id, Name = candidate.Name, Surname = candidate.Surname, Patronym = candidate.Patronym, ResumePath = candidate.ResumePath, InterviewPath = candidate.InterviewPath, SummaryPath = candidate.SummaryPath, Checked = vacancyCandidate.Checked, InterviewRequired = vacancyCandidate.InterviewRequired, Status = vacancyCandidate.Status });
            }
            return result;
        }

        public async Task<IEnumerable<Candidate>> GetOtherVacancyCandidates(int id)
        {
            var vacancyCandidates = _context.VacancyCandidates.Where(x => x.IdVacancy == id).Select(p => p.IdCandidate);
            var candidates = _context.Candidates;
            var result = candidates.ToList().Where(x => !vacancyCandidates.ToList().Contains(x.Id));
            return result;
        }

        public async Task<Vacancy> AddVacancy(Vacancy d)
        {
            _context.Vacancies.Add(d);
            await _context.SaveChangesAsync();
            return d;
        }

        public async Task<Candidate> AddVacancyCandidate(VacancyIdCouple couple)
        {
            Candidate result = null;
            var vacancy = await _context.Vacancies.FirstOrDefaultAsync(x => x.Id == couple.IdVacancy);
            if (vacancy != null)
            {
                var candidate = await _context.Candidates.FirstOrDefaultAsync(x => x.Id == couple.IdCandidate);
                if (candidate != null)
                {
                    _context.VacancyCandidates.Add(new VacancyCandidate { IdCandidate = candidate.Id, IdVacancy = vacancy.Id, InterviewRequired = false, Checked = false, Status = 0 });
                    result = candidate;
                }
            }
            await _context.SaveChangesAsync();
            return result;
        }

        public async Task<Vacancy> EditVacancy(Vacancy d)
        {
            var vacancy = await _context.Vacancies.FirstOrDefaultAsync(x => x.Id == d.Id);
            if (vacancy != null)
            {
                vacancy.Name = d.Name;
                vacancy.VacancyStatus = d.VacancyStatus;
                vacancy.VacancyLocation = d.VacancyLocation;
                await _context.SaveChangesAsync();
                return d;
            }
            return null;
        }

        public async Task<Vacancy> DeleteVacancy(int id)
        {
            Vacancy result = null;
            foreach (Vacancy tmp in _context.Vacancies)
            {
                if (tmp.Id == id)
                {
                    result = tmp;
                    _context.Vacancies.Remove(tmp);
                    break;
                }
            }
            await _context.SaveChangesAsync();
            return result;
        }

        public async Task<Candidate> RemoveCandidateFromVacancy(int idCandidate, int idVacancy)
        {
            Candidate result = null;
            var vacancyCandidate = await _context.VacancyCandidates.FirstOrDefaultAsync(x => x.IdVacancy == idVacancy && x.IdCandidate == idCandidate);
            if (vacancyCandidate != null)
            {
                result = await _context.Candidates.FirstOrDefaultAsync(x => x.Id == vacancyCandidate.IdCandidate);
                _context.VacancyCandidates.Remove(vacancyCandidate);
            }
            await _context.SaveChangesAsync();
            return result;
        }

        public async Task<Candidate> CheckCandidate(VacancyIdCouple couple, bool status)
        {
            Candidate result = null;
            var vacancyCandidate = await _context.VacancyCandidates.FirstOrDefaultAsync(x => x.IdVacancy == couple.IdVacancy && x.IdCandidate == couple.IdCandidate);
            if (vacancyCandidate != null)
            {
                vacancyCandidate.Checked = status;
                result = await _context.Candidates.FirstOrDefaultAsync(x => x.Id == vacancyCandidate.IdCandidate);
            }
            await _context.SaveChangesAsync();
            return result;
        }

        public async Task<Candidate> CheckCandidateInterview(VacancyIdCouple couple, bool status)
        {
            Candidate result = null;
            var vacancyCandidate = await _context.VacancyCandidates.FirstOrDefaultAsync(x => x.IdVacancy == couple.IdVacancy && x.IdCandidate == couple.IdCandidate);
            if (vacancyCandidate != null)
            {
                vacancyCandidate.InterviewRequired = status;
                result = await _context.Candidates.FirstOrDefaultAsync(x => x.Id == vacancyCandidate.IdCandidate);
            }
            await _context.SaveChangesAsync();
            return result;
        }

        public async Task<Candidate> ChangeCandidateStatus(VacancyIdCouple couple, int status)
        {
            Candidate result = null;
            var vacancyCandidate = await _context.VacancyCandidates.FirstOrDefaultAsync(x => x.IdVacancy == couple.IdVacancy && x.IdCandidate == couple.IdCandidate);
            if (vacancyCandidate != null)
            {
                vacancyCandidate.Status = status;
                result = await _context.Candidates.FirstOrDefaultAsync(x => x.Id == vacancyCandidate.IdCandidate);
            }
            await _context.SaveChangesAsync();
            return result;
        }
    }
}