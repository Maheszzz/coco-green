// import { config } from './config.js';

document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".animate-on-scroll");

  function handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        // Remove visible class when element is out of view
        entry.target.classList.remove("visible");
      }
    });
  }

  function initializeObserver() {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: "0px",
    });
    elements.forEach((element) => {
      observer.observe(element);
    });
  }

  initializeObserver();

  const mobileMenu = document.querySelector(".mobile-menu");
  const navLinks = document.querySelector(".nav-links");

  mobileMenu.addEventListener("click", function (e) {
    e.stopPropagation(); // Add this line
    this.classList.toggle("active");
    navLinks.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  });

  // Close menu when clicking a link or outside
  document.addEventListener("click", function (e) {
    if (
      !navLinks.contains(e.target) &&
      !mobileMenu.contains(e.target) &&
      navLinks.classList.contains("active")
    ) {
      mobileMenu.classList.remove("active");
      navLinks.classList.remove("active");
      document.body.classList.remove("menu-open");
    }
  });

  // Close menu when window is resized above mobile breakpoint
  window.addEventListener("resize", function () {
    if (window.innerWidth > 992) {
      mobileMenu.classList.remove("active");
      navLinks.classList.remove("active");
      document.body.classList.remove("menu-open");
    }
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.remove("active"); // Add this line
      navLinks.classList.remove("active");
      document.body.classList.remove("menu-open");
    });
  });

  const thumbnails = document.querySelectorAll(".thumbnail");
  const mainImage = document.getElementById("mainImage");

  // Set up thumbnail click behavior
  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      // Remove active class from all thumbnails
      thumbnails.forEach((t) => t.classList.remove("active"));

      // Add active class to clicked thumbnail
      this.classList.add("active");

      // Update main image
      const imgSrc = this.getAttribute("data-img");
      mainImage.src = imgSrc;
    });
  });

  // Handle both logo and home link clicks
  document.querySelector(".logo-link").addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  });

  // Update existing navigation click handlers
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");

      if (href === "#home") {
        window.scrollTo({
          top: 0,
          behavior: "auto",
        });
      } else {
        const target = document.querySelector(href);
        if (target) {
          const headerOffset = 70;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Add footer product link handlers
  document
    .querySelectorAll('.footer-links a[href="#products"]')
    .forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const productName = this.textContent.trim();
        const data = productData[productName];

        if (data) {
          const modal = document.getElementById("inquiryModal");
          const mainImage = document.getElementById("modalMainImage");
          const productNameEl = document.getElementById("modalProductName");
          const description = document.getElementById(
            "modalProductDescription"
          );
          const features = document.getElementById("modalFeatures");
          const closeBtn = document.querySelector(".close-modal");

          // Update modal content
          productNameEl.textContent = productName;
          description.textContent = data.description;
          features.innerHTML = data.features
            .map((f) => `<li>${f}</li>`)
            .join("");
          mainImage.src = data.mainImage;

          // Update thumbnails
          document.querySelectorAll(".modal-thumbnail").forEach((thumb, i) => {
            if (data.thumbnails[i]) {
              thumb.src = data.thumbnails[i];
              thumb.style.display = "block";
              thumb.classList.toggle("active", i === 0);
            } else {
              thumb.style.display = "none";
            }
          });

          // Show modal
          modal.style.display = "flex";
          closeBtn.style.display = "flex";
          document.body.style.overflow = "hidden";
        } else {
          // If no matching product data, scroll to products section
          const target = document.querySelector("#products");
          if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        }
      });
    });
});

// Add this after DOMContentLoaded
window.addEventListener("scroll", function () {
  AOS.refresh(); // Refresh AOS on scroll to recalculate animations
});

// mini image change

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("inquiryModal"); // Changed from inquire-modal to inquiryModal
  const closeBtn = document.querySelector(".close-modal"); // Changed from close-btn to close-modal
  const inquireButtons = document.querySelectorAll(".inquire-now-btn");
  const bottomBtn = document.getElementById("bottom-btn"); // Ensure button exists
  const thumbnailContainer = document.querySelector(".thumbnail-container"); // Ensure container exists

  if (modal && inquireButtons) {
    // Added null check
    inquireButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        modal.style.display = "flex";
      });
    });
  }

  if (closeBtn && modal) {
    // Added null check
    closeBtn.addEventListener("click", function () {
      modal.style.display = "none";
    });

    window.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  if (bottomBtn && thumbnailContainer) {
    bottomBtn.addEventListener("click", () => {
      thumbnailContainer.scrollBy({ top: 100, behavior: "smooth" });
    });
  }
});

