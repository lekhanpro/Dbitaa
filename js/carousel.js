const testimonials = [
  { quote: "The short term and long term training provided was just stupendous...", name: "Vaishnavi Jhadhav", meta: "ISE" },
  { quote: "I had immense pleasure studying in Don Bosco...", name: "Bhushan Hegde", meta: "ISE" },
  { quote: "The Don Bosco Institute of Technology's training and placement...", name: "Anagha Subramanya", meta: "ISE" },
  { quote: "Four years at DBIT-ECE was wonderful, supporting academic as well as sports...", name: "Mrs. Sneha P J", meta: "ECE" },
  { quote: "Away from the din of the city, the location and hostel...", name: "Jeevika P Hundekar", meta: "CSE" },
  { quote: "Great placement with multiple offers!", name: "Ramanand Sirvi", meta: "ISE" }
];

document.addEventListener("DOMContentLoaded", () => {
  const holder = document.getElementById("testimonial-carousel");
  if (!holder) return;
  let index = 0;
  let paused = false;

  function render() {
    const item = testimonials[index];
    holder.innerHTML = `
      <div class="card p-8 md:p-10 text-center max-w-4xl mx-auto">
        <p class="text-2xl md:text-3xl font-extrabold text-[#0859a6] leading-snug">“${item.quote}”</p>
        <p class="mt-6 font-bold text-slate-900">${item.name}</p>
        <p class="text-sm text-slate-500">${item.meta}</p>
        <div class="mt-6 flex justify-center gap-2">
          ${testimonials.map((_, i) => `<button class="w-2.5 h-2.5 rounded-full ${i === index ? "bg-[#0859a6]" : "bg-slate-300"}" data-slide="${i}" aria-label="Show testimonial ${i + 1}"></button>`).join("")}
        </div>
      </div>
    `;
    holder.querySelectorAll("[data-slide]").forEach(btn => {
      btn.addEventListener("click", () => {
        index = Number(btn.dataset.slide);
        render();
      });
    });
  }

  holder.addEventListener("mouseenter", () => paused = true);
  holder.addEventListener("mouseleave", () => paused = false);
  render();
  setInterval(() => {
    if (!paused) {
      index = (index + 1) % testimonials.length;
      render();
    }
  }, 3000);
});
