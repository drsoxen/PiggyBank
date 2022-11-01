function reloadPage() {
    document.location.reload();
}

// Fetches message from server via GET
function getMsg() {
    // Creates a promise object for retrieving the desired data
    fetch("http://192.168.1.66:3000/api")
        // When recieved, exposes the JSON component
        .then((response) => {
            return response.json();
        })
        // Displays the message on the page
        .then((json) => {
            new_msg = "Server message: " + json.msg
            document.getElementById("msg").innerHTML = new_msg;
        });
}
// Sends message to server via POST
function postMsg(endpoint, data) {
    data = { data: data }

    // Creates a promise object for sending the desired data
    fetch("http://192.168.1.66:3000/" + endpoint, {
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