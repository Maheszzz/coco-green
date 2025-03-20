document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const modal = document.getElementById('inquiryModal');
    const closeBtn = modal.querySelector('.close');
    const inquiryForm = modal.querySelector('#inquiryForm');
    const inquiryButtons = document.querySelectorAll('.inquire-now-btn');
    
    // Open modal when inquiry buttons are clicked
    inquiryButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productName = e.target.dataset.product;
            modal.querySelector('#productName').value = productName;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Close modal on X button click
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Handle form submission
    inquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            product: modal.querySelector('#productName').value,
            name: modal.querySelector('#name').value,
            email: modal.querySelector('#email').value,
            message: modal.querySelector('#message').value
        };

        // Show success message
        alert('Thank you for your inquiry! We will contact you soon.');
        
        // Reset form and close modal
        inquiryForm.reset();
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        console.log('Form Data:', formData);
    });
});
