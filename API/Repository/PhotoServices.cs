using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using API.Helpers;
using API.Repository.IRepository;

namespace API.Repository
{
    public class PhotoServices : IPhoto
    {
        private readonly Cloudinary _cloudinary;
        public PhotoServices(IOptions<CloudinarySettings> config)
        {
            var accnt = new Account
            (
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );
            _cloudinary = new Cloudinary(accnt);
        }
        public async Task<ImageUploadResult> AddPhotoAsync( IFormFile file)
        {
            var uploadResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                using var stream = file.OpenReadStream();
                var uploadparams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Height(500).Width(500).Crop("fill").Gravity("face")
                };
                uploadResult = await _cloudinary.UploadAsync(uploadparams);
            }
            return uploadResult;
        }
        public async Task<DeletionResult> DeletePhotoAsync(string publicId)
        {
            var deletionparams = new DeletionParams(publicId);
            var result = await _cloudinary.DestroyAsync(deletionparams);
            return result;
        }
    }
}