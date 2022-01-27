

using System.Linq;
using API.DTO;
using API.Entities;
using API.Extension;
using AutoMapper;

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
            CreateMap<City, CityDto>().ReverseMap();
            CreateMap<District, DistrictDto>().ReverseMap();
            CreateMap<Message, MessagesDto>()
                .ForMember(des => des.SenderPhotoUrl, opt => opt.MapFrom(src => src.Sender.AppUserPhoto.Url))
                .ForMember(des => des.RecipientPhotoUrl, opt => opt.MapFrom(src => src.Recipient.AppUserPhoto.Url));
            CreateMap<InvitationDto, Invitation>().ReverseMap();
            // CreateMap<Invitation, InvitationDto>();
            CreateMap<Invitation, InvitationDtoReturn>()
            .ForMember(dest => dest.SenderId, opt => opt.MapFrom(src => src.SenderId))
            .ForMember(dest => dest.status, opt => opt.MapFrom(src => src.status))
            .ForMember(dest => dest.content, opt => opt.MapFrom(src => src.content));
            CreateMap<ServiceProviderCreateProfileDtos, ServiceProvider>();



        }

    }
}