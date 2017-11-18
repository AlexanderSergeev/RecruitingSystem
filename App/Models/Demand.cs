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
        public string DemandLocation { get; set; }
    }
}