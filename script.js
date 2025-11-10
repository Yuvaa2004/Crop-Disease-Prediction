// ===================================
// PLAST_DISEASE - COMPLETE JAVASCRIPT
// Plant Disease Detection Web App
// ===================================

// === PLANT DISEASE DATABASE ===
const plantDiseases = [
    {
        name: "Leaf Blight",
        description: "Leaf Blight is a bacterial or fungal disease that causes yellowing and browning of leaves. The affected leaves often develop dark spots and eventually die, leading to reduced plant vigor and crop yield.",
        solution: "Remove infected leaves immediately and spray neem oil weekly. Ensure proper air circulation around plants and avoid overhead watering. Apply copper-based fungicide if infection persists.",
        fertilizer: "Use nitrogen-rich organic compost (10-5-5 NPK). Apply bio-fertilizers with beneficial microorganisms to strengthen plant immunity."
    },
    {
        name: "Powdery Mildew",
        description: "Powdery Mildew appears as white powdery spots on leaves due to fungal growth. This disease thrives in warm, humid conditions and can spread rapidly, affecting photosynthesis and overall plant health.",
        solution: "Apply sulfur-based fungicide and keep foliage dry. Improve air circulation by pruning and spacing plants properly. Remove heavily infected leaves and spray with baking soda solution (1 tbsp per gallon of water).",
        fertilizer: "Use balanced NPK 10-10-10 fertilizer. Add potassium-rich amendments to boost disease resistance. Apply foliar spray with seaweed extract for better leaf health."
    },
    {
        name: "Rust",
        description: "Rust disease is characterized by reddish or orange pustules that form on the undersides of leaves. Caused by fungal pathogens, it weakens plants by reducing photosynthesis and can spread through wind and water.",
        solution: "Use copper fungicide and ensure good air circulation. Remove and destroy infected leaves promptly. Avoid wetting foliage during watering and apply preventive fungicidal sprays in humid weather.",
        fertilizer: "Use potash-rich fertilizer (5-10-15 NPK) for stronger leaf structure. Apply calcium supplements to improve cell wall strength and disease resistance."
    },
    {
        name: "Early Blight",
        description: "Early Blight causes dark brown spots with concentric rings on lower leaves, often leading to yellowing and leaf drop. This fungal disease is common in tomatoes and potatoes, especially in warm, wet conditions.",
        solution: "Remove affected leaves and apply chlorothalonil fungicide. Practice crop rotation and avoid planting in the same location for 2-3 years. Mulch around plants to prevent soil splash onto leaves.",
        fertilizer: "Use balanced 5-10-10 NPK fertilizer. Add compost rich in beneficial fungi and bacteria to improve soil health and plant immunity."
    },
    {
        name: "Late Blight",
        description: "Late Blight is a devastating disease that causes water-soaked lesions on leaves, stems, and fruits. The disease spreads rapidly in cool, wet weather and can destroy entire crops within days if left untreated.",
        solution: "Apply copper-based or mancozeb fungicide immediately. Remove and burn infected plants. Improve drainage and avoid overhead irrigation. Plant resistant varieties when possible.",
        fertilizer: "Use phosphorus and potassium-rich fertilizer (5-15-10 NPK). Apply calcium nitrate to strengthen cell walls and boost resistance to infection."
    },
    {
        name: "Bacterial Spot",
        description: "Bacterial Spot causes small, dark lesions on leaves and fruits. The spots often have a yellow halo and can lead to defoliation and fruit damage. This disease spreads through water, tools, and infected seeds.",
        solution: "Remove infected leaves and apply copper-based bactericide. Avoid overhead watering and disinfect tools regularly. Plant disease-free seeds and practice crop rotation.",
        fertilizer: "Use balanced organic fertilizer (8-8-8 NPK) with added calcium. Apply beneficial bacteria like Bacillus subtilis to compete with pathogenic bacteria."
    },
    {
        name: "Mosaic Virus",
        description: "Mosaic Virus causes mottled, discolored patterns on leaves with yellowing and distortion. Transmitted by aphids and through mechanical contact, this viral disease stunts plant growth and reduces yields.",
        solution: "Remove and destroy infected plants immediately as there is no cure. Control aphid populations with insecticidal soap or neem oil. Plant resistant varieties and avoid tobacco use near plants.",
        fertilizer: "Use high-nitrogen fertilizer (15-5-5 NPK) to promote vigorous growth. Apply foliar micronutrient spray to support overall plant health and resilience."
    },
    {
        name: "Septoria Leaf Spot",
        description: "Septoria Leaf Spot appears as small, circular spots with gray centers and dark borders on lower leaves. This fungal disease spreads rapidly in wet conditions and can cause significant defoliation.",
        solution: "Remove infected leaves and apply fungicide containing chlorothalonil or copper. Stake and prune plants for better air circulation. Mulch to prevent soil-borne spore splash.",
        fertilizer: "Use balanced 10-10-10 NPK fertilizer. Add organic matter and compost to improve soil structure and beneficial microbial activity."
    },
    {
        name: "Black Rot",
        description: "Black Rot causes circular, dark lesions on fruits and leaves, often with concentric rings. This fungal disease affects grapes, apples, and brassicas, causing significant crop loss if not managed properly.",
        solution: "Prune infected parts and apply mancozeb or captan fungicide. Rake and remove fallen leaves to reduce overwintering spores. Maintain proper spacing for air circulation.",
        fertilizer: "Use potassium-rich fertilizer (5-5-15 NPK) to improve fruit quality and disease resistance. Add wood ash for additional potassium and calcium."
    },
    {
        name: "Anthracnose",
        description: "Anthracnose causes sunken, dark lesions on leaves, stems, and fruits. This fungal disease thrives in warm, humid weather and can overwinter in plant debris, causing recurring infections.",
        solution: "Apply copper fungicide or chlorothalonil. Remove plant debris and practice crop rotation. Water at soil level to keep foliage dry and improve air circulation.",
        fertilizer: "Use balanced fertilizer (12-12-12 NPK) with added micronutrients. Apply compost tea to enhance beneficial microbial populations in soil."
    }
];

