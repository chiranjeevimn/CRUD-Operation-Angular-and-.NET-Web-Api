using ProjData.Models;

namespace ProjData.Services.Interfaces
{
    public interface ICategoryService
    {
        Task<IEnumerable<Category>> GetAllCategoriesAsync();
        Task<Category> GetCategoryByIdAsync(int id);
        Task<int> AddCategoryAsync(Category category);
        Task<int> UpdateCategoryAsync(Category category);
        Task<int> DeleteCategoryAsync(int id);
    }
}
