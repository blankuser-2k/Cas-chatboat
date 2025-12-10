// script.js — with quick suggestion buttons

const knowledge = [
  { q: ["time","timing","hours"], a: "College time is 9:30 AM to 3:45 PM." },
  { q: ["address","location","where","address:"], a:
      "College Address: The Principal, College of Applied Science, Vattamkulam, Nellissery, Sukapuram (P.O.), Edappal, Malappuram, Kerala, PIN - 679576." },
  { q: ["phone","contact","telephone"], a: "Phone: 0494 2689655" },
  { q: ["email","mail"], a: "Email: casvattamkulam@ihrd.ac.in" },
  { q: ["course","courses","what courses","available courses"], a:
      "Courses: B.Sc (Computer Science), B.Sc (Electronics), BCA, B.Com with Computer Application, M.Sc (Computer Science), M.Com (Finance)." },
  { q: ["about","more","information","established"], a:
      "CAS Vattamkulam was established in 2005 by IHRD. Affiliated to University of Calicut. Located ~3 km from Edappal and offers UG & PG programs." },
];

function escapeHtml(str) {
  return str.replace(/[&<>"'`=\/]/g, function(s) {
    return ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","=":"&#x3D;","`":"&#x60;"
    })[s];
  });
}

const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const suggestions = document.getElementById("suggestions");

// append bubble
function appendBubble(kind, textHtml) {
  const row = document.createElement("div");
  row.className = "msg-row " + (kind === "you" ? "you" : "bot");
  const bubble = document.createElement("div");
  bubble.className = "bubble " + (kind === "you" ? "you" : "bot");
  bubble.innerHTML = textHtml;
  row.appendChild(bubble);
  chatbox.appendChild(row);
  chatbox.scrollTop = chatbox.scrollHeight;
}

// find answer
function findAnswer(text) {
  const lower = text.toLowerCase();
  for (const item of knowledge) {
    for (const k of item.q) {
      if (lower.includes(k)) return item.a;
    }
  }
  return null;
}

// show typing indicator
function showTyping() {
  const row = document.createElement("div");
  row.className = "msg-row bot";
  const wrap = document.createElement("div");
  wrap.className = "typing";
  const d1 = document.createElement("span"); d1.className = "dot";
  const d2 = document.createElement("span"); d2.className = "dot";
  const d3 = document.createElement("span"); d3.className = "dot";
  wrap.appendChild(d1); wrap.appendChild(d2); wrap.appendChild(d3);
  row.appendChild(wrap);
  chatbox.appendChild(row);
  chatbox.scrollTop = chatbox.scrollHeight;
  return row;
}

// main send
async function sendMessageWithText(text) {
  if (!text || !text.trim()) return;
  appendBubble("you", escapeHtml(text));
  userInput.value = "";
  userInput.focus();

  const tNode = showTyping();
  await new Promise(r => setTimeout(r, 650));
  tNode.remove();

  const answer = findAnswer(text);
  if (answer) appendBubble("bot", escapeHtml(answer));
  else appendBubble("bot", escapeHtml("Sorry, I don't understand. Ask about timing, courses, address, phone or email."));
}

// normal send (reads input box)
function sendMessage() {
  const text = userInput.value.trim();
  sendMessageWithText(text);
}

// suggestion button handler
function onSuggestionClick(e) {
  const q = e.currentTarget.getAttribute("data-query");
  // map simple query keys to user-friendly text
  const map = {
    "timing": "timing",
    "address": "address",
    "courses": "courses",
    "contact": "contact",
    "more": "more"
  };
  const text = map[q] || q;
  sendMessageWithText(text);
}

// attach events to suggestion buttons
Array.from(document.getElementsByClassName("suggest-btn")).forEach(btn => {
  btn.addEventListener("click", onSuggestionClick);
});

// send button and enter key
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", (e) => { if (e.key === "Enter") sendMessage(); });

// initial greeting
appendBubble("bot", "Hello! I am the CAS chatbot — try suggestions or type your question (time, address, courses, contact).");
