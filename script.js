document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".animate-on-scroll");

  function handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }

  function initializeObserver() {
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });
    elements.forEach((element) => {
      observer.observe(element);
    });
  }

  async function sendEmail(details) {
    try {
      const response = await fetch('https://your-backend-endpoint.com/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(details)
      });
      if (response.ok) {
        alert('Your message has been sent successfully!');
      } else {
        alert('There was an error sending your message. Please try again later.');
      }
    } catch (error) {
      alert('There was an error sending your message. Please try again later.');
    }
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const details = Object.fromEntries(formData.entries());
    sendEmail(details);
  }

  const form = document.querySelector("#customer-form");
  if (form) {
    form.addEventListener("submit", handleFormSubmit);
  }
  
  initializeObserver();

  const mobileMenu = document.querySelector(".mobile-menu");
  const navLinks = document.querySelector(".nav-links");

  mobileMenu.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function () {
      navLinks.classList.remove("active");
    });
  });

  const thumbnails = document.querySelectorAll('.thumbnail');
  const mainImage = document.getElementById('mainImage');

  // Set up thumbnail click behavior
  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
      // Remove active class from all thumbnails
      thumbnails.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked thumbnail
      this.classList.add('active');
      
      // Update main image
      const imgSrc = this.getAttribute('data-img');
      mainImage.src = imgSrc;
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('inquire-modal');
  const btn = document.getElementById('inquire-now-btn');
  const span = document.getElementsByClassName('close-btn')[0];

  btn.onclick = function () {
    modal.style.display = 'block';
  };

  span.onclick = function () {
    modal.style.display = 'none';
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };

  const contactBtn = document.querySelector('.modal-content .btn');
  contactBtn.onclick = function () {
    modal.style.display = 'none';
    window.location.href = '#contact';
  };
});

document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('inquire-modal');
  const closeBtn = document.querySelector('.close-btn');
  const inquireButtons = document.querySelectorAll('.inquire-now-btn');

  inquireButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      modal.style.display = 'flex';
    });
  });

  closeBtn.addEventListener('click', function () {
    modal.style.display = 'none';
  });

  window.addEventListener('click', function (e) {
    if (e.target == modal) {
      modal.style.display = 'none';
    }
  });

  const mainImage = document.getElementById('main-product-image');
  const thumbnails = document.querySelectorAll('.thumbnail');
  const topBtn = document.querySelector('.top-btn');
  const bottomBtn = document.querySelector('.bottom-btn');
  const thumbnailContainer = document.querySelector('.thumbnails');

  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
      mainImage.src = thumbnail.src;
    });
  });

  topBtn.addEventListener('click', () => {
    thumbnailContainer.scrollBy({ top: -100, behavior: 'smooth' });
  });

  bottomBtn.addEventListener('click', () => {
    thumbnailContainer.scrollBy({ top: 100, behavior: 'smooth' });
  });
});

// Get references to all elements
const inquireButtons = document.querySelectorAll(".product-info .btn");
const modal = document.getElementById("inquire-modal");
const closeBtn = document.querySelector(".close-btn");
const modalTitle = document.querySelector(".modal-content h2");
const modalContent = document.querySelector(".modal-content p");

// Product details for the modal
const productDetails = {
  "Coir NetMat": {
    title: "Coir NetMat Details",
    content: "Our Coir NetMat is a premium erosion control solution made from 100% natural coconut fibers. With a density range of 400-900 g/m², these biodegradable mats are ideal for slope stabilization, riverbank protection, and landscaping projects. The natural fiber construction allows vegetation to grow through while preventing soil erosion. Available in various sizes with an expected lifespan of 3-5 years, providing ample time for vegetation establishment."
  },
  "Coir Mat": {
    title: "Coir Mat Details",
    content: "Our Coir Mats are versatile products crafted from compressed coconut fibers. Designed for indoor and outdoor use, these mats provide excellent durability with a thickness of 15-25mm and customizable dimensions. Perfect for gardening applications, moisture retention, and decorative purposes. The natural structure creates ideal air pockets for healthy root development, making them perfect for various planting applications."
  },
  "Coir Yarn": {
    title: "Coir Yarn Details",
    content: "Our premium Coir Yarn is spun from high-quality coconut fibers, available in various qualities ranging from 1-ply to 3-ply with runnage options of 2500-6000 meters per kilogram. This versatile product is ideal for crafting, rope making, horticultural applications, and erosion control systems. The yarn features excellent tensile strength, UV resistance, and biodegradability, making it environmentally friendly while maintaining durability."
  },
  "Coir Fiber": {
    title: "Coir Fiber Details",
    content: "Our Coir Fiber is carefully extracted from coconut husks and processed to maintain optimal quality. Available in various grades with lengths ranging from 4-15cm and low moisture content (15-20%), these fibers exhibit excellent tensile strength and natural resistance to decomposition. Perfect for manufacturing ropes, brushes, mattresses, geotextiles, and as a growing medium component. Each bale is compressed for efficient shipping."
  },
  "Coir Mesh Roll": {
    title: "Coir Mesh Roll Details",
    content: "Our Coir Mesh Rolls are engineered for advanced erosion control with a unique open-weave design. Available in densities of 400-700 g/m² and standard widths of 2-4 meters with customizable lengths, these rolls provide excellent soil retention while allowing vegetation to establish. The UV-stabilized construction offers a 2-3 year functional lifespan, making them perfect for slopes, shorelines, and restoration projects."
  },
  "Coco Peat": {
    title: "Coco Peat Details",
    content: "Our premium Coco Peat is processed from coconut husks to create an exceptional growing medium. With a pH level of 5.5-6.5, low EC (<0.5 mS/cm), and high water holding capacity (8-9 times its weight), this product is ideal for horticulture, hydroponics, and soil amendment. Available in various forms including blocks, discs, and loose form, our coco peat is thoroughly washed, buffered, and aged to ensure optimal growing conditions for all plant types."
  }
};

