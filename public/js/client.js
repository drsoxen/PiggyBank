function reloadPage() {
    document.location.reload();
}

function claimReward(id) {
    let data = {}
    data.id = id
    data.multiplier = document.getElementById('formRewardMultiplier' + id).value;

    // Creates a promise object for sending the desired data
    fetch("http://192.168.1.66:3000/claimReward", {
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

function completeQuest(id) {
    let data = {}
    data.id = id

    // Creates a promise object for sending the desired data
    fetch("http://192.168.1.66:3000/completeQuest", {
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

function sendReward() {
    let data = {}
    data.name = document.getElementById("formRewardName").value
    data.description = document.getElementById("formRewardDescription").value
    data.amount = document.getElementById("formRewardAmount").value

    // Creates a promise object for sending the desired data
    fetch("http://192.168.1.66:3000/createReward", {
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

function sendQuest() {
    let data = {}
    data.name = document.getElementById("formQuestName").value
    data.description = document.getElementById("formQuestDescription").value
    data.amount = document.getElementById("formQuestAmount").value
    data.from = document.getElementById("formQuestFrom").value
    data.to = document.getElementById("formQuestTo").value

    // Creates a promise object for sending the desired data
    fetch("http://192.168.1.66:3000/createQuest", {
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

function sendTip() {
    let data = {}
    data.amount = document.getElementById("formTipAmount").value
    data.description = document.getElementById("formTipDescription").value
    data.from = document.getElementById("formTipFrom").value
    data.to = document.getElementById("formTipTo").value

    // Creates a promise object for sending the desired data
    fetch("http://192.168.1.66:3000/createTip", {
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

function sendPayment() {
    let data = {}
    data.amount = document.getElementById("formSpendAmount").value
    data.vendor = document.getElementById("formVendorAmount").value
    data.description = document.getElementById("formSpendDescription").value

    // Creates a promise object for sending the desired data
    fetch("http://192.168.1.66:3000/payment", {
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

function sendModification(action) {

    let amount = action ? parseInt(document.getElementById("formManagementAmount").value) : parseInt(document.getElementById("formManagementAmount").value) * -1

    let data = {}
    data.account = document.getElementById("formManagementFrom").value
    data.description = document.getElementById("formManagementDescription").value
    data.amount = amount

    // Creates a promise object for sending the desired data
    fetch("http://192.168.1.66:3000/modification", {
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

function sendToggleStar(id) {
    let data = {}
    data.id = id

    // Creates a promise object for sending the desired data
    fetch("http://192.168.1.66:3000/toggleStar", {
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