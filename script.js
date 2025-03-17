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

