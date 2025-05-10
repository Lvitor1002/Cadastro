using ApiBackEnd.Models;
using Microsoft.AspNetCore.Mvc;
using ApiBackEnd.Data;
using ApiBackEnd.Repository.Interfaces;

namespace ApiBackEnd.Controllers
{
    [ApiController]
    [Route("categorias")]
    public class CategoriaController : Controller
    {
        private readonly ICategoriaRepository _categoriaRepository;

        public CategoriaController(ICategoriaRepository categoriaRepository) {
            _categoriaRepository = categoriaRepository;
        }

        // POST: Enviar dados ao servidor/Banco de dados
        [HttpPost]
        public async Task<ActionResult<Categoria>> AdicionarCategoria([FromBody] Categoria categoriaBody)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Categoria categoria = await _categoriaRepository.AdicionarCategoria(categoriaBody);
            return Ok(categoria);
        }

        [HttpGet]
        // GET: Buscar TODAS Categoria
        public async Task<ActionResult<List<Categoria>>> BuscarTodasCategorias(){
            List<Categoria> listaCategorias = await _categoriaRepository.BuscarTodasCategorias();
            return Ok(listaCategorias);
        }

        [HttpGet("{id}")]
        // GET: Buscar ÚNICO Categoria
        public async Task<ActionResult<Categoria>> BuscarPorId(int id){
            Categoria unicaCategoria = await _categoriaRepository.BuscarPorId(id);
            return Ok(unicaCategoria);
        }

        [HttpPut("{id}")]
        // PUT: Atualizar Categoria
        public async Task<ActionResult<Categoria>> AtualizarCategoria([FromBody] Categoria categoriaBody, int id){

            categoriaBody.Id = id;
            Categoria categoria = await _categoriaRepository.AtualizarCategoria(categoriaBody, id);
            return Ok(categoria);
        }

        [HttpDelete("{id}")]
        // DELETE: Apagar categoria
        public async Task<ActionResult<bool>> RemoverCategoria(int id){
            bool apagado = await _categoriaRepository.RemoverCategoria(id);
            return Ok(apagado);
                        
        }

    }
}
