let nomeInput = document.getElementById("idNome")
let dataInput = document.getElementById("idData")
let campoCheck = document.getElementById("idAceite")
let btnSalvar = document.getElementById("idSalvar")
let campoSelect = document.getElementById("idDepartamento")
let campoTodasCategorias = document.getElementById("idCampoTodasCategorias")
let btnFechar = document.getElementById("fechar")
let btnFecharEditar = document.querySelector(".btnEditar")
let formulario = document.getElementById("idFormulario")
let formularioEditar = document.getElementById("idFormularioEditar")
let btnAddCategoria = document.getElementById("idAddCategoria")

const urlApi = `https://localhost:7145/categorias`







if (btnFechar) {
  btnFechar.addEventListener("click", function(evento){
    formulario.classList.add("ocultar");
  });
}

if(btnAddCategoria){

    btnAddCategoria.addEventListener("click",function(evento){
            
        formulario.classList.remove("ocultar")
            
    })
}







function salvar(){

    //Mesmo nome das colunas
    let nome = nomeInput.value
    let departamento = campoSelect.value
    let dataCadastro = dataInput.value
    let checkBox = campoCheck.checked

    let splitDate = dataCadastro.split("-")
    let ano = splitDate[0]
    let dataAtualHoje = new Date()
    

    let listaErros = []

    //Validação do nome
    if(nome.indexOf(" ") === -1 || !/^[A-Za-zÀ-ÿ\s]/.test(nome)){
       listaErros.push("Preencha com o nome completo.")
    }
    
    //Validação da data
    if(dataAtualHoje.getFullYear() !== parseInt(ano)){
        listaErros.push(`Ano escolhido deve ser igual ao ano atual de ${dataAtualHoje.getFullYear()}.`)
        
        
        
    }
    if(!checkBox){
        listaErros.push("Aceite os termos para prosseguir.")
        
    }

    if(listaErros.length == 0){

        
        enviarAoServidor(nome,dataCadastro,departamento,true)



        nomeInput.value = ""
        dataInput.value = ""
        campoSelect.value = ""
        campoCheck.checked = false



    }else{

        //Aviso de erro ao validar:
        Swal.fire({
            icon: "error",
            title: "Entrada inválida.",
            html: listaErros.join('<br>')
        })
    }
  
    return false
}

async function enviarAoServidor(nome,dataCadastro,departamento,checkBox){
    
    const dadosEnvio  = {
        nome: nome,
        departamento: departamento,
        dataCadastro: dataCadastro,
        checkBox: checkBox
    }

    try{

        //Não consome, mas envia ao banco de dados!
        const resultadoApi = await fetch(urlApi,{
            method: "POST",
            mode:"cors",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(dadosEnvio )
        })
        
        const dadosResposta = await resultadoApi.json()

        if(!resultadoApi.ok){

            throw new Error(dadosResposta.message || `Erro HTTP: ${resultadoApi.status}`);
        }

        Swal.fire({
            title: "Sucesso!",
            icon: "success",
            text: `${dadosEnvio.nome} cadastrado(a)!`,
            draggable: true
        });

        return dadosResposta;

    }catch(error){

        let mensagemErro = error.message || "Erro ao conectar com o servidor";

        Swal.fire({
            icon: "error",
            title: "Erro inesperado",
            text: mensagemErro

        })

        throw error
    }
}











async function buscarTodasCategorias(){
    
    try{
        const resultadoApi = await fetch(urlApi)
        const dados = await resultadoApi.json()

        exibirTodasCategorias(dados) 
    }
    catch (erro){
        Swal.fire({
            icon: "error",
            title: "Erro inesperado",
            text: "Falha ao buscar categorias."
        })
    }
}