// Function to open modal with specific product information
function openModal(productName) {
  const product = productDetails[productName] || {
    title: productName,
    content: "Please contact us for more information about this product."
  };
  
  modalTitle.textContent = product.title;
  modalContent.textContent = product.content;
  modal.style.display = "flex";
}

// Add click event for each "Inquire Now" button
inquireButtons.forEach(button => {
  button.addEventListener("click", function(e) {
    e.preventDefault();
    // Find the product name from the parent card
    const productCard = this.closest(".product-card");
    const productName = productCard.querySelector("h3").textContent;
    openModal(productName);
  });
});

// Close modal when clicking the X button
closeBtn.addEventListener("click", function() {
  modal.style.display = "none";
});

// Close modal when clicking outside the modal content
window.addEventListener("click", function(e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Initialize AOS
AOS.init({
  once: false // Ensure animations trigger every time elements come into view
});

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".animate-on-scroll").forEach((element) => {
  gsap.fromTo(
    element,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play reverse play reverse",
        markers: true // Remove this line to hide markers
      }
    }
  );
});

document.addEventListener('DOMContentLoaded', () => {
  const mainImage = document.getElementById('main-product-image');
  const thumbnails = document.querySelectorAll('.thumbnail');
  const leftBtn = document.querySelector('.left-btn');
  const rightBtn = document.querySelector('.right-btn');
  const thumbnailContainer = document.querySelector('.thumbnails');

  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
      mainImage.src = thumbnail.src;
    });
  });

  leftBtn.addEventListener('click', () => {
    thumbnailContainer.scrollBy({ left: -100, behavior: 'smooth' });
  });

  rightBtn.addEventListener('click', () => {
    thumbnailContainer.scrollBy({ left: 100, behavior: 'smooth' });
  });
});

// Work Process Slideshow
function initWorkSlideshow() {
  let slideIndex = 0;
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");

  function showSlides() {
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
      slides[i].classList.remove("active");
      dots[i].classList.remove("active");
    }

    // Show next slide
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }

    slides[slideIndex - 1].style.display = "block";
    setTimeout(() => {
      slides[slideIndex - 1].classList.add("active");
      dots[slideIndex - 1].classList.add("active");
    }, 100);

    setTimeout(showSlides, 5000); // Change slide every 5 seconds
  }

  // Initialize slideshow
  showSlides();

  // Dot click handlers
  for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener('click', () => {
      slideIndex = i;
      showSlides();
    });
  }
}

document.addEventListener('DOMContentLoaded', initWorkSlideshow);

