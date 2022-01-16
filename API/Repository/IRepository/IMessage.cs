using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Trach.DTO;
using Trach.Entities;
using Trach.Helpers;

namespace Trach.Repository.IRepository
{
    public interface IMessage
    {
        void AddMessage(Message message);
        void DeleteMessage(Message message);
        Task<Message> GetMessage(int id);
        Task<PageList<MessagesDto>> GetMessageForUser(MessageParams messageParams);
        Task<IEnumerable<MessagesDto>> GetMessageThred(string currentUserName, string recipientUserName);
        Task<bool> SaveAllAsync();
    }
}