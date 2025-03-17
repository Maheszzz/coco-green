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

  if (mobileMenu && navLinks) {
    mobileMenu.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", function () {
        navLinks.classList.remove("active");
      });
    });
  }

  const thumbnails = document.querySelectorAll('.thumbnail');
  const mainImage = document.getElementById('mainImage');
  const wishlistBtn = document.querySelector('.wishlist-btn');

  if (mainImage && thumbnails.length > 0) {
    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', function() {
        thumbnails.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const imgSrc = this.getAttribute('data-img');
        mainImage.src = imgSrc;
      });
    });
  }

  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', function() {
      const svg = this.querySelector('svg');
      if (svg.getAttribute('fill') === '#c2c2c2') {
        svg.setAttribute('fill', '#ff6161');
        svg.innerHTML = '<path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>';
      } else {
        svg.setAttribute('fill', '#c2c2c2');
        svg.innerHTML = '<path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>';
      }
    });
  }


  // Fix for script.js:122
  const someElement = document.getElementById('someElementId');
  if (someElement) {
    someElement.onclick = function() {
      // ...existing code...
    };
  }

  // Fix for script.js:177
  const anotherElement = document.getElementById('anotherElementId');
  if (anotherElement) {
    anotherElement.addEventListener('click', function() {
      // ...existing code...
    });
  }

  // Fix for script.js:295
  const yetAnotherElement = document.getElementById('yetAnotherElementId');
  if (yetAnotherElement) {
    yetAnotherElement.addEventListener('click', function() {
      // ...existing code...
    });
  }

  // Modal functionality
  const modal = document.getElementById('inquire-modal');
  const closeBtn = document.querySelector('.close-btn');
  const inquireButtons = document.querySelectorAll('.inquire-now-btn');
  const modalContent = document.getElementById('product-description');

  if (modal && closeBtn && inquireButtons.length > 0) {
    inquireButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const productCard = this.closest('.product-card');
        if (productCard) {
          const productName = productCard.querySelector('h3').textContent;
          openModal(productName);
        }
      });
    });

    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  }

  // Product details for modal
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

  function openModal(productName) {
    if (!modal || !modalContent) return;
    
    const product = productDetails[productName] || {
      content: "Please contact us for more information about this product."
    };
    
    modalContent.textContent = product.content;
    modal.style.display = "flex";
  }

  // Slideshow functionality
  let slideIndex = 0;
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");

  if (slides.length > 0 && dots.length > 0) {
    showSlides();
  }

  function showSlides() {
    let i;
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 5000); // Change image every 5 seconds
  }

  // Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      startEvent: 'DOMContentLoaded',
      offset: 200,
      delay: 0,
      duration: 400,
      easing: 'ease',
      once: true,
      mirror: false,
      anchorPlacement: 'top-bottom',
      end: 'bottom 20%',
      toggleActions: 'play reverse play reverse'
    });
  }
});

