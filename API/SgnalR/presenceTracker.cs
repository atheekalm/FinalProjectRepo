using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.SgnalR
{
    public class presenceTracker
    {
        private static readonly Dictionary<string, List<string>> OnlineUser = new Dictionary<string, List<string>>();
        public Task UserConnected(string username, string connectioId)
        {
            lock (OnlineUser)
            {
                if (OnlineUser.ContainsKey(username))
                {
                    OnlineUser[username].Add(connectioId);
                }
                else
                {
                    OnlineUser.Add(username, new List<string> { connectioId });
                }
            }
            return Task.CompletedTask;
        }
        public Task userDisconnected(string username, string connectionId)
        {
            lock (OnlineUser)
            {
                if (!OnlineUser.ContainsKey(username)) return Task.CompletedTask;
                OnlineUser[username].Remove(connectionId);
                if (OnlineUser[username].Count == 0)
                {
                    OnlineUser.Remove(username);
                }

            }
            return Task.CompletedTask;
        }
        public Task<string[]> GetOnlineUser()
        {
            string[] onlineUsers;
            lock (OnlineUser)
            {
                onlineUsers = OnlineUser.OrderBy(k => k.Key).Select(k => k.Key).ToArray();
            }
            return Task.FromResult(onlineUsers);
        }
    }
}
