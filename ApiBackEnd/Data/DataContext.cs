using ApiBackEnd.Models;
using Microsoft.EntityFrameworkCore;
using ApiBackEnd.Data.Map;

namespace ApiBackEnd.Data
{
    public class DataContext : DbContext
    {
        //Construtor
        public DataContext(DbContextOptions<DataContext>options) : base(options)
        { 
        }

        //Tabela Categoria
        public DbSet<Categoria> Categorias { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new CategoriaMap());
            base.OnModelCreating(modelBuilder);
        }

    }
}
