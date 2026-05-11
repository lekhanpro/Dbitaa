document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;
  const animate = counter => {
    const target = Number(counter.dataset.count);
    const suffix = counter.dataset.suffix || "";
    const duration = 1500;
    const start = performance.now();
    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(progress * target);
      counter.textContent = value.toLocaleString("en-IN") + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.done) {
        entry.target.dataset.done = "true";
        animate(entry.target);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(counter => observer.observe(counter));
});
