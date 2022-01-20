using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Trach.DTO;
using Trach.Entities;
using Trach.Extension;
using Trach.Helpers;
using Trach.Repository.IRepository;

namespace Trach.Controllers
{
    [Authorize]
    public class MessageController : BaseApiController
    {
        private readonly IMessage _message;
        private readonly IloggedappUser _appuser;
        private readonly IMapper _mapper;
        public MessageController(IMessage message, IloggedappUser appuser, IMapper mapper)
        {
            _mapper = mapper;
            _appuser = appuser;
            _message = message;
        }

        [HttpPost]
        public async Task<ActionResult<MessagesDto>> Createmessage(CreateMessageDto CreateMessageDto)
        {
            var username = User.GetUserName();
            if (username == CreateMessageDto.RecipientUserName.ToLower())
                BadRequest("You cannot Send Message to YourSelf");
            var sender = await _appuser.GetAppUserByUserName(username);
            var recipient = await _appuser.GetAppUserByUserName(CreateMessageDto.RecipientUserName);
            if (recipient == null) return NotFound();
            var message = new Message
            {
                Sender = sender,
                Recipient = recipient,
                SenderUsername = sender.UserName,
                RecipientUsername = recipient.UserName,
                content = CreateMessageDto.Content
            };
            _message.AddMessage(message);
            if (await _message.SaveAllAsync()) return Ok(_mapper.Map<MessagesDto>(message));
            return BadRequest("Faild to Send Messages");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MessagesDto>>> GetMessagesForUser([FromQuery]
            MessageParams messageParams)
        {
            messageParams.Username = User.GetUserName();
            var messages = await _message.GetMessageForUser(messageParams);
            Response.AddPaginationHeader(messages.CurrentPage, messages.PageSize, messages.TotalCount, messages.TotalPages);
            return messages;
        }
        
        [HttpGet("thread/{username}")]
        public async Task<ActionResult<IEnumerable<MessagesDto>>> GetMessagethread(string username)
        {
            var currentUserName = User.GetUserName();
            return Ok(await _message.GetMessageThred(currentUserName,username));
        }
    }
}
