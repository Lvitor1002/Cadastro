import { ApiRepository } from './ApiRepository.js'

const campoTabela = document.querySelector("tbody")
const campoFormularioEditar = document.getElementById("idFormularioEditar")
const btnFecharFormulario = document.getElementById("fecharEditar")

const nomeEditarInput = document.getElementById("idNome")
const dataEditarInput = document.getElementById("idData")
const departamentoEditarInput = document.getElementById("idDepartamento")

const btnSalvar = document.getElementById("idSalvar")

async function exibirTodasCategorias(){

    let dados = await new ApiRepository(). buscarTodasCategorias()

    dados.forEach((d) => {

        const tr = document.createElement("tr")
        const tdId = document.createElement("td") 
        const tdNome = document.createElement("td") 
        const tdDepartamento = document.createElement("td") 
        const tdData= document.createElement("td") 
        const tdop = document.createElement("td") 
    
        tdId.textContent = d.id
        tdNome.textContent = d.nome
        tdDepartamento.textContent = d.departamento
        tdData.textContent = d.dataCadastro
        
        const iconeEditar = document.createElement("i")
        iconeEditar.setAttribute("id","editar")
        iconeEditar.setAttribute("class","bi bi-pen")
        
        const iconeRemover = document.createElement("i")
        iconeRemover.setAttribute("id","remover")
        iconeRemover.setAttribute("class","bi bi-trash")
        
        tdop.appendChild(iconeEditar)
        tdop.appendChild(iconeRemover)

        tr.appendChild(tdId)
        tr.appendChild(tdNome)
        tr.appendChild(tdDepartamento)
        tr.appendChild(tdData)
        tr.appendChild(tdop)
    
        campoTabela.appendChild(tr)

        iconeEditar.addEventListener("click", function(evento){
            
            campoFormularioEditar.classList.remove("ocultar")

            nomeEditarInput.value = d.nome
            dataEditarInput.value = d.dataCadastro.split('/').reverse().join('-')
            departamentoEditarInput.value = d.departamento

            btnSalvar.dataset.idCategoria = d.id
            
        })

        iconeRemover.addEventListener("click",async function(evento) {
            
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-danger"
                },
                buttonsStyling: false
            });
            
            const resultado = await swalWithBootstrapButtons.fire({
                title: `Deseja apagar [${d.nome}]?`,
                text: "Esta ação não poderá ser desfeita!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sim, remover!",
                cancelButtonText: "Cancelar",
                reverseButtons: true
            })

            if(resultado.isConfirmed){

                await new ApiRepository().removerCategoria(d.id)

                const linhaSelecionada = evento.target.closest("tr")

                if(linhaSelecionada){
                    linhaSelecionada.remove()
                }
                Swal.fire({
                    title: "Removido(a)!",
                    text: `${d.nome} foi removido(a).`,
                    icon: "success"
                });
                
            }
            else if(result.dismiss === Swal.DismissReason.cancel){

                Swal.fire({
                    title: "Cancelado",
                    text: "A exclusão foi cancelada :)",
                    icon: "info"
                });
            }
        })
    })

}

await exibirTodasCategorias()

btnFecharFormulario.addEventListener("click",function(evento){
    campoFormularioEditar.classList.add("ocultar")
})

campoFormularioEditar.querySelector("form").addEventListener("submit",async function(evento){

    evento.preventDefault()
    
    let idCategoria = btnSalvar.dataset.idCategoria

    if(idCategoria){

        let nome = nomeEditarInput.value 
        const departamento = departamentoEditarInput.value 
        const dataCadastro = dataEditarInput.value

        
        let listaErros = []

        if(!/^[A-Za-z\s]+$/.test(nome) || nome.length > 50 || nome === ""){
            listaErros.push("Entrada inválida para nome!")
        }

        if(dataCadastro === ""){
            listaErros.push(`Preencha a data..`)
        }


        if(listaErros.length !== 0){
            Swal.fire({
                icon: "error",
                title: "Entrada inválida",
                html: listaErros.join('<br>'),
                text: `Verifique se o campo foi preenchido corretamente..`
            })
            return
        }

        nome = nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase()

        await new ApiRepository().atualizarCategorias(idCategoria,nome,departamento,dataCadastro)

        campoTabela.innerHTML = ""
        await exibirTodasCategorias()

        campoFormularioEditar.classList.add("ocultar")
    }
})