// Image Zoom functionality
function initializeImageZoom() {
  const mainImage = document.getElementById('mainImage');
  const container = mainImage.parentElement;
  let zoomActive = false;
  let touchStartX = 0;
  let touchStartY = 0;

  // Create zoom overlay
  const zoomOverlay = document.createElement('div');
  zoomOverlay.className = 'zoom-overlay';
  container.appendChild(zoomOverlay);

  // Handle mouse/touch interactions
  function handleZoomStart(e) {
    if (window.innerWidth <= 768) return; // Disable on mobile
    
    const rect = mainImage.getBoundingClientRect();
    zoomActive = true;
    
    // Show zoom overlay
    zoomOverlay.style.backgroundImage = `url(${mainImage.src})`;
    zoomOverlay.style.display = 'block';
    
    updateZoomPosition(e);
  }

  function handleZoomMove(e) {
    if (!zoomActive) return;
    e.preventDefault();
    updateZoomPosition(e);
  }

  function handleZoomEnd() {
    zoomActive = false;
    zoomOverlay.style.display = 'none';
  }

  function updateZoomPosition(e) {
    const rect = mainImage.getBoundingClientRect();
    const x = (e.type.includes('touch') ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.type.includes('touch') ? e.touches[0].clientY : e.clientY) - rect.top;
    
    const xPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const yPercent = Math.max(0, Math.min(100, (y / rect.height) * 100));
    
    zoomOverlay.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
  }

  // Event listeners for mouse
  mainImage.addEventListener('mouseenter', handleZoomStart);
  mainImage.addEventListener('mousemove', handleZoomMove);
  mainImage.addEventListener('mouseleave', handleZoomEnd);

  // Event listeners for touch with improved handling
  mainImage.addEventListener('touchstart', (e) => {
    if (window.innerWidth <= 768) {
      // Enable pinch zoom on mobile
      mainImage.style.touchAction = 'pinch-zoom';
      return;
    }
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    handleZoomStart(e);
  });

  mainImage.addEventListener('touchmove', (e) => {
    if (window.innerWidth <= 768) return;
    handleZoomMove(e);
  });

  mainImage.addEventListener('touchend', handleZoomEnd);

  // Keyboard accessibility
  mainImage.setAttribute('tabindex', '0');
  mainImage.setAttribute('role', 'img');
  mainImage.setAttribute('aria-label', 'Product image with zoom capability. Press Enter to toggle zoom mode.');

  mainImage.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      zoomActive = !zoomActive;
      if (zoomActive) {
        zoomOverlay.style.display = 'block';
      } else {
        zoomOverlay.style.display = 'none';
      }
    }
  });
}

// Lazy loading for thumbnails
function initializeLazyLoading() {
  const images = document.querySelectorAll('.thumbnail img, #mainImage');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px'
  });

  images.forEach(img => {
    if (img.src) {
      img.dataset.src = img.src;
      img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // Tiny placeholder
      imageObserver.observe(img);
    }
  });
}

// Initialize zoom and lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initializeImageZoom();
  initializeLazyLoading();
});

function initializeAdvancedZoom() {
  const container = document.querySelector('.main-image-container');
  const mainImage = document.querySelector('#mainImage');
  
  // Create zoom elements
  const lens = document.createElement('div');
  const zoomResult = document.createElement('div');
  lens.className = 'zoom-lens';
  zoomResult.className = 'zoom-result';
  
  container.style.position = 'relative';
  container.appendChild(lens);
  container.appendChild(zoomResult);

  let zoomLevel = 2.5; // Default zoom level
  let isZooming = false;

  function calculateZoom(e) {
    if (!isZooming) return;
    
    const rect = mainImage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate positions as percentages
    const xPercentage = (x / rect.width) * 100;
    const yPercentage = (y / rect.height) * 100;

    // Move lens
    lens.style.left = `${x - lens.offsetWidth / 2}px`;
    lens.style.top = `${y - lens.offsetHeight / 2}px`;

    // Update zoom result
    zoomResult.style.backgroundImage = `url(${mainImage.src})`;
    zoomResult.style.backgroundSize = `${mainImage.width * zoomLevel}px ${mainImage.height * zoomLevel}px`;
    zoomResult.style.backgroundPosition = `${-x * zoomLevel + lens.offsetWidth}px ${-y * zoomLevel + lens.offsetHeight}px`;
  }

  // Mouse events
  container.addEventListener('mouseenter', () => {
    if (window.innerWidth <= 768) return;
    isZooming = true;
    lens.style.display = 'block';
    zoomResult.style.display = 'block';
  });

  container.addEventListener('mousemove', calculateZoom);

  container.addEventListener('mouseleave', () => {
    isZooming = false;
    lens.style.display = 'none';
    zoomResult.style.display = 'none';
  });

  // Touch events
  let touch = null;

  container.addEventListener('touchstart', (e) => {
    if (window.innerWidth <= 768) {
      // Enable native pinch zoom on mobile
      container.style.touchAction = 'pinch-zoom';
      return;
    }
    touch = e.touches[0];
    isZooming = true;
    lens.style.display = 'block';
    zoomResult.style.display = 'block';
    calculateZoom(touch);
  });

  container.addEventListener('touchmove', (e) => {
    if (window.innerWidth <= 768 || !isZooming) return;
    e.preventDefault();
    touch = e.touches[0];
    calculateZoom(touch);
  });

  container.addEventListener('touchend', () => {
    isZooming = false;
    lens.style.display = 'none';
    zoomResult.style.display = 'none';
  });

  // Keyboard accessibility
  mainImage.setAttribute('tabindex', '0');
  mainImage.setAttribute('role', 'img');
  mainImage.setAttribute('aria-label', 'Product image. Press Enter to toggle zoom mode, then use arrow keys to move the zoom lens.');

  let keyboardZoom = false;
  let lensPosition = { x: 0, y: 0 };

  mainImage.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      keyboardZoom = !keyboardZoom;
      if (keyboardZoom) {
        lens.style.display = 'block';
        zoomResult.style.display = 'block';
        lensPosition = { x: mainImage.offsetWidth / 2, y: mainImage.offsetHeight / 2 };
        updateLensPosition();
      } else {
        lens.style.display = 'none';
        zoomResult.style.display = 'none';
      }
    } else if (keyboardZoom && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
      const step = 10;
      switch (e.key) {
        case 'ArrowUp': lensPosition.y -= step; break;
        case 'ArrowDown': lensPosition.y += step; break;
        case 'ArrowLeft': lensPosition.x -= step; break;
        case 'ArrowRight': lensPosition.x += step; break;
      }
      updateLensPosition();
    }
  });

  function updateLensPosition() {
    // Keep lens within bounds
    lensPosition.x = Math.max(0, Math.min(lensPosition.x, mainImage.offsetWidth));
    lensPosition.y = Math.max(0, Math.min(lensPosition.y, mainImage.offsetHeight));
    
    lens.style.left = `${lensPosition.x - lens.offsetWidth / 2}px`;
    lens.style.top = `${lensPosition.y - lens.offsetHeight / 2}px`;
    
    zoomResult.style.backgroundImage = `url(${mainImage.src})`;
    zoomResult.style.backgroundSize = `${mainImage.width * zoomLevel}px ${mainImage.height * zoomLevel}px`;
    zoomResult.style.backgroundPosition = `${-lensPosition.x * zoomLevel + lens.offsetWidth}px ${-lensPosition.y * zoomLevel + lens.offsetHeight}px`;
  }
}

