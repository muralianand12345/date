// Cute hugging-bears GIF (verified to load). Used for the hopeful + happy states.
const happyGif = "https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-bears.gif";

// Safe emoji reactions for the sad "No" states — these always render, no hotlink risk.
const sadEmojis = ["🥺", "😢", "🥹", "😭", "😭"];
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
const pickedIdeaEl = document.getElementById("pickedIdea");

let noCount = 0;
let pickedIdea = null;

// ---- Romantic date ideas header ----
const dateIdeas = [
  { label: "Sunset picnic 🧺", text: "A sunset picnic it is — I'll pack your favourite snacks 🧺💕" },
  { label: "Stargazing ✨", text: "Stargazing under the night sky... how dreamy ✨🌙" },
  { label: "Movie night 🎬", text: "Cozy movie night — you pick, I bring the popcorn 🎬🍿" },
  { label: "Coffee date ☕", text: "Coffee date! Long talks and warm cups ☕💗" },
  { label: "Beach walk 🌊", text: "A beach walk with our feet in the sand 🌊👣" },
  { label: "Cook together 🍝", text: "Let's cook together — chaos and laughter guaranteed 🍝😄" },
  { label: "Art & painting 🎨", text: "An art date — let's make a mess and call it masterpieces 🎨" },
  { label: "Ice cream 🍦", text: "Ice cream stroll — one scoop for every laugh 🍦💞" },
  { label: "Bookstore browse 📚", text: "Wandering a cozy bookstore together 📚🤍" },
  { label: "Dancing 💃", text: "Dancing the night away, just you and me 💃🕺" }
];

const ideasChips = document.getElementById("ideasChips");
dateIdeas.forEach((idea) => {
  const chip = document.createElement("button");
  chip.className = "idea-chip";
  chip.type = "button";
  chip.textContent = idea.label;
  chip.addEventListener("click", () => {
    document.querySelectorAll(".idea-chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    pickedIdea = idea;
    pickedIdeaEl.textContent = idea.text;
  });
  ideasChips.appendChild(chip);
});

// ---- Drifting background hearts ----
(function spawnBackgroundHearts() {
  const container = document.getElementById("bgHearts");
  const symbols = ["💖", "💕", "🤍", "🌸", "✨", "💗"];
  for (let i = 0; i < 22; i++) {
    const s = document.createElement("span");
    s.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    s.style.left = Math.random() * 100 + "vw";
    s.style.fontSize = 0.9 + Math.random() * 1.6 + "rem";
    s.style.animationDuration = 9 + Math.random() * 12 + "s";
    s.style.animationDelay = -Math.random() * 15 + "s";
    container.appendChild(s);
  }
})();

function makeEmojiBox(emoji) {
  const div = document.createElement("div");
  div.className = "gif emoji-box";
  div.id = "gif";
  div.textContent = emoji;
  return div;
}

function makeGifImg() {
  const img = document.createElement("img");
  img.className = "gif";
  img.id = "gif";
  img.alt = "cute bears";
  img.src = happyGif;
  // If the GIF ever fails to load, fall back to a happy emoji.
  img.addEventListener("error", () => img.replaceWith(makeEmojiBox(happyEmoji)));
  return img;
}

// Swap the #gif element between the bears GIF and an emoji reaction.
function showGif() {
  const el = document.getElementById("gif");
  if (el.tagName === "IMG") el.src = happyGif;
  else el.replaceWith(makeGifImg());
}

function showEmoji(emoji) {
  const el = document.getElementById("gif");
  if (el.tagName === "DIV") el.textContent = emoji;
  else el.replaceWith(makeEmojiBox(emoji));
}

// Start hopeful with the cute bears GIF (fall back to emoji if it can't load).
gifEl.addEventListener("error", () => gifEl.replaceWith(makeEmojiBox("🐻💕")));
gifEl.src = happyGif;

noBtn.addEventListener("click", () => {
  noCount++;

  // Grow the Yes button each time No is pressed.
  const scale = 1 + noCount * 0.25;
  yesBtn.style.transform = `scale(${scale})`;

  // Update the No button's text and the sad reaction.
  const msg = noMessages[Math.min(noCount, noMessages.length - 1)];
  noBtn.textContent = msg;
  showEmoji(sadEmojis[Math.min(noCount - 1, sadEmojis.length - 1)]);

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
  showGif();
  pickedIdeaEl.textContent = pickedIdea
    ? pickedIdea.text
    : "Can't wait to plan every little detail with you 💞";
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
