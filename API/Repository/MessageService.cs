using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Trach.Data;
using Trach.DTO;
using Trach.Entities;
using Trach.Helpers;
using Trach.Repository.IRepository;

namespace Trach.Repository
{
    public class MessageService : IMessage
    {
        private readonly DataContext _Context;
        private readonly IMapper _mapper;
        public MessageService(DataContext dataContext, IMapper mapper)
        {
            _mapper = mapper;
            _Context = dataContext;
        }

        public void AddMessage(Message message)
        {
            _Context.Messages.Add(message);
        }

        public void DeleteMessage(Message message)
        {
            _Context.Messages.Remove(message);
        }

        public async Task<Message> GetMessage(int id)
        {
            return await _Context.Messages.FindAsync(id);
        }

        public async Task<PageList<MessagesDto>> GetMessageForUser(MessageParams messageParams)
        {
            var query = _Context.Messages
                        .OrderByDescending(m => m.MessageSend)
                        .AsQueryable();
            query = messageParams.Container switch
            {
                "Inbox" => query.Where(u => u.Recipient.UserName == messageParams.Username),
                "Outbox" => query.Where(u => u.Sender.UserName == messageParams.Username),
                _ => query.Where(u => u.Recipient.UserName == messageParams.Username && u.MessageRead == null)
            };
            var message = query.ProjectTo<MessagesDto>(_mapper.ConfigurationProvider);
            return await PageList<MessagesDto>.CreateAsync(message, messageParams.PageNumber, messageParams.PageSize);
        }

        public async Task<IEnumerable<MessagesDto>> GetMessageThred(string currentUserName, string recipientUserName)
        {
            var messages = await _Context.Messages
                            .Include(u => u.Sender).ThenInclude(p => p.AppUserPhoto)
                            .Include(u => u.Recipient).ThenInclude(p => p.AppUserPhoto)
                            .Where(m => m.Recipient.UserName == currentUserName
                            && m.Sender.UserName == recipientUserName
                            || m.Recipient.UserName == recipientUserName
                            && m.Sender.UserName == currentUserName
                            )
                            .OrderBy(m => m.MessageSend)
                            .ToListAsync();

            var Unreadmessage = messages.Where(m => m.MessageRead == null
            && m.Recipient.UserName == currentUserName).ToList();
            if (Unreadmessage.Any())
            {
                foreach (var message in Unreadmessage)
                {
                    message.MessageRead = DateTime.Now;
                }
                await _Context.SaveChangesAsync();
            }
            return _mapper.Map<IEnumerable<MessagesDto>>(messages);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _Context.SaveChangesAsync() > 0;
        }
    }
}