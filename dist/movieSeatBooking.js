"use strict";
var movieSelect = document.getElementById('movies');
var seatsContainer = document.getElementById('seats');
var seats = document.querySelectorAll('.seats .seat');
var count = document.getElementById('count');
var total = document.getElementById('total');
var ticketPrice = +movieSelect.value;
var occupiedSeat = [];
drawSelectedSeatUI();
calculateTotalPrice();
// Calculate total price
function calculateTotalPrice() {
    count.innerText = occupiedSeat.length.toString();
    total.innerText = formatNumber(ticketPrice * occupiedSeat.length);
}
// Draw selected seat
function drawSelectedSeatUI() {
    var selectedSeats = JSON.parse(localStorage.getItem('movieSeat') || '[]');
    occupiedSeat = selectedSeats;
    if (selectedSeats.length) {
        seats.forEach(function (seat, index) {
            if (!seat.classList.contains('occupied') &&
                selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
    else {
        seats.forEach(function (seat) { return seat.classList.remove('selected'); });
    }
}
// Set local storage
function setLocalStorage() {
    localStorage.setItem('movieSeat', JSON.stringify(occupiedSeat));
}
// Update current seat state
function updateSeatsState() {
    seats.forEach(function (seat, index) {
        if (seat.classList.contains('selected') &&
            occupiedSeat.indexOf(index) === -1) {
            occupiedSeat.push(index);
        }
        else if (!seat.classList.contains('selected') &&
            occupiedSeat.indexOf(index) > -1) {
            occupiedSeat = occupiedSeat.filter(function (idx) { return idx !== index; });
        }
    });
    setLocalStorage();
}
// Utils
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
// Event listeners
seatsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSeatsState();
    }
    calculateTotalPrice();
});
movieSelect.addEventListener('change', function (e) {
    ticketPrice = +e.target.value;
    calculateTotalPrice();
});
