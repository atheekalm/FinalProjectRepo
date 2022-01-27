using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Repository.IRepository
{
    public interface Iinvitation
    {
        void SendInvitation(Invitation invitation);
        Task<IEnumerable<Invitation>> GetAllInvitations(string recipientusername);
        Task RejectInvitation(int senderId);
        Task AccceptInvitation(int senderId);
        Task<bool> CheckInvitationExist(string username, string sender);
        Task<bool> SaveAllAsync();


    }
}