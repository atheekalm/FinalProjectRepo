using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class InvitationDtoReturn
    {
        public int SenderId { get; set; }
        public string status { get; set; }
        public string content { get; set; }
    }
}