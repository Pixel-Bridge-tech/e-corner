document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const toggle = document.querySelector(".nav-toggle");
  const productsNav = document.querySelector(".products-nav");

  if (!navbar || !toggle) return;

  const closeNav = () => {
    navbar.classList.remove("nav-open");
    document.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    productsNav?.classList.remove("dropdown-open");
  };

  toggle.addEventListener("click", () => {
    const open = !navbar.classList.contains("nav-open");
    navbar.classList.toggle("nav-open", open);
    document.body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    if (!open) productsNav?.classList.remove("dropdown-open");
  });

  document.addEventListener("click", (e) => {
    if (!navbar.classList.contains("nav-open")) return;
    if (!navbar.contains(e.target)) closeNav();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) closeNav();
  });

  navbar.querySelectorAll(".nav-links a").forEach((link) => {
    const isProductsParent = link.parentElement?.classList.contains("products-nav");
    if (isProductsParent) return;

    link.addEventListener("click", () => {
      if (window.innerWidth < 1024) closeNav();
    });
  });

  const productsLink = productsNav?.querySelector(":scope > a");
  if (productsLink) {
    productsLink.addEventListener("click", (e) => {
      if (window.innerWidth < 1024) {
        e.preventDefault();
        productsNav.classList.toggle("dropdown-open");
      }
    });
  }

  productsNav?.querySelectorAll(".dropdown-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 1024) closeNav();
    });
  });
});
