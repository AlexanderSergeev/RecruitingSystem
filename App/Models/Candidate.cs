using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace App.Models
{
    [Table("Candidates")]
    public class Candidate
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public System.Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Surname { get; set; }
        [Required]
        public bool Checked { get; set; }
        public string Patronym { get; set; }
        public string ResumePath { get; set; }
        public ICollection<Vacancy> Vacancies { get; set; }
    }
}