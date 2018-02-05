using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace App.Models
{
    [Table("Candidates")]
    public class Candidate
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Surname { get; set; }
        public string Patronym { get; set; }
        public string ResumePath { get; set; }
        public string SummaryPath { get; set; }
        public string InterviewPath { get; set; }
    }
}