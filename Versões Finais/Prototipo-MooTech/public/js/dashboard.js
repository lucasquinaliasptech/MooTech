var paginacaoGraficos = {};

function atualizarGraficoTempoReal(grafico, idGalpao, idTanque, idUsuario, tipoDado) {
    const endpoint = `/medidas/tempo-real/${idGalpao}/${idTanque}/${idUsuario}`;

    const chavePaginacao = `${tipoDado}_${idTanque}`;

    fetch(endpoint, { method: "GET" })
        .then(response => {
            if (!response.ok) throw new Error("Erro na rede ou API vazia");
            return response.json();
        })
        .then(valores => {
            if (paginacaoGraficos[chavePaginacao] == null) {
                paginacaoGraficos[chavePaginacao] = 0;
            }

            var ultimaPaginacao = paginacaoGraficos[chavePaginacao];
            paginacaoGraficos[chavePaginacao] = valores.length;

            var dadosNovos = valores.slice(ultimaPaginacao);

            dadosNovos.forEach((registro) => {
                if (grafico.data.labels.length == 10 && grafico.data.datasets[0].data.length == 10) {
                    grafico.data.labels.shift();
                    grafico.data.datasets[0].data.shift();
                }

                grafico.data.labels.push(registro.h);

                if (tipoDado === 'temperatura') {
                    grafico.data.datasets[0].data.push(registro.t);
                } else if (tipoDado === 'umidade') {
                    grafico.data.datasets[0].data.push(registro.u);
                }

                grafico.update();
            });
        })
        .catch(error => console.log(`Monitoramento de ${tipoDado} rodando... (Sem dados novos ou erro: ${error})`));
}

function iniciarMonitoramentoTempoReal() {
    const idUsuario = sessionStorage.ID_USUARIO;

    setInterval(() => {
        const tanqueAtual = document.querySelector("#select-tanque").value;
        const galpaoAtual = document.querySelector("#select_galpao").value;

        if (tanqueAtual === "todos") {
            criarChartTodos();
        } else if (typeof chartTemp !== "undefined" && typeof chartUmi !== "undefined") {
            atualizarGraficoTempoReal(chartTemp, galpaoAtual, tanqueAtual, idUsuario, 'temperatura');
            atualizarGraficoTempoReal(chartUmi, galpaoAtual, tanqueAtual, idUsuario, 'umidade');
        }

        emAlertas();
        emManutencao();
    }, 20000);
}

function criarChartTodos() {
    const idUsuario = sessionStorage.ID_USUARIO;
    const idGalpao = document.querySelector("#select_galpao").value;

    console.log("entrou no CriarTodos");
    const graficos_section = document.getElementById('graficos_section');
    const graficos_section2 = document.getElementById('graficos_section2');
    graficos_section.style.display = "none";
    graficos_section2.style.display = "none";

    const graficos_section_temp = document.getElementById('dados_temp');
    const graficos_section_umi = document.getElementById('dados_umi');
    graficos_section_temp.style.display = "flex"
    graficos_section_umi.style.display = "flex"

    dados_temp.innerHTML = "";
    dados_umi.innerHTML = "";

    fetch(`/medidas/tempo-real-todo/${idGalpao}/${idUsuario}`, { method: "GET" }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                dados_temp.innerHTML = "";

                for (let i = 0; i < resposta.length; i++) {
                    const registro = resposta[i];

                    let icone_temperatura = "/assets/imgs/check.png";
                    let cor_temperatura = "#41A159";
                    if (registro.t > 4 || registro.t < 0) {
                        icone_temperatura = "/assets/imgs/alert.png";
                        cor_temperatura = "#F32222";
                    }

                    let icone_umidade = "/assets/imgs/check.png";
                    let cor_umidade = "#41A159";
                    if (registro.u < 75) {
                        icone_umidade = "/assets/imgs/alert.png";
                        cor_umidade = "#F32222";
                    }

                    dados_temp.innerHTML += `
                <div class="card_tanque">
                    <h3 class="titulo_tanque">TANQUE ${registro.id_tanque}</h3>
                    
                    <div class="container_metricas">
                        <div class="metrica_item">
                            <span class="label_metrica">Temperatura</span>
                            <span class="valor_metrica" style="color: ${cor_temperatura}">${registro.t}°</span>
                            <img src="${icone_temperatura}" alt="Status Temperatura" class="status_icone" >
                        </div>

                        <div class="metrica_item">
                            <span class="label_metrica">Umidade</span>
                            <span class="valor_metrica" style="color: ${cor_umidade}">${registro.u}%</span>
                            <img src="${icone_umidade}" alt="Status Umidade" class="status_icone">
                        </div>
                    </div>
                </div>
                `;
                }
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    });
}

