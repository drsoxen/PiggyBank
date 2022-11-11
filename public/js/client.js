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