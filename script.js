// ✅ Change this email to your organisation email later:
const ORG_EMAIL = "yourorganisation@example.com";

const tutors = [
  {
    name: "Aarna",
    subjects: ["Tech", "Chemistry", "Biology"],
    about:
      "Add a short intro here (teaching style, what you enjoy, why you joined).",
    qualifications: [
      "Add qualifications, awards, experience, or leadership roles here.",
    ],
  },
  {
    name: "Alyssa",
    subjects: ["Music Theory", "Chess", "French"],
    about:
      "Add a short intro here (teaching style, what you enjoy, why you joined).",
    qualifications: [
      "Add qualifications, awards, experience, or leadership roles here.",
    ],
  },
  {
    name: "Bella",
    subjects: ["Competition Maths", "Chess"],
    about:
      "Add a short intro here (teaching style, what you enjoy, why you joined).",
    qualifications: [
      "Add qualifications, awards, experience, or leadership roles here.",
    ],
  },
  {
    name: "Cherise",
    subjects: ["Primary Science", "Spanish", "Biology"],
    about:
      "Add a short intro here (teaching style, what you enjoy, why you joined).",
    qualifications: [
      "Add qualifications, awards, experience, or leadership roles here.",
    ],
  },
  {
    name: "Fiona",
    subjects: ["English", "Chinese", "Social Studies"],
    about:
      "Add a short intro here (teaching style, what you enjoy, why you joined).",
    qualifications: [
      "Add qualifications, awards, experience, or leadership roles here.",
    ],
  },
  {
    name: "Isabella",
    subjects: ["English", "Math", "Science", "Music Theory", "Speech"],
    about:
      "Add a short intro here (teaching style, what you enjoy, why you joined).",
    qualifications: [
      "Add qualifications, awards, experience, or leadership roles here.",
    ],
  },
  {
    name: "Lisa",
    subjects: ["Speech", "English", "Physics", "French"],
    about:
      "Add a short intro here (teaching style, what you enjoy, why you joined).",
    qualifications: [
      "Add qualifications, awards, experience, or leadership roles here.",
    ],
  },
  {
    name: "Liz",
    subjects: ["Art", "Chemistry"],
    about:
      "Add a short intro here (teaching style, what you enjoy, why you joined).",
    qualifications: [
      "Add qualifications, awards, experience, or leadership roles here.",
    ],
  },
  {
    name: "Natalie",
    subjects: ["Drama", "Biology"],
    about:
      "Add a short intro here (teaching style, what you enjoy, why you joined).",
    qualifications: [
      "Add qualifications, awards, experience, or leadership roles here.",
    ],
  },
];

// ---------- NAV (mobile) ----------
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu after click (mobile)
  navMenu.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// ---------- YEAR ----------
document.getElementById("year").textContent = String(new Date().getFullYear());

// ---------- FILTER UI ----------
const tutorGrid = document.getElementById("tutorGrid");
const searchInput = document.getElementById("searchInput");
const subjectSelect = document.getElementById("subjectSelect");

const allSubjects = Array.from(
  new Set(tutors.flatMap((t) => t.subjects.map((s) => s.trim())))
).sort((a, b) => a.localeCompare(b));

for (const subj of allSubjects) {
  const opt = document.createElement("option");
  opt.value = subj;
  opt.textContent = subj;
  subjectSelect.appendChild(opt);
}

function initials(name) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

function renderTutors(list) {
  tutorGrid.innerHTML = "";

  if (!list.length) {
    tutorGrid.innerHTML = `<div class="card" style="grid-column: 1 / -1;">
      <h3>No matches</h3>
      <p class="muted">Try a different search term or choose “All subjects”.</p>
    </div>`;
    return;
  }

  for (const tutor of list) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "tutor";
    card.setAttribute("aria-label", `Open profile for ${tutor.name}`);
    card.addEventListener("click", () => openModal(tutor));

    const top = document.createElement("div");
    top.className = "tutor-top";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = initials(tutor.name);

    const badge = document.createElement("span");
    badge.className = "tag";
    badge.textContent = "Tutor & Co-founder";

    top.appendChild(avatar);
    top.appendChild(badge);

    const h3 = document.createElement("h3");
    h3.textContent = tutor.name;

    const p = document.createElement("p");
    p.textContent = "Click to view subjects, about me, and qualifications.";

    const tags = document.createElement("div");
    tags.className = "tags";

    tutor.subjects.slice(0, 5).forEach((s) => {
      const t = document.createElement("span");
      t.className = "tag";
      t.textContent = s;
      tags.appendChild(t);
    });

    card.appendChild(top);
    card.appendChild(h3);
    card.appendChild(p);
    card.appendChild(tags);

    tutorGrid.appendChild(card);
  }
}

