

async function getData() {
    const res = await fetch("./data/data.csv")
    const data = await res.text()

    const rows = data.split("\n")

    // ret vars
    // const years = []
    // const yTemps = []
    // const yNHTemps = []
    // const ySHTemps = []
    const rewMean = []
    const loss = []
    
    rows.forEach(row => {
        const values = row.split(",")
        rewMean.push(parseInt(values[0]))
        loss.push(parseFloat(values[1]))
    })

    const x = loss.map((_, ix) => ix+1)

    console.log("test")

    return { x, rewMean, loss }
}

async function createChart() {
    const chartEl = document.getElementById("myChart")
    const { x, rewMean, loss } = await getData()

    const degSym = String.fromCharCode(176)

    const chart = new Chart(chartEl, {
        type: "line",
        data: {
            labels: x,
            datasets: [
                {
                    label: "Mean episode reward per batch in reinforcement learning training of navigation algorithm",
                    data: rewMean,
                    fill: false,
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 1,
                },
                {
                    label: "Loss per batch in reinforcement learning training of navigation algorithm",
                    data: loss,
                    fill: false,
                    backgroundColor: "rgba(123, 0, 255, 0.2)",
                    borderColor: "rgba(123, 0, 255, 1)",
                    borderWidth: 1,
                },
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "year"
                    },
                    ticks: {
                        callback(val, index) {
                            return index % 5 === 0 ? this.getLabelForValue(val) : ""
                        },
                        font: { size: 10 }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "temperature"
                    },
                    ticks: {
                        maxTicksLimit: rewMean.length/10,
                        font: { size: 12 }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: "Average Episode Reward and Loss per Batch in Navigation Algorithm RL Training",
                    font: {
                        size: 24
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    align: "start",
                    position: "bottom"
                }
            }
        }
    })

    chartEl.appendChild(chart)
}

createChart()