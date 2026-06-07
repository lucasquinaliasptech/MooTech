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

                for (let i = 0; i < resposta.length; i++) {
                    console.log("entrou no for ChartTodos");

                    dados_temp.innerHTML += `
                    <div class="container_todos">
                        <span class="titulo_graficos">Galpão <span class="galpaoid">${resposta[i].id_galpao} |</span></span>
                        <span class="titulo_graficos">Temperatura do Tanque <span class="tanqueid">${resposta[i].id_tanque}</span></span>
                        <div class="kpi_valores">
                             <span id="tanquetemp">${resposta[i].t}</span><span class="valor_medida">°C</span>
                        </div>
                    </div>
                    `
                    dados_umi.innerHTML += `
                    <div class="container_todos">
                        <span class="titulo_graficos">Galpão <span id="galpaoid">${resposta[i].id_galpao} |</span></span>
                        <span class="titulo_graficos">Umidade do Tanque <span class="tanqueid">${resposta[i].id_tanque}</span></span>
                        <div class="kpi_valores">
                             <span id="tanqueumi">${resposta[i].u}</span><span class="valor_medida">%</span>
                        </div>
                    </div>
                    `
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

    fetch(`/medidas/tempo-real/${idTanque}/${idGalpao}/${idUsuario}`, { method: "GET" }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGrafico(resposta);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    });

}

function plotarGrafico(resposta) {
    const ctx = document.getElementById("chartTemperatura").getContext("2d");
    const ctx2 = document.getElementById("chartUmidade").getContext("2d");

    let labels = []

    let dados = {
        labels: labels,
        datasets: [{
            data: [],
            fill: false,
            borderColor: 'rgb(53,191,191)',
            tension: 0.1
        }]
    };

    let dados2 = {
        labels: labels,
        datasets: [{
            data: [],
            fill: false,
            borderColor: 'rgb(53,191,191)',
            tension: 0.1
        }]
    };

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (let i = 0; i < resposta.length; i++) {
        var registro = resposta[i];

        labels.push(registro.h);
        dados.datasets[0].data.push(registro.t)
        dados2.datasets[0].data.push(registro.u)

        const chartTemperatura = new Chart(ctx, {
            type: 'line',
            data: dados,
            options: {
                scales: {
                    x: {
                        ticks: {
                            stepSize: 1,
                            font: { size: 17 },
                            color: '#3eb1b1'
                        }
                    },
                    y: {
                        beginAtZero: false,
                        ticks: {
                            stepSize: 1,
                            font: { size: 17 },
                            color: '#32c2c2'
                        }
                    }
                },
                maintainAspectRatio: true
            }
        });

        const chartUmidade = new Chart(ctx2, {
            type: 'line',
            data: dados2,
            options: {
                scales: {
                    x: {
                        ticks: {
                            stepSize: 1,
                            font: { size: 17 },
                            color: '#3eb1b1'
                        }
                    },
                    y: {
                        beginAtZero: false,
                        ticks: {
                            stepSize: 1,
                            font: { size: 17 },
                            color: '#32c2c2'
                        }
                    }
                },
                maintainAspectRatio: true
            }
        });
    }

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
        if (graficos_section && graficos_section2) {
            const chart = Chart.getChart('chartTemperatura');
            const chart2 = Chart.getChart('chartUmidade');

            chart.destroy();
            chart2.destroy();
            console.log("entrou no if do 0/ atualizarChart()");
        }
        criarChartTodos()
        return
    }

    const nomeTanque = document.getElementById('tanqueid').innerHTML = idTanque;

    const chart = Chart.getChart('chartTemperatura');
    const chart2 = Chart.getChart('chartUmidade');

    if (chart !== undefined) {
        chart.destroy();
    }

    if (chart2 !== undefined) {
        chart2.destroy();
    }

    fetch(`/medidas/tempo-real/${idTanque}/${idGalpao}/${idUsuario}`, { method: "GET" }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGrafico(resposta);
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
}, 20000);

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
                    
                    const galpaoTempBaixaNavbar = document.getElementById('idgalpaoTempBaixa').innerHTML = registro.fk_galpao
                    const tanqueTempBaixaNavbar = document.getElementById('idtanqueTempBaixa').innerHTML = registro.tanque
                    const tempBaixaNavbar = document.getElementById('tanquetempmenor').innerHTML = registro.temperatura
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
                    const galpaoTempAltaNavbar = document.getElementById('idgalpaoTempAlta').innerHTML = registro.fk_galpao
                    const tanqueTempAltaNavbar = document.getElementById('idtanqueTempAlta').innerHTML = registro.tanque
                    const tempAltaNavbar = document.getElementById('tanquetempmaior').innerHTML = registro.temperatura
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
                    const galpaoUmiBaixaNavbar = document.getElementById('idgalpaoUmiBaixa').innerHTML = registro.fk_galpao
                    const tanqueUmiBaixaNavbar = document.getElementById('idtanqueUmiBaixa').innerHTML = registro.tanque
                    const umiBaixaNavbar = document.getElementById('tanqueumidademenos').innerHTML = registro.umidade
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
                    const galpaoUmiAltaNavbar = document.getElementById('idgalpaoUmiAlta').innerHTML = registro.fk_galpao
                    const tanqueUmiAltaNavbar = document.getElementById('idtanqueUmiAlta').innerHTML = registro.tanque
                    const umiAltaNavbar = document.getElementById('tanqueumidademaior').innerHTML = registro.umidade
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