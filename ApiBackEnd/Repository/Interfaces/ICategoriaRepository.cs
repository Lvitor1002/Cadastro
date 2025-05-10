
/*
(Servirá de modelo para outra classe) 
Uma interface especifíca os;
                            nomes e assinaturas de métodos, 
                            propriedades ou eventos, 
mas não implementa o comportamento — isso fica por conta das classes que a implementam.*/
using ApiBackEnd.Models;

namespace ApiBackEnd.Repository.Interfaces
{
    public interface ICategoriaRepository
    {
        Task<Categoria> AdicionarCategoria(Categoria categoria);
        Task<List<Categoria>> BuscarTodasCategorias();
        Task<Categoria> BuscarPorId(int id);
        Task<Categoria> AtualizarCategoria(Categoria categoria,int id);
        Task<bool> RemoverCategoria(int id);
    }
}
