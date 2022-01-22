using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using API.Data;
using API.DTO;
using API.Entities;
using API.Extension;
using API.Repository.IRepository;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<RegisterDto, AppUser>();
            CreateMap<ServiceProvider, ServiceProviderDto>()
            .ForMember(dest => dest.photoUrl, opt => opt.MapFrom(
                src => src.Photos.FirstOrDefault(X => X.IsMain).Url))
            .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.Age.CalculateAge()))
            .ForMember(dest => dest.City, opt => opt.MapFrom(src => src.City.CitytName))
            .ForMember(dest => dest.District, opt => opt.MapFrom(src => src.District.DistrictName));
            CreateMap<Photo, PhotoDto>();
            CreateMap<ServiceUpdateDto, ServiceProvider>();
            CreateMap<City,CityDto>().ReverseMap();
            CreateMap<District,DistrictDto>().ReverseMap();
            CreateMap<Message,MessagesDto>()
                .ForMember(des=>des.SenderPhotoUrl,opt=>opt.MapFrom(src=>src.Sender.AppUserPhoto.Url))
                .ForMember(des=>des.RecipientPhotoUrl,opt=>opt.MapFrom(src=>src.Recipient.AppUserPhoto.Url));
                
            // 
            //.ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.));
        }

    }
}