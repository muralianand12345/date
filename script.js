// Wholesome teddy-bear couple GIFs (Milk & Mocha / Bubu Dudu) — all verified to load
// and hand-checked to be cuddly hugs only, never kissing.
const hopefulGif = "https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-bears.gif";        // hopeful hug
const happyGif   = "https://media.tenor.com/hjHT92fTnAAAAAAC/milk-and-mocha-bear-hug.gif"; // joyful hug + hearts

// Each "No" shows a sweeter cuddle, nudging toward yes.
const noGifs = [
  "https://media.tenor.com/DQAuOXAojZwAAAAC/hug.gif",                                 // panda hugs brown bear
  "https://media.tenor.com/ZOUgG5_JeI0AAAAC/milk-and-mocha-milk-mocha.gif",           // tight hug
  "https://media.tenor.com/sqMrmFmyejwAAAAC/hug.gif",                                 // big squeeze hug
  "https://media.tenor.com/8ff-P081Di4AAAAC/bubu-dudu-bubu.gif",                      // lying together
  "https://media.tenor.com/AcGBcQVmkXQAAAAC/i-need-you-in-my-life.gif",               // blanket cuddle
  "https://media.tenor.com/wbntPv9hoXoAAAAC/cuddle-panda.gif",                        // couch cuddle
  "https://media.tenor.com/nTy5FsZ6Zi4AAAAC/milk-and-mocha-milk-and-mocha-bear.gif"   // snuggled asleep
];

// Emoji used only if a GIF ever fails to load, so the page never looks broken.
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

function makeGifImg(src) {
  const img = document.createElement("img");
  img.className = "gif";
  img.id = "gif";
  img.alt = "cute cuddling bears";
  img.src = src;
  // If the GIF ever fails to load, fall back to a happy emoji.
  img.addEventListener("error", () => img.replaceWith(makeEmojiBox(happyEmoji)));
  return img;
}

// Show a given bear GIF in the #gif slot (handles the emoji-fallback case too).
function setGifSrc(src) {
  const el = document.getElementById("gif");
  if (el.tagName === "IMG") el.src = src;
  else el.replaceWith(makeGifImg(src));
}

// Start hopeful with the cute bears GIF (fall back to emoji if it can't load).
gifEl.addEventListener("error", () => gifEl.replaceWith(makeEmojiBox("🐻💕")));
setGifSrc(hopefulGif);

noBtn.addEventListener("click", () => {
  noCount++;

  // Grow the Yes button each time No is pressed.
  const scale = 1 + noCount * 0.25;
  yesBtn.style.transform = `scale(${scale})`;

  // Update the No button's text and show a sweeter cuddle GIF.
  const msg = noMessages[Math.min(noCount, noMessages.length - 1)];
  noBtn.textContent = msg;
  setGifSrc(noGifs[Math.min(noCount - 1, noGifs.length - 1)]);

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
  setGifSrc(happyGif);
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
