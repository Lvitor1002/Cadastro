export class ApiRepository{

    url = `https://localhost:7145/categorias`

    async enviarDados(nome,departamento,dataCadastro){

        try{
            let respostaApi = await fetch(this.url,{
                method:'POST',
                mode: "cors",
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    nome:nome,
                    departamento:departamento,
                    dataCadastro:dataCadastro
                })
            })
            
            let dados = await respostaApi.json()

            if(!respostaApi.ok){
                throw new Error(dados.message || `Erro HTTP : ${respostaApi.status}`)
            }


            Swal.fire({
                position: "center",
                icon: "success",
                title: "Categoria cadastrado!",
                text: `Sucesso ao cadastrar categoria`,
                showConfirmButton: false,
                timer: 1500
            })
            
            return dados


        }catch(erro){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Erro inesperado: ${erro}`,
            });
            
            throw erro
        }
    }

    async removerCategoria(id){

        try{
            let respostaApi = await fetch(`${this.url}/${id}`,{
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json'
                }
            })

            const dados = await respostaApi.json()

            if(!respostaApi.ok){
                throw new Error(dados.message || "Erro ao remover categoria.")
            }

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Categoria Removida!",
                text: `Sucesso ao Remover categoria`,
                showConfirmButton: false,
                timer: 1500
            })

            return dados
        }
        catch(erro){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Erro inesperado: ${erro}`,
            });
            
            throw erro
        }
    }

    async atualizarCategorias(id,nome,departamento,dataCadastro){

        try{
            let respostaApi = await fetch(`${this.url}/${id}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({id,nome,departamento,dataCadastro})
            })

            const dados = await respostaApi.json() 

            if(!respostaApi.ok){
                throw new Error(dados.message || 'Erro na edição')
            }


            Swal.fire({
                position: "center",
                icon: "success",
                title: "Categoria Atualizada!",
                text: `Sucesso ao atualizada categoria`,
                showConfirmButton: false,
                timer: 1500
            })

            return dados

        }catch(erro)
        {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Erro inesperado: ${erro}`,
            });
            
            throw erro
        }

    }

    async buscarTodasCategorias(){

        try{
            let respostaApi = await fetch(this.url)
            const dados = await respostaApi.json()
            
            if(!respostaApi.ok){
                throw new Error (dados.message || `Erro ao carregar as categorias: ${respostaApi.status}`)
            }
            // Swal.fire({
            //     position: "center",
            //     icon: "success",
            //     title: "Carregamento Concluído!",
            //     text: `Sucesso ao carregar todas as categorias`,
            //     showConfirmButton: false,
            //     timer: 1500
            // })

            return dados

        }catch(erro){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Erro inesperado ao buscar categorias`,
            });
            
            throw erro
        }
    }
}