// GRID INTELIGENTE
const container = document.querySelector(".over-list-items");

const observer = new ResizeObserver(() => {
  const containerWidth = container.offsetWidth;
  const numColumns = Math.floor(containerWidth / 200);

  container.style.gridTemplateColumns = `repeat(${numColumns}, minmax(200px, 1fr))`;

  console.log({ container });
  console.log({ numColumns });
});

observer.observe(container);