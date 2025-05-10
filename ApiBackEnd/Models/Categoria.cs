
using System.ComponentModel.DataAnnotations;
namespace ApiBackEnd.Models
{
    public class Categoria
    {
        [Key]
        public int Id{ get; set; }
        public string Nome{ get; set; }
        public string Departamento { get; set; }
        public DateTime DataCadastro { get; set; }

    }
}
