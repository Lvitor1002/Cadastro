using ApiBackEnd.Data;
using ApiBackEnd.Models;
using ApiBackEnd.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ApiBackEnd.Repository
{
    public class CategoriaRepositorio : ICategoriaRepository
    {
        //Atributo
        private readonly DataContext _dbContext;

        //Construtor
        public CategoriaRepositorio(DataContext dataContext)
        {
            _dbContext = dataContext;
        }

        //Métodos
        public async Task<Categoria> AdicionarCategoria(Categoria categoriaBody)
        {
            await _dbContext.AddAsync(categoriaBody);
            await _dbContext.SaveChangesAsync();
            return categoriaBody;
        }
        public async Task<List<Categoria>> BuscarTodasCategorias()
        {
            return await _dbContext.Categorias.ToListAsync();
        }
        public async Task<Categoria> BuscarPorId(int id)
        {
            return await _dbContext.Categorias.FirstOrDefaultAsync(u => u.Id == id);
        }
        public async Task<Categoria> AtualizarCategoria(Categoria categoria, int id)
        {
            Categoria categoriaId = await BuscarPorId(id);
            if (categoriaId == null) {
                throw new Exception($"Usuário de id '{id}' não encontrado no banco de dados");
            }
            categoriaId.Id = categoria.Id;
            categoriaId.Nome = categoria.Nome;
            categoriaId.Departamento = categoria.Departamento;
            categoriaId.DataCadastro = categoria.DataCadastro;
            
            _dbContext.Categorias.Update(categoriaId);
            await _dbContext.SaveChangesAsync();

            return categoriaId;
        }

        public async Task<bool> RemoverCategoria(int id)
        {
            Categoria categoriaId = await BuscarPorId(id);

            if (categoriaId == null)
            {
                throw new Exception($"Usuário de id '{id}' não encontrado no banco de dados");
            }
            _dbContext.Categorias.Remove(categoriaId);
            await _dbContext.SaveChangesAsync();
            
            return true;
        }
    }
}