function applyFilters() {
  const q = (searchInput.value || "").trim().toLowerCase();
  const subject = (subjectSelect.value || "").trim();

  const filtered = tutors.filter((t) => {
    const inName = t.name.toLowerCase().includes(q);
    const inSubjects = t.subjects.some((s) => s.toLowerCase().includes(q));
    const matchesQuery = q ? inName || inSubjects : true;
    const matchesSubject = subject ? t.subjects.includes(subject) : true;
    return matchesQuery && matchesSubject;
  });

  renderTutors(filtered);
}

searchInput.addEventListener("input", applyFilters);
subjectSelect.addEventListener("change", applyFilters);

renderTutors(tutors);

// ---------- MODAL ----------
const modal = document.getElementById("profileModal");
const backdrop = document.getElementById("modalBackdrop");
const closeBtn = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalRole = document.getElementById("modalRole");
const modalSubjects = document.getElementById("modalSubjects");
const modalAbout = document.getElementById("modalAbout");
const modalQualifications = document.getElementById("modalQualifications");
const copySubjectsBtn = document.getElementById("copySubjectsBtn");
const contactLink = document.getElementById("contactLink");

let activeTutor = null;

function openModal(tutor) {
  activeTutor = tutor;

  modalTitle.textContent = tutor.name;
  modalRole.textContent = "Tutor & Co-founder";

  modalSubjects.innerHTML = "";
  tutor.subjects.forEach((s) => {
    const pill = document.createElement("span");
    pill.className = "tag";
    pill.textContent = s;
    modalSubjects.appendChild(pill);
  });

  modalAbout.textContent = tutor.about || "Add a short intro here.";
  modalQualifications.innerHTML = "";

  const quals = tutor.qualifications && tutor.qualifications.length
    ? tutor.qualifications
    : ["Add qualifications, awards, experience, or leadership roles here."];

  quals.forEach((q) => {
    const li = document.createElement("li");
    li.textContent = q;
    modalQualifications.appendChild(li);
  });

  // Optional: prefill contact anchor with tutor name in URL hash (simple)
  contactLink.onclick = () => {
    // Close modal before jumping
    closeModal();
  };

  backdrop.hidden = false;
  modal.hidden = false;

  // Focus handling for accessibility
  closeBtn.focus();
  document.addEventListener("keydown", onKeyDown);
}

function closeModal() {
  backdrop.hidden = true;
  modal.hidden = true;
  activeTutor = null;
  document.removeEventListener("keydown", onKeyDown);
}

function onKeyDown(e) {
  if (e.key === "Escape") closeModal();
}

backdrop.addEventListener("click", closeModal);
closeBtn.addEventListener("click", closeModal);

copySubjectsBtn.addEventListener("click", async () => {
  if (!activeTutor) return;
  const text = `${activeTutor.name}: ${activeTutor.subjects.join(", ")}`;
  try {
    await navigator.clipboard.writeText(text);
    copySubjectsBtn.textContent = "Copied!";
    setTimeout(() => (copySubjectsBtn.textContent = "Copy subjects"), 900);
  } catch {
    alert(text); // fallback
  }
});

// ---------- CONTACT FORM (mailto) ----------
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(contactForm);
  const name = data.get("name") || "";
  const email = data.get("email") || "";
  const yearLevel = data.get("yearLevel") || "";
  const subjects = data.get("subjects") || "";
  const message = data.get("message") || "";

  const subjectLine = encodeURIComponent("Tutoring request (Auckland)");
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nYear level: ${yearLevel}\nSubjects: ${subjects}\n\nMessage:\n${message}\n`
  );

  window.location.href = `mailto:${ORG_EMAIL}?subject=${subjectLine}&body=${body}`;
});
