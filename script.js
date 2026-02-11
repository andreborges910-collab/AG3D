const padrao = {
    estados: { "AC":0.91,"AL":0.89,"AP":0.88,"AM":0.93,"BA":0.87,"CE":0.89,"DF":0.79,"ES":0.81,"GO":0.84,"MA":0.88,"MT":0.88,"MS":0.89,"MG":0.92,"PA":0.95,"PB":0.86,"PR":0.82,"PE":0.88,"PI":0.89,"RJ":1.05,"RN":0.87,"RS":0.84,"RO":0.91,"RR":0.88,"SC":0.78,"SP":0.85,"SE":0.87,"TO":0.92 },
    maquinas: { 
        "Bambu A1":150, "Bambu A1 Mini":110, "P1S":200, "X1C":250, 
        "Ender 3":120, "Kobra V3":160, "Adventurer 5M":220, "Neptune 4":180 
    },
    filamentos: { "PLA Master":115, "PLA Prime":130, "Voolt3D":110, "Silk":150, "PETG XT":140, "ABS Tech":125 }
};

let db = JSON.parse(localStorage.getItem('ag3d_v7')) || padrao;
let tipoAtual = '';

window.onload = atualizar;

function atualizar() {
    pop('lEst', db.estados, 'estados');
    pop('lMaq', db.maquinas, 'maquinas');
    pop('lFil', db.filamentos, 'filamentos');
}

function pop(id, d, t) {
    const s = document.getElementById(id);
    s.innerHTML = `<option value="">-- Selecionar --</option>`;
    for (let k in d) {
        let o = document.createElement('option');
        o.value = d[k]; o.text = k; s.add(o);
    }
    s.innerHTML += `<option value="novo" style="color:var(--primary);">+ Adicionar Novo</option>`;
}

function selecionar(sid, did, t) {
    const s = document.getElementById(sid);
    if(s.value === "novo") {
        tipoAtual = t;
        document.getElementById('modalTitle').innerText = t.toUpperCase();
        document.getElementById('modalNovo').style.display = 'flex';
        s.value = "";
    } else {
        document.getElementById(did).innerText = s.value ? 
        (t === 'maquinas' ? s.value + " W" : "R$ " + parseFloat(s.value).toFixed(2)) : "---";
    }
}

function fecharModal() { document.getElementById('modalNovo').style.display = 'none'; }

function salvarNovo() {
    const n = document.getElementById('novoNome').value;
    const v = parseFloat(document.getElementById('novoValor').value);
    if(n && v) {
        db[tipoAtual][n] = v;
        localStorage.setItem('ag3d_v7', JSON.stringify(db));
        atualizar();
        fecharModal();
    }
}

function apagarItem(sid, dbK) {
    const s = document.getElementById(sid);
    const n = s.options[s.selectedIndex].text;
    if(s.value && s.value !== "novo" && confirm(`Apagar ${n}?`)) {
        delete db[dbK][n];
        localStorage.setItem('ag3d_v7', JSON.stringify(db));
        atualizar();
    }
}

function calcular() {
    const vKwh = parseFloat(document.getElementById('lEst').value) || 0;
    const vWatts = parseFloat(document.getElementById('lMaq').value) || 0;
    const vRolo = parseFloat(document.getElementById('lFil').value) || 0;
    const vPeso = parseFloat(document.getElementById('peso').value) || 0;
    const vTempo = parseFloat(document.getElementById('tempo').value) || 0;
    const vManut = parseFloat(document.getElementById('manutencao').value) || 0;
    const vLucro = parseFloat(document.getElementById('lucro').value) || 0;

    const cFil = (vRolo / 1000) * vPeso;
    const cEne = (vWatts / 1000) * vTempo * vKwh;
    const cMan = vManut * vTempo;
    const custoTotal = cFil + cEne + cMan;
    const totalVenda = custoTotal * (1 + (vLucro / 100));

    document.getElementById('resCustoFil').innerText = "R$ " + cFil.toFixed(2);
    document.getElementById('resCustoEne').innerText = "R$ " + cEne.toFixed(2);
    document.getElementById('resCustoMan').innerText = "R$ " + cMan.toFixed(2);
    document.getElementById('resTotalFinal').innerText = "TOTAL: R$ " + totalVenda.toFixed(2);
    document.getElementById('resultadoLista').style.display = 'block';
}
