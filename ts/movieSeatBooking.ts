const movieSelect = document.getElementById('movies') as HTMLSelectElement;
const seatsContainer = document.getElementById('seats') as HTMLDivElement;
const seats = document.querySelectorAll(
  '.seats .seat:not(.occupied)'
) as NodeList;
const count = document.getElementById('count') as HTMLSpanElement;
const total = document.getElementById('total') as HTMLSpanElement;

let ticketPrice: number = +movieSelect.value;

greeting();
populateUI();

// Greeting
function greeting() {
  setTimeout(() => {
    (document.querySelector('.greeting') as HTMLDivElement).style.display =
      'none';
  }, 1400);
}

// Populate UI
function populateUI() {
  const selectedSeatsIndex: number[] = JSON.parse(
    localStorage.getItem(`movie${movieSelect.selectedIndex}`) || '[]'
  );

  if (selectedSeatsIndex.length) {
    seats.forEach((seat, index) => {
      if (selectedSeatsIndex.indexOf(index) > -1) {
        (seat as HTMLDivElement).classList.add('selected');
      } else {
        (seat as HTMLDivElement).classList.remove('selected');
      }
    });
  } else {
    seats.forEach((seat) =>
      (seat as HTMLDivElement).classList.remove('selected')
    );
  }

  updateTotalPrice(selectedSeatsIndex.length);
}

// Update count and total price
function updateTotalPrice(selectedSeatsLength: number) {
  count.innerText = selectedSeatsLength.toString();
  total.innerText = formatNumber(selectedSeatsLength * ticketPrice);
}

function setLocalStorage(selectedSeatsIndex: number[]) {
  localStorage.setItem(
    `movie${movieSelect.selectedIndex}`,
    JSON.stringify(selectedSeatsIndex)
  );
}

// Update selected seat
function updateSelectedSeat() {
  const selectedSeats = document.querySelectorAll('.seats .seat.selected');

  const selectedSeatsIndex = [...selectedSeats].map((seat) =>
    [...seats].indexOf(seat)
  );

  setLocalStorage(selectedSeatsIndex);
  updateTotalPrice(selectedSeatsIndex.length);
}

// Event listeners
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +(e.target as HTMLSelectElement).value;

  populateUI();
});

seatsContainer.addEventListener('click', (e) => {
  const seat = e.target as HTMLDivElement;

  if (seat.classList.contains('seat') && !seat.classList.contains('occupied')) {
    seat.classList.toggle('selected');

    updateSelectedSeat();
  }
});

// Util for Number formatting
function formatNumber(num: number) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
