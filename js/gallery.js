const galleryItems = [
  ["DBITAA Alumni Photo 1", "2025", "photos", "assets/images/alumni-04.jpeg"],
  ["DBITAA Alumni Photo 2", "2025", "photos", "assets/images/alumni-05.png"],
  ["DBITAA Alumni Photo 3", "2025", "photos", "assets/images/alumni-06.jpeg"],
  ["Milan Alumni Meet", "2024", "photos", "assets/images/alumni-07.jpeg"],
  ["DBIT Alumni Event", "2024", "photos", "assets/images/alumni-08.jpeg"],
  ["DBITAA Community", "2024", "photos", "assets/images/alumni-09.jpeg"],
  ["Alumni Cricket Tournament", "2023", "photos", "assets/images/alumni-10.jpeg"],
  ["DBITAA Memories", "2023", "photos", "assets/images/alumni-11.jpeg"],
  ["Alumni Campus Moment", "2022", "photos", "assets/images/alumni-12.jpeg"],
  ["DBITAA Gathering", "2022", "photos", "assets/images/alumni-13.jpeg"],
  ["Alumni Network Moment", "2021", "photos", "assets/images/alumni-14.jpeg"],
  ["DBITAA Archive Photo", "2021", "photos", "assets/images/alumni-15.jpeg"]
];

const videos = [
  ["DBIT Homepage Film", "Main DBIT website video", "0BlhrLlBEck"],
  ["DBIT Alumni Cricket Tournament 2023 Promo", "Alumni sports and community", "2e-Bke59feo"],
  ["Payal Chengappa Film Feature", "DBIT alumni achievement video", "6l2aHrUqRJs"],
  ["Milan 2024 Alumni Memories", "Alumni meet memories", "0BlhrLlBEck"]
];

document.addEventListener("DOMContentLoaded", () => {
  const photoGrid = document.getElementById("photo-grid");
  const videoGrid = document.getElementById("video-grid");
  const filter = document.getElementById("gallery-filter");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxClose = document.getElementById("lightbox-close");
  const tabButtons = document.querySelectorAll("[data-gallery-tab]");
  const panels = document.querySelectorAll("[data-gallery-panel]");

  function renderPhotos() {
    if (!photoGrid) return;
    const term = (filter?.value || "").toLowerCase();
    const filtered = galleryItems.filter(item => item[0].toLowerCase().includes(term) || item[1].includes(term));
    photoGrid.innerHTML = filtered.map(([title, year, , src]) => `
      <button class="masonry-item w-full text-left group" data-lightbox-src="${src}" aria-label="Open ${title} photo">
        <img src="${src}" alt="${title}" class="w-full rounded-xl shadow-lg group-hover:scale-[1.015] transition">
        <div class="mt-2 text-sm font-bold text-[#0859a6]">${title}</div>
        <div class="text-xs text-slate-500">${year}</div>
      </button>
    `).join("");
    photoGrid.querySelectorAll("[data-lightbox-src]").forEach(btn => {
      btn.addEventListener("click", () => {
        lightboxImage.src = btn.dataset.lightboxSrc;
        lightboxImage.alt = btn.getAttribute("aria-label");
        lightbox.classList.add("open");
      });
    });
  }

  function renderVideos() {
    if (!videoGrid) return;
    videoGrid.innerHTML = videos.map(([title, desc, id]) => `
      <article class="card overflow-hidden">
        <div class="aspect-video bg-slate-900">
          <iframe class="w-full h-full" src="https://www.youtube.com/embed/${id}" title="${title}" allowfullscreen loading="lazy"></iframe>
        </div>
        <div class="p-5">
          <h3 class="font-extrabold text-[#0859a6]">${title}</h3>
          <p class="text-sm text-slate-600 mt-1">${desc}</p>
        </div>
      </article>
    `).join("");
  }

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.galleryTab;
      tabButtons.forEach(b => b.classList.toggle("bg-[#0859a6]", b === btn));
      tabButtons.forEach(b => b.classList.toggle("text-white", b === btn));
      panels.forEach(panel => panel.classList.toggle("hidden", panel.dataset.galleryPanel !== tab));
    });
  });

  filter?.addEventListener("input", renderPhotos);
  lightboxClose?.addEventListener("click", () => lightbox.classList.remove("open"));
  lightbox?.addEventListener("click", event => {
    if (event.target === lightbox) lightbox.classList.remove("open");
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") lightbox?.classList.remove("open");
  });
  renderPhotos();
  renderVideos();
});
