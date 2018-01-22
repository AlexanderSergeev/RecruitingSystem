using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace App.Models
{
    [Table("VacancyCandidates")]
    public class VacancyCandidate
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        [Required]
        public bool Checked { get; set; }
        [Required]
        public bool InterviewRequired { get; set; }
        [Required]
        public int IdCandidate { get; set; }
        [Required]
        public int IdVacancy { get; set; }
    }
}