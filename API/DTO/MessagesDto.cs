using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Trach.DTO
{
    public class MessagesDto
    {
        public int Id { get; set; }
        public int SenderId { get; set; }
        public string SenderUsername { get; set; }
        public string SenderPhotoUrl { get; set; }
        public int RecipientId { get; set; }
        public string RecipientUsername { get; set; }
        public string RecipientPhotoUrl { get; set; }

        public string content { get; set; }
        public DateTime? MessageRead { get; set; }
        public DateTime MessageSend { get; set; }
       
    }
}