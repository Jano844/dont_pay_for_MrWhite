let playerNumber;
const playerNames = [];
let playersCount = 0;
let underCoverNum = 0
let mrWhiteNum = 0


const liste = [
  ["test", "lol"],
  ["hallo", "HelloWorld"],
  ["abc", "def"]
];



function handleNumberSubmit(event) {
  event.preventDefault();

  // Zahl aus dem Input holen
  playerNumber = event.target.querySelector('input[name="playerNumber"]').value;
  console.log('Eingegebene Zahl:', playerNumber);
  if (isNaN(playerNumber) || playerNumber.trim() === '') {
    console.log("Bitte eine gültige Zahl eingeben.");
    return;
  }
  if (playerNumber > 15 || playerNumber <= 1) {
    console.log("Dont be Stupid")
    return ;
  }


  document.querySelector('.enter_player_number').style.display = 'none';
  document.querySelector('.game_play_options').style.display = 'block';

  createLogic();
}

function createPlayerIcons(number) {
  const container = document.getElementById('imagesContainer');
  container.innerHTML = '';
  playerNames.length = 0;

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
      if (trimmedName.length === 0)
        return;

      playerNames[i] = trimmedName;


      // Give Player His Word
      alert("Hallo, das ist ein Popup!");




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
      playersCount = playersCount + 1
      console.log(playersCount, playerNumber)
      if (playersCount == playerNumber) {
          document.querySelector('.enter_names').style.display = 'none';

          // Neue Seite einblenden
          document.querySelector('.ongoing_game').style.display = 'block';
      }
    });
  });
}

function setupButtonListeners() {
  document.getElementById('Undercover_minus').addEventListener('click', () => {
    if (underCoverNum > 0) {
      underCoverNum--;
      displayOtions();
    }
  });

  document.getElementById('Undercover_plus').addEventListener('click', () => {
    if (underCoverNum + mrWhiteNum < playerNumber - 1) {
      underCoverNum++;
      displayOtions();
    }
  });

  document.getElementById('MrWhite_minus').addEventListener('click', () => {
    if (mrWhiteNum > 0) {
      mrWhiteNum--;
      displayOtions();
    }
  });

  document.getElementById('MrWhite_plus').addEventListener('click', () => {
    if (mrWhiteNum + underCoverNum < playerNumber - 1) {
      mrWhiteNum++;
      displayOtions();
    }
  });
}


function displayOtions() {
    document.getElementById("playerNum").textContent = "Players: " + playerNumber 
    document.getElementById("civilianNum").textContent = "Civilians: " + (playerNumber - underCoverNum - mrWhiteNum)
    document.getElementById("Undercover").textContent = "Undercover: " + underCoverNum
    document.getElementById("MrWhite").textContent = "Mr. White: " + mrWhiteNum
}

function createLogic() {
    displayOtions()
    setupButtonListeners();

    document.getElementById('game_play_options_done_button').addEventListener('click', () => {
        if (mrWhiteNum + underCoverNum != 0) {
            document.querySelector('.game_play_options').style.display = 'none';
            document.querySelector('.enter_names').style.display = 'block';
            createPlayerIcons(playerNumber);
        }
    });
}


// Event Listener setzen
document.getElementById('numberForm').addEventListener('submit', handleNumberSubmit);