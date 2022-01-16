using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Trach.Entities
{
    public class AppRole : IdentityRole<int>
    {
        public ICollection<AppUserRole> UserRole { get; set; }
    }
}