// === GLOBAL VARIABLES ===
let uploadedImageData = null;
let uploadedFileName = '';
let uploadedFileSize = 0;

// === DOM READY EVENT ===
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initNavigation();

    // Initialize page-specific functionality
    const currentPage = getCurrentPage();

    if (currentPage === 'upload') {
        initUploadPage();
    } else if (currentPage === 'results') {
        initResultsPage();
    } else if (currentPage === 'thankyou') {
        initThankYouPage();
    }
});

// === NAVIGATION FUNCTIONS ===
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // Animate hamburger icon
            const spans = hamburger.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().split('.')[0];
    return page || 'index';
}

// === UPLOAD PAGE FUNCTIONS ===
function initUploadPage() {
    const fileInput = document.getElementById('fileInput');
    const cameraInput = document.getElementById('cameraInput');
    const uploadArea = document.getElementById('uploadArea');
    const previewArea = document.getElementById('previewArea');
    const previewImage = document.getElementById('previewImage');
    const fileName = document.getElementById('fileName');
    const fileSize = document.getElementById('fileSize');
    const changeImageBtn = document.getElementById('changeImageBtn');
    const analyzeBtn = document.getElementById('analyzeBtn');

    // Handle file input change
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            handleFileSelect(e.target.files[0]);
        });
    }

    // Handle camera input change
    if (cameraInput) {
        cameraInput.addEventListener('change', function(e) {
            handleFileSelect(e.target.files[0]);
        });
    }

    // Handle change image button
    if (changeImageBtn) {
        changeImageBtn.addEventListener('click', function() {
            // Reset everything
            uploadArea.style.display = 'block';
            previewArea.style.display = 'none';
            fileInput.value = '';
            cameraInput.value = '';
            uploadedImageData = null;
        });
    }

    // Handle analyze button
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', function() {
            analyzeImage();
        });
    }

    // Function to handle file selection
    function handleFileSelect(file) {
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file (JPG, JPEG, PNG)');
            return;
        }

        // Validate file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
            alert('File size must be less than 10MB');
            return;
        }

        // Store file information
        uploadedFileName = file.name;
        uploadedFileSize = (file.size / 1024).toFixed(2); // Convert to KB

        // Read file and create preview
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedImageData = e.target.result;

            // Show preview
            previewImage.src = uploadedImageData;
            fileName.textContent = uploadedFileName;
            fileSize.textContent = uploadedFileSize + ' KB';

            // Hide upload area, show preview area
            uploadArea.style.display = 'none';
            previewArea.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    // Function to analyze image
    function analyzeImage() {
        if (!uploadedImageData) {
            alert('Please upload an image first');
            return;
        }

        // Show loading state
        const analyzeText = analyzeBtn.querySelector('.analyze-text');
        const loadingSpinner = analyzeBtn.querySelector('.loading-spinner');

        analyzeText.style.display = 'none';
        loadingSpinner.style.display = 'inline-block';
        analyzeBtn.disabled = true;

        // Simulate analysis (replace with actual API call in production)
        setTimeout(function() {
            // Randomly select a disease from dataset
            const randomDisease = plantDiseases[Math.floor(Math.random() * plantDiseases.length)];

            // Store result in localStorage
            localStorage.setItem('result', JSON.stringify(randomDisease));
            localStorage.setItem('uploadedImage', uploadedImageData);

            // Redirect to results page
            window.location.href = 'results.html';
        }, 2000); // 2 second delay to simulate processing
    }
}