// Initialize zoom functionality when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initializeAdvancedZoom();
});

function initializeZoom() {
  const mainContainer = document.querySelector('.main-image-container');
  const mainImage = document.querySelector('#mainImage');
  const zoomLens = document.querySelector('.zoom-lens');
  const zoomResult = document.querySelector('.zoom-result');
  
  let zoomLevel = 2.5;
  let isZooming = false;

  function updateZoom(e) {
    const rect = mainImage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    const lensSize = 100;
    const lensLeft = Math.max(0, Math.min(x - lensSize / 2, rect.width - lensSize));
    const lensTop = Math.max(0, Math.min(y - lensSize / 2, rect.height - lensSize));
    zoomLens.style.left = `${lensLeft}px`;
    zoomLens.style.top = `${lensTop}px`;

    zoomResult.style.backgroundImage = `url(${mainImage.src})`;
    zoomResult.style.backgroundSize = `${rect.width * zoomLevel}px ${rect.height * zoomLevel}px`;
    zoomResult.style.backgroundPosition = `${-xPercent * zoomLevel + 50}% ${-yPercent * zoomLevel + 50}%`;
  }

  function handleZoomIn() {
    zoomLevel = Math.min(zoomLevel + 0.5, 5);
    isZooming = true;
    const rect = mainImage.getBoundingClientRect();
    updateZoom({ clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2 });
  }

  function handleZoomOut() {
    zoomLevel = Math.max(zoomLevel - 0.5, 1);
    isZooming = true;
    const rect = mainImage.getBoundingClientRect();
    updateZoom({ clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2 });
  }

  function handleMouseWheel(e) {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  }

  mainContainer.addEventListener('mouseenter', () => {
    if (window.innerWidth <= 768) return;
    isZooming = true;
    zoomLens.style.display = 'block';
    zoomResult.style.display = 'block';
  });

  mainContainer.addEventListener('mousemove', updateZoom);

  mainContainer.addEventListener('mouseleave', () => {
    isZooming = false;
    zoomLens.style.display = 'none';
    zoomResult.style.display = 'none';
  });

  mainContainer.addEventListener('wheel', handleMouseWheel);

  // Touch support for mobile
  mainContainer.addEventListener('touchstart', (e) => {
    if (window.innerWidth <= 768) {
      mainImage.style.touchAction = 'pinch-zoom';
      return;
    }
    e.preventDefault();
    isZooming = true;
    zoomLens.style.display = 'block';
    zoomResult.style.display = 'block';
    updateZoom(e.touches[0]);
  });

  mainContainer.addEventListener('touchmove', (e) => {
    if (window.innerWidth <= 768) return;
    e.preventDefault();
    updateZoom(e.touches[0]);
  });

  mainContainer.addEventListener('touchend', () => {
    isZooming = false;
    zoomLens.style.display = 'none';
    zoomResult.style.display = 'none';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initializeZoom();
});

