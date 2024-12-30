using Dapper;
using System.Data;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using ProjData.Models;

namespace ProductApi.Repositories
{
    public class CategoryRepository : IRepository<Category>
    {
        private readonly IDbConnection _db;

        public CategoryRepository(IConfiguration configuration)
        {
            _db = new SqlConnection(configuration.GetConnectionString("DefaultConnection"));
        }

        public async Task<IEnumerable<Category>> GetAllAsync()
        {
            return await _db.QueryAsync<Category>("SELECT * FROM Category");
        }

        public async Task<Category> GetByIdAsync(int id)
        {
            return await _db.QueryFirstOrDefaultAsync<Category>(
                "SELECT * FROM Category WHERE CategoryId = @Id", new { Id = id });
        }

        public async Task<int> AddAsync(Category category)
        {
            string query = "INSERT INTO Category (Name) VALUES (@Name)";
            return await _db.ExecuteAsync(query, category);
        }

        public async Task<int> UpdateAsync(Category category)
        {
            string query = "UPDATE Category SET Name = @Name WHERE CategoryId = @CategoryId";
            return await _db.ExecuteAsync(query, category);
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await _db.ExecuteAsync("DELETE FROM Category WHERE CategoryId = @Id", new { Id = id });
        }
    }
}