function criarChart() {
    const idUsuario = sessionStorage.ID_USUARIO;
    const idGalpao = document.querySelector("#select_galpao").value;
    const idTanque = document.querySelector("#select-tanque").value;

    document.getElementById('tanqueid').innerHTML = idTanque;
    document.getElementById('tanqueid2').innerHTML = idTanque;

    const graficos_section = document.getElementById('graficos_section');
    const graficos_section2 = document.getElementById('graficos_section2');

    if (idTanque === "todos") {
        if (graficos_section && graficos_section2) {
            console.log("entrou no if do 0/ CriarChart()");
            graficos_section.style.display = "none";
            graficos_section2.style.display = "none";
        }
        criarChartTodos()
        return
    }

    paginacaoGraficos[`temperatura_${idTanque}`] = 0;
    paginacaoGraficos[`umidade_${idTanque}`] = 0;

    fetch(`/medidas/tempo-real/${idGalpao}/${idTanque}/${idUsuario}`, { method: "GET" }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos no carregar inicial: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGrafico(resposta);

                paginacaoGraficos[`temperatura_${idTanque}`] = resposta.length;
                paginacaoGraficos[`umidade_${idTanque}`] = resposta.length;
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    });
}

var chartTemp;
var chartUmi;
var paginacaoGraficos = {};

