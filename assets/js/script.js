const axios = require('axios');
// Initialize points
let points = 0;

// Function to update points
function updatePoints(pointsEarned) {
    points += pointsEarned;
    alert(`You have earned ${pointsEarned} points! Total: ${points}`); // Replace with a nicer UI alert in a real app
}

// Handle issue report form submission
document.getElementById('issue-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const location = document.getElementById('location').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').files[0];

    // Log the reported issue (replace this with your API call)
    console.log('Reported Issue:', {
        location,
        description,
        image: image ? image.name : 'No image uploaded'
    });

    // Update points for reporting an issue
    updatePoints(10); // Example: earn 10 points for reporting

    // Reset the form after submission
    this.reset();
});

// Handle feedback form submission
document.getElementById('feedback-submit').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const rating = document.getElementById('rating').value;
    const comments = document.getElementById('comments').value;

    // Log the feedback (replace this with your API call)
    console.log('Feedback:', {
        rating,
        comments
    });

    // Update points for submitting feedback
    updatePoints(5); // Example: earn 5 points for feedback

    // Reset the form after submission
    document.getElementById('comments').value = ''; // Clear comments
    document.querySelectorAll('.star').forEach(star => star.classList.remove('selected'));
});

// Language handling
const translations = {
    en: {
        header: "Waste Management Community App",
        reportIssue: "Report an Issue",
        rateService: "Rate Our Service",
        educationalResources: "Educational Resources",
        useLocation: "Use My Location",
    },
    sw: {
        header: "Programu ya Usimamizi wa Taka",
        reportIssue: "Ripoti Tatizo",
        rateService: "Pima Huduma Yetu",
        educationalResources: "Rasilimali za Elimu",
        useLocation: "Tumia Mahali Pangu",
    },
    ki: {
        header: "Wikinyu Wakuie Wa Taka",
        reportIssue: "Wigire Wendo",
        rateService: "Wihukire Wendo Wetu",
        educationalResources: "Maundu Ma Waki",
        useLocation: "Tumia Wendo Waku",
    },
    lu: {
        header: "Wagogo Wa Kachola",
        reportIssue: "Rang' Kachola",
        rateService: "Kochi Kachola",
        educationalResources: "Ng'ato Yako Kachola",
        useLocation: "Dhi Kachola",
    },
    lh: {
        header: "Olukota Owebuhya",
        reportIssue: "Lukota Luhya",
        rateService: "Pima Luhya Yetu",
        educationalResources: "Rasilimali za Elimu",
        useLocation: "Tumia Wendo Wako",
    },
    ka: {
        header: "Kalenjin Waste Management App",
        reportIssue: "Kipniririr",
        rateService: "Chon Kewot",
        educationalResources: "Kipngetal Koyen",
        useLocation: "Kipnget Koya",
    },
    km: {
        header: "Kamba Waste Management App",
        reportIssue: "Kamba Wendo",
        rateService: "Pima Kamba",
        educationalResources: "Rasilimali za Kamba",
        useLocation: "Tumia Wendo Wako",
    },
    ma: {
        header: "Maasai Waste Management App",
        reportIssue: "Enkiyio",
        rateService: "Olekishei",
        educationalResources: "Enkiyio Eno",
        useLocation: "Tumia Enkito",
    },
    me: {
        header: "Meru Waste Management App",
        reportIssue: "Nkaigwa",
        rateService: "Nkaigwa Wetu",
        educationalResources: "Maundu Ma Meru",
        useLocation: "Tumia Nkaigwa",
    },
    ta: {
        header: "Taita Waste Management App",
        reportIssue: "Kopoo",
        rateService: "Pima Taita",
        educationalResources: "Rasilimali za Taita",
        useLocation: "Tumia Wendo Wako",
    },
    tu: {
        header: "Turkana Waste Management App",
        reportIssue: "Naaki",
        rateService: "Pima Turkana",
        educationalResources: "Rasilimali za Turkana",
        useLocation: "Tumia Wendo Wako",
    },
    em: {
        header: "Embu Waste Management App",
        reportIssue: "Nkaigwa",
        rateService: "Pima Embu",
        educationalResources: "Maundu Ma Embu",
        useLocation: "Tumia Nkaigwa",
    },
    gi: {
        header: "Gikuyu Waste Management App",
        reportIssue: "Wigire Wendo",
        rateService: "Pima Gikuyu",
        educationalResources: "Maundu Ma Gikuyu",
        useLocation: "Tumia Wendo Wako",
    },
    na: {
        header: "Nandi Waste Management App",
        reportIssue: "Nandi Wendo",
        rateService: "Pima Nandi",
        educationalResources: "Rasilimali za Nandi",
        useLocation: "Tumia Nandi",
    },
    so: {
        header: "Somali Waste Management App",
        reportIssue: "Raporka",
        rateService: "Pima Somali",
        educationalResources: "Rasilimali za Somali",
        useLocation: "Tumia Wendo Wako",
    },
    re: {
        header: "Rendille Waste Management App",
        reportIssue: "Rang'ee",
        rateService: "Pima Rendille",
        educationalResources: "Rasilimali za Rendille",
        useLocation: "Tumia Wendo Wako",
    },
    po: {
        header: "Pokot Waste Management App",
        reportIssue: "Kipneng",
        rateService: "Pima Pokot",
        educationalResources: "Rasilimali za Pokot",
        useLocation: "Tumia Wendo Wako",
    },
    di: {
        header: "Digo Waste Management App",
        reportIssue: "Ripoti Digo",
        rateService: "Pima Digo",
        educationalResources: "Rasilimali za Digo",
        useLocation: "Tumia Wendo Wako",
    },
    ch: {
        header: "Chaga Waste Management App",
        reportIssue: "Ripoti Chaga",
        rateService: "Pima Chaga",
        educationalResources: "Rasilimali za Chaga",
        useLocation: "Tumia Wendo Wako",
    },
    ki: {
        header: "Kisii Waste Management App",
        reportIssue: "Ripoti Kisii",
        rateService: "Pima Kisii",
        educationalResources: "Rasilimali za Kisii",
        useLocation: "Tumia Wendo Wako",
    },
    te: {
        header: "Teso Waste Management App",
        reportIssue: "Ripoti Teso",
        rateService: "Pima Teso",
        educationalResources: "Rasilimali za Teso",
        useLocation: "Tumia Wendo Wako",
    },
    sa: {
        header: "Samburu Waste Management App",
        reportIssue: "Samburu Wendo",
        rateService: "Pima Samburu",
        educationalResources: "Rasilimali za Samburu",
        useLocation: "Tumia Wendo Wako",
    },
    ab: {
        header: "Abagusii Waste Management App",
        reportIssue: "Ripoti Abagusii",
        rateService: "Pima Abagusii",
        educationalResources: "Rasilimali za Abagusii",
        useLocation: "Tumia Wendo Wako",
    },
    sh: {
        header: "Shubi Waste Management App",
        reportIssue: "Ripoti Shubi",
        rateService: "Pima Shubi",
        educationalResources: "Rasilimali za Shubi",
        useLocation: "Tumia Wendo Wako",
    },
    ku: {
        header: "Kuria Waste Management App",
        reportIssue: "Ripoti Kuria",
        rateService: "Pima Kuria",
        educationalResources: "Rasilimali za Kuria",
        useLocation: "Tumia Wendo Wako",
    },
    mj: {
        header: "Mijikenda Waste Management App",
        reportIssue: "Ripoti Mijikenda",
        rateService: "Pima Mijikenda",
        educationalResources: "Rasilimali za Mijikenda",
        useLocation: "Tumia Wendo Wako",
    },
    og: {
        header: "Ogiek Waste Management App",
        reportIssue: "Ripoti Ogiek",
        rateService: "Pima Ogiek",
        educationalResources: "Rasilimali za Ogiek",
        useLocation: "Tumia Wendo Wako",
    },
    nu: {
        header: "Nubi Waste Management App",
        reportIssue: "Ripoti Nubi",
        rateService: "Pima Nubi",
        educationalResources: "Rasilimali za Nubi",
        useLocation: "Tumia Wendo Wako",
    },
};

