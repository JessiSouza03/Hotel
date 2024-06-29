const nomeHotel = "Hotel da Jessi";
const totalQuartos = 20;
const quartos = Array(totalQuartos).fill(null);
const maxCadastros = 15;
const hospedes = [];

function login() {
    const nomeUsuario = document.getElementById('username').value;
    const senha = document.getElementById('password').value;

    if (senha === '2678') {
        document.getElementById('loginDiv').style.display = 'none';
        document.getElementById('menuDiv').style.display = 'block';
        document.getElementById('personalWelcome').innerText = `Bem vindo ao ${nomeHotel}, ${nomeUsuario}. É um imenso prazer ter você por aqui!`;
    } else {
        alert('Senha incorreta! Tente novamente.');
    }
}

function menuOption(opcao) {
    switch (opcao) {
        case 1:
            // Função para reservar quarto
            document.getElementById('menuDiv').style.display = 'none';
            document.getElementById('reservationDiv').style.display = 'block';
            break;
        case 2:
            // Função para cadastrar hóspedes
            document.getElementById('menuDiv').style.display = 'none';
            document.getElementById('cadastroDiv').style.display = 'block';
            break;
        case 3:
            // Função para cadastro e pesquisa de hóspedes
            document.getElementById('menuDiv').style.display = 'none';
            document.getElementById('cadastroPesquisaDiv').style.display = 'block';
            break;
        default:
            alert('Opção inválida!');
            inicio();
    }
}

function inicio() {
    // Mostrar o menu novamente
    document.getElementById('menuDiv').style.display = 'block';
    document.getElementById('reservationDiv').style.display = 'none';
    document.getElementById('cadastroDiv').style.display = 'none';
    document.getElementById('cadastroPesquisaDiv').style.display = 'none';
    document.getElementById('opcaoCadastro').style.display = 'none';
    document.getElementById('opcaoPesquisa').style.display = 'none';
    document.getElementById('opcaoListar').style.display = 'none';
}

function validarReserva() {
    const valorDiaria = parseFloat(document.getElementById('valorDiaria').value);
    const numDias = parseInt(document.getElementById('numDias').value);

    if (isNaN(valorDiaria) || valorDiaria <= 0 || isNaN(numDias) || numDias <= 0 || numDias > 30) {
        document.getElementById('mensagemReserva').innerText = `Valor inválido, ${document.getElementById('username').value}`;
        return;
    }

    const custoTotal = valorDiaria * numDias;
    const nomeHospede = prompt("Qual o nome do hóspede?");
    let numQuarto = parseInt(prompt("Qual o quarto para reserva? (1 - 20)?"));

    while (numQuarto < 1 || numQuarto > totalQuartos || quartos[numQuarto - 1] !== null) {
        if (quartos[numQuarto - 1] !== null) {
            alert("Quarto já está ocupado. Escolha outro.");
        }
        numQuarto = parseInt(prompt("Qual o quarto para reserva? (1 - 20)?"));
    }

    const confirmacao = prompt(`${document.getElementById('username').value}, você confirma a hospedagem para ${nomeHospede} por ${numDias} dias para o quarto ${numQuarto} por R$${custoTotal.toFixed(2)}? S/N`).toUpperCase();

    if (confirmacao === 'S') {
        quartos[numQuarto - 1] = nomeHospede;
        alert(`${document.getElementById('username').value}, reserva efetuada para ${nomeHospede}.`);
    }

    inicio();
}

