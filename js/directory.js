const alumni = [
  ["Mr. R Darshan Kumar", "2014", "ECE", "Managing Director, Maxlite AAC Blocks", "Bengaluru"],
  ["Ms. Payal Chengappa", "2020", "CSE", "Creative Professional", "Bengaluru"],
  ["Ms. Pooja Khatei", "2013", "EEE", "Indian Army Major", "India"],
  ["Mrs. Sneha P J", "2012", "ECE", "Deputy Range Forest Officer & International Athlete", "Karnataka"],
  ["Mr. Swaraj Kumar", "2024", "CSE", "Software Engineer, Entomo", "Bengaluru"],
  ["Ms. Yuktha Gowda U", "2024", "ECE", "Graduate Engineer, Johnson Controls India", "Bengaluru"],
  ["Ms. Tamanna Singh", "2024", "CSE", "Cloud Developer, CRMIT Solutions", "Bengaluru"],
  ["Mr. Vivek Pai", "2018", "ISE", "Innovator & Engineering Partner, Metricdust", "Bengaluru"],
  ["Ms. Shamitha R", "2024", "ISE", "Associate Software Engineer, Quinnox", "Bengaluru"],
  ["Mr. Anupam Mathad", "2024", "ISE", "Associate Software Engineer, Carelon Global Solutions", "Bengaluru"],
  ["Mr. Abhinav P Rotti", "2024", "CSE", "Associate Software Engineer, TCS", "Bengaluru"],
  ["Ms. Asifa Tasneem", "2024", "CSE", "Associate Software Engineer, Tech Mahindra", "Bengaluru"],
  ["Ms. Nisha Shree S", "2024", "MBA", "Analyst, KPMG", "Bengaluru"],
  ["Ms. Reshma M", "2024", "EEE", "Graduate Engineer Trainee, Daimler", "Bengaluru"],
  ["Mr. Sai Charan Pradeep", "2024", "EEE", "Assistant Sales Manager, nVent Electricals", "Bengaluru"],
  ["Mr. Atif Arman", "2020", "MBA", "Manager, Think & Learn Pvt Ltd (BYJU'S)", "Bengaluru"],
  ["Ms. Suharsha Chougule", "2024", "ECE", "Associate Software Engineer, BOSCH", "Bengaluru"],
  ["Mr. Aakarshan Basu Bhardwaj", "2024", "CSE", "System Engineer, TCS", "Bengaluru"],
  ["Mr. Adhitya M Navada", "2024", "ECE", "MS Aspirant, Abroad", "Abroad"],
  ["Mr. Saba Shahrukh", "2024", "CSE", "Technical Consultant, Salesforce", "Bengaluru"],
  ["Mr. Hardik Koul Patel", "2024", "ISE", "System Engineer, Infosys", "Bengaluru"],
  ["Mr. Yogeshwar", "2024", "EEE", "Engineer, Wistron", "Bengaluru"],
  ["Ms. Vaishnavi Jhadhav", "2024", "ISE", "Associate Software Engineer, Harman Connected Services", "Bengaluru"],
  ["Mr. Ramanand Sirvi", "2024", "ISE", "Associate Software Engineer, Gigsy LLP", "Bengaluru"]
];

const alumniImages = [
  "assets/images/alumni-01.png"
];

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("directory-grid");
  if (!grid) return;
  const search = document.getElementById("directory-search");
  const pagination = document.getElementById("pagination");
  const checks = document.querySelectorAll("[data-filter]");
  let page = 1;
  const perPage = 8;

  function showSkeleton() {
    grid.innerHTML = Array.from({ length: 8 }).map(() => `
      <div class="card p-5">
        <div class="w-20 h-20 rounded-full skeleton"></div>
        <div class="h-5 w-2/3 skeleton rounded mt-5"></div>
        <div class="h-4 w-full skeleton rounded mt-3"></div>
        <div class="h-4 w-4/5 skeleton rounded mt-2"></div>
      </div>
    `).join("");
  }

  function filteredData() {
    const term = (search.value || "").toLowerCase();
    const active = [...checks].filter(c => c.checked).map(c => c.value);
    return alumni.filter(a => {
      const haystack = a.join(" ").toLowerCase();
      const matchesTerm = !term || haystack.includes(term);
      const matchesFilter = !active.length || active.includes(a[2]) || active.includes(a[1]) || active.includes(a[4]);
      return matchesTerm && matchesFilter;
    });
  }

  function render() {
    showSkeleton();
    setTimeout(() => {
      const data = filteredData();
      const pages = Math.max(Math.ceil(data.length / perPage), 1);
      page = Math.min(page, pages);
      const slice = data.slice((page - 1) * perPage, page * perPage);
      grid.innerHTML = slice.map(([name, batch, dept, company, location], cardIndex) => {
        const cleanName = name.replace(/^(Mr\.|Ms\.|Mrs\.)\s+/, "");
        const image = alumniImages[((page - 1) * perPage + cardIndex) % alumniImages.length];
        return `
          <article class="card p-5">
            <img class="w-20 h-20 rounded-full border-4 border-[#f7c04d] object-contain bg-white p-2" src="${image}" alt="${name}">
            <h3 class="mt-4 text-lg font-extrabold text-[#0859a6]">${name}</h3>
            <p class="text-sm font-semibold text-slate-500">${dept} • ${batch} Batch</p>
            <p class="mt-3 text-sm text-slate-700">${company}</p>
            <p class="text-sm text-slate-500">${location}</p>
            <a href="https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(cleanName)}" class="inline-flex mt-4 px-4 py-2 rounded-full bg-[#0859a6] text-white text-sm font-bold hover:bg-[#429321] hover:text-white">LinkedIn</a>
          </article>
        `;
      }).join("") || `<div class="card p-8 col-span-full text-center font-bold text-slate-600">No alumni matched the selected filters.</div>`;
      pagination.innerHTML = Array.from({ length: pages }).map((_, i) => `
        <button class="px-4 py-2 rounded-lg font-bold ${page === i + 1 ? "bg-[#0859a6] text-white" : "bg-white text-[#0859a6] border"}" data-page="${i + 1}" aria-label="Go to page ${i + 1}">${i + 1}</button>
      `).join("");
      pagination.querySelectorAll("[data-page]").forEach(btn => btn.addEventListener("click", () => {
        page = Number(btn.dataset.page);
        render();
      }));
    }, 350);
  }

  search.addEventListener("input", () => { page = 1; render(); });
  checks.forEach(check => check.addEventListener("change", () => { page = 1; render(); }));
  render();
});
