using Microsoft.AspNetCore.Mvc;
using ProjData.Models;
using ProjData.Services.Interfaces;
using System.Threading.Tasks;

namespace ProjData.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _service;

        public CategoryController(ICategoryService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _service.GetAllCategoriesAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            return Ok(await _service.GetCategoryByIdAsync(id));
        }

        [HttpPost]
        public async Task<IActionResult> Create(Category category)
        {
            return Ok(await _service.AddCategoryAsync(category));
        }

        [HttpPut]
        public async Task<IActionResult> Update(Category category)
        {
            return Ok(await _service.UpdateCategoryAsync(category));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _service.DeleteCategoryAsync(id));
        }
    }
}
