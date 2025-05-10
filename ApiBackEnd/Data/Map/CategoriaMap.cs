using ApiBackEnd.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ApiBackEnd.Data.Map
{
    public class CategoriaMap : IEntityTypeConfiguration<Categoria>{
        public void Configure(EntityTypeBuilder<Categoria> builder)
        {
            builder.HasKey(u => u.Id);
            builder.Property(u => u.Nome).IsRequired().HasMaxLength(255);
            builder.Property(u => u.DataCadastro).IsRequired().HasMaxLength(10);
        }
    }
}

