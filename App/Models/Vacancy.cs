using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace App.Models
{
    [Table("Vacancies")]
    public class Vacancy
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public System.Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int VacancyStatus { get; set; }
        public string VacancyLocation { get; set; }
        public ICollection<Candidate> Candidates { get; set; }
    }
}