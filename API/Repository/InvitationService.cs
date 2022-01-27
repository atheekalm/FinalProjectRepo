using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Repository.IRepository;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class InvitationService : Iinvitation
    {
        private readonly DataContext _context;
        public InvitationService(DataContext context)
        {
            _context = context;
        }
        public async Task AccceptInvitation(int senderId)
        {
            var invitation = await _context.Invitations.SingleOrDefaultAsync(x => x.SenderId == senderId);
            invitation.status = InvitationCap.accept;
        }

        public async Task<bool> CheckInvitationExist(string recipientusername, string sender)
        {
            var recipients = await _context.Invitations.Where(u => u.RecipientUsername == recipientusername).ToListAsync();
            return recipients.Where(s => s.SenderUsername == sender).Any();
        }

        public async Task<IEnumerable<Invitation>> GetAllInvitations(string recipientusername)
        {
            return await _context.Invitations.Where(u => u.RecipientUsername == recipientusername).ToListAsync();
        }

        public async Task RejectInvitation(int senderId)
        {
            var invitation = await _context.Invitations.SingleOrDefaultAsync(x => x.SenderId == senderId);
            invitation.status = InvitationCap.reject;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void SendInvitation(Invitation invitation)
        {
            _context.Invitations.Add(invitation);
        }
    }
}