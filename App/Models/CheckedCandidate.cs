
namespace App.Models
{
    public class CheckedCandidate
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Patronym { get; set; }
        public string ResumePath { get; set; }
        public string SummaryPath { get; set; }
        public string InterviewPath { get; set; }
        public bool Checked { get; set; }
        public bool InterviewRequired { get; set; }
    }
}