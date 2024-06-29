function calcularMelhorOpcao() {
    // Obtém os valores dos campos de entrada
    const waynealc = parseFloat(document.getElementById('waynealc').value);
    const waynegas = parseFloat(document.getElementById('waynegas').value);
    const starkalc = parseFloat(document.getElementById('starkalc').value);
    const starkgas = parseFloat(document.getElementById('starkgas').value);
    const nome = document.getElementById('nome').value;

    // Calcula se é mais barato abastecer com álcool ou gasolina
    const wayneAlcOuGas = waynealc <= waynegas * 0.7;
    const starkAlcOuGas = starkalc <= starkgas * 0.7;

    // Calcula o custo total para abastecer 42 litros
    const waynelitroalc = waynealc * 42;
    const waynelitrogas = waynegas * 42;
    const starklitroalc = starkalc * 42;
    const starklitrogas = starkgas * 42;

    let MelhorOpcao;

    if (wayneAlcOuGas && starkAlcOuGas) {
        MelhorOpcao = waynelitroalc < starklitroalc ? 
            `álcool no posto Wayne Oil por R$${waynelitroalc.toFixed(2)}` : 
            `álcool no posto Stark Petrol por R$${starklitroalc.toFixed(2)}`;
    } else if (wayneAlcOuGas) {
        MelhorOpcao = `álcool no posto Wayne Oil por R$${waynelitroalc.toFixed(2)}`;
    } else if (starkAlcOuGas) {
        MelhorOpcao = `álcool no posto Stark Petrol por R$${starklitroalc.toFixed(2)}`;
    } else {
        MelhorOpcao = waynelitrogas < starklitrogas ? 
            `gasolina no posto Wayne Oil por R$${waynelitrogas.toFixed(2)}` : 
            `gasolina no posto Stark Petrol por R$${starklitrogas.toFixed(2)}`;
    }

    document.getElementById('resultMessage').textContent = `${nome}, é mais barato abastecer com ${MelhorOpcao}.`;
}
