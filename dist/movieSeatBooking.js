"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var movieSelect = document.getElementById('movies');
var seatsContainer = document.getElementById('seats');
var seats = document.querySelectorAll('.seats .seat:not(.occupied)');
var count = document.getElementById('count');
var total = document.getElementById('total');
var ticketPrice = +movieSelect.value;
greeting();
populateUI();
// Greeting
function greeting() {
    setTimeout(function () {
        document.querySelector('.greeting').style.display =
            'none';
    }, 1400);
}
// Populate UI
function populateUI() {
    var selectedSeatsIndex = JSON.parse(localStorage.getItem("movie" + movieSelect.selectedIndex) || '[]');
    if (selectedSeatsIndex.length) {
        seats.forEach(function (seat, index) {
            if (selectedSeatsIndex.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
            else {
                seat.classList.remove('selected');
            }
        });
    }
    else {
        seats.forEach(function (seat) {
            return seat.classList.remove('selected');
        });
    }
    updateTotalPrice(selectedSeatsIndex.length);
}
// Update count and total price
function updateTotalPrice(selectedSeatsLength) {
    count.innerText = selectedSeatsLength.toString();
    total.innerText = formatNumber(selectedSeatsLength * ticketPrice);
}
function setLocalStorage(selectedSeatsIndex) {
    localStorage.setItem("movie" + movieSelect.selectedIndex, JSON.stringify(selectedSeatsIndex));
}
// Update selected seat
function updateSelectedSeat() {
    var selectedSeats = document.querySelectorAll('.seats .seat.selected');
    var selectedSeatsIndex = __spreadArrays(selectedSeats).map(function (seat) {
        return __spreadArrays(seats).indexOf(seat);
    });
    setLocalStorage(selectedSeatsIndex);
    updateTotalPrice(selectedSeatsIndex.length);
}
// Event listeners
movieSelect.addEventListener('change', function (e) {
    ticketPrice = +e.target.value;
    populateUI();
});
seatsContainer.addEventListener('click', function (e) {
    var seat = e.target;
    if (seat.classList.contains('seat') && !seat.classList.contains('occupied')) {
        seat.classList.toggle('selected');
        updateSelectedSeat();
    }
});
// Util for Number formatting
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