function exibirTodasCategorias(dados){

    const corpoTabela = document.querySelector("tbody")
    corpoTabela.innerHTML = ""
    
    for(let dado of dados){

        
        let tr = document.createElement("tr")

        //id
        let th = document.createElement("th")
        th.setAttribute("scope","row")
        th.textContent = dado.id
        tr.appendChild(th)

        //Nome
        let tdNome = document.createElement("td")
        tdNome.textContent = dado.nome
        tr.appendChild(tdNome)

        // Departamento
        let tdDepartamento = document.createElement("td");
        tdDepartamento.textContent = dado.departamento;
        tr.appendChild(tdDepartamento);

        // Data de Cadastro
        let tdData = document.createElement("td");
        tdData.textContent = dado.dataCadastro;
        tr.appendChild(tdData);

        // Operações (ícones)
        let tdOperacoes = document.createElement("td");

        let iconeEditar = document.createElement("i");
        iconeEditar.setAttribute("class","bi bi-pen")
        iconeEditar.setAttribute("id","editar")
        tdOperacoes.appendChild(iconeEditar)
        
        // Icone excluir
        let iconeExcluir = document.createElement("i");
        iconeExcluir.setAttribute("class","bi bi-trash")
        tdOperacoes.appendChild(iconeExcluir)
        tr.appendChild(tdOperacoes)

        corpoTabela.appendChild(tr)


        //Editando
        iconeEditar.addEventListener("click",function(evento){

            formularioEditar.classList.remove("ocultar")

            // Preencher os campos com os valores da linha
            nomeInput.value = dado.nome
            dataInput.value = dado.dataCadastro 
            campoSelect.value = dado.departamento
            
            // Guardar o ID da categoria sendo editada no botão salvar
            btnSalvar.dataset.idCategoria = dado.id

            
            btnFecharEditar.addEventListener("click", function(evento){
                formularioEditar.classList.add("ocultar")
            })

        })
        

        //Excluindo
        iconeExcluir.addEventListener("click", () => excluirCategoria(dado.id)) 
        
    }
}









function salvarEditar(){

    let idCategoria = btnSalvar.dataset.idCategoria;  // pegar id armazenado (se existir)

    //Mesmo nome das colunas
    let nome = nomeInput.value
    let departamento = campoSelect.value
    let dataCadastro = dataInput.value

    let splitDate = dataCadastro.split("-")
    let ano = splitDate[0]
    let dataAtualHoje = new Date()
    

    let listaErros = []

    //Validação do nome
    if(nome.indexOf(" ") === -1 || !/^[A-Za-zÀ-ÿ\s]/.test(nome)){
       listaErros.push("Preencha com o nome completo.")
    }
    
    //Validação da data
    if(dataAtualHoje.getFullYear() !== parseInt(ano)){
        listaErros.push(`Ano escolhido deve ser igual ao ano atual de ${dataAtualHoje.getFullYear()}.`)
             
        
    }


    if(listaErros.length == 0){

        // Se tem id guardado por uma possivel edição.... Então:
        if(idCategoria){

            editarCategoria(idCategoria,nome, dataCadastro,departamento)
            
            formularioEditar.classList.add("ocultar") // Fechar formulário

        }

    }else{

        //Aviso de erro ao validar:
        Swal.fire({
            icon: "error",
            title: "Entrada inválida.",
            html: listaErros.join('<br>')
        })
    }
  
    return false
}

async function editarCategoria(id, nome, dataCadastro, departamento){

    const dadosAtualizados = { nome, dataCadastro, departamento };

    try{

        const resultadoApi = await fetch(`${urlApi}/${id}`, {
            method: "PUT",
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(dadosAtualizados)
        })

        

        if(!resultadoApi.ok){
            const erro = await resultadoApi.json()
            throw new Error(erro.message || 'Erro na edição');
        }

        // 204 = Sem Conteúdo
        const dadosResposta = resultadoApi.status !== 204 ? await resultadoApi.json() : null

        
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Edição realizada!",
            text: "Categoria atualizada com sucesso.",
            showConfirmButton: false,
            timer: 2000 
        });
        
        await buscarTodasCategorias();

        return dadosResposta;

    }catch(error){

        let mensagemErro = error.message || "Erro ao conectar com o servidor";

        Swal.fire({
            icon: "error",
            title: "Falha na edição",
            text: mensagemErro
        });

        throw error
    }
}









async function excluirCategoria(id){

    try{

        const resultadoApi = await fetch(`${urlApi}/${id}`,{
            method: "DELETE",
            mode:"cors",
            headers:{
                'Content-Type':'application/json'
            }
        })
    

        //Tratamento de respostas vazias:
        const dadosResposta = await resultadoApi.json()
        
        if(!resultadoApi.ok){
    
            throw new Error(dadosResposta.message || `Erro HTTP: ${resultadoApi.status}`);
        }
    
        //chamando o buscar para atualizar a lista
        await buscarTodasCategorias()

        // msg de sucesso no DOM
        Swal.fire({
            position: "center",
            icon: "success",
            title: `ID -> ${id} excluído(a) com sucesso!`,
            showConfirmButton: false,
            timer: 1000
        });
            

    }catch(error){

        let mensagemErro = error.message || "Erro ao conectar com o servidor";

        //Aviso de erro ao enviar API:
        Swal.fire({
            icon: "error",
            title: "Erro inesperado",
            text: mensagemErro
            
        })

    }
     
}




// Hospedar api na azure