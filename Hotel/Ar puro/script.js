let empresas = [];

function adicionarEmpresa() {
    const empresa = document.getElementById('empresa').value;
    const valorPorAparelho = parseFloat(document.getElementById('valorPorAparelho').value);
    const quantidadeAparelhos = parseInt(document.getElementById('quantidadeAparelhos').value);
    const porcentagemDesconto = parseFloat(document.getElementById('porcentagemDesconto').value);
    const minAparelhosDesconto = parseInt(document.getElementById('minAparelhosDesconto').value);

    let valorTotal = valorPorAparelho * quantidadeAparelhos;
    
    if (quantidadeAparelhos >= minAparelhosDesconto) {
        const desconto = valorTotal * (porcentagemDesconto / 100);
        valorTotal -= desconto;
    } else {
        alert('O orçamento é ${valorTotal} - Quantidade de aparelhos insuficiente para aplicar desconto');
    }

    empresas.push({ nome: empresa, valor: valorTotal });

    const resultMessage = document.getElementById('resultMessage');
    resultMessage.innerText += `O serviço de ${empresa} custará R$${valorTotal.toFixed(2)}\n`;

    const continuar = prompt("Deseja informar novos dados? (S/N)");
    if (continuar.toUpperCase() === 'S') {
        limparCampos();
    } else {
        mostrarOrcamentoMenorValor();
    }
}

function limparCampos() {
    document.getElementById('empresa').value = '';
    document.getElementById('valorPorAparelho').value = '';
    document.getElementById('quantidadeAparelhos').value = '';
    document.getElementById('porcentagemDesconto').value = '';
    document.getElementById('minAparelhosDesconto').value = '';
}

function mostrarOrcamentoMenorValor() {
    let menorEmpresa = empresas.reduce((min, empresa) => empresa.valor < min.valor ? empresa : min, empresas[0]);
    alert(`O orçamento de menor valor é o de ${menorEmpresa.nome} por R$${menorEmpresa.valor.toFixed(2)}`);
}
