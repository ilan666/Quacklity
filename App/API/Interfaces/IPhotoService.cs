using System.Threading.Tasks;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace API.Interface
{
    public interface IPhotoService
    {
         Task<ImageUploadResult> UploadPhotoAsync(IFormFile file);
    }
}