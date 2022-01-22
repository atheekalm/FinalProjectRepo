namespace API.Helpers
{
    public class UserParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 10;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }
        public string Currentusername { get; set; }
        public int? CurrentuserId { get; set; }
        public string Gender { get; set; }
        public string SearchTearm { get; set; }
        public string Category { get; set; }
        public string SubCategory { get; set; }
        public string District { get; set; }
        public string City { get; set; }
        public string OrderBy { get; set; } = "LastActive";
        public int TopRatedServices { get; set; }
        public string Status { get; set; }
    }
}