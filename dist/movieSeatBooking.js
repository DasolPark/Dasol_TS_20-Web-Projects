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
populateUI();
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
    updateSelectedSeat();
}
// Update selected seat & Set LocalStorage & Count ticket & Calculate total price
function updateSelectedSeat() {
    var selectedSeats = document.querySelectorAll('.seats .seat.selected');
    var selectedSeatsIndex = __spreadArrays(selectedSeats).map(function (seat) {
        return __spreadArrays(seats).indexOf(seat);
    });
    localStorage.setItem("movie" + movieSelect.selectedIndex, JSON.stringify(selectedSeatsIndex));
    var selectedSeatsLength = selectedSeatsIndex.length;
    count.innerText = selectedSeatsLength.toString();
    total.innerText = formatNumber(selectedSeatsLength * ticketPrice);
}
// Event listeners
movieSelect.addEventListener('change', function (e) {
    ticketPrice = +e.target.value;
    populateUI();
    updateSelectedSeat();
});
seatsContainer.addEventListener('click', function (e) {
    var targetDiv = e.target;
    if (targetDiv.classList.contains('seat') &&
        !targetDiv.classList.contains('occupied')) {
        targetDiv.classList.toggle('selected');
        updateSelectedSeat();
    }
});
// Util
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
