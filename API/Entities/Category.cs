using System.Collections.Generic;
namespace Trach.Entities
{
    public class Category
    {
        public int Id { get; set; }
        public string CategoryName { get; set; }
        public ICollection<SubCategory> SubCategory { get; set; }
    }
}
