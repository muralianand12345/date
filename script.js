// Wholesome teddy-bear couple GIFs (Milk & Mocha / Bubu Dudu), bundled in the repo
// so they load instantly. All hand-checked to be cuddly hugs only, never kissing.
const hopefulGif = "gifs/hopeful.gif";     // hopeful hug
const happyGif   = "gifs/happy-hug.gif";   // joyful hug + hearts

// Each "No" shows a sweeter cuddle, nudging toward yes.
const noGifs = [
  "gifs/no-1-panda-hug.gif",  // panda hugs brown bear
  "gifs/no-2-tight-hug.gif",  // tight hug
  "gifs/no-3-squeeze.gif",    // big squeeze hug
  "gifs/no-4-lying.gif",      // lying together
  "gifs/no-5-blanket.gif",    // blanket cuddle
  "gifs/no-6-couch.gif",      // couch cuddle
  "gifs/no-7-asleep.gif"      // snuggled asleep
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
// Each idea maps to a matching bear GIF. Ideas without a good match fall back
// to a loving hug (handled in the click below). All hand-checked: cuddles, no kissing.
const dateIdeas = [
  { label: "Sunset picnic 🧺", text: "A sunset picnic it is — I'll pack your favourite snacks 🧺💕", gif: "gifs/idea-picnic.gif" },
  { label: "Stargazing ✨", text: "Stargazing under the night sky... how dreamy ✨🌙", gif: "gifs/idea-stargazing.gif" },
  { label: "Movie night 🎬", text: "Cozy movie night — you pick, I bring the popcorn 🎬🍿", gif: "gifs/idea-movie.gif" },
  { label: "Coffee date ☕", text: "Coffee date! Long talks and warm cups ☕💗", gif: "gifs/idea-coffee.gif" },
  { label: "Beach walk 🌊", text: "A beach walk with our feet in the sand 🌊👣", gif: "gifs/idea-beach.gif" },
  { label: "Cook together 🍝", text: "Let's cook together — chaos and laughter guaranteed 🍝😄", gif: "gifs/idea-cook.gif" },
  { label: "Art & painting 🎨", text: "An art date — let's make a mess and call it masterpieces 🎨" },
  { label: "Ice cream 🍦", text: "Ice cream stroll — one scoop for every laugh 🍦💞", gif: "gifs/idea-icecream.gif" },
  { label: "Bookstore browse 📚", text: "Wandering a cozy bookstore together 📚🤍", gif: "gifs/idea-book.gif" },
  { label: "Dancing 💃", text: "Dancing the night away, just you and me 💃🕺", gif: "gifs/idea-dance.gif" }
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
    // Show a bear GIF that matches the idea (loving hug if there's no specific one).
    setGifSrc(idea.gif || happyGif);
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
  document.getElementById("evidence").hidden = false;
  rainHearts();
});

// ---- Downloadable "evidence" certificate ----
document.getElementById("downloadBtn").addEventListener("click", drawEvidence);

function drawEvidence() {
  const W = 1080, H = 1080;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");

  // Soft pink gradient background.
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, "#ffd6e8");
  grad.addColorStop(0.5, "#ffafcc");
  grad.addColorStop(1, "#ff8fab");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Scattered hearts.
  ctx.globalAlpha = 0.35;
  const heartChars = ["💖", "💕", "🌸", "🧸"];
  for (let i = 0; i < 22; i++) {
    ctx.font = 30 + Math.random() * 40 + "px serif";
    ctx.fillText(
      heartChars[Math.floor(Math.random() * heartChars.length)],
      Math.random() * W,
      Math.random() * H
    );
  }
  ctx.globalAlpha = 1;

  // White rounded card.
  const m = 90;
  roundRect(ctx, m, m, W - m * 2, H - m * 2, 40);
  ctx.fillStyle = "rgba(255,255,255,0.92)";
  ctx.fill();

  ctx.textAlign = "center";

  ctx.font = "44px serif";
  ctx.fillText("💌  OFFICIAL EVIDENCE  💌", W / 2, 250);

  ctx.fillStyle = "#c9184a";
  ctx.font = "bold 86px 'Segoe UI', sans-serif";
  ctx.fillText("She said YES! 💖", W / 2, 380);

  ctx.fillStyle = "#6a1b3d";
  ctx.font = "bold 40px 'Segoe UI', sans-serif";
  wrapText(ctx, "to: Do you wanna help plan for our first date?", W / 2, 480, W - 280, 52);

  // The chosen idea (if any).
  ctx.fillStyle = "#8a2748";
  ctx.font = "italic 38px 'Segoe UI', sans-serif";
  const ideaLine = pickedIdea
    ? "Date of choice: " + pickedIdea.label.replace(/[^\p{L}\p{N} &]/gu, "").trim()
    : "Date plans: officially in the works 💞";
  wrapText(ctx, ideaLine, W / 2, 640, W - 280, 50);

  // Date stamp.
  ctx.fillStyle = "#c9184a";
  ctx.font = "bold 34px 'Segoe UI', sans-serif";
  const today = new Date().toLocaleDateString(undefined, {
    year: "numeric", month: "long", day: "numeric"
  });
  ctx.fillText("Signed & sealed on " + today, W / 2, 770);

  // Cute seal.
  ctx.font = "120px serif";
  ctx.fillText("🧸💕", W / 2, 900);

  ctx.fillStyle = "#8a2748";
  ctx.font = "600 30px 'Segoe UI', sans-serif";
  ctx.fillText("Made with ❤️ by Sulaiman", W / 2, 980);

  // Trigger download.
  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "i-said-yes-evidence.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, "image/png");
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  const lines = [];
  for (const word of words) {
    const test = line + word + " ";
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line.trim());
      line = word + " ";
    } else {
      line = test;
    }
  }
  lines.push(line.trim());
  lines.forEach((l, i) => ctx.fillText(l, x, y + i * lineHeight));
}

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
