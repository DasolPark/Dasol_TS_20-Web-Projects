const movieSelect = document.getElementById('movies') as HTMLSelectElement;
const seatsContainer = document.getElementById('seats') as HTMLDivElement;
const seats = document.querySelectorAll('.seats .seat') as NodeListOf<
  HTMLDivElement
>;
const count = document.getElementById('count') as HTMLSpanElement;
const total = document.getElementById('total') as HTMLSpanElement;

let ticketPrice: number = +movieSelect.value;
let occupiedSeat: number[] = [];

drawSelectedSeatUI();
calculateTotalPrice();

// Calculate total price
function calculateTotalPrice() {
  count.innerText = occupiedSeat.length.toString();
  total.innerText = formatNumber(ticketPrice * occupiedSeat.length);
}

// Draw selected seat
function drawSelectedSeatUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('movieSeat') || '[]');
  occupiedSeat = selectedSeats;

  if (selectedSeats.length) {
    seats.forEach((seat, index) => {
      if (
        !seat.classList.contains('occupied') &&
        selectedSeats.indexOf(index) > -1
      ) {
        seat.classList.add('selected');
      }
    });
  } else {
    seats.forEach((seat) => seat.classList.remove('selected'));
  }
}

// Set local storage
function setLocalStorage() {
  localStorage.setItem('movieSeat', JSON.stringify(occupiedSeat));
}

// Update current seat state
function updateSeatsState() {
  seats.forEach((seat, index) => {
    if (
      seat.classList.contains('selected') &&
      occupiedSeat.indexOf(index) === -1
    ) {
      occupiedSeat.push(index);
    } else if (
      !seat.classList.contains('selected') &&
      occupiedSeat.indexOf(index) > -1
    ) {
      occupiedSeat = occupiedSeat.filter((idx) => idx !== index);
    }
  });

  setLocalStorage();
}

// Utils
function formatNumber(num: number) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

// Event listeners
seatsContainer.addEventListener('click', (e) => {
  if (
    (e.target as HTMLDivElement).classList.contains('seat') &&
    !(e.target as HTMLDivElement).classList.contains('occupied')
  ) {
    (e.target as HTMLDivElement).classList.toggle('selected');
    updateSeatsState();
  }
  calculateTotalPrice();
});

movieSelect.addEventListener('change', (e) => {
  ticketPrice = +(e.target as HTMLOptionElement).value;
  calculateTotalPrice();
});
