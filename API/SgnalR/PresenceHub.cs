using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Trach.Extension;

namespace Trach.SgnalR
{
    [Authorize]
    public class PresenceHub : Hub
    {
        private readonly presenceTracker _presenceTracker;
        public PresenceHub(presenceTracker presenceTracker)
        {
            _presenceTracker = presenceTracker;
        }

        public override async Task OnConnectedAsync()
        {
            await _presenceTracker.UserConnected(Context.User.GetUserName(), Context.ConnectionId);
            await Clients.Others.SendAsync("UserIsOnline", Context.User.GetUserName());
            var currentUsers = await _presenceTracker.GetOnlineUser();
            await Clients.All.SendAsync("GetOnlineUsers", currentUsers);
        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await _presenceTracker.userDisconnected(Context.User.GetUserName(), Context.ConnectionId);
            await Clients.Others.SendAsync("UserIsOfflie", Context.User.GetUserName());
            await base.OnDisconnectedAsync(exception);
        }
    }
}