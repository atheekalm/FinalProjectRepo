using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public ICollection<AppUserRole> UserRole { get; set; }
        public ServiceProvider ServiceProvider { get; set; }
        public ICollection<Message> MessagesSend { get; set; }
        public ICollection<Message> MessagesRecieved { get; set; }
        public ICollection<Invitation> InvitationSender { get; set; }
        public ICollection<Invitation> InvitationReciver{ get; set; }
        public MainPhoto AppUserPhoto { get; set; }
    }
}


