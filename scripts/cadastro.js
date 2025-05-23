import {ApiRepository } from './ApiRepository.js'

const btnAddCategoria = document.getElementById("idAddCategoria")
const campoFormulario = document.getElementById("idFormulario")
const btnFecharCampoFormulario = document.getElementById("fechar")

const nomeInput = document.getElementById("idNome")
const dataCadastroInput = document.getElementById("idData")
const departamentoInput = document.getElementById("idDepartamento")
const checkboxInput = document.getElementById("idAceite")


btnAddCategoria.addEventListener("click", async function(evento){

    campoFormulario.classList.remove("ocultar")
    
    btnFecharCampoFormulario.addEventListener("click",function(evento){
        campoFormulario.classList.add("ocultar")
    })
})

async function salvar(){


    let nome = nomeInput.value
    let departamento = departamentoInput.value
    let dataCadastro = dataCadastroInput.value
    let checkbox = checkboxInput.checked

    let dataDividida = dataCadastro.split("-")
    let ano = dataDividida[0]
    let dataAtual = new Date()

    let listaErros = []

    if(!/^[A-Za-z\s]+$/.test(nome) || nome.length > 50 || nome === ""){
        listaErros.push("Entrada inválida para nome!")
    }

    if(dataAtual.getFullYear() !== parseInt(ano)){
        listaErros.push(`Ano escolhido deve ser igual ao ano atual de ${dataAtual.getFullYear()}.`)

    }

    if(!checkbox){
        listaErros.push("Aceite os termos para prosseguir.")
        
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

    await new ApiRepository().enviarDados(nome,departamento,dataCadastro)
    
    nomeInput.value = "";
    departamentoInput.value = "";
    dataCadastroInput.value = "";
    checkboxInput.checked = false;
    
}

document.querySelector("form").addEventListener("submit", async function(evento){
    
    evento.preventDefault()
    await salvar()
})