// inquir

let slideIndex = 1;
showSlides(slideIndex);

function changeSlide(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  const slides = document.getElementsByClassName("slide");
  const dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  Array.from(slides).forEach((slide) => (slide.style.display = "none"));
  Array.from(dots).forEach((dot) => dot.classList.remove("active"));

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add("active");
}

// Auto advance slides every 5 seconds
setInterval(() => {
  changeSlide(1);
}, 5000);

// Product Inquiry Modal
function initializeModal() {
  const modalElements = {
    modal: document.getElementById("inquiryModal"),
    mainImage: document.getElementById("modalMainImage"),
    thumbnails: document.querySelectorAll(".modal-thumbnail"),
    productName: document.getElementById("modalProductName"),
    description: document.getElementById("modalProductDescription"),
    features: document.getElementById("modalFeatures"),
    closeBtn: document.querySelector(".inquiry-content .close-modal"),
    mainImageContainer: document.querySelector(".main-image-container"),
    contactBtn: document.querySelector(".contact-btn"),
  };

  // Simpler double-click zoom functionality without animations
  modalElements.mainImageContainer.addEventListener("dblclick", function (e) {
    const image = modalElements.mainImage;
    const isZoomed = image.classList.toggle("zoomed");
    this.style.cursor = isZoomed ? "zoom-out" : "zoom-in";

    if (!isZoomed) {
      image.style.transform = "";
      translateX = 0;
      translateY = 0;
    }
  });

  // Pan functionality without animations
  let isDragging = false;
  let startX,
    startY,
    translateX = 0,
    translateY = 0;

  modalElements.mainImageContainer.addEventListener("mousedown", function (e) {
    const image = modalElements.mainImage;
    if (!image.classList.contains("zoomed")) return;

    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    this.style.cursor = "grabbing";
  });

  modalElements.mainImageContainer.addEventListener("mousemove", function (e) {
    const image = modalElements.mainImage;
    if (!isDragging || !image.classList.contains("zoomed")) return;

    translateX = e.clientX - startX;
    translateY = e.clientY - startY;

    // Limit panning
    translateX = Math.min(Math.max(translateX, -200), 200);
    translateY = Math.min(Math.max(translateY, -200), 200);

    image.style.transform = `scale(2) translate(${translateX}px, ${translateY}px)`;
  });

  modalElements.mainImageContainer.addEventListener("mouseup", function () {
    isDragging = false;
    this.style.cursor = modalElements.mainImage.classList.contains("zoomed")
      ? "zoom-out"
      : "zoom-in";
  });

  modalElements.mainImageContainer.addEventListener("mouseleave", function () {
    isDragging = false;
  });

  // Reset zoom when changing images
  function resetZoom() {
    modalElements.mainImage.classList.remove("zoomed");
    modalElements.mainImage.style.transform = "";
    modalElements.mainImageContainer.style.cursor = "zoom-in";
    translateX = 0;
    translateY = 0;
  }

  function updateModal(data) {
    if (!data) return;
    modalElements.productName.textContent = data.name;
    modalElements.description.textContent = data.description;
    modalElements.features.innerHTML = data.features
      .map((f) => `<li>${f}</li>`)
      .join("");
    modalElements.mainImage.src = data.mainImage;

    modalElements.thumbnails.forEach((thumb, i) => {
      if (data.thumbnails[i]) {
        thumb.src = data.thumbnails[i];
        thumb.style.display = "block";
        thumb.classList.toggle("active", i === 0);
      } else {
        thumb.style.display = "none";
      }
    });
    resetZoom();
  }

  function openModal(productName) {
    const data = productData[productName];
    if (!data) return;
    updateModal({ ...data, name: productName });
    modalElements.modal.style.display = "flex";
    modalElements.closeBtn.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  function cleanupModal() {
    modalElements.modal.style.display = "none";
    modalElements.closeBtn.style.display = "none";
    document.body.style.overflow = "";
    resetZoom();
  }

  function handleModalClose(e) {
    if (
      e.target === modalElements.modal ||
      e.target === modalElements.closeBtn
    ) {
      cleanupModal();
    }
  }

  // Add touch events for mobile
  modalElements.modal?.addEventListener("touchend", handleModalClose, {
    passive: true,
  });
  modalElements.closeBtn?.addEventListener("touchend", cleanupModal, {
    passive: true,
  });

  // Handle page visibility changes
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cleanupModal();
    }
  });

  // Handle navigation
  window.addEventListener("popstate", cleanupModal);

  // Handle scroll on mobile
  let touchStartY = 0;
  modalElements.modal?.addEventListener(
    "touchstart",
    (e) => {
      touchStartY = e.touches[0].clientY;
    },
    { passive: true }
  );

  modalElements.modal?.addEventListener(
    "touchmove",
    (e) => {
      const touchEndY = e.touches[0].clientY;
      const delta = touchEndY - touchStartY;

      if (Math.abs(delta) > 50) {
        cleanupModal();
      }
    },
    { passive: true }
  );

  // Update existing event listeners
  modalElements.closeBtn.addEventListener("click", cleanupModal);
  modalElements.modal.addEventListener("click", handleModalClose);

  // Replace existing close function
  function closeModal() {
    cleanupModal();
  }

  window.closeModal = closeModal;

  function closeModal() {
    modalElements.modal.style.display = "none";
    modalElements.closeBtn.style.display = "none";
    document.body.style.overflow = "";
  }

  function scrollToContact() {
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      closeModal();
      const headerOffset = 70;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }

  // Handle form validation
  function validateForm(form) {
    const email = form.querySelector('input[type="email"]');
    const message = form.querySelector("textarea");
    let isValid = true;

    [email, message].forEach((field) => {
      if (!field.value.trim()) {
        field.classList.add("error");
        isValid = false;
      } else {
        field.classList.remove("error");
      }
    });

    return isValid;
  }

  // Word count limiter
  const messageArea = document.getElementById("message");
  const wordCount = document.getElementById("word-count");

  function updateWordCount() {
    const words = messageArea.value
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    const count = Math.min(words.length, 500);
    wordCount.textContent = count;

    if (count > 500) {
      const truncatedWords = words.slice(0, 500);
      messageArea.value = truncatedWords.join(" ");
      wordCount.style.color = "red";
    } else {
      wordCount.style.color = "#666";
    }
  }

  messageArea?.addEventListener("input", updateWordCount);

  // Event Listeners
  document.querySelectorAll(".inquire-now-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const productName = btn
        .closest(".product-card")
        .querySelector("h3").textContent;
      openModal(productName);
    });
  });

  modalElements.thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", function () {
      modalElements.mainImage.src = this.src;
      modalElements.thumbnails.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");
    });
  });

  modalElements.closeBtn.addEventListener("click", closeModal);
  modalElements.modal.addEventListener("click", (e) => {
    if (e.target === modalElements.modal) closeModal();
  });

  modalElements.contactBtn?.addEventListener("click", function (e) {
    e.preventDefault();
    scrollToContact();
  });

  window.closeModal = closeModal;

  function cleanupModalState() {
    modalElements.modal.style.display = "none";
    modalElements.closeBtn.style.display = "none";
    document.body.style.overflow = "";
    resetZoom();
  }

  // Handle navigation links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      cleanupModalState();
    });
  });

  // Handle page visibility changes
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cleanupModalState();
    }
  });

  // Handle page unload
  window.addEventListener("beforeunload", cleanupModalState);

  // Handle mobile scroll
  if (typeof touchStartY === "undefined") {
    let touchStartY = 0;
  }
  modalElements.modal?.addEventListener(
    "touchstart",
    (e) => {
      touchStartY = e.touches[0].clientY;
    },
    { passive: true }
  );

  modalElements.modal?.addEventListener(
    "touchmove",
    (e) => {
      const touchEndY = e.touches[0].clientY;
      const delta = Math.abs(touchEndY - touchStartY);

      if (delta > 50) {
        cleanupModalState();
      }
    },
    { passive: true }
  );

  // Update existing modal handlers
  modalElements.closeBtn.addEventListener("click", cleanupModalState);
  modalElements.modal.addEventListener("click", (e) => {
    if (e.target === modalElements.modal) {
      cleanupModalState();
    }
  });

  // Update the window.closeModal reference
  window.closeModal = cleanupModalState;

  // Footer product links
  document
    .querySelectorAll('.footer-links a[href="#products"]')
    .forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const productName = link.textContent.trim();
        openModal(productName);
      });
    });

  // Footer product links
  document
    .querySelectorAll('.footer-links a[href="#products"]')
    .forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        // Scroll to products section smoothly
        const target = document.querySelector("#products");
        if (target) {
          const headerOffset = 70;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      });
    });
}

