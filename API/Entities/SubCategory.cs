using System.ComponentModel.DataAnnotations;

namespace Trach.Entities
{
    public class SubCategory
    {
        [Key]
        public int Id { get; set; }
        public string SubCategoryName { get; set; }
        public Category Category { get; set; }
        public int CategoryId { get; set; }
    }
}