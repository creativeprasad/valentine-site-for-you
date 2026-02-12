let noCount = 0;

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const readyYesBtn = document.getElementById("readyYesBtn");
const lastChance = document.getElementById("lastChance");
const mainQuestion = document.getElementById("mainQuestion");

const questionBox = document.getElementById("questionBox");
const readyBox = document.getElementById("readyBox");
const valentineBox = document.getElementById("valentineBox");
const dayContent = document.getElementById("dayContent");

/* NO BUTTON */
noBtn.addEventListener("click", () => {
  noCount++;

  // Shake card each time NO is clicked
  questionBox.classList.add("shake");
  setTimeout(() => questionBox.classList.remove("shake"), 400);

  // Change question text each time (so it looks like asking again)
  if (noCount === 1) {
    mainQuestion.innerHTML = "Will you REALLY be my Valentine? 🥺💖";
  }

  if (noCount === 2) {
    mainQuestion.innerHTML = "Pleaseee... will you be my Valentine? 😭💘";
  }

  if (noCount === 3) {
    mainQuestion.innerHTML = "Okay okay... final time 😳💖";

    // Show LAST CHANCE line
    lastChance.classList.remove("hidden");
    lastChance.classList.add("pop");

    // Background pulse
    document.body.classList.add("pulse-bg");

    // YES button grows
    yesBtn.classList.add("yes-grow");

    // Change No button text
    noBtn.innerHTML = "No 😭";

    setTimeout(() => lastChance.classList.remove("pop"), 800);
  }

  // Restart question animation each time
  mainQuestion.classList.remove("questionPop", "questionFade");
  void mainQuestion.offsetWidth;
  mainQuestion.classList.add("questionPop", "questionFade");

  // After 3 NOs, No button runs away
  if (noCount > 3) {
    moveNoButton();
  }
});

function moveNoButton() {
  const x = Math.random() * 180 - 90;
  const y = Math.random() * 180 - 90;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

/* YES → READY QUESTION */
yesBtn.addEventListener("click", () => {
  questionBox.classList.add("hidden");
  readyBox.classList.remove("hidden");
});

/* READY YES → VALENTINE WEEK */
readyYesBtn.addEventListener("click", () => {
  readyBox.classList.add("hidden");
  valentineBox.classList.remove("hidden");
  loadValentineDay();
});

/* VALENTINE DAYS */
const days = [
  { 
    date: "2026-02-07", 
    title: "Rose Day 🌹", 
    msg: "If I could give you a rose for every time you crossed my mind, I’d have a whole garden by now. This rose isn’t just a flower — it’s my quiet way of saying that I admire you more than I ever say out loud. Your smile has this soft magic that makes ordinary days feel special, and your presence alone feels comforting. I don’t know where life will take us, but today I just want you to know that you are genuinely special to me. This rose carries my respect, my admiration, and a little piece of my heart 💕"
  },
  { 
    date: "2026-02-08", 
    title: "Propose Day 💍", 
    msg: "I’ve thought a lot about how to say this, and honestly, no words feel big enough. But here it is — I like you… not casually, not temporarily, but deeply and sincerely. You make me want to be better, happier, and braver. I don’t know what the future holds, but I know I’d love to explore it with you. So today, I’m not asking for promises or pressure — I’m just asking… would you like to take a chance on *us*? 💖"
  },
  { 
    date: "2026-02-09", 
    title: "Chocolate Day 🍫", 
    msg: "They say chocolate makes everything better, but somehow you do that without even trying. Just talking to you sweetens my mood, and thinking about you brings this warm, calm happiness I can’t explain. If I could, I’d give you all the chocolates in the world — not because you need them, but because you deserve every little sweetness life has to offer. And honestly… you’re already sweeter than any chocolate 💕"
  },
  { 
    date: "2026-02-10", 
    title: "Teddy Day 🧸", 
    msg: "This teddy is a tiny reminder of something big — comfort. Just like a teddy makes you feel safe, your presence makes everything feel lighter. On days when the world feels heavy, I imagine how nice it would be to just sit with you, talk about nothing, and feel at peace. Whenever you feel lonely or tired, remember there’s someone out here who genuinely cares about you and wishes they could be your safe place 🤍"
  },
  { 
    date: "2026-02-11", 
    title: "Promise Day 🤝", 
    msg: "I may not promise perfection, but I promise honesty. I promise to respect you, support you, and value your feelings. I promise to listen — not just hear, but truly understand. And most importantly, I promise that whatever happens, my intentions toward you will always be pure and genuine. You mean more to me than you realize, and that’s a promise I’ll always keep 💫"
  },
  { 
    date: "2026-02-12", 
    title: "Hug Day 🤗", 
    msg: "If I could hug you today, it wouldn’t be just a hug — it would be reassurance, comfort, warmth, and care all wrapped into one. A hug that says *“You’re not alone”*, *“I’m here”*, and *“You matter.”* Until then, imagine a tight, cozy hug from me, the kind that makes worries disappear and hearts feel lighter 💞"
  },
  { 
    date: "2026-02-13", 
    title: "Kiss Day 😘",
    msg: "Happy Kiss Day"
  },
  { 
    date: "2026-02-14", 
    title: "Valentine’s Day 💖", 
    msg: "Happy Valentine’s Day 😘💘<br> Hey… you still haven’t accepted my proposal 😌<br> But I really like you."
  }
];

/* LOAD DAY (FIXED LOCAL DATE) */
function loadValentineDay() {
  const now = new Date();

  // FIX: Local date in format YYYY-MM-DD
  const today = new Date().toLocaleDateString("en-CA");

  const index = days.findIndex(d => d.date === today);

  if (index !== -1) {
    const todayDay = days[index];
    const nextDay = days[index + 1];

    let html = `
      <h2>${todayDay.title}</h2>
      <p>${todayDay.msg}</p>
    `;

    if (nextDay) {
      html += `
        <div class="blink">💌 Don’t forget to see tomorrow’s surprise!</div>
        <div id="countdown" class="countdown"></div>
      `;
    } else {
      html += `
        <div class="final-text">
          I’m waiting for your response with all my heart.<br>
          I’ll be waiting… for you. 💔➡️❤️
        </div>
      `;
    }

    dayContent.innerHTML = html;

    if (nextDay) startCountdown(nextDay.date);
    return;
  }

  const next = days.find(d => d.date > today);

  if (!next) {
    dayContent.innerHTML = `
      <h2>💖 Valentine Week Finished</h2>
      <p>All surprises are completed 💝</p>
    `;
    return;
  }

  const diff = Math.ceil(
    (new Date(next.date + "T00:00:00") - now) / (1000 * 60 * 60 * 24)
  );

  dayContent.innerHTML = `
    <h2>⏳ Surprise Locked</h2>
    <p>${diff} days remaining ❤️</p>
  `;
}

/* COUNTDOWN */
function startCountdown(nextDate) {
  const el = document.getElementById("countdown");

  function update() {
    const now = new Date().getTime();

    // Local midnight target
    const target = new Date(nextDate + "T00:00:00").getTime();
    const diff = target - now;

    if (diff <= 0) {
      el.innerHTML = "🎉 Surprise Unlocked!";
      loadValentineDay(); // refresh automatically
      return;
    }

    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    el.innerHTML = `⏳ ${h}h ${m}m ${s}s remaining`;
  }

  update();
  setInterval(update, 1000);
}

