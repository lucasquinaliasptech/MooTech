// Gráfico de Temperatura
          const temp = document.getElementById("temperatura");

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
                  borderWidth: 3,
                  borderColor: "white",
                },
              ],
            },
            options: {
              scales: {
                x: {
                  ticks: {
                    color: "white",
                  },
                },
                y: {
                  ticks: {
                    color: "white",
                  },
                  beginAtZero: true,
                  suggestedMax: 6,
                },
              },
              // Plugin para definir limiares
              plugins: {
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
          const umid = document.getElementById("umidade");

          new Chart(umid, {
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
                  label: "Umidade (%)",
                  data: [
                    70.2, 72.5, 75.8, 78.1, 79.4, 77.2, 74.5, 71.3, 68.6, 66.4,
                  ],
                  borderWidth: 3,
                  borderColor: "white",
                },
              ],
            },
            options: {
              scales: {
                x: {
                  ticks: {
                    color: "white",
                  },
                },
                y: {
                  ticks: {
                    color: "white",
                  },
                  suggestedMin: 60,
                  suggestedMax: 100,
                },
              },
              // Plugin para definir limiar
              plugins: {
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