document.addEventListener("DOMContentLoaded", initializeModal);

const productData = {
  "Coir NetMat": {
    mainImage: "coco-photos/photo12.jpg",
    thumbnails: [
      "coco-photos/photo12.jpg",
      "coco-photos/photo13.jpg",
      "coco-photos/photo14.jpg",
      "coco-photos/photo15.jpg",
    ],
    description:
      "Our premium Coir NetMat is perfect for erosion control and soil stabilization. Made from high-quality coconut fibers, it provides excellent durability and natural decomposition.",
    features: [
      "Prevents erosion and supports growth",
      "Biodegradable and eco-friendly",
      "Enhances stability in landscapes",
      "Retains moisture for plant health",
    ],
  },
  "Coir Mat": {
    mainImage: "coco-photos/photo14.jpg",
    thumbnails: [
      "coco-photos/photo14.jpg",
      "coco-photos/photo15.jpg",
      "coco-photos/photo16.jpg",
      "coco-photos/photo17.jpg",
    ],
    description:
      "Enhanced drainage and aeration for optimal plant growth. Our Coir Mat provides perfect moisture balance and root support.",
    features: [
      "Perfect for orchids and epiphytes",
      "Slow breakdown for long-lasting use",
      "Creates air pockets in soil mixes",
      "Ideal for moisture management",
    ],
  },
  "Coir Yarn": {
    mainImage: "coco-photos/photo22.jpg",
    thumbnails: [
      "coco-photos/photo22.jpg",
      "coco-photos/photo23.jpg",
      "coco-photos/photo24.jpg",
      "coco-photos/photo25.jpg",
    ],
    description:
      "Fine-textured coir yarn perfect for various agricultural and horticultural applications. Provides excellent strength and durability.",
    features: [
      "Superior water absorption",
      "Excellent root development",
      "Low EC for sensitive plants",
      "Reduces need for frequent watering",
    ],
  },
  "Coir Fiber": {
    mainImage: "coco-photos/photo35.jpg",
    thumbnails: [
      "coco-photos/photo35.jpg",
      "coco-photos/photo36.jpg",
      "coco-photos/photo37.jpg",
      "coco-photos/photo38.jpg",
    ],
    description:
      "High-quality coir fiber extracted from coconut husks, ideal for various industrial and agricultural applications.",
    features: [
      "Convenient for commercial growers",
      "Pre-buffered and pH balanced",
      "Reduces transplant shock",
      "Biodegradable packaging",
    ],
  },
  "Coir Mesh Roll": {
    mainImage: "coco-photos/photo11.jpg",
    thumbnails: [
      "coco-photos/photo11.jpg",
      "coco-photos/photo12.jpg",
      "coco-photos/photo13.jpg",
      "coco-photos/photo14.jpg",
    ],
    description:
      "Durable mesh rolls made from coconut fiber, perfect for soil stabilization and erosion control projects.",
    features: [
      "Suppresses weed growth",
      "Conserves soil moisture",
      "Regulates soil temperature",
      "Attractive natural appearance",
    ],
  },
  "Coco Peat": {
    mainImage: "coco-photos/photo33.jpg",
    thumbnails: [
      "coco-photos/photo33.jpg",
      "coco-photos/photo34.jpg",
      "coco-photos/photo35.jpg",
      "coco-photos/photo36.jpg",
    ],
    description:
      "Premium quality coco peat processed from coconut husks, ideal for soilless growing and soil amendment.",
    features: [
      "Slow-release nutrients",
      "Enhances soil microbial activity",
      "Improves nutrient cycling",
      "Chemical-free crop nutrition",
    ],
  },
};

