let campoDataNascimento = document.querySelector("#data-de-nascimento")
let formulario = document.querySelector("form")
let tipoUsuario = document.getElementById("tipo-usuario")
let campo_cadastro= document.getElementById("formulario-cadastro")
let botaoCadastro = document.getElementById("concluir-cadastro")



tipoUsuario.addEventListener("change",function(){
    if(tipoUsuario.value === "responsavel"){
        campo_cadastro.innerHTML = `                
                <label for="nome">Nome completo:</label> 
                <input type="text" name="nome" id="nome-completo" required>
                <br>

                <label for="data-de-nascimento">Data de nascimento:</label>
                <input type="date" name="data-de-nascimento" id="data-de-nascimento" required>
                <br>

                <label for="sexo">Sexo:</label>
                <select name="sexo" id="sexo" required>
                    <option value="homem">Homem</option>
                    <option value="mulher">Mulher</option>
                    <option value="indefinido">Indefinido</option>
                </select>

                <label for="CPF">CPF:</label>
                <input type="text" name="CPF" id="CPF" maxlength="11" required>
                <br>

                <label for="numero-telefone">Telefone:</label>
                <input type="tel" name="numero-telefone" id="numero-telefone" maxlength="15" required>
                <br>


                <label for="foto-de-perfil">Foto de perfil:</label>
                <input type="file" name="foto-de-perfil" id="foto-de-perfil" accept="image/*">
                <br>

                <label for="emailCuidador">Email:</label>
                <input type="email" name="emailCuidador" id="email" required>
                <br>

                <label for="senha">Senha:</label>
                <input type="password" name="senha" id="senha" required>
                <br>
                
                <input type="button" value="Concluir" id="concluir-cadastro">
            `
        botaoCadastro = document.getElementById("concluir-cadastro");
        campoDataNascimento = document.getElementById("data-de-nascimento");

        botaoCadastro.addEventListener("click", cadastrar);

    } else if(tipoUsuario.value === "cuidador" ){
        campo_cadastro.innerHTML = `

                <label for="nome">Nome completo:</label> 
                <input type="text" name="nome" id="nome-completo" required>
                <br>

                <label for="data-de-nascimento">Data de nascimento:</label>
                <input type="date" name="data-de-nascimento" id="data-de-nascimento" required>
                <br>

                <label for="sexo">Sexo:</label>
                <select name="sexo" id="sexo" required>
                    <option value="homem">Homem</option>
                    <option value="mulher">Mulher</option>
                    <option value="indefinido">Indefinido</option>
                </select>

                <label for="CPF">CPF:</label>
                <input type="text" name="CPF" id="CPF" maxlength="11" required>
                <br>

                <label for="numero-telefone">Telefone:</label>
                <input type="tel" name="numero-telefone" id="numero-telefone" maxlength="15" required>
                <br>

                <label for="especializacoes">Especializações:</label>
                <input type="text" name="especializacoes" id="especializacoes" required>
                <br>

                <label for="foto-de-perfil">Foto de perfil:</label>
                <input type="file" name="foto-de-perfil" id="foto-de-perfil" accept="image/*">
                <br>

                <label for="emailCuidador">Email:</label>
                <input type="email" name="emailCuidador" id="email" required>
                <br>

                <label for="senha">Senha:</label>
                <input type="password" name="senha" id="senha" required>
                <br>

                <input type="button" value="Próximo" id="concluir-cadastro">
        `
        botaoCadastro = document.getElementById("concluir-cadastro");
        campoDataNascimento = document.getElementById("data-de-nascimento");

        botaoCadastro.addEventListener("click", cadastrar);
    }
})

function cadastrar(){
    
    if(formulario.checkValidity() === false){
        formulario.reportValidity()
        return
    }

    let idade = calcularIdade();

    if(tipoUsuario.value === "cuidador" || tipoUsuario.value === "responsavel"){
        if(idade >= 18){
            if(tipoUsuario.value === "cuidador"){
                window.location.href = "index.html"
            } else { 
                window.location.href = "index.html"
            }
        } else {
            alert("Você deve ser maior de 18 anos!")
        }
    } 
}


function calcularIdade() {
    let dataNascimento = new Date(campoDataNascimento.value)
    let hoje = new Date()

    let idade = hoje.getFullYear() - dataNascimento.getFullYear()

    let mesAtual = hoje.getMonth()
    let mesNascimento = dataNascimento.getMonth()

    let diaAtual = hoje.getDate()
    let diaNascimento = dataNascimento.getDate()
    
    if(mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)){
        idade--;
    }

    return idade;
}

