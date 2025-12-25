document.addEventListener('DOMContentLoaded', function() {
    // Password visibility toggle
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.querySelector('#password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            // Toggle the password input type
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle the eye icon
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
            
            // Add little animation effect
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    }
    
    // Form submission animation
    const signInForm = document.querySelector('.signin-form');
    
    if (signInForm) {
        signInForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get the button
            const button = this.querySelector('.signin-btn');
            
            // Add loading state - you can customize this with your own animation
            button.innerHTML = '<div class="loader"></div>';
            button.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Redirect or handle successful login here
                window.location.href = "/dashboard"; // Replace with your redirect URL
            }, 1500);
        });
    }
    
    // Input focus animations
    const inputs = document.querySelectorAll('input');
    
    if (inputs.length) {
        inputs.forEach(input => {
            // Add animation when input gets focus
            input.addEventListener('focus', function() {
                const icon = this.previousElementSibling;
                if (icon && icon.tagName === 'I') {
                    icon.style.color = 'var(--primary)';
                    icon.style.transform = 'scale(1.1)';
                }
            });
            
            // Remove animation when input loses focus
            input.addEventListener('blur', function() {
                const icon = this.previousElementSibling;
                if (icon && icon.tagName === 'I') {
                    if (!this.value) {
                        icon.style.color = 'var(--text-light)';
                    }
                    icon.style.transform = 'scale(1)';
                }
            });
        });
    }
    
    // Add subtle parallax effect to floating elements
    const floatItems = document.querySelectorAll('.float-item');
    
    if (floatItems.length) {
        document.addEventListener('mousemove', function(e) {
            let moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            let moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            
            floatItems.forEach(item => {
                const speed = parseFloat(item.getAttribute('data-speed') || 1);
                item.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
            });
        });
    }
}); 