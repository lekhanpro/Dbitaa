const navLinks = [
  ["Home", "index.html"],
  ["About", "about.html"],
  ["Directory", "alumni-directory.html"],
  ["Events", "events.html"],
  ["News", "news.html"],
  ["Gallery", "gallery.html"],
  ["Contact", "contact.html"]
];

function dbitLogo() {
  return `
    <a href="index.html" class="flex items-center gap-3" aria-label="DBIT Alumni Home">
      <img src="assets/images/alumni-01.png" alt="Official DBIT Alumni logo" class="h-14 w-auto object-contain shrink-0">
      <span class="leading-tight hidden sm:block">
        <span class="block text-lg font-extrabold text-[#0859a6]">DBIT Alumni</span>
        <span class="block text-xs font-semibold text-slate-500">Don Bosco Institute of Technology</span>
      </span>
    </a>
  `;
}

function injectHeaderFooter() {
  const current = location.pathname.split("/").pop() || "index.html";
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");
  if (header) {
    header.innerHTML = `
      <div class="bg-[#0859a6] text-white text-sm overflow-hidden">
        <div class="announcement-track py-2">
          Autonomous Status 2024 • Established 2001 • 36-acre green campus on Mysore Road, Bengaluru • Highest Package 42 LPA • 650+ offers FY 2025-26 • Alumni across companies, services, entrepreneurship and research
        </div>
      </div>
      <nav id="navbar" class="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 transition-shadow">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-20">
            ${dbitLogo()}
            <div class="hidden lg:flex items-center gap-7">
              ${navLinks.map(([label, href]) => `<a class="nav-link text-sm font-bold text-slate-700 hover:text-[#429321] ${current === href ? "active" : ""}" href="${href}">${label}</a>`).join("")}
              <a href="register.html" class="px-5 py-2.5 rounded-full btn-primary font-bold text-sm">Register</a>
              <a href="login.html" class="px-5 py-2.5 rounded-full border border-[#0859a6] text-[#0859a6] hover:bg-[#429321] hover:text-white font-bold text-sm transition">Login</a>
            </div>
            <button id="menu-toggle" class="lg:hidden p-2 rounded-lg border border-slate-200" aria-label="Open navigation menu" aria-expanded="false">
              <span class="block w-6 h-0.5 bg-[#0859a6] mb-1.5"></span>
              <span class="block w-6 h-0.5 bg-[#0859a6] mb-1.5"></span>
              <span class="block w-6 h-0.5 bg-[#0859a6]"></span>
            </button>
          </div>
          <div id="mobile-menu" class="hidden lg:hidden pb-5">
            <div class="grid gap-2">
              ${navLinks.map(([label, href]) => `<a class="nav-link px-3 py-2 rounded-lg font-bold text-slate-700 ${current === href ? "active bg-slate-50" : ""}" href="${href}">${label}</a>`).join("")}
              <a href="register.html" class="px-4 py-3 rounded-lg btn-primary text-center font-bold">Register</a>
              <a href="login.html" class="px-4 py-3 rounded-lg border border-[#0859a6] text-[#0859a6] text-center font-bold">Login</a>
            </div>
          </div>
        </div>
      </nav>
    `;
  }
  if (footer) {
    footer.innerHTML = `
      <footer class="bg-[#042551] text-white pt-16 pb-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid md:grid-cols-4 gap-10">
            <div>
              <div class="flex items-center gap-3 mb-4">
                <div class="bg-white rounded-xl p-2"><img src="assets/images/alumni-01.png" alt="Official DBIT Alumni logo" class="h-12 w-auto object-contain"></div>
                <div><p class="font-extrabold text-xl">DBIT Alumni</p><p class="text-sm text-blue-100">Bengaluru</p></div>
              </div>
              <p class="text-blue-100 text-sm leading-6">A connected network of Don Bosco Institute of Technology graduates supporting mentorship, careers, entrepreneurship and lifelong bonds.</p>
            </div>
            <div>
              <h3 class="font-extrabold text-[#f7c04d] mb-4">Quick Links</h3>
              <div class="grid gap-2 text-sm text-blue-100">
                ${navLinks.map(([label, href]) => `<a href="${href}" class="hover:text-[#429321]">${label}</a>`).join("")}
              </div>
            </div>
            <div>
              <h3 class="font-extrabold text-[#f7c04d] mb-4">Contact</h3>
              <p class="text-sm text-blue-100 leading-7">Don Bosco Institute of Technology<br>Kumbalagodu, Mysore Road<br>Bengaluru, Karnataka</p>
              <p class="text-sm text-blue-100 mt-3">Email: alumni@dbit.co.in<br>Phone: +91 80 2843 7028</p>
            </div>
            <div>
              <h3 class="font-extrabold text-[#f7c04d] mb-4">Connect</h3>
              <div class="flex gap-3">
                <a href="https://dbit.edu.in/" class="w-10 h-10 rounded-full bg-white/10 grid place-items-center hover:bg-[#429321] hover:text-white" aria-label="DBIT website">W</a>
                <a href="https://www.linkedin.com/school/don-bosco-institute-of-technology-bangalore/" class="w-10 h-10 rounded-full bg-white/10 grid place-items-center hover:bg-[#429321] hover:text-white" aria-label="LinkedIn">in</a>
                <a href="https://www.youtube.com/results?search_query=DBIT+Bangalore" class="w-10 h-10 rounded-full bg-white/10 grid place-items-center hover:bg-[#429321] hover:text-white" aria-label="YouTube">▶</a>
              </div>
              <a href="register.html" class="inline-block mt-6 px-5 py-3 rounded-full bg-[#f7c04d] text-[#042551] font-extrabold">Join the Network</a>
            </div>
          </div>
          <div class="border-t border-white/10 mt-10 pt-6 text-sm text-blue-100 flex flex-col md:flex-row justify-between gap-3">
            <p>© 2026 DBIT Alumni Association. Static alumni portal concept.</p>
            <p>VTU Affiliated • Autonomous 2024 • Established 2001</p>
          </div>
        </div>
      </footer>
      <button id="back-to-top" class="fixed right-5 bottom-5 w-12 h-12 rounded-full bg-[#0859a6] text-white shadow-xl hidden" aria-label="Back to top">↑</button>
    `;
  }
}

function initSharedUI() {
  injectHeaderFooter();
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  menuToggle?.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("hidden") === false;
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  const nav = document.getElementById("navbar");
  const backToTop = document.getElementById("back-to-top");
  window.addEventListener("scroll", () => {
    nav?.classList.toggle("shadow-lg", window.scrollY > 20);
    backToTop?.classList.toggle("hidden", window.scrollY < 500);
  });
  backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", initSharedUI);
