using Microsoft.AspNetCore.Mvc;
using ProjData.Models;
using ProjData.Services.Interfaces;

namespace ProjData.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _service;

        public ProductController(IProductService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _service.GetAllProductsAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            return Ok(await _service.GetProductByIdAsync(id));
        }

        [HttpPost]
        public async Task<IActionResult> Create(Product product)
        {
            return Ok(await _service.AddProductAsync(product));
        }

        [HttpPut]
        public async Task<IActionResult> Update(Product product)
        {
            return Ok(await _service.UpdateProductAsync(product));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _service.DeleteProductAsync(id));
        }
    }
}