function iniciarCadastro() {
    const valorDiaria = parseFloat(document.getElementById('valorDiariaCadastro').value);
    if (isNaN(valorDiaria) || valorDiaria <= 0) {
        document.getElementById('mensagemCadastro').innerText = `Valor inválido, ${document.getElementById('username').value}`;
        return;
    }

    let gratuidades = 0;
    let meias = 0;
    let valorTotal = 0;

    while (true) {
        const nomeHospede = prompt("Qual o nome do hóspede? (Digite 'PARE' para encerrar)");
        if (nomeHospede.toUpperCase() === 'PARE') {
            break;
        }

        const idadeHospede = parseInt(prompt(`Qual a idade de ${nomeHospede}?`));
        if (isNaN(idadeHospede) || idadeHospede < 0) {
            alert("Idade inválida! Tente novamente.");
            continue;
        }

        if (idadeHospede < 6) {
            alert(`${nomeHospede} possui gratuidade`);
            gratuidades++;
        } else if (idadeHospede > 60) {
            alert(`${nomeHospede} paga meia`);
            meias++;
            valorTotal += valorDiaria / 2;
        } else {
            valorTotal += valorDiaria;
        }
        alert(`${nomeHospede} cadastrado(a) com sucesso.`);
    }

    alert(`${document.getElementById('username').value}, o valor total das hospedagens é: R$${valorTotal.toFixed(2)}; ${gratuidades} gratuidade(s); ${meias} meia(s)`);
    inicio();
}

function opcaoCadastroPesquisa(opcao) {
    switch (opcao) {
        case 1:
            document.getElementById('opcaoCadastro').style.display = 'block';
            document.getElementById('opcaoPesquisa').style.display = 'none';
            document.getElementById('opcaoListar').style.display = 'none';
            break;
        case 2:
            document.getElementById('opcaoCadastro').style.display = 'none';
            document.getElementById('opcaoPesquisa').style.display = 'block';
            document.getElementById('opcaoListar').style.display = 'none';
            break;
        case 3:
            document.getElementById('opcaoCadastro').style.display = 'none';
            document.getElementById('opcaoPesquisa').style.display = 'none';
            document.getElementById('opcaoListar').style.display = 'block';
            break;
        case 4:
            inicio();
            break;
        default:
            alert('Opção inválida!');
    }
}

function cadastrarHospede() {
    if (hospedes.length >= maxCadastros) {
        document.getElementById('mensagemCadastroPesquisa').innerText = "Máximo de cadastros atingido.";
        return;
    }

    const nomeHospede = document.getElementById('nomeHospedeCadastro').value;
    if (nomeHospede) {
        hospedes.push(nomeHospede);
        document.getElementById('mensagemCadastroPesquisa').innerText = `Hóspede ${nomeHospede} foi cadastrada(o) com sucesso!`;
    } else {
        document.getElementById('mensagemCadastroPesquisa').innerText = "Nome do hóspede não pode ser vazio.";
    }
}

function pesquisarHospede() {
    const nomeHospede = document.getElementById('nomeHospedePesquisa').value;
    if (hospedes.includes(nomeHospede)) {
        document.getElementById('mensagemPesquisa').innerText = `Hóspede ${nomeHospede} foi encontrada(o)!`;
    } else {
        document.getElementById('mensagemPesquisa').innerText = `Hóspede ${nomeHospede} não foi encontrada(o)!`;
    }
}

function listarHospedes() {
    const listaHospedes = document.getElementById('listaHospedes');
    listaHospedes.innerHTML = '';

    if (hospedes.length === 0) {
        listaHospedes.innerHTML = '<li>Nenhum hóspede cadastrado</li>';
    } else {
        hospedes.forEach(hospede => {
            const li = document.createElement('li');
            li.innerText = hospede;
            listaHospedes.appendChild(li);
        });
    }
}

function logout() {
    const nomeUsuario = document.getElementById('username').value;
    alert(`Muito obrigado e até logo, ${nomeUsuario}.`);
    document.getElementById('loginDiv').style.display = 'block';
    document.getElementById('menuDiv').style.display = 'none';
    document.getElementById('reservationDiv').style.display = 'none';
    document.getElementById('cadastroDiv').style.display = 'none';
    document.getElementById('cadastroPesquisaDiv').style.display = 'none';
    document.getElementById('opcaoCadastro').style.display = 'none';
    document.getElementById('opcaoPesquisa').style.display = 'none';
    document.getElementById('opcaoListar').style.display = 'none';
}
