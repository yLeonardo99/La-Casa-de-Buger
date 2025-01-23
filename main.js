// ========================== Menu Responsivo ==========================
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});
// ========================= Fim do Menu Responsivo =========================

// ========================= Scroll Reveal =========================
const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header__content h2", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 1000,
});

ScrollReveal().reveal(".order__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".event__content", {
  duration: 1000,
});
// ========================= Fim do Scroll Reveal =========================

// ========================= Geração de Mesas e Assentos =========================
const tables = 6; // Número de mesas
const seatsPerTable = 6; // Lugares por mesa
const seatMap = document.getElementById('seat-map');
const selectedSeatsInput = document.getElementById('selected-seats');
let selectedSeats = [];

// Gerar mesas e cadeiras
for (let i = 1; i <= tables; i++) {
  const table = document.createElement('div');
  table.className = 'table';
  const tableLabel = document.createElement('div');
  tableLabel.className = 'table-label';
  tableLabel.innerText = `Mesa ${i}`;
  table.appendChild(tableLabel);

  // Criar a parte superior da mesa (3 lugares)
  const topRow = document.createElement('div');
  topRow.className = 'seat-row';
  for (let j = 1; j <= 3; j++) {
    const seat = document.createElement('div');
    seat.className = 'seat';
    seat.dataset.seatId = `Mesa ${i} - Lugar ${j}`;
    seat.addEventListener('click', () => toggleSeatSelection(seat));
    topRow.appendChild(seat);
  }
  table.appendChild(topRow);

  // Linha divisória
  const divider = document.createElement('div');
  divider.className = 'divider';
  table.appendChild(divider);

  // Criar a parte inferior da mesa (3 lugares)
  const bottomRow = document.createElement('div');
  bottomRow.className = 'seat-row';
  for (let j = 4; j <= 6; j++) {
    const seat = document.createElement('div');
    seat.className = 'seat';
    seat.dataset.seatId = `Mesa ${i} - Lugar ${j}`;
    seat.addEventListener('click', () => toggleSeatSelection(seat));
    bottomRow.appendChild(seat);
  }
  table.appendChild(bottomRow);

  seatMap.appendChild(table);
}

// Alternar seleção de assentos
function toggleSeatSelection(seat) {
  if (seat.classList.contains('occupied')) return; // Bloquear assentos já ocupados
  const seatId = seat.dataset.seatId;
  if (seat.classList.contains('selected')) {
    seat.classList.remove('selected');
    selectedSeats = selectedSeats.filter(id => id !== seatId);
  } else {
    if (selectedSeats.length >= seatsPerTable) {
      alert('Você só pode selecionar até 6 lugares.');
      return;
    }
    seat.classList.add('selected');
    selectedSeats.push(seatId);
  }
  selectedSeatsInput.value = selectedSeats.join(', ');
}

// Finalizar reserva
function finalizeReservation() {
  if (selectedSeats.length === 0) {
    alert('Por favor, selecione pelo menos um lugar.');
    return;
  }
  selectedSeats.forEach(seatId => {
    const seat = document.querySelector(`[data-seat-id="${seatId}"]`);
    seat.classList.remove('selected');
    seat.classList.add('occupied');
  });
  alert('Reserva concluída com sucesso!');
  selectedSeats = [];
  selectedSeatsInput.value = '';
}
// ========================= Fim da Geração de Mesas e Assentos =========================

// ========================= Formato do input (Telefone) =========================

document.getElementById("telefone").addEventListener("input", function(event) {
  let input = event.target;
  let value = input.value.replace(/\D/g, ''); // Remove qualquer caractere não numérico

  // Aplica o formato no campo de telefone

  if (value.length <= 2) {
    input.value = `(${value}`;
  } else if (value.length <= 7) {
    input.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
  } else {
    input.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
  }
});
// ========================= Fim do Formato do input (Telefone) =========================

// ========================= Responsivo =========================
document.getElementById('menu-btn').addEventListener('click', function() {
  document.getElementById('nav-links').classList.toggle('active');
});
// ========================= Fim do Responsivo =========================
