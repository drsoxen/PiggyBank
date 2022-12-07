const express = require('express');
const exphbs = require('express-handlebars');
const fs = require('fs');
Handlebars = require('handlebars');
const bodyparser = require('body-parser')
const jsonparser = bodyparser.json()
const path = require('path')
const favicon = require('serve-favicon');

const app = express();

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
        restrictSize(comment) {
            if (comment.length <= 19) {
                return comment;
            }

            return comment.substring(0, 19) + '...';
        }
    }
}));

app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

let usersPath = './public/json/users.json';
let questsPath = './public/json/quests.json';
let rewardsPath = './public/json/rewards.json';
let historyPath = './public/json/history.json';

let allUsers;
let allQuests;
let allRewards;
let allHistory;

app.get('/', function (req, res) {
    currentUser = req.query.user.charAt(0).toUpperCase() + req.query.user.slice(1)

    allHistory = JSON.parse(fs.readFileSync(historyPath).toString());

    allUsers = JSON.parse(fs.readFileSync(usersPath).toString());
    let user = allUsers.filter(x => x.username === currentUser)[0];

    allQuests = JSON.parse(fs.readFileSync(questsPath).toString());
    let quests = []
    user.quests.forEach(function (value, i) {
        quests.push(allQuests.filter(x => x.id === value)[0])
    });

    allRewards = JSON.parse(fs.readFileSync(rewardsPath).toString());
    let rewards = []
    allRewards.forEach(function (value, i) {
        let copyObj = Object.assign({}, value);
        if (user.starRewards.includes(copyObj.id)) {

            copyObj.starred = true
            rewards.unshift(copyObj)

        }
        else {
            copyObj.starred = false
            rewards.push(copyObj)
        }
    });

    res.render('home', {
        user: user,
        users: allUsers,
        quests: quests,
        rewards: rewards,
        history: allHistory
    });
});

app.post('/completeQuest', jsonparser, (req, res) => {
    id = req.body.id

    let quest = allQuests.find(x => x.id == id)

    modifyMoney(quest.rewardTo, quest.reward)
    modifyMoney(quest.rewardFrom, quest.reward * -1)

    let user = allUsers.find(x => x.username == req.body.username)
    if (user) {
        let index = user.quests.findIndex(x => x == id)
        user.quests.splice(index, 1)
    }

    fs.writeFileSync(usersPath, JSON.stringify(allUsers));

    let index = allQuests.findIndex(x => x.id == id)
    allQuests.splice(index, 1)

    fs.writeFileSync(questsPath, JSON.stringify(allQuests));

    addHistory(quest.reward, quest.rewardFrom, quest.rewardTo, "Quest", quest.name)

    res.end()
});

app.post('/claimReward', jsonparser, (req, res) => {
    id = req.body.id

    let reward = allRewards.find(x => x.id == id)

    let multipliedAmount = reward.reward * req.body.multiplier

    modifyMoney(req.body.username, multipliedAmount)
    modifyMoney("Bank", multipliedAmount * -1)

    addHistory(multipliedAmount, "Bank", req.body.username, "Reward", reward.name)

    res.end()
});

app.post('/createReward', jsonparser, (req, res) => {

    let data = {}
    data.id = Math.round((new Date()).getTime() / 1000);
    data.name = req.body.name;
    data.description = req.body.description;
    data.reward = Number(req.body.amount);

    allRewards.push(data)

    fs.writeFileSync(rewardsPath, JSON.stringify(allRewards));

    res.end()
});

app.post('/createQuest', jsonparser, (req, res) => {

    let data = {}
    data.id = Math.round((new Date()).getTime() / 1000);
    data.name = req.body.name;
    data.description = req.body.description;
    data.reward = Number(req.body.amount);
    data.rewardFrom = req.body.from;
    data.rewardTo = req.body.to;

    allQuests.push(data)

    fs.writeFileSync(questsPath, JSON.stringify(allQuests));

    let user = allUsers.find(x => x.username == data.rewardTo)
    if (user) {
        user.quests.push(data.id)
    }

    fs.writeFileSync(usersPath, JSON.stringify(allUsers));

    res.end()
});

app.post('/createTip', jsonparser, (req, res) => {

    modifyMoney(req.body.to, Number(req.body.amount))
    modifyMoney(req.body.from, Number(req.body.amount) * -1)

    addHistory(req.body.amount, req.body.from, req.body.to, "Tip", req.body.description)

    res.end()
});

app.post('/payment', jsonparser, (req, res) => {

    modifyMoney(req.body.username, Number(req.body.amount) * -1)

    if (req.body.amount > 0) {
        addHistory(req.body.amount, req.body.username, req.body.vendor, "Payment", req.body.description)
    }

    res.end()
});

app.post('/modification', jsonparser, (req, res) => {
    modifyMoney(req.body.account, req.body.amount)
    addHistory(req.body.amount, "Management", req.body.account, "Management", req.body.description)

    res.end()
});

app.post('/toggleStar', jsonparser, (req, res) => {

    let user = allUsers.find(x => x.username == req.body.username)

    if (user.starRewards.includes(req.body.id)) {
        let removeStar = user.starRewards.findIndex(x => x === req.body.id)
        user.starRewards.splice(removeStar, 1)
    }
    else {
        user.starRewards.push(req.body.id)
    }

    fs.writeFileSync(usersPath, JSON.stringify(allUsers));

    res.end()
});

app.post('/generateReport', jsonparser, (req, res) => {

    let data = {}
    data.test = "testing"

    //console.log("A new date range was chosen: " + req.body.startDate + ' to ' + req.body.endDate)

    res.send(data)
});


let modifyMoney = (username, value) => {
    if (value) {
        let user = allUsers.find(x => x.username == username)
        if (user) {
            user.amount += value;
        }

        fs.writeFileSync(usersPath, JSON.stringify(allUsers));
    }
}

let addHistory = (amount, from, to, type, reason) => {

    let date = new Date()
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ampm;
    let datetime = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;

    let data = {}
    data.timestamp = datetime;
    data.amount = amount;
    data.from = from;
    data.to = to;
    data.type = type;
    data.reason = reason

    allHistory.unshift(data)

    fs.writeFileSync(historyPath, JSON.stringify(allHistory));

}

app.listen(process.env.PORT || 3000, () => {
    console.log('The web server has started on port ' + (process.env.PORT || 3000));
});