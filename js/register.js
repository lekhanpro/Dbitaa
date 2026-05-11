document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registration-form");
  if (!form) return;
  const panels = [...document.querySelectorAll(".step-panel")];
  const progress = document.getElementById("form-progress");
  const review = document.getElementById("review-content");
  const success = document.getElementById("success-screen");
  let step = 0;

  function setStep(nextStep) {
    step = nextStep;
    panels.forEach((panel, i) => panel.classList.toggle("active", i === step));
    progress.style.width = `${((step + 1) / panels.length) * 100}%`;
    document.querySelectorAll("[data-step-label]").forEach((label, i) => {
      label.classList.toggle("text-[#0859a6]", i <= step);
      label.classList.toggle("font-extrabold", i === step);
    });
    if (step === panels.length - 1) renderReview();
  }

  function validateStep() {
    const inputs = panels[step].querySelectorAll("[required]");
    let valid = true;
    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.classList.add("border-red-500");
        valid = false;
      } else {
        input.classList.remove("border-red-500");
      }
      if (input.type === "email" && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        input.classList.add("border-red-500");
        valid = false;
      }
    });
    return valid;
  }

  function renderReview() {
    const data = new FormData(form);
    const rows = [
      ["Full Name", data.get("fullName")],
      ["Email", data.get("email")],
      ["Phone", data.get("phone")],
      ["Batch Year", data.get("batchYear")],
      ["Department", data.get("department")],
      ["Degree", data.get("degree")],
      ["Current Company", data.get("company")],
      ["Designation", data.get("designation")],
      ["City", data.get("city")],
      ["Country", data.get("country")],
      ["LinkedIn", data.get("linkedin")]
    ];
    review.innerHTML = rows.map(([label, value]) => `
      <div class="flex justify-between gap-4 border-b py-3">
        <span class="font-bold text-slate-600">${label}</span>
        <span class="text-right text-slate-900">${value || "Not provided"}</span>
      </div>
    `).join("");
  }

  document.querySelectorAll("[data-next]").forEach(btn => btn.addEventListener("click", () => {
    if (validateStep()) setStep(Math.min(step + 1, panels.length - 1));
  }));
  document.querySelectorAll("[data-prev]").forEach(btn => btn.addEventListener("click", () => setStep(Math.max(step - 1, 0))));
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!validateStep()) return;
    form.classList.add("hidden");
    success.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  setStep(0);
});