// === RESULTS PAGE FUNCTIONS ===
function initResultsPage() {
    // Get stored data from localStorage
    const storedResult = localStorage.getItem('result');
    const storedImage = localStorage.getItem('uploadedImage');

    if (!storedResult) {
        // No result found, redirect to upload page
        alert('No analysis result found. Please upload an image first.');
        window.location.href = 'upload.html';
        return;
    }

    // Parse result data
    const disease = JSON.parse(storedResult);

    // Populate results
    const resultImage = document.getElementById('resultImage');
    const diseaseName = document.getElementById('diseaseName');
    const diseaseDescription = document.getElementById('diseaseDescription');
    const diseaseSolution = document.getElementById('diseaseSolution');
    const fertilizer = document.getElementById('fertilizer');

    if (storedImage && resultImage) {
        resultImage.src = storedImage;
    }

    if (diseaseName) {
        // Animate text reveal
        diseaseName.textContent = '';
        typeWriter(diseaseName, disease.name, 0, 50);
    }

    if (diseaseDescription) {
        diseaseDescription.textContent = disease.description;
    }

    if (diseaseSolution) {
        diseaseSolution.textContent = disease.solution;
    }

    if (fertilizer) {
        fertilizer.textContent = disease.fertilizer;
    }

    // Add fade-in animation to cards
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300 * (index + 1));
    });
}

// Typewriter effect function
function typeWriter(element, text, index, speed) {
    if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(() => typeWriter(element, text, index, speed), speed);
    }
}

// === THANK YOU PAGE FUNCTIONS ===
function initThankYouPage() {
    // Animate checkmark
    const checkmarkCircle = document.querySelector('.checkmark-circle');
    if (checkmarkCircle) {
        setTimeout(() => {
            checkmarkCircle.style.transform = 'scale(1)';
        }, 100);
    }

    // Animate stats
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 * (index + 1));
    });

    // Share button handlers
    const shareBtns = document.querySelectorAll('.share-btn');
    shareBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.classList.contains('facebook') ? 'Facebook' :
                           this.classList.contains('twitter') ? 'Twitter' :
                           this.classList.contains('whatsapp') ? 'WhatsApp' :
                           this.classList.contains('linkedin') ? 'LinkedIn' : 'Social Media';

            alert(`Share functionality for ${platform} would open here!`);
        });
    });

    // Clear localStorage after use (optional)
    // Uncomment if you want to clear the stored data after viewing results
    // localStorage.removeItem('result');
    // localStorage.removeItem('uploadedImage');
}

// === UTILITY FUNCTIONS ===

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll reveal animations
function revealOnScroll() {
    const reveals = document.querySelectorAll('.feature-card, .plant-card, .team-card, .benefit-card');

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('reveal-active');
        }
    });
}

// Add CSS for reveal animation
const style = document.createElement('style');
style.textContent = `
    .feature-card, .plant-card, .team-card, .benefit-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }

    .reveal-active {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Trigger reveal on scroll
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Form validation (if needed in future)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Image compression function (for future use)
function compressImage(file, maxWidth, maxHeight, quality, callback) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(callback, 'image/jpeg', quality);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// === CONSOLE WELCOME MESSAGE ===
console.log('%c<? Welcome to Plast_Disease! <?', 'color: #4CAF50; font-size: 20px; font-weight: bold;');
console.log('%cEmpowering sustainable agriculture through AI-powered disease detection.', 'color: #388E3C; font-size: 14px;');
console.log('%cVersion 1.0.0', 'color: #666; font-size: 12px;');

// === EXPORT FOR MODULE USE (Optional) ===
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        plantDiseases,
        validateEmail,
        compressImage
    };
}
