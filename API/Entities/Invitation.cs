using System;

namespace API.Entities
{
    public class Invitation
    {
        public int Id { get; set; }
        
        public AppUser Sender { get; set; }
        public int SenderId { get; set; }
        public string SenderUsername { get; set; }


        public AppUser Recipient { get; set; }
        public int RecipientId { get; set; }
        public string RecipientUsername { get; set; }


        public InvitationCap status { get; set; }
        public string content { get; set; }
        public DateTime InvitationSend { get; set; } = DateTime.Now;
       
    }
}