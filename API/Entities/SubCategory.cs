using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class SubCategory
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Key]
        public int Id { get; set; }
        public string SubCategoryName { get; set; }
        public Category Category { get; set; }
        public int CategoryId { get; set; }

    }
}