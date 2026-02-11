function calcular() {
    const peso = parseFloat(document.getElementById('peso').value);
    const precoKg = parseFloat(document.getElementById('precoFilamento').value);
    const margem = parseFloat(document.getElementById('lucro').value);

    if (!peso || !precoKg || !margem) {
        alert("Por favor, preencha todos os campos para a Bambu A1 calcular!");
        return;
    }

    // Lógica AG 3D STUDIO: Custo do material + Margem de Lucro
    const custoMaterial = (precoKg / 1000) * peso;
    const valorVenda = custoMaterial * (1 + (margem / 100));

    // Exibição dos resultados
    document.getElementById('resCustoFil').innerText = `R$ ${custoMaterial.toFixed(2)}`;
    document.getElementById('resTotalFinal').innerText = `TOTAL: R$ ${valorVenda.toFixed(2)}`;

    // Revela a área de resultado
    document.getElementById('resultadoLista').classList.remove('hidden');
}
