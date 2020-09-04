"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var mainRichList = document.getElementById('main');
var addRichBtn = document.getElementById('add');
var sortRichBtn = document.getElementById('sort');
var doubleRichBtn = document.getElementById('double');
var millionaireRichBtn = document.getElementById('millionaires');
var calculateWealthBtn = document.getElementById('calculate-wealth');
var clearRichBtn = document.getElementById('clear');
var richPeople = [];
var isAscending = true;
function getUserData() {
    var endpoint = 'https://randomuser.me/api';
    fetch(endpoint)
        .then(function (res) { return res.json(); })
        .then(function (data) {
        console.log(data);
        var results = data.results[0];
        var newRich = {
            thumbnail: results.picture.thumbnail,
            name: results.name.first + " " + results.name.last,
            money: Math.floor(Math.random() * 3000000000),
        };
        addRich(newRich);
    })
        .catch(function (error) {
        throw new Error(error);
    });
}
function addRich(newRich) {
    richPeople.push(newRich);
    updateRichUI();
}
function updateRichUI() {
    mainRichList.innerHTML = '';
    mainRichList.innerHTML = "<h2><strong>\uC774\uB984</strong>\u20A9";
    richPeople.forEach(function (rich, index) {
        var divEl = document.createElement('div');
        divEl.classList.add('person');
        divEl.innerHTML = "\n      <img src=" + rich.thumbnail + " alt=rich" + index + "</img>\n      <strong>" + rich.name + "</strong>" + formatMoney(rich.money) + "\n    ";
        mainRichList.appendChild(divEl);
    });
}
function sortRichPeople() {
    if (isAscending) {
        isAscending = false;
        sortRichBtn.innerHTML = "\uB0B4\uB9BC\uCC28\uC21C \uC815\uB82C\uD558\uAE30<i class=\"sort-icon\">\u2B07</i>";
        richPeople.sort(function (a, b) { return a.money - b.money; });
    }
    else {
        isAscending = true;
        sortRichBtn.innerHTML = "\uC624\uB984\uCC28\uC21C \uC815\uB82C\uD558\uAE30<i class=\"sort-icon\">\u2B06</i>";
        richPeople.sort(function (a, b) { return b.money - a.money; });
    }
    updateRichUI();
}
function doubleMoney() {
    var doubledMoney = richPeople.map(function (rich) { return (__assign(__assign({}, rich), { money: rich.money * 2 })); });
    richPeople = doubledMoney;
    updateRichUI();
}
function showMillionaires() {
    richPeople = richPeople.filter(function (rich) { return rich.money >= 1200000000; });
    updateRichUI();
}
function calculateWealth() {
    var totalWealth = richPeople.reduce(function (acc, rich) { return (acc += rich.money); }, 0);
    var divEl = document.createElement('div');
    divEl.classList.add('total');
    divEl.innerHTML = "<strong>\uD569\uACC4 \uD83D\uDCB0:</strong>" + formatMoney(totalWealth);
    mainRichList.appendChild(divEl);
}
function clearRichPeople() {
    richPeople = [];
    updateRichUI();
}
addRichBtn.addEventListener('click', getUserData);
sortRichBtn.addEventListener('click', sortRichPeople);
doubleRichBtn.addEventListener('click', doubleMoney);
millionaireRichBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
clearRichBtn.addEventListener('click', clearRichPeople);
function formatMoney(number) {
    return '₩' + String(Math.floor(number)).replace(/(.)(?=(\d{3})+$)/g, '$1,');
}
getUserData();
getUserData();
getUserData();
