(() => {
  // Countdown logic - explicitly configured for 9:00 AM MST (Arizona Time, UTC-7)
  const targetDate = new Date("2026-08-08T09:00:00-07:00").getTime();
  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minsEl = document.getElementById("cd-mins");
  const secsEl = document.getElementById("cd-secs");

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minsEl.textContent = "00";
      secsEl.textContent = "00";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = days.toString().padStart(2, '0');
    hoursEl.textContent = hours.toString().padStart(2, '0');
    minsEl.textContent = mins.toString().padStart(2, '0');
    secsEl.textContent = secs.toString().padStart(2, '0');
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // 3D Card Hover logic
  const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!supportsHover.matches || reducedMotion.matches) return;

  const cards = document.querySelectorAll(".date-box, .detail, .feature, .photo, .qa");
  const maxTilt = 11;

  cards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * maxTilt * 2;
      const rotateX = (0.5 - y) * maxTilt * 2;

      card.style.setProperty("--card-rotate-x", `${rotateX.toFixed(2)}deg`);
      card.style.setProperty("--card-rotate-y", `${rotateY.toFixed(2)}deg`);
      card.style.setProperty("--card-glow-x", `${(x * 100).toFixed(2)}%`);
      card.style.setProperty("--card-glow-y", `${(y * 100).toFixed(2)}%`);
    });

    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--card-rotate-x", "0deg");
      card.style.setProperty("--card-rotate-y", "0deg");
      card.style.setProperty("--card-glow-x", "50%");
      card.style.setProperty("--card-glow-y", "50%");
    });
  });
})();
