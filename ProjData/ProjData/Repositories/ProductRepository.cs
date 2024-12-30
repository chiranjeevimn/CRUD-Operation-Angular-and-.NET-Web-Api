using Dapper;
using System.Data;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using ProjData.Models;

namespace ProductApi.Repositories
{
    public class ProductRepository : IRepository<Product>
    {
        private readonly IDbConnection _db;

        public ProductRepository(IConfiguration configuration)
        {
            _db = new SqlConnection(configuration.GetConnectionString("DefaultConnection"));
        }

        public async Task<IEnumerable<Product>> GetAllAsync()
        {
            return await _db.QueryAsync<Product>("SELECT * FROM Product");
        }

        public async Task<Product> GetByIdAsync(int id)
        {
            return await _db.QueryFirstOrDefaultAsync<Product>(
                "SELECT * FROM Product WHERE ProductId = @Id", new { Id = id });
        }

        public async Task<int> AddAsync(Product product)
        {
            string query = "INSERT INTO Product (Name, SalesPrice, MRP, CategoryId) VALUES (@Name, @SalesPrice, @MRP, @CategoryId)";
            return await _db.ExecuteAsync(query, product);
        }

        public async Task<int> UpdateAsync(Product product)
        {
            string query = "UPDATE Product SET Name = @Name, SalesPrice = @SalesPrice, MRP = @MRP, CategoryId = @CategoryId WHERE ProductId = @ProductId";
            return await _db.ExecuteAsync(query, product);
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await _db.ExecuteAsync("DELETE FROM Product WHERE ProductId = @Id", new { Id = id });
        }
    }
}
