using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;

namespace API.Extension
{
    public static class ServiceFilterExtensions
    {
        public static IQueryable<ServiceProvider> Search(this IQueryable<ServiceProvider> query, string SearchTearm)
        {
            if (string.IsNullOrWhiteSpace(SearchTearm)) return query;
            var lowerSearchTearm = SearchTearm.Trim().ToLower();
            return query = query.Where(x => x.LasttName.Contains(SearchTearm));
        }

        public static IQueryable<ServiceProvider> District(this IQueryable<ServiceProvider> query, string District)
        {
            if (string.IsNullOrWhiteSpace(District)) return query;
            return query = query.Where(x => x.District.DistrictName == District);
        }

        public static IQueryable<ServiceProvider> City(this IQueryable<ServiceProvider> query, string City)
        {
            if (string.IsNullOrWhiteSpace(City)) return query;
            return query = query.Where(x => x.City.CitytName == City);
        }

        public static IQueryable<ServiceProvider> Sort(this IQueryable<ServiceProvider> query, string OrderBy)
        {
            if (string.IsNullOrWhiteSpace(OrderBy)) return query.OrderBy(n => n.LasttName);
            query = OrderBy switch
            {
                "Created" => query.OrderByDescending(u => u.Created),
                _ => query.OrderByDescending(u => u.LastActive)
            };
            return query;
        }
        public static IQueryable<ServiceProvider> CheckItsMe(this IQueryable<ServiceProvider> query, UserParams userParams)
        {
            if (userParams.CurrentuserId == null) return query;
            query = query.Where(u => u.AppUserId != userParams.CurrentuserId);
            return query;
        }

        public static IQueryable<ServiceProvider> Gender(this IQueryable<ServiceProvider> query, string Gender)
        {
            if (string.IsNullOrWhiteSpace(Gender)) return query;
            var genderlist = new List<string> { "Male", "Female", "All" };
            query = query.Where(u => genderlist.Contains(u.Gender));
            return query;
        }
        public static IQueryable<ServiceProvider> Category(this IQueryable<ServiceProvider> query, string Category)
        {
            if (string.IsNullOrWhiteSpace(Category)) return query;
            var lowerCategory = Category.Trim().ToLower();
            return query = query.Where(x => x.Category.CategoryName == lowerCategory);
        }
        public static IQueryable<ServiceProvider> SubCategory(this IQueryable<ServiceProvider> query, string SubCategory)
        {
            if (string.IsNullOrWhiteSpace(SubCategory)) return query;
            var lowerSubCategory = SubCategory.Trim().ToLower();
            return query = query.Where(x => x.SubCategory.SubCategoryName == lowerSubCategory);
        }
        public static IQueryable<ServiceProvider> StatusAvailable(this IQueryable<ServiceProvider> query, string City)
        {
            if (string.IsNullOrWhiteSpace(City)) return query;
            var lowerCity = City.Trim().ToLower();
            return query = query.Where(x => x.City.CitytName == lowerCity);
        }

        public static IQueryable<ServiceProvider> TopServices(this IQueryable<ServiceProvider> query)
        {

            return query.Where(x => x.Rating < 4.0);
        }

        public static IQueryable<ServiceProvider> WorkType(this IQueryable<ServiceProvider> query, string type)
        {
            if (string.IsNullOrEmpty(type)) return query;
            var lowerType = type.Trim().ToLower();
            return query = query.Where(x => x.WorkAs == lowerType);
        }

    }
}