// Make sendemail function global
window.sendemail = function () {
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  const feedbackMessage = document.getElementById("feedback-message");

  // Remove existing error states
  email.classList.remove("error");
  message.classList.remove("error");

  // Check required fields
  let isValid = true;
  if (!email.value.trim()) {
    email.classList.add("error");
    isValid = false;
  }
  if (!message.value.trim()) {
    message.classList.add("error");
    isValid = false;
  }

  if (!isValid) return;

  // Continue with sending email if valid
  feedbackMessage.textContent = "Sending...";
  feedbackMessage.style.color = "blue";

  // ...existing email sending code...
};

document.addEventListener("DOMContentLoaded", function () {
  const messageArea = document.getElementById("message");
  const wordCount = document.getElementById("word-count");

  messageArea.addEventListener("input", function () {
    const words = this.value
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    const count = words.length;
    wordCount.textContent = count;

    if (count > 500) {
      wordCount.style.color = "red";
      messageArea.setCustomValidity("Message must not exceed 500 words");
    } else {
      wordCount.style.color = "#666";
      messageArea.setCustomValidity("");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const messageArea = document.getElementById("message");
  const wordCount = document.getElementById("word-count");
  const charCount = document.querySelector(".char-count");
  const WORD_LIMIT = 500;
  let limitAlertTimeout;

  function showLimitAlert() {
    const alertEl = document.createElement("div");
    alertEl.className = "word-limit-alert";
    alertEl.textContent = "Word limit reached (500 words)";
    messageArea.parentElement.appendChild(alertEl);

    setTimeout(() => alertEl.classList.add("show"), 10);
    limitAlertTimeout = setTimeout(() => {
      alertEl.classList.remove("show");
      setTimeout(() => alertEl.remove(), 300);
    }, 3000);
  }

  function updateWordCount() {
    const text = messageArea.value.trim();
    const words = text ? text.split(/\s+/) : [];
    const count = words.length;

    wordCount.textContent = count;
    charCount.classList.toggle("limit-reached", count >= WORD_LIMIT);

    if (count > WORD_LIMIT) {
      const truncatedText = words.slice(0, WORD_LIMIT).join(" ");
      messageArea.value = truncatedText;

      if (limitAlertTimeout) clearTimeout(limitAlertTimeout);
      showLimitAlert();
    }
  }

  messageArea?.addEventListener("input", updateWordCount);
  messageArea?.addEventListener("paste", (e) => {
    setTimeout(updateWordCount, 0);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const messageArea = document.getElementById("message");
  const wordCount = document.getElementById("word-count");
  const WORD_LIMIT = 500;

  function countWords(text) {
    // Remove extra whitespace and split into words
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  }

  function enforceWordLimit(textarea) {
    const text = textarea.value;
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    const count = words.length;

    wordCount.textContent = count;

    if (count > WORD_LIMIT) {
      // Truncate to 500 words
      textarea.value = words.slice(0, WORD_LIMIT).join(" ");
      wordCount.style.color = "red";

      // Show alert
      const alertDiv = document.createElement("div");
      alertDiv.className = "word-limit-alert show";
      alertDiv.textContent = "Message limited to 500 words";
      textarea.parentElement.appendChild(alertDiv);

      // Remove alert after 3 seconds
      setTimeout(() => {
        alertDiv.remove();
      }, 3000);
    } else {
      wordCount.style.color = count >= WORD_LIMIT * 0.9 ? "#ff4444" : "#666";
    }
  }

  if (messageArea) {
    messageArea.addEventListener("input", function () {
      enforceWordLimit(this);
    });

    messageArea.addEventListener("paste", function (e) {
      setTimeout(() => enforceWordLimit(this), 0);
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const messageArea = document.getElementById("message");
  const wordCount = document.getElementById("word-count");
  const WORD_LIMIT = 500;

  function getWordCount(text) {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  }

  function checkWordLimit(e) {
    const text = messageArea.value;
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    const count = words.length;

    // Update word count display
    wordCount.textContent = count;

    // If word limit is exceeded
    if (count > WORD_LIMIT) {
      e.preventDefault(); // Prevent default input
      messageArea.value = words.slice(0, WORD_LIMIT).join(" "); // Truncate to 500 words

      // Show alert
      const alertDiv = document.createElement("div");
      alertDiv.className = "word-limit-alert show";
      alertDiv.textContent = "Word limit reached (500 words)";
      messageArea.parentElement.appendChild(alertDiv);

      // Remove alert after 3 seconds
      setTimeout(() => alertDiv.remove(), 3000);

      return false;
    }

    // Change color when approaching limit
    wordCount.style.color = count >= WORD_LIMIT * 0.9 ? "#ff4444" : "#666";
    return true;
  }

  if (messageArea) {
    messageArea.addEventListener("beforeinput", function (e) {
      const futureText =
        this.value.slice(0, this.selectionStart) +
        (e.data || "") +
        this.value.slice(this.selectionEnd);

      if (getWordCount(futureText) > WORD_LIMIT) {
        e.preventDefault();
      }
    });

    messageArea.addEventListener("input", checkWordLimit);

    messageArea.addEventListener("paste", function (e) {
      e.preventDefault();
      const text = e.clipboardData.getData("text");
      const currentText = this.value;
      const combinedText = currentText + text;
      const words = combinedText
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0);

      if (words.length <= WORD_LIMIT) {
        this.value = combinedText;
      } else {
        this.value = words.slice(0, WORD_LIMIT).join(" ");
      }
      checkWordLimit(e);
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const messageArea = document.getElementById("message");
  const wordCount = document.getElementById("word-count");
  const WORD_LIMIT = 500;

  function getWordCount(text) {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  }

  function enforceWordLimit(text) {
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    if (words.length > WORD_LIMIT) {
      return words.slice(0, WORD_LIMIT).join(" ");
    }
    return text;
  }

  function showLimitAlert() {
    const alertDiv = document.createElement("div");
    alertDiv.className = "word-limit-alert show";
    alertDiv.textContent = "Word limit reached (500 words)";
    messageArea.parentElement.appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), 3000);
  }

  if (messageArea) {
    // Handle typing
    messageArea.addEventListener("beforeinput", function (e) {
      if (
        e.inputType === "insertText" ||
        e.inputType === "insertCompositionText"
      ) {
        const futureText =
          this.value.slice(0, this.selectionStart) +
          (e.data || "") +
          this.value.slice(this.selectionEnd);

        if (getWordCount(futureText) > WORD_LIMIT) {
          e.preventDefault();
          showLimitAlert();
        }
      }
    });

    // Handle paste
    messageArea.addEventListener("paste", function (e) {
      e.preventDefault();
      const pastedText = e.clipboardData.getData("text");
      const currentText = this.value;
      const cursorPos = this.selectionStart;

      // Combine text with pasted content
      const newText =
        currentText.slice(0, cursorPos) +
        pastedText +
        currentText.slice(this.selectionEnd);

      // Enforce word limit
      const limitedText = enforceWordLimit(newText);

      // Update textarea
      this.value = limitedText;

      // Show alert if text was truncated
      if (limitedText.length < newText.length) {
        showLimitAlert();
      }

      // Update word count
      wordCount.textContent = getWordCount(limitedText);
      wordCount.style.color =
        getWordCount(limitedText) >= WORD_LIMIT * 0.9 ? "#ff4444" : "#666";

      // Set cursor position after pasted text
      this.setSelectionRange(
        cursorPos + pastedText.length,
        cursorPos + pastedText.length
      );
    });

    // Update word count on input
    messageArea.addEventListener("input", function () {
      const count = getWordCount(this.value);
      wordCount.textContent = count;
      wordCount.style.color = count >= WORD_LIMIT * 0.9 ? "#ff4444" : "#666";
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("inquiryModal");
  const inquireButtons = document.querySelectorAll(".inquire-now-btn");
  const closeBtn = modal?.querySelector(".close"); // Add optional chaining

  if (!modal || !closeBtn) return; // Add guard clause

  // Open modal
  inquireButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const productName =
        this.closest(".product-card").querySelector("h3").textContent;
      document.getElementById("modalProductName").textContent = productName;
      modal.style.display = "flex"; // Changed from 'block' to 'flex'
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    });
  });

  // Close modal
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = ""; // Restore scrolling
  });

  // Close on outside click
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = ""; // Restore scrolling
    }
  });

  // Handle form submission
  document
    .getElementById("inquiryForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      modal.style.display = "none";
      document.body.style.overflow = ""; // Restore scrolling
    });
});
