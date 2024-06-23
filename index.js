
const gameBoard = document.querySelector(".game-board");
const letters = ['A','B','C','D','E','F','G','H'];
const lettersList = [...letters, ...letters];
const cardCount = lettersList.length;


let cards = 0;
let activeCards = null;
let move = false;

const createCard = (letters) =>{
  const el = document.createElement("div");

  el.classList.add("card");
  el.setAttribute('data-letters', letters);
  el.setAttribute("data-revealed", "false");

  el.addEventListener("click", () => {
    const revealed = el.getAttribute("data-revealed");
    if (move || revealed === "true" || el === activeCards) {
      return;
    }
    el.innerText= letters;

    if (!activeCards) {
      activeCards = el;

      return;
    }
    
    const match = activeCards.getAttribute("data-letters");

    if (match === letters) {
        activeCards.setAttribute("data-revealed", true);
        el.setAttribute("data-revealed", true);

      move = false;
      activeCards = null;
      cards += 2;

      if (cards === cardCount){
        alert("You win!");
      }
      return;
    }

    move = true;
    setTimeout(() => {
      el.innerText = null;
      activeCards.innerText = null

      move = false;
      activeCards = null;
    }, 1000);
  } );

  return el;
}


for (let i = 0; i < cardCount; i++) {
	const randomIndex = Math.floor(Math.random() * lettersList.length);
	const letters = lettersList[randomIndex];
  const card = createCard(letters);

  lettersList.splice(randomIndex, 1);
	gameBoard.appendChild(card);

}
