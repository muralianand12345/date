// Reacting bear GIFs — get sadder as "No" is hovered/clicked, happy on "Yes".
const gifs = [
  "https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-bears.gif",       // hopeful
  "https://media.tenor.com/0nKj9bnvBpwAAAAi/bear-sad.gif",         // pleading
  "https://media.tenor.com/Vyfdjy4-Gq4AAAAi/sad-bear.gif",         // teary
  "https://media.tenor.com/9eMpFpsCMNgAAAAi/crying-bear.gif",      // crying
  "https://media.tenor.com/nLAQVQyV4eYAAAAi/bear-sad.gif"          // sobbing
];
const happyGif = "https://media.tenor.com/qOHHVQVQHIcAAAAi/bear-hug.gif";

// Emoji fallback so the page never looks broken if a GIF fails to load.
const emojiFallback = ["🥺", "🥺", "😢", "😭", "😭"];
const happyEmoji = "🧸💖";

const noMessages = [
  "No",
  "Are you sure?",
  "Really sure??",
  "Please? 🥺",
  "Don't do this to me 😭",
  "I'll be sad...",
  "Pretty please?",
  "Give it another thought!",
  "You're breaking my heart 💔",
  "Last chance!"
];

const gifEl = document.getElementById("gif");
const questionEl = document.getElementById("question");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

let noCount = 0;

function setGif(index) {
  const i = Math.min(index, gifs.length - 1);
  gifEl.src = gifs[i];
  gifEl.dataset.fallback = emojiFallback[i];
}

// If a GIF can't load (hotlink blocked), swap to a big emoji instead.
gifEl.addEventListener("error", () => {
  const fb = gifEl.dataset.fallback || "🥺";
  gifEl.replaceWith(makeEmojiBox(fb));
});

function makeEmojiBox(emoji) {
  const div = document.createElement("div");
  div.className = "gif";
  div.style.display = "flex";
  div.style.alignItems = "center";
  div.style.justifyContent = "center";
  div.style.fontSize = "120px";
  div.style.height = "240px";
  div.id = "gif";
  div.textContent = emoji;
  return div;
}

setGif(0);

noBtn.addEventListener("click", () => {
  noCount++;

  // Grow the Yes button each time No is pressed.
  const scale = 1 + noCount * 0.25;
  yesBtn.style.transform = `scale(${scale})`;

  // Update the No button's text and sad gif.
  const msg = noMessages[Math.min(noCount, noMessages.length - 1)];
  noBtn.textContent = msg;
  setGif(noCount);

  // After enough refusals, make "No" hard to pursue.
  if (noCount >= 5) {
    noBtn.style.position = "relative";
    moveNoButton();
  }
});

// Dodge the cursor on hover once things get desperate.
noBtn.addEventListener("mouseover", () => {
  if (noCount >= 5) moveNoButton();
});

function moveNoButton() {
  const x = (Math.random() - 0.5) * 260;
  const y = (Math.random() - 0.5) * 160;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

yesBtn.addEventListener("click", () => {
  questionEl.textContent = "Yay!! It's a date! 💖🎉";
  gifEl.src = happyGif;
  gifEl.dataset.fallback = happyEmoji;
  noBtn.style.display = "none";
  yesBtn.textContent = "See you there 🥰";
  yesBtn.style.transform = "scale(1.2)";
  rainHearts();
});

function rainHearts() {
  const hearts = ["💖", "💕", "💗", "❤️", "🧸", "🌸"];
  for (let i = 0; i < 60; i++) {
    const h = document.createElement("div");
    h.className = "heart";
    h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    h.style.left = Math.random() * 100 + "vw";
    h.style.animationDuration = 2 + Math.random() * 3 + "s";
    h.style.animationDelay = Math.random() * 2 + "s";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 6000);
  }
}
