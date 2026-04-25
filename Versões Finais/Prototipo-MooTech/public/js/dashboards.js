// Gráfico de Temperatura
const temp = document.getElementById("chartTemperatura");

new Chart(temp, {
  type: "line",
  data: {
    labels: [
      "13:45",
      "13:50",
      "13:55",
      "14:00",
      "14:05",
      "14:10",
      "14:15",
      "14:20",
      "14:25",
      "14:30",
    ],
    datasets: [
      {
        label: "Temperatura (°C)",
        data: [2.6, 3.1, 3.4, 3.0, 3.7, 4.2, 4.0, 3.6, 3.3, 2.4],
        borderWidth: 2.5,
        borderColor: "#e95c7d",
        tension: 0.45,
        pointRadius: 3,
        pointBackgroundColor: "#e95c7d",
        pointBorderColor: "#0d1117",
        pointBorderWidth: 2,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { color: "rgba(255,255,255,0.10)" },
        ticks: {
          color: "#3d3d39",
        },
      },
      y: {
        grid: { color: "rgba(255,255,255,0.10)" },
        ticks: {
          color: "#3d3d39",
        },
        beginAtZero: true,
        suggestedMax: 6,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      annotation: {
        annotations: {
          linhaMax: {
            type: "line",
            yMin: 4,
            yMax: 4,
            borderColor: "red",
            borderWidth: 2,
            label: {
              display: true,
              content: "Limite Máximo (4°C)",
              position: "end",
            },
          },
          linhaMin: {
            type: "line",
            yMin: 0,
            yMax: 0,
            borderColor: "red",
            borderWidth: 2,
            label: {
              display: true,
              content: "Limite Mínimo (0°C)",
              position: "end",
            },
          },
        },
      },
    },
  },
});

// Gráfico de Umidade
const umid = document.getElementById("chartUmidade");

new Chart(umid, {
  type: "line",
  data: {
    labels: ["14:10", "14:15", "14:20", "14:25", "14:30"],
    datasets: [
      {
        label: "Umidade (%)",
        data: [70.2, 72.5, 75.8, 78.1, 79.4],
        borderWidth: 2.5,
        borderColor: "#58ddd2",
        tension: 0.5,
        pointRadius: 3,
        pointBackgroundColor: "#58ddd2",
        pointBorderColor: "#0d1117",
        pointBorderWidth: 2,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { color: "rgba(255,255,255,0.10)" },
        ticks: {
          color: "#3d3d39",
        },
      },
      y: {
        grid: { color: "rgba(255,255,255,0.10)" },
        ticks: {
          color: "#3d3d39",
        },

        suggestedMin: 60,
        suggestedMax: 100,
      },
    },
    // Plugin para definir limiar
    plugins: {
      legend: {
        display: false,
      },
      annotation: {
        annotations: {
          linhaMax: {
            type: "line",
            yMin: 100,
            yMax: 100,
            borderColor: "red",
            borderWidth: 2,
            label: {
              display: true,
              content: "Limite Máximo (100%)",
              position: "end",
            },
          },
          linhaMin: {
            type: "line",
            yMin: 75,
            yMax: 75,
            borderColor: "red",
            borderWidth: 2,
            label: {
              display: true,
              content: "Limite Mínimo (75%)",
              position: "end",
            },
          },
        },
      },
    },
  },
});

// Gráfico de Temperatura por Tanque
const tempGalpao = document.getElementById("chartTempGalpao");

new Chart(tempGalpao, {
  type: "bar",
  data: {
    labels: ["Tanque 1", "Tanque 2", "Tanque 3", "Tanque 4", "Tanque 5"],
    datasets: [
      {
        label: "Temp. °C",
        data: [2.5, 4.0, 3.7, 1.7, 2.2],
        backgroundColor: "#e62f59",
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#3d3d39",
        },
      },
      y: {
        grid: { color: "rgba(255,255,255,0.10)" },
        ticks: {
          color: "#3d3d39",
        },
        suggestedMin: 0,
        suggestedMax: 6,
      },
    },
  },
});

// Gráfico de Umidade por Tanque
const umidGalpao = document.getElementById("chartUmidGalpao");

new Chart(umidGalpao, {
  type: "bar",
  data: {
    labels: ["Tanque 1", "Tanque 2", "Tanque 3", "Tanque 4", "Tanque 5"],
    datasets: [
      {
        label: "Umid. %",
        data: [75.0, 89.5, 90.7, 79.3, 70.2],
        backgroundColor: "#58ddd2",
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#3d3d39",
        },
      },
      y: {
        grid: { color: "rgba(255,255,255,0.10)" },
        ticks: {
          color: "#3d3d39",
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  },
});