using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Threading.Tasks;
using System.Web;
using App.Models;

namespace App.DataAccess
{
    public class CandidatesRepository: ICandidatesRepository
    {

        private readonly AppDbContext _context;

        public CandidatesRepository(AppDbContext contextInstance)
        {
            if (contextInstance == null)
            {
                throw new Exception("Context is null!");
            }
            _context = contextInstance;
        }

        public IEnumerable<Candidate> GetCandidates()
        {
            return _context.Candidates;
        }

        public async Task<Candidate> GetCandidate(int id)
        {
            return await _context.Candidates.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Candidate> AddCandidate(Candidate d)
        {
            _context.Candidates.Add(d);
            await _context.SaveChangesAsync();
            return d;
        }

        public async Task<Candidate> EditCandidate(Candidate d)
        {
            var candidate = await _context.Candidates.FirstOrDefaultAsync(x => x.Id == d.Id);

            if (candidate != null)
            {
                candidate.Name = d.Name;
                candidate.Surname = d.Surname;
                candidate.Patronym = d.Patronym;
                await _context.SaveChangesAsync();
                return candidate;
            }
            return null;
        }

        public async Task<Candidate> DeleteCandidate(int id)
        {
            Candidate result = null;
            foreach (Candidate tmp in _context.Candidates)
            {
                if (tmp.Id == id)
                {
                    result = tmp;
                    _context.Candidates.Remove(tmp);
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
            await _context.SaveChangesAsync();
            return result;
        }

        public async Task EditCandidateResumePath(int id, string path)
        {
            var candidate = await _context.Candidates.FirstOrDefaultAsync(x => x.Id == id);

            if (candidate != null)
            {
                candidate.ResumePath = path;
                await _context.SaveChangesAsync();
            }
        }

        public async Task EditCandidateSummaryPath(int id, string path)
        {
            var candidate = await _context.Candidates.FirstOrDefaultAsync(x => x.Id == id);

            if (candidate != null)
            {
                candidate.SummaryPath = path;
                await _context.SaveChangesAsync();
            }
        }

        public async Task EditCandidateInterviewPath(int id, string path)
        {
            var candidate = await _context.Candidates.FirstOrDefaultAsync(x => x.Id == id);

            if (candidate != null)
            {
                candidate.InterviewPath = path;
                await _context.SaveChangesAsync();
            }
        }
    }
}