(() => {
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
