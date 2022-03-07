using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("views")]
    public class View
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public AppUser user { get; set; }
        public int userId { get; set; }
    }
}