using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace App.Models
{
    [Table("Demands")]
    public class Demand
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public System.Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int DemandStatus { get; set; }
        public string DemandLocation { get; set; }
        public ICollection<Candidate> Candidates { get; set; }
    }
}