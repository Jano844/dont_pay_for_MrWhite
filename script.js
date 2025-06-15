import { liste } from './list.js';
let playerNumber;
let playerNames = [];
const playerRoles = [];
let playersCount = 0;
let underCoverNum = 0
let mrWhiteNum = 0
let civilianNum = 0

let tempUnderCoverNum
let tempMrWhiteNum
let tempCivilianNum


let PlayerRectSize = 0

let randomLine = []



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

  // To First reset all to default and new
  resetTempRoles()
  randomLine = liste[Math.floor(Math.random() * liste.length)];


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
      print_word_of_player(playersCount + 1)




      // Größe des Bildes auslesen
      const rect = img.getBoundingClientRect();
      PlayerRectSize = rect

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
    //   console.log(playersCount, playerNumber)
      if (playersCount == playerNumber) {
          document.querySelector('.enter_names').style.display = 'none';

          // Neue Seite einblenden
          document.querySelector('.ongoing_game').style.display = 'block';
          start_ongoing_game()
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


function resetTempRoles() {

    civilianNum = playerNumber - underCoverNum - mrWhiteNum

    tempMrWhiteNum = mrWhiteNum
    tempUnderCoverNum = underCoverNum
    tempCivilianNum = civilianNum
}

function getRoleForPlayer(num) {
  // Berechnung von civilianNum aktuell (aktuelle Civilians im Spiel)

//   console.log("\n\n -------------------")
//   console.log("player num", playerNumber)
//   console.log("Civ Num", tempCivilianNum)
//   console.log("under Num", tempUnderCoverNum)
//   console.log("mr num", tempMrWhiteNum)

  // Falls num == 1: kein Mr White möglich
  if (num === 1) {
    if (tempCivilianNum > 0 && tempUnderCoverNum > 0) {
      const randomNum = Math.floor(Math.random() * 2) + 1;
      if (randomNum === 1)
      {
        tempCivilianNum -= 1
        return "Civilian";
      }

      else
      {
        tempUnderCoverNum -= 1
        return "Undercover";
      }

    }
    else if (tempCivilianNum > 0)
    {
      tempCivilianNum -= 1
      return "Civilian";
    }
    else
    {
      tempUnderCoverNum -= 1
      return "Undercover";
    }

  }
  else {
    // Für alle anderen Spieler: MrWhite möglich

    // Sammle alle verfügbaren Rollen
    const roles = [];
    if (tempCivilianNum > 0) roles.push("Civilian");
    if (tempUnderCoverNum > 0) roles.push("Undercover");
    if (tempMrWhiteNum > 0) roles.push("MrWhite");

    if (roles.length === 0) {
      return "No role available";
    }

    // Zufällig eine Rolle aus den verfügbaren wählen
    const randomIndex = Math.floor(Math.random() * roles.length);
    const role = roles[randomIndex];

    // Zähle Rolle runter
    switch (role) {
      case "Civilian":
        tempCivilianNum -= 1
        break;
      case "Undercover":
        tempUnderCoverNum -= 1
        break;
      case "MrWhite":
        tempMrWhiteNum -= 1 
        break;
    }

    return role;
  }
}


function print_word_of_player(num) {
  const role = getRoleForPlayer(num);
  
  
  let wordToShow;

  if (role === "MrWhite") {
    wordToShow = "Du bist Mr White";
  }
  else if (role === "Civilian") {
    wordToShow = randomLine[0];
  }
  else if (role === "Undercover") {
    wordToShow = randomLine[1];
  }

  playerRoles.push(wordToShow)

  alert(`${role},   ${wordToShow}`);
}

function start_ongoing_game() {
//   console.log(playerRoles)
  const container = document.querySelector('.player_overview');
  container.innerHTML = '';


  let i = 0;
  playerNames.forEach(name => {
    i += 1;
    const trimmedName = name.trim();

    const nameElement = document.createElement('div');
    nameElement.textContent = trimmedName;

    nameElement.style.position = 'relative';
    // Deine Styles:
    nameElement.style.width = PlayerRectSize.width + 'px';
    nameElement.style.height = PlayerRectSize.height + 'px';
    nameElement.style.display = 'flex';
    nameElement.style.alignItems = 'center';
    nameElement.style.justifyContent = 'center';
    nameElement.style.borderRadius = '8px';
    nameElement.style.backgroundColor = '#ddd';
    nameElement.style.fontWeight = 'bold';
    nameElement.style.userSelect = 'none';

    const badge = document.createElement('div');
    badge.textContent = (i).toString();
    badge.style.position = 'absolute';
    badge.style.top = '4px';
    badge.style.right = '6px';
    badge.style.fontSize = '0.7rem';
    badge.style.backgroundColor = '#444';
    badge.style.color = 'white';
    badge.style.borderRadius = '50%';
    badge.style.width = '18px';
    badge.style.height = '18px';
    badge.style.display = 'flex';
    badge.style.alignItems = 'center';
    badge.style.justifyContent = 'center';

    nameElement.appendChild(badge);

    container.appendChild(nameElement);
  });
}

function rotateList(arr) {
  const startIndex = Math.floor(Math.random() * arr.length);
  return arr.slice(startIndex).concat(arr.slice(0, startIndex));
}

document.getElementById("restart").addEventListener("click", () => {

  document.querySelector('.ongoing_game').style.display = 'none';
  document.querySelector('.enter_names').style.display = 'block';

  // Reset Temp Roles
  resetTempRoles()
  randomLine = liste[Math.floor(Math.random() * liste.length)];
  playerRoles.length = 0;
  playerNames = rotateList(playerNames)
  document.getElementById('imagesContainer').innerHTML = ''


  rebuildPlayerBoxes()
  
});


function rebuildPlayerBoxes() {
  const container = document.getElementById('imagesContainer');
  container.innerHTML = ''; // alte Inhalte löschen

  playersCount = 0; // zurücksetzen

  playerNames.forEach((name, i) => {
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.width = PlayerRectSize.width + 'px';
    wrapper.style.height = PlayerRectSize.height + 'px';

    const nameElement = document.createElement('div');
    nameElement.textContent = name;
    nameElement.style.width = '100%';
    nameElement.style.height = '100%';
    nameElement.style.display = 'flex';
    nameElement.style.alignItems = 'center';
    nameElement.style.justifyContent = 'center';
    nameElement.style.borderRadius = '8px';
    nameElement.style.backgroundColor = '#ddd';
    nameElement.style.fontWeight = 'bold';
    nameElement.style.userSelect = 'none';
    nameElement.style.cursor = 'pointer';

    let alreadyClicked = false;

    nameElement.addEventListener('click', () => {
      if (alreadyClicked) return;

      alreadyClicked = true;
      print_word_of_player(i + 1);
      playersCount += 1;

      // Grüner Punkt oben rechts
      const badge = document.createElement('div');
      badge.style.position = 'absolute';
      badge.style.top = '4px';
      badge.style.right = '6px';
      badge.style.width = '12px';
      badge.style.height = '12px';
      badge.style.borderRadius = '50%';
      badge.style.backgroundColor = 'green';
      wrapper.appendChild(badge);

      // Wenn alle Spieler ihr Wort gesehen haben, Spiel starten
      if (playersCount === playerNames.length) {
        document.querySelector('.enter_names').style.display = 'none';
        document.querySelector('.ongoing_game').style.display = 'block';
        start_ongoing_game();
      }
    });

    wrapper.appendChild(nameElement);
    container.appendChild(wrapper);
  });
}


function retPlayerRole() {
  let input = prompt("Bitte gib einen Namen ein:");
  input = input.toLowerCase().trim()
  let index = -1


  playerNames.forEach((element, i) => {
    let temp = element.toLowerCase()
    if (temp == input) {
        index = i
    }
  });
  return index
}

document.getElementById("see_role").addEventListener("click", () => {
    let index = retPlayerRole()
    if (index != -1)
        alert(`Dein Wort ist ${playerRoles[index]}`)
});

document.getElementById().addEventListener("click", () => {
    let index = retPlayerRole()
    if (index != -1)
    {
        console.log(playerRoles[index])
    }
});

