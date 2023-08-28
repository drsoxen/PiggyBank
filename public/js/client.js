//let host = "https://piggy-bank-drsoxen.herokuapp.com"
let host = "http://raspberrypi.local:3000"
let username;

window.addEventListener('load', (event) => {
    username = document.getElementById("clientjs").getAttribute("username");

    console.log('page is fully loaded with user: ' + username);
});

let reloadPage = () => {
    document.location.reload();
}

let claimReward = (id) => {
    let data = {}
    data.username = username
    data.id = id
    data.multiplier = document.getElementById('formRewardMultiplier' + id).value;

    // Creates a promise object for sending the desired data
    fetch(host + "/claimReward", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(() => {
            reloadPage();
        })
        .catch((error) => {
            console.error('Error:', error);
        });

}

let completeQuest = (id) => {
    let data = {}
    data.username = username
    data.id = id

    // Creates a promise object for sending the desired data
    fetch(host + "/completeQuest", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(() => {
            reloadPage();
        })
        .catch((error) => {
            console.error('Error:', error);
        });

}

let sendReward = () => {
    let data = {}
    data.username = username
    data.name = document.getElementById("formRewardName").value
    data.description = document.getElementById("formRewardDescription").value
    data.amount = document.getElementById("formRewardAmount").value

    // Creates a promise object for sending the desired data
    fetch(host + "/createReward", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(() => {
            reloadPage();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

let sendQuest = () => {
    let data = {}
    data.username = username
    data.name = document.getElementById("formQuestName").value
    data.description = document.getElementById("formQuestDescription").value
    data.amount = document.getElementById("formQuestAmount").value
    data.from = document.getElementById("formQuestFrom").value
    data.to = document.getElementById("formQuestTo").value

    // Creates a promise object for sending the desired data
    fetch(host + "/createQuest", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(() => {
            reloadPage();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

let sendTip = () => {
    let data = {}
    data.username = username
    data.amount = document.getElementById("formTipAmount").value
    data.description = document.getElementById("formTipDescription").value
    data.from = document.getElementById("formTipFrom").value
    data.to = document.getElementById("formTipTo").value

    // Creates a promise object for sending the desired data
    fetch(host + "/createTip", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(() => {
            reloadPage();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

let sendPayment = () => {
    let data = {}
    data.username = username
    data.amount = document.getElementById("formSpendAmount").value
    data.vendor = document.getElementById("formVendorAmount").value
    data.description = document.getElementById("formSpendDescription").value

    // Creates a promise object for sending the desired data
    fetch(host + "/payment", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(() => {
            reloadPage();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

let sendModification = (action) => {

    let amount = action ? parseInt(document.getElementById("formManagementAmount").value) : parseInt(document.getElementById("formManagementAmount").value) * -1

    let data = {}
    data.username = username
    data.account = document.getElementById("formManagementFrom").value
    data.description = document.getElementById("formManagementDescription").value
    data.amount = amount

    // Creates a promise object for sending the desired data
    fetch(host + "/modification", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(() => {
            reloadPage();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

let sendToggleStar = (id) => {
    let data = {}
    data.username = username
    data.id = id

    // Creates a promise object for sending the desired data
    fetch(host + "/toggleStar", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(() => {
            reloadPage();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Define the chart variable outside the callback function
let userChart = null;

$('input[name="daterange"]').daterangepicker(
    {
        autoApply: true,
        "opens": "center",
        locale: {
            firstDay: 0
        }
    },
    function (start, end) {
        // Clear userAmounts to start fresh
        const userAmounts = {};

        let data = {}
        data.startDate = start.format('YYYY-MM-DD')
        data.endDate = end.format('YYYY-MM-DD')

        fetch(host + "/generateReport", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                // Process the data to calculate total amounts for each user
                data.forEach(item => {
                    const user = item.to;
                    const amount = parseFloat(item.amount);

                    // Exclude transactions involving "Bank" and "Management"
                    if (!isNaN(amount)) {
                        if (!userAmounts[user]) {
                            userAmounts[user] = 0;
                        }
                        userAmounts[user] += amount;
                    }
                });

                // Extract user names and corresponding amounts for the chart
                const xValues = Object.keys(userAmounts);
                const yValues = Object.values(userAmounts);

                // Update the existing chart with new data
                if (userChart) {
                    userChart.data.labels = xValues;
                    userChart.data.datasets[0].data = yValues;
                    userChart.update();
                } else {
                    // Create the initial chart
                    userChart = new Chart("myChart", {
                        type: "bar",
                        data: {
                            labels: xValues,
                            datasets: [{
                                backgroundColor: "green", // You can set colors here
                                data: yValues
                            }]
                        },
                        options: {
                            legend: { display: false },
                            scales: {
                                x: {
                                    title: {
                                        display: true,
                                        text: "Users"
                                    }
                                },
                                y: {
                                    title: {
                                        display: true,
                                        text: "Amount"
                                    }
                                }
                            },
                            title: {
                                display: true,
                                text: "User Transaction Amounts"
                            }
                        }
                    });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
);





