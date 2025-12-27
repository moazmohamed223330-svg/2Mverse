// Language Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set initial language
    let currentLang = 'en';
    const langToggle = document.getElementById('langToggle');
    const langText = document.querySelector('.lang-text');
    
    // Language toggle event
    langToggle.addEventListener('click', function() {
        if (currentLang === 'en') {
            currentLang = 'ar';
            langText.textContent = 'EN';
            document.documentElement.lang = 'ar';
            document.body.classList.add('arabic-mode');
            document.body.dir = 'rtl';
        } else {
            currentLang = 'en';
            langText.textContent = 'AR';
            document.documentElement.lang = 'en';
            document.body.classList.remove('arabic-mode');
            document.body.dir = 'ltr';
        }
        
        // Update all text elements with data attributes
        updateTextContent();
        
        // Update form autocomplete attribute for Arabic
        updateFormAttributes();
    });
    
    // Function to update text content based on language
    function updateTextContent() {
        // Update all elements with data-en and data-ar attributes
        document.querySelectorAll('[data-en], [data-ar]').forEach(element => {
            if (currentLang === 'en' && element.hasAttribute('data-en')) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.setAttribute('placeholder', element.getAttribute('data-en') || '');
                } else {
                    // Handle HTML content with span tags
                    const enContent = element.getAttribute('data-en');
                    if (enContent.includes('<span')) {
                        element.innerHTML = enContent;
                    } else {
                        element.textContent = enContent;
                    }
                }
            } else if (currentLang === 'ar' && element.hasAttribute('data-ar')) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.setAttribute('placeholder', element.getAttribute('data-ar') || '');
                } else {
                    // Handle HTML content with span tags
                    const arContent = element.getAttribute('data-ar');
                    if (arContent.includes('<span')) {
                        element.innerHTML = arContent;
                    } else {
                        element.textContent = arContent;
                    }
                }
            }
        });
        
        // Update form labels
        document.querySelectorAll('label[data-en], label[data-ar]').forEach(label => {
            if (currentLang === 'en') {
                label.textContent = label.getAttribute('data-en');
            } else {
                label.textContent = label.getAttribute('data-ar');
            }
        });
        
        // Update modal titles and messages
        updateModalContent();
    }
    
    // Update form attributes for Arabic support
    function updateFormAttributes() {
        const form = document.getElementById('contactForm');
        if (form) {
            if (currentLang === 'ar') {
                form.setAttribute('dir', 'rtl');
                form.setAttribute('autocomplete', 'off');
            } else {
                form.setAttribute('dir', 'ltr');
                form.removeAttribute('autocomplete');
            }
        }
    }
    
    // Update modal content based on language
    function updateModalContent() {
        const modalTitle = document.getElementById('modalTitle');
        const modalMessage = document.getElementById('modalMessage');
        const copyModalTitle = document.getElementById('copyModalTitle');
        const copyModalMessage = document.getElementById('copyModalMessage');
        
        if (currentLang === 'en') {
            if (modalTitle) modalTitle.textContent = 'Message Sent!';
            if (modalMessage) modalMessage.textContent = 'Thank you for contacting us. We will get back to you soon.';
            if (copyModalTitle) copyModalTitle.textContent = 'Form Submission Issue';
            if (copyModalMessage) copyModalMessage.textContent = 'Please copy the message below and send it manually to: 2mverseteam@gmail.com';
        } else {
            if (modalTitle) modalTitle.textContent = 'تم إرسال الرسالة!';
            if (modalMessage) modalMessage.textContent = 'شكراً لتواصلك معنا. سنرد عليك قريباً.';
            if (copyModalTitle) copyModalTitle.textContent = 'مشكلة في إرسال النموذج';
            if (copyModalMessage) copyModalMessage.textContent = 'يرجى نسخ الرسالة أدناه وإرسالها يدوياً إلى: 2mverseteam@gmail.com';
        }
    }
    
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            if (navToggle) {
                navToggle.querySelector('i').classList.remove('fa-times');
                navToggle.querySelector('i').classList.add('fa-bars');
            }
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navLinks && navLinks.classList.contains('active')) {
            if (!navLinks.contains(event.target) && !navToggle.contains(event.target)) {
                navLinks.classList.remove('active');
                if (navToggle) {
                    navToggle.querySelector('i').classList.remove('fa-times');
                    navToggle.querySelector('i').classList.add('fa-bars');
                }
                document.body.style.overflow = 'auto';
            }
        }
    });
    
    // Form submission handling with FormSubmit
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Set current date in hidden field
        const formDate = document.getElementById('formDate');
        if (formDate) {
            const now = new Date();
            formDate.value = now.toISOString();
        }
        
        // FormSubmit will handle the submission automatically
        // We'll keep the JS validation for better UX
        contactForm.addEventListener('submit', function(e) {
            const submitBtn = document.getElementById('submitBtn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoader = submitBtn.querySelector('.btn-loader');
            
            // Basic validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;
            let errorMessage = '';
            
            if (name.length < 2) {
                isValid = false;
                errorMessage = currentLang === 'en' 
                    ? 'Please enter a valid name (at least 2 characters).' 
                    : 'يرجى إدخال اسم صحيح (على الأقل حرفين).';
            } else if (!validateEmail(email)) {
                isValid = false;
                errorMessage = currentLang === 'en'
                    ? 'Please enter a valid email address.'
                    : 'يرجى إدخال عنوان بريد إلكتروني صحيح.';
            } else if (message.length < 10) {
                isValid = false;
                errorMessage = currentLang === 'en'
                    ? 'Please enter a message (at least 10 characters).'
                    : 'يرجى إدخال رسالة (على الأقل 10 أحرف).';
            }
            
            if (!isValid) {
                e.preventDefault();
                alert(errorMessage);
                return false;
            }
            
            // Show loading state
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';
            submitBtn.disabled = true;
            
            // Optional: Show a custom message
            setTimeout(() => {
                if (currentLang === 'en') {
                    alert(`Thank you ${name}! Your message is being sent. We'll contact you at ${email} soon.`);
                } else {
                    alert(`شكراً ${name}! جاري إرسال رسالتك. سنتواصل معك على ${email} قريباً.`);
                }
            }, 500);
            
            // Form will continue to submit to FormSubmit
            return true;
        });
    }
    
    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Modal functionality
    const successModal = document.getElementById('successModal');
    const manualCopyModal = document.getElementById('manualCopyModal');
    const closeModalBtns = document.querySelectorAll('.close-modal, .close-copy-modal');
    const copyBtn = document.getElementById('copyBtn');
    
    // Close modals
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            successModal.style.display = 'none';
            manualCopyModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === successModal) {
            successModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (event.target === manualCopyModal) {
            manualCopyModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Copy to clipboard functionality
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const copyTextarea = document.getElementById('copyTextarea');
            if (copyTextarea) {
                copyTextarea.select();
                copyTextarea.setSelectionRange(0, 99999); // For mobile devices
                
                try {
                    const successful = document.execCommand('copy');
                    const msg = successful ? 'successful' : 'unsuccessful';
                    console.log('Copying text was ' + msg);
                    
                    // Show success message
                    if (currentLang === 'en') {
                        alert('Message copied to clipboard!');
                    } else {
                        alert('تم نسخ الرسالة إلى الحافظة!');
                    }
                } catch (err) {
                    console.error('Failed to copy: ', err);
                }
            }
        });
    }
    
    // Show success message function (called from FormSubmit)
    window.showSuccessMessage = function() {
        const successModal = document.getElementById('successModal');
        if (successModal) {
            successModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    };
    
    // Show manual copy modal function
    window.showManualCopyModal = function(messageData) {
        const manualCopyModal = document.getElementById('manualCopyModal');
        const copyTextarea = document.getElementById('copyTextarea');
        
        if (manualCopyModal && copyTextarea) {
            copyTextarea.value = messageData;
            manualCopyModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    };
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.padding = '12px 0';
        } else {
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.padding = '15px 0';
        }
    });
    
    // Add hover effect to service cards (for desktop only)
    if (window.innerWidth > 768) {
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // Add hover effect to quality items (for desktop only)
    if (window.innerWidth > 768) {
        const qualityItems = document.querySelectorAll('.quality-item');
        qualityItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (navToggle) {
                        navToggle.querySelector('i').classList.remove('fa-times');
                        navToggle.querySelector('i').classList.add('fa-bars');
                    }
                    document.body.style.overflow = 'auto';
                }
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Touch event improvements for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - close menu if open
            if (navLinks && navLinks.classList.contains('active') && currentLang === 'en') {
                navLinks.classList.remove('active');
                if (navToggle) {
                    navToggle.querySelector('i').classList.remove('fa-times');
                    navToggle.querySelector('i').classList.add('fa-bars');
                }
                document.body.style.overflow = 'auto';
            }
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - close menu if open
            if (navLinks && navLinks.classList.contains('active') && currentLang === 'ar') {
                navLinks.classList.remove('active');
                if (navToggle) {
                    navToggle.querySelector('i').classList.remove('fa-times');
                    navToggle.querySelector('i').classList.add('fa-bars');
                }
                document.body.style.overflow = 'auto';
            }
        }
    }
    
    // Initialize language switcher
    updateTextContent();
    updateFormAttributes();
    
    // Add active class to current section in navigation
    function highlightCurrentSection() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Call on scroll
    window.addEventListener('scroll', highlightCurrentSection);
    
    // Call on load
    highlightCurrentSection();
    
    // Prevent form resubmission on page refresh
    if (window.history.replaceState) {
        window.history.replaceState(null, null, window.location.href);
    }
});