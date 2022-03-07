namespace API.Entities
{
    public class TaskCount
    {
        public int Id { get; set; }
        public string message { get; set; }
        public AppUser employer { get; set; }
        public int employerId { get; set; }

        public AppUser employee { get; set; }
        public int employeeId { get; set; }
        public ReplyStatus status { get; set; }
    }
}