using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace App.Models
{
    [Table("Staff")]
    public class StaffMember
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public System.Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Surname { get; set; }
        public string Patronym { get; set; }
        public string ResumePath { get; set; }
        public ICollection<Demand> Demands { get; set; }
    }
}