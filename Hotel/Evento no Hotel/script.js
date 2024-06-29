let numConvidados;
let auditórioEscolhido;
let cadeirasAdicionais;
let diaEvento;
let horaEvento;
let nomeEmpresa;
let numGarçons;
let horasEvento;
let quantCafé;
let quantÁgua;
let quantSalgados;
let custoGarçons;
let custoBuffet;
let valorTotalEvento;

// Função para verificar qual auditório é mais adequado
function verificarAuditório() {
    numConvidados = parseInt(document.getElementById('numConvidados').value);

    if (numConvidados > 350 || numConvidados < 0) {
        document.getElementById('mensagemAuditório').textContent = "Número de convidados inválido.";
    } else if (numConvidados <= 350 && numConvidados > 0) {
        if (numConvidados <= 220) {
            auditórioEscolhido = "Laranja";
            cadeirasAdicionais = 220 - numConvidados;
            document.getElementById('mensagemAuditório').textContent = `Use o auditório Laranja (inclua mais ${cadeirasAdicionais} cadeiras)`;
        } else {
            auditórioEscolhido = "Colorado";
            document.getElementById('mensagemAuditório').textContent = "Use o auditório Colorado";
        }
        document.getElementById('scheduleDiv').style.display = 'block';
    }
}

// Função para verificar disponibilidade do auditório
function verificarDisponibilidade() {
    diaEvento = document.getElementById('diaEvento').value.toLowerCase();
    horaEvento = parseInt(document.getElementById('horaEvento').value);

    // Verifica disponibilidade do auditório conforme as regras especificadas
    if ((diaEvento === 'segunda' || diaEvento === 'terça' || diaEvento === 'quarta' || diaEvento === 'quinta' || diaEvento === 'sexta') &&
        (horaEvento >= 7 && horaEvento <= 23)) {
        document.getElementById('mensagemDisponibilidade').textContent = `Auditório reservado para ${nomeEmpresa}: ${diaEvento} às ${horaEvento}hs`;
        document.getElementById('staffDiv').style.display = 'block';
    } else if ((diaEvento === 'sábado' || diaEvento === 'domingo') &&
        (horaEvento >= 7 && horaEvento <= 15)) {
        document.getElementById('mensagemDisponibilidade').textContent = `Auditório reservado para ${nomeEmpresa}: ${diaEvento} às ${horaEvento}hs`;
        document.getElementById('staffDiv').style.display = 'block';
    } else {
        document.getElementById('mensagemDisponibilidade').textContent = "Auditório indisponível";
    }
}

// Função para calcular quantidade de garçons // Perguntar pro Gabs se tem mesmo q solicitar o número de garçons pq n faz sentido
function calcularGarçons() {
    numGarçons = parseInt(document.getElementById('numGarçons').value);
    horasEvento = parseInt(document.getElementById('horasEvento').value);

    // Cálculo da quantidade de garçons necessários
    let garçonsPorConvidados = Math.ceil(numConvidados / 12);
    let garçonsPorHoras = Math.ceil(horasEvento / 2);

    numGarçons = Math.max(numGarçons, garçonsPorConvidados, garçonsPorHoras);

    custoGarçons = numGarçons * 10.5 * horasEvento;
    document.getElementById('mensagemGarçons').textContent = `São necessários ${numGarçons} garçons.\nCusto: R$ ${custoGarçons.toFixed(2)}`;
    document.getElementById('buffetDiv').style.display = 'block';
}

// Função para calcular custo do buffet
function calcularBuffet() {
    quantCafé = 0.2 * numConvidados;
    quantÁgua = 0.5 * numConvidados;
    quantSalgados = 7 * numConvidados;

    custoBuffet = (quantCafé * 0.8) + (quantÁgua * 0.4) + ((quantSalgados / 100) * 34);

    document.getElementById('quantidadesBuffet').textContent = `O evento precisará de ${quantCafé.toFixed(2)} litros de café, ${quantÁgua.toFixed(2)} litros de água, ${quantSalgados} salgados.`;
    document.getElementById('custoBuffet').textContent = `Custo do Buffet: R$ ${custoBuffet.toFixed(2)}`;

    let valorTotal = custoGarçons + custoBuffet;
    valorTotalEvento = valorTotal.toFixed(2);

    document.getElementById('relatorioFinal').textContent = `
        Evento no Auditório ${auditórioEscolhido}.
        Nome da Empresa: ${nomeEmpresa}.
        Data: ${diaEvento}, ${horaEvento}H às ${(horaEvento + horasEvento)}H.
        Duração do evento: ${horasEvento}H.
        Quantidade de garçons: ${numGarçons}.
        Quantidade de Convidados: ${numConvidados}.
        Custo do garçons: R$ ${custoGarçons.toFixed(2)}.
        Custo do Buffet: R$ ${custoBuffet.toFixed(2)}.
        Valor total do Evento: R$ ${valorTotalEvento}.
    `;

    document.getElementById('finalDiv').style.display = 'block';
}

// Função para efetuar a reserva
function efetuarReserva() {
    let resposta = prompt(`Gostaria de efetuar a reserva para o evento descrito acima? S/N`);
    if (resposta && resposta.toLowerCase() === 's') {
        document.getElementById('mensagemReserva').textContent = `${nomeEmpresa}, reserva efetuada com sucesso.`;
    } else {
        document.getElementById('mensagemReserva').textContent = "Reserva não efetuada.";
    }
}
