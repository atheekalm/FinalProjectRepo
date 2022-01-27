using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Entities;
using API.Extension;
using API.Repository.IRepository;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class InvitationController : BaseApiController
    {
        private readonly Iinvitation _invitation;
        private readonly IloggedappUser _appuser;
        private readonly IMapper _mapper;
        public InvitationController(Iinvitation invitation, IloggedappUser appuser, IMapper mapper)
        {
            _mapper = mapper;
            _appuser = appuser;
            _invitation = invitation;

        }

        [HttpPost]
        public async Task<ActionResult<InvitationDto>> SendInvitation(InvitationDto invitationDto)
        {
            var senderusername = User.GetUserName();
            var recipientName = invitationDto.Recipient;
            var check = await _invitation.CheckInvitationExist(recipientName, senderusername);
            if (check) return BadRequest("Invitation Already Sent");
            if (senderusername == invitationDto.Recipient.ToLower())
                BadRequest("You cannot Send invitation to YourSelf");
            var sender = await _appuser.GetAppUserByUserName(senderusername);
            var recipient = await _appuser.GetAppUserByUserName(invitationDto.Recipient);
            if (recipient == null) return NotFound();


            var invitation = new Invitation
            {
                Sender = sender,
                Recipient = recipient,
                SenderUsername = sender.UserName,
                RecipientUsername = recipient.UserName,
                content = invitationDto.content,
                status = InvitationCap.pending
            };
            _invitation.SendInvitation(invitation);
            if (await _invitation.SaveAllAsync()) return Ok(_mapper.Map<InvitationDto>(invitation));

            return BadRequest("Faild to Send Invitation");

        }



        [HttpPost("Approve/{id}")]
        public async Task<ActionResult> ApproveInvitation(int id)
        {
            await _invitation.AccceptInvitation(id);
            await _invitation.SaveAllAsync();
            return Ok();
        }

        [HttpPost("Reject/{id}")]
        public async Task<ActionResult> RejectInvitation(int id)
        {
            await _invitation.RejectInvitation(id);
            await _invitation.SaveAllAsync();
            return Ok();
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<InvitationDtoReturn>>> GetAllInvitations()
        {
            var username = User.GetUserName();
            var invitations = await _invitation.GetAllInvitations(username);
            var result = _mapper.Map<IEnumerable<InvitationDtoReturn>>(invitations);
            return Ok(result);
        }
    }

}


