using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Trach.Helpers
{
    public class MessageParams : UserParams
    {
        public string Username { get; set; }
        public string Container { get; set; } = "Unread";
    }
}