function plotarGrafico(resposta) {
    const ctx = document.getElementById("chartTemperatura").getContext("2d");
    const ctx2 = document.getElementById("chartUmidade").getContext("2d");

    let labels = [];
    let dadosTemp = {
        labels: labels,
        datasets: [{
            data: [],
            fill: false,
            borderColor: 'rgb(53,191,191)'
        }]
    };

    let dadosUmi = {
        labels: labels,
        datasets: [{
            data: [],
            fill: false,
            borderColor: 'rgb(53,191,191)'
        }]
    };

    const ultimosDezRegistros = resposta.slice(0, 10);
    
    ultimosDezRegistros.reverse();

    for (let i = 0; i < ultimosDezRegistros.length; i++) {
        var registro = ultimosDezRegistros[i];
        labels.push(registro.h);
        dadosTemp.datasets[0].data.push(registro.t);
        dadosUmi.datasets[0].data.push(registro.u);
    }

    if (chartTemp !== undefined) chartTemp.destroy();
    if (chartUmi !== undefined) chartUmi.destroy();

    chartTemp = new Chart(ctx, {
        type: 'line',
        data: dadosTemp,
        options: {
            scales: {
                x: { ticks: { stepSize: 1, font: { size: 17 }, color: '#3eb1b1' } },
                y: { beginAtZero: false, ticks: { stepSize: 1, font: { size: 17 }, color: '#32c2c2' } }
            },
            plugins: {
                legend: { display: false },
                annotation: {
                    annotations: {
                        linhaMax: { type: "line", yMin: 4, yMax: 4, borderColor: "red", borderWidth: 2, label: { display: true, content: "Limite Máximo (4°C)", position: "end" } },
                        linhaMin: { type: "line", yMin: 0, yMax: 0, borderColor: "red", borderWidth: 2, label: { display: true, content: "Limite Mínimo (0°C)", position: "end" } }
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: true
        }
    });

    chartUmi = new Chart(ctx2, {
        type: 'line',
        data: dadosUmi,
        options: {
            scales: {
                x: { ticks: { stepSize: 1, font: { size: 17 }, color: '#3eb1b1' } },
                y: { beginAtZero: false, ticks: { stepSize: 1, font: { size: 17 }, color: '#32c2c2' } }
            },
            plugins: {
                legend: { display: false },
                annotation: {
                    annotations: {
                        linhaMin: { type: "line", yMin: 75, yMax: 75, borderColor: "red", borderWidth: 2, label: { display: true, content: "Limite Mínimo (75%)", position: "end" } }
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: true
        }
    });
}

function atualizarChart() {
    const idUsuario = sessionStorage.ID_USUARIO;
    const idGalpao = document.querySelector("#select_galpao").value;
    const idTanque = document.querySelector("#select-tanque").value;

    const graficos_section = document.getElementById('graficos_section');
    const graficos_section2 = document.getElementById('graficos_section2');
    const graficos_section_temp = document.getElementById('dados_temp');
    const graficos_section_umi = document.getElementById('dados_umi');

    graficos_section.style.display = "flex";
    graficos_section2.style.display = "flex";
    graficos_section_temp.style.display = "none";
    graficos_section_umi.style.display = "none";

    dados_temp.innerHTML = "";
    dados_umi.innerHTML = "";

    if (idTanque === "todos") {
        if (chartTemp !== undefined && chartUmi !== undefined) {
            chartTemp.destroy();
            chartUmi.destroy();
            chartTemp = undefined;
            chartUmi = undefined;
            console.log("Gráficos individuais removidos para abrir a visão consolidada.");
        }
        criarChartTodos();
        return;
    }

    document.getElementById('tanqueid').innerHTML = idTanque;
    document.getElementById('tanqueid2').innerHTML = idTanque;

    paginacaoGraficos[`temperatura_${idTanque}`] = 0;
    paginacaoGraficos[`umidade_${idTanque}`] = 0;

    const chart = Chart.getChart('chartTemperatura');
    const chart2 = Chart.getChart('chartUmidade');

    if (chart !== undefined) {
        chart.destroy();
    }

    if (chart2 !== undefined) {
        chart2.destroy();
    }

    fetch(`/medidas/tempo-real/${idGalpao}/${idTanque}/${idUsuario}`, { method: "GET" }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos na troca de filtro: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGrafico(resposta);
                
                paginacaoGraficos[`temperatura_${idTanque}`] = resposta.length;
                paginacaoGraficos[`umidade_${idTanque}`] = resposta.length;
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    });
}

// NAVBAR

let contador = 0;

let ativador = setInterval(() => {
    centralNavbar()
    contador++
    console.log("O contador foi executado " + contador + " vezes")
}, 2000);

function centralNavbar() {
    emAtivo();
    emAlertas();
    emManutencao();
    kpiTemperaturaBaixa();
    kpiTemperaturaAlta();
    kpiUmidadeBaixa();
    kpiUmidadeAlta();
}

function kpiTemperaturaBaixa() {
    const idUsuario = sessionStorage.ID_USUARIO;

    fetch(`/navbar/tempBaixa/${idUsuario}`, { method: "GET" }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                for (let i = 0; i < resposta.length; i++) {
                    var registro = resposta[i];

                    document.getElementById('idgalpaoTempBaixa').innerHTML = registro.id_galpao;
                    document.getElementById('idtanqueTempBaixa').innerHTML = registro.id_tanque;

                    const spanValor = document.getElementById('tanquetempmenor');
                    const imgIcone = document.getElementById('icone_temp_baixa');

                    spanValor.innerHTML = registro.t;

                    if (registro.t > 4 || registro.t < 0) {
                        imgIcone.src = "./assets/imgs/alert.png";
                        spanValor.style.color = "#F32222";
                    } else {
                        imgIcone.src = "./assets/imgs/check.png";
                        spanValor.style.color = "#41A159";
                    }
                }
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    });
}

function kpiTemperaturaAlta() {
    const idUsuario = sessionStorage.ID_USUARIO;

    fetch(`/navbar/tempAlta/${idUsuario}`, { method: "GET" }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                for (let i = 0; i < resposta.length; i++) {
                    var registro = resposta[i];

                    document.getElementById('idgalpaoTempAlta').innerHTML = registro.id_galpao;
                    document.getElementById('idtanqueTempAlta').innerHTML = registro.id_tanque;

                    const spanValor = document.getElementById('tanquetempmaior');
                    const imgIcone = document.getElementById('icone_temp_alta');

                    spanValor.innerHTML = registro.t;

                    if (registro.t > 4 || registro.t < 0) {
                        imgIcone.src = "./assets/imgs/alert.png";
                        spanValor.style.color = "#F32222";
                    } else {
                        imgIcone.src = "./assets/imgs/check.png";
                        spanValor.style.color = "#41A159";
                    }
                }
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    });
}

function kpiUmidadeBaixa() {
    const idUsuario = sessionStorage.ID_USUARIO;

    fetch(`/navbar/umiBaixa/${idUsuario}`, { method: "GET" }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                for (let i = 0; i < resposta.length; i++) {
                    var registro = resposta[i];
                    document.getElementById('idgalpaoUmiBaixa').innerHTML = registro.id_galpao;
                    document.getElementById('idtanqueUmiBaixa').innerHTML = registro.id_tanque;

                    const spanValor = document.getElementById('tanqueumidademenor');
                    const imgIcone = document.getElementById('icone_umi_baixa');

                    spanValor.innerHTML = registro.u;

                    if (registro.u < 75) {
                        imgIcone.src = "./assets/imgs/alert.png";
                        spanValor.style.color = "#F32222";
                    } else {
                        imgIcone.src = "./assets/imgs/check.png";
                        spanValor.style.color = "#41A159";
                    }
                }
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    });
}

function kpiUmidadeAlta() {
    const idUsuario = sessionStorage.ID_USUARIO;

    fetch(`/navbar/umiAlta/${idUsuario}`, { method: "GET" }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                for (let i = 0; i < resposta.length; i++) {
                    var registro = resposta[i];
                    document.getElementById('idgalpaoUmiAlta').innerHTML = registro.id_galpao;
                    document.getElementById('idtanqueUmiAlta').innerHTML = registro.id_tanque;

                    const spanValor = document.getElementById('tanqueumidademaior');
                    const imgIcone = document.getElementById('icone_umi_alta');

                    spanValor.innerHTML = registro.u;

                    if (registro.u < 75) {
                        imgIcone.src = "./assets/imgs/alert.png";
                        spanValor.style.color = "#F32222";
                    } else {
                        imgIcone.src = "./assets/imgs/check.png";
                        spanValor.style.color = "#41A159";
                    }
                }
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    });
}

function emAtivo() {
    const idUsuario = sessionStorage.ID_USUARIO;

    fetch(`/navbar/ativo/${idUsuario}`, { method: "GET" }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                for (let i = 0; i < resposta.length; i++) {
                    var registro = resposta[i];
                    const ativosNavbar = document.getElementById('emAtivos').innerHTML = registro.Ativos
                }
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    });

}

function emAlertas() {
    const idUsuario = sessionStorage.ID_USUARIO;

    fetch(`/navbar/alerta/${idUsuario}`, { method: "GET" }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                for (let i = 0; i < resposta.length; i++) {
                    var registro = resposta[i];
                    const alertasNavbar = document.getElementById('emAlerta').innerHTML = registro.Alertas
                }
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    });
}

function emManutencao() {
    const idUsuario = sessionStorage.ID_USUARIO;

    fetch(`/navbar/manutencao/${idUsuario}`, { method: "GET" }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                for (let i = 0; i < resposta.length; i++) {
                    var registro = resposta[i];
                    const manutencaoNavbar = document.getElementById('emManutencao').innerHTML = registro.Manutencoes
                }
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    });
}