
using ApiBackEnd.Data;
using ApiBackEnd.Repository;
using ApiBackEnd.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ApiBackEnd
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            //Permite que a api seja chamada de algumas origens específicas
            builder.Services.AddCors(options => {
                options.AddPolicy("AllowLocalhost", policy =>
                {
                    policy.WithOrigins("http://localhost:5500", "http://127.0.0.1:5500")//URL do front
                    .SetIsOriginAllowed(isOriginAllowed: _ => true)
                    .AllowAnyHeader().AllowAnyMethod();
                });
            });

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            //--------------------------------------------------------------------------------------------
            builder.Services.AddDbContext<DataContext>(
                options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
            );

            builder.Services.AddScoped<ICategoriaRepository, CategoriaRepositorio>();
            //--------------------------------------------------------------------------------------------


            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            //Permite que a api seja chamada de algumas origens 
            app.UseCors("AllowLocalhost");

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
