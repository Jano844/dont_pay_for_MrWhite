let playerNumber;
const playerNames = [];
const playerIconWidth = 0;
const playerIconHeight = 0;


function handleNumberSubmit(event) {
  event.preventDefault();

  // Zahl aus dem Input holen
  playerNumber = event.target.querySelector('input[name="playerNumber"]').value;
  console.log('Eingegebene Zahl:', playerNumber);

  // Alte Seite ausblenden
  document.querySelector('.enter_player_number').style.display = 'none';

  // Neue Seite einblenden
  document.querySelector('.enter_names').style.display = 'block';

  // Bilder im Container anzeigen
  createPlayerIcons(playerNumber);
}

function createPlayerIcons(number) {
  const container = document.getElementById('imagesContainer');
  container.innerHTML = '';
  playerNames.length = 0; // Array leeren

  const count = parseInt(number, 10);
  const imageUrl = 'css/assets/player_icon.png';

  for (let i = 0; i < count; i++) {
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'Player Icon';
    img.dataset.index = i;
    img.style.cursor = 'pointer';

    container.appendChild(img);
  }
  requestAnimationFrame(() => {
    enableNameInput(); // Dann Klicks aktivieren
  });
}

function enableNameInput() {
  const container = document.getElementById('imagesContainer');
  const images = container.querySelectorAll('img');

  images.forEach((img, i) => {
    img.addEventListener('click', function handler() {
      const name = prompt(`Name für Spieler ${i + 1} eingeben:`) || '';
      const trimmedName = name.trim();
      if (trimmedName.length === 0) return;

      playerNames[i] = trimmedName;

      // Größe des Bildes auslesen
      const rect = img.getBoundingClientRect();

      // Neues Element mit dem Namen erstellen
      const nameElement = document.createElement('div');
      nameElement.textContent = trimmedName;
      nameElement.style.width = rect.width + 'px';
      nameElement.style.height = rect.height + 'px';
      nameElement.style.display = 'flex';
      nameElement.style.alignItems = 'center';
      nameElement.style.justifyContent = 'center';
      nameElement.style.borderRadius = '8px';
      nameElement.style.backgroundColor = '#ddd';
      nameElement.style.fontWeight = 'bold';
      nameElement.style.userSelect = 'none';

      // Bild durch Namen ersetzen
      img.replaceWith(nameElement);

      // Klick entfernen
      img.removeEventListener('click', handler);
    });
  });
}




// Event Listener setzen
document.getElementById('numberForm').addEventListener('submit', handleNumberSubmit);