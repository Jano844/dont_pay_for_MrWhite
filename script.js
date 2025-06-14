let playerNumber;

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
  showPlayerImages(playerNumber);
}

function showPlayerImages(number) {
  const container = document.getElementById('imagesContainer');
  container.innerHTML = '';

  const count = parseInt(number, 10);
  const imageUrl = 'css/assets/player_icon.png';

  for (let i = 0; i < count; i++) {
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'Player Icon';
    
    container.appendChild(img);
  }
}

// Event Listener setzen
document.getElementById('numberForm').addEventListener('submit', handleNumberSubmit);