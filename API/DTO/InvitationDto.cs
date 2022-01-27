using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class InvitationDto
    {
        public int Id { get; set; }
        public string Sender { get; set; }
        public int SenderId { get; set; }


        public string Recipient { get; set; }
        public int RecipientId { get; set; }


        public string status { get; set; }
        public string content { get; set; }
        public DateTime InvitationSend { get; set; }
    }
}