document.getElementById('language-select').addEventListener('change', function() {
    const selectedLanguage = this.value;
    document.querySelector('h1').innerText = translations[selectedLanguage].header;
    document.getElementById('report-issue').querySelector('h2').innerText = translations[selectedLanguage].reportIssue;
    document.getElementById('feedback').querySelector('h2').innerText = translations[selectedLanguage].rateService;
    document.getElementById('education').querySelector('h2').innerText = translations[selectedLanguage].educationalResources;
    document.getElementById('get-location').innerText = translations[selectedLanguage].useLocation;
});

// Handle star rating selection
const stars = document.querySelectorAll('.star');

stars.forEach(star => {
    star.addEventListener('click', function() {
        const ratingValue = this.getAttribute('data-value');
        document.getElementById('rating').value = ratingValue;

        // Remove 'selected' class from all stars
        stars.forEach(s => s.classList.remove('selected'));
        
        // Add 'selected' class to the clicked star and all previous stars
        this.classList.add('selected');
        this.previousElementSibling?.classList.add('selected');
    });
});

// Geolocation feature
document.getElementById('get-location').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            document.getElementById('location').value = `Latitude: ${lat}, Longitude: ${lng}`;
        }, function() {
            alert("Unable to retrieve your location.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

// Example notification function
function showAlert(message) {
    alert(message); // Replace with a nicer UI alert in a real app
}

// Example of calling showAlert
showAlert("Reminder: Community clean-up event this Saturday at 10 AM.");
