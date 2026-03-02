/* 캐러셀 */
function setupCarouselCells(carousel) {
  const cells = carousel.querySelectorAll(".pf-carousel__cell");
  const count = cells.length;
  const radius = 500;
  const angleStep = 360 / count;

  cells.forEach((cell, i) => {
    const angle = i * angleStep;
    cell.style.transform = `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`;
  });
}

function createScrollAnimation(carousel) {
  const cards = carousel.querySelectorAll(".pf-card");

  const randomTiltX = (Math.random() - 0.5) * 20;
  const randomTiltZ = (Math.random() - 0.5) * 15;

  gsap
    .timeline({
      scrollTrigger: {
        trigger: carousel.closest(".pf-scene"),
        start: "top 90%",
        end: "bottom top",
        scrub: 1,
      },
    })
    .fromTo(
      carousel,
      {
        rotationY: 0,
        rotationX: randomTiltX,
        rotationZ: randomTiltZ,
      },
      {
        rotationY: -180,
        rotationX: randomTiltX,
        rotationZ: randomTiltZ,
      },
    )
    .fromTo(
      cards,
      { filter: "brightness(220%)" },
      { filter: "brightness(85%)" },
      0,
    );
}
/* Preview Open */
function openPreview(e) {
  e.preventDefault();
  const link = e.currentTarget.querySelector("a");
  if (!link) return;

  const id = link.getAttribute("href");
  const preview = document.querySelector(id);
  const wrapper = preview.closest(".pf-preview-wrapper");

  if (!wrapper) return;

  const scene = e.currentTarget.closest(".pf-scene");
  const carouselBody = scene.querySelector(".pf-carousel-body");
  const cards = scene.querySelectorAll(".pf-card");

  document.body.style.overflow = "hidden";

  const tl = gsap.timeline();

  tl.to(carouselBody, {
    rotationY: "+=45",
    duration: 0.6,
    ease: "power2.inOut",
  })
    .to(
      cards,
      {
        scale: 1.2,
        z: 200,
        opacity: 0.8,
        duration: 0.5,
        ease: "power2.in",
        stagger: 0.05,
      },
      "-=0.4",
    )

    .to(
      scene,
      {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      },
      "-=0.2",
    )

    .set(wrapper, { pointerEvents: "auto" })
    .to(
      wrapper,
      {
        autoAlpha: 1,
        duration: 0.3,
      },
      "-=0.1",
    )

    .fromTo(
      preview,
      { scale: 0.3, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.2",
    );
}

/* Preview Close */
function closePreview(e) {
  const wrapper = e.currentTarget.closest(".pf-preview-wrapper");
  const preview = e.currentTarget.closest(".pf-preview");

  const tl = gsap.timeline();

  tl.to(preview, {
    scale: 0.3,
    opacity: 0,
    duration: 0.4,
    ease: "power2.in",
  })

    .to(
      wrapper,
      {
        autoAlpha: 0,
        duration: 0.3,
      },
      "-=0.2",
    )

    .add(() => {
      gsap.set(wrapper, { pointerEvents: "none" });
      gsap.set(preview, { scale: 1, opacity: 1 });
      document.body.style.overflow = "";

      gsap.to(".pf-scene", {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(".pf-card", {
        scale: 1,
        z: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".pf-carousel-body").forEach((carousel) => {
    setupCarouselCells(carousel);
    createScrollAnimation(carousel);
  });

  document.querySelectorAll(".pf-scene__title").forEach((title) => {
    title.addEventListener("click", openPreview);
  });

  document.querySelectorAll(".pf-preview__close").forEach((btn) => {
    btn.addEventListener("click", closePreview);
  });
});
