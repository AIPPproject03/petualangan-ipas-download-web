// ============== INTERSECTION OBSERVER FOR FADE-IN ============== //
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

// ============== STICKY HEADER ============== //
const stickyHeader = document.getElementById("stickyHeader");
const hero = document.getElementById("hero");

window.addEventListener("scroll", () => {
  const heroBottom = hero.offsetHeight;
  if (window.scrollY > heroBottom * 0.5) {
    stickyHeader.classList.add("visible");
  } else {
    stickyHeader.classList.remove("visible");
  }
});

// ============== SMOOTH SCROLL FOR ANCHOR LINKS ============== //
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});

// ============== CAROUSEL ============== //
const carousel = document.getElementById("carousel");
const carouselDots = document.getElementById("carouselDots");
const totalItems = carousel.querySelectorAll(".carousel-item").length;

// Create dots
for (let i = 0; i < totalItems; i++) {
  const dot = document.createElement("div");
  dot.className = "carousel-dot" + (i === 0 ? " active" : "");
  dot.addEventListener("click", () => scrollToCarouselItem(i));
  carouselDots.appendChild(dot);
}

function scrollToCarouselItem(index) {
  const item = carousel.querySelectorAll(".carousel-item")[index];
  item.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "center",
  });
}

// Update active dot on scroll
carousel.addEventListener("scroll", () => {
  const scrollPosition = carousel.scrollLeft;
  const itemWidth = carousel.querySelector(".carousel-item").offsetWidth + 20; // gap
  const activeIndex = Math.round(scrollPosition / itemWidth);

  document.querySelectorAll(".carousel-dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === activeIndex);
  });
});

// Touch swipe support
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].screenX;
  },
  false,
);

carousel.addEventListener(
  "touchend",
  (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  },
  false,
);

function handleSwipe() {
  const swipeThreshold = 50;
  if (touchStartX - touchEndX > swipeThreshold) {
    // Swiped left
    carousel.scrollBy({ left: 300, behavior: "smooth" });
  }
  if (touchEndX - touchStartX > swipeThreshold) {
    // Swiped right
    carousel.scrollBy({ left: -300, behavior: "smooth" });
  }
}

// ============== STEPPER ACCORDION ============== //
const stepperItems = document.querySelectorAll(".stepper-item");

stepperItems.forEach((item, index) => {
  const header = item.querySelector(".stepper-header");
  const body = item.querySelector(".stepper-body");

  header.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    // Close all items
    stepperItems.forEach((el) => {
      el.classList.remove("active");
      el.querySelector(".stepper-body").classList.remove("open");
    });

    // Open clicked item if it was not active
    if (!isActive) {
      item.classList.add("active");
      body.classList.add("open");

      // Update progress bar
      const step = parseInt(item.getAttribute("data-step"));
      updateProgressBar(step);
    }
  });
});

function updateProgressBar(step) {
  const progressFill = document.getElementById("progressFill");
  const progress = (step / 4) * 100;
  progressFill.style.width = progress + "%";
}

// ============== FAQ ACCORDION ============== //
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const header = item.querySelector(".faq-header");
  const body = item.querySelector(".faq-body");

  header.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");

    // Close all FAQ items
    faqItems.forEach((el) => {
      el.classList.remove("open");
      el.querySelector(".faq-body").classList.remove("open");
    });

    // Open clicked item if it was not open
    if (!isOpen) {
      item.classList.add("open");
      body.classList.add("open");
    }
  });
});

// ============== CONFETTI EFFECT ============== //
function createConfetti() {
  const confettiContainer = document.createElement("div");
  confettiContainer.style.position = "fixed";
  confettiContainer.style.top = "0";
  confettiContainer.style.left = "0";
  confettiContainer.style.width = "100%";
  confettiContainer.style.height = "100%";
  confettiContainer.style.pointerEvents = "none";
  confettiContainer.style.zIndex = "9999";
  document.body.appendChild(confettiContainer);

  const colors = ["#1A6DB5", "#4DAEE3", "#4CAF50", "#FFD93D", "#E85D4A"];
  const confettiPieces = 20;

  for (let i = 0; i < confettiPieces; i++) {
    const piece = document.createElement("div");
    piece.style.position = "absolute";
    piece.style.width = "10px";
    piece.style.height = "10px";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.borderRadius = "50%";
    piece.style.left = Math.random() * window.innerWidth + "px";
    piece.style.top = "-10px";
    piece.style.animation = `confettiFall ${0.8 + Math.random() * 0.4}s ease-in forwards`;
    piece.style.animationDelay = Math.random() * 0.2 + "s";
    confettiContainer.appendChild(piece);
  }

  setTimeout(() => confettiContainer.remove(), 1500);
}

// Add confetti trigger to download buttons
document.querySelectorAll('a[href*="apk/"]').forEach((btn) => {
  btn.addEventListener("click", (e) => {
    createConfetti();
  });
});

// ============== DRIVER.JS GUIDE ============== //
const startTourBtn = document.getElementById("startTourBtn");

function getDriverFactory() {
  return window.driver?.js?.driver ?? window.driver?.driver ?? null;
}

function setTourButtonLoading(isLoading) {
  if (!startTourBtn) {
    return;
  }

  startTourBtn.classList.toggle("is-loading", isLoading);
  startTourBtn.setAttribute("aria-busy", isLoading ? "true" : "false");
}

function startDownloadGuide() {
  const driverFactory = getDriverFactory();

  if (typeof driverFactory !== "function") {
    document
      .getElementById("download")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  setTourButtonLoading(true);

  const tour = driverFactory({
    animate: true,
    smoothScroll: true,
    allowClose: true,
    allowKeyboardControl: true,
    overlayColor: "#102433",
    overlayOpacity: 0.58,
    stagePadding: 14,
    stageRadius: 18,
    popoverClass: "petualangan-tour",
    showProgress: true,
    progressText: "{{current}} / {{total}}",
    nextBtnText: "Lanjut",
    prevBtnText: "Kembali",
    doneBtnText: "Selesai",
    showButtons: ["previous", "next", "close"],
    steps: [
      {
        element: "#startTourBtn",
        popover: {
          title: "Panduan Download",
          description:
            "Klik tombol ini kalau kamu mau dibimbing langsung ke alur download dan install.",
          side: "bottom",
          align: "center",
        },
      },
      {
        element: "#playProtectWarning",
        popover: {
          title: "Warning Play Protect",
          description:
            "Nanti akan muncul warning seperti File might be harmful atau App scan recommended. Lanjutkan dengan Download anyway lalu Install without scanning.",
          side: "top",
          align: "start",
        },
      },
      {
        element: '.stepper-item[data-step="2"] .stepper-header',
        popover: {
          title: "Langkah Download APK",
          description:
            "Setelah itu buka langkah download APK di bawah untuk mulai unduh file Petualangan IPAS.",
          side: "top",
          align: "start",
        },
      },
    ],
    onDestroyed: () => {
      setTourButtonLoading(false);
    },
    onCloseClick: () => {
      tour.destroy();
    },
  });

  tour.drive();
}

if (startTourBtn) {
  startTourBtn.addEventListener("click", startDownloadGuide);
}
