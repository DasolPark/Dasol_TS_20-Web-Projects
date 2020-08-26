const movieSelect = document.getElementById('movies') as HTMLSelectElement;
const seatsContainer = document.getElementById('seats') as HTMLDivElement;
const seats = document.querySelectorAll(
  '.seats .seat:not(.occupied)'
) as NodeList;
const count = document.getElementById('count') as HTMLSpanElement;
const total = document.getElementById('total') as HTMLSpanElement;

let ticketPrice = +movieSelect.value;

populateUI();

// Populate UI
function populateUI() {
  const selectedSeatsIndex: Array<number> = JSON.parse(
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

  updateSelectedSeat();
}

// Update selected seat & Set LocalStorage & Count ticket & Calculate total price
function updateSelectedSeat() {
  const selectedSeats = document.querySelectorAll(
    '.seats .seat.selected'
  ) as NodeList;

  const selectedSeatsIndex = [...selectedSeats].map((seat) =>
    [...seats].indexOf(seat)
  );

  localStorage.setItem(
    `movie${movieSelect.selectedIndex}`,
    JSON.stringify(selectedSeatsIndex)
  );

  const selectedSeatsLength = selectedSeatsIndex.length;

  count.innerText = selectedSeatsLength.toString();
  total.innerText = formatNumber(selectedSeatsLength * ticketPrice);
}

// Event listeners
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +(e.target as HTMLOptionElement).value;

  populateUI();
  updateSelectedSeat();
});

seatsContainer.addEventListener('click', (e) => {
  const targetDiv = e.target as HTMLDivElement;
  if (
    targetDiv.classList.contains('seat') &&
    !targetDiv.classList.contains('occupied')
  ) {
    targetDiv.classList.toggle('selected');

    updateSelectedSeat();
  }
});

// Util
function formatNumber(num: number) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
