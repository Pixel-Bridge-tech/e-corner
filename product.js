const heroSwiper = new Swiper(".heroSwiper", {

  loop: true,

  speed: 1000,

  autoHeight: window.innerWidth <= 767,

  autoplay: {
      delay: 5000,
      disableOnInteraction: false,
  },

  pagination: {
      el: ".swiper-pagination",
      clickable: true,
  },

});

window.addEventListener("resize", () => {
  const isMobile = window.innerWidth <= 767;
  if (heroSwiper.params.autoHeight !== isMobile) {
    heroSwiper.params.autoHeight = isMobile;
    heroSwiper.update();
  }
});

const productCards = document.querySelectorAll(".product-card");

const whatsappNumber = "916383629562"; // Replace with client's number

productCards.forEach(card => {

    card.addEventListener("click", function (e) {

        e.preventDefault();

        const product = this.dataset.product;

        const message =
`Hi eCorner Electronics,

I'm interested in the ${product}.

Could you please share:

• Latest Price
• Available Colours
• Stock Availability
• Warranty Details

Thank you!`;

        const url =
`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        window.open(url, "_blank");

    });

});