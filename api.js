// Initialize points
let points = 0;

// Function to update points
function updatePoints(pointsEarned) {
    points += pointsEarned;
    alert(`You have earned ${pointsEarned} points! Total: ${points}`); // Replace with a nicer UI alert in a real app
}

// Handle issue report form submission
document.getElementById('issue-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission

    const location = document.getElementById('location').value.trim();
    const description = document.getElementById('description').value.trim();

    // Check if required fields are filled
    if (!location || !description) {
        alert('Please fill in all fields before submitting.');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ location, description }),
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message); // Notify user of success
            updatePoints(10); // Award points for reporting an issue
            this.reset(); // Reset the form
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        alert(`Error reporting issue: ${error.message}`);
    }
});

// Handle feedback form submission
document.addEventListener('DOMContentLoaded', function () {
    const stars = document.querySelectorAll('#star-rating .star');
    const ratingInput = document.getElementById('rating');

    // Add hover effect for stars
    stars.forEach((star) => {
        star.addEventListener('mouseover', function () {
            resetStars();
            highlightStars(star.dataset.value);
        });

        star.addEventListener('mouseout', resetStars);

        // Handle star click to set rating
        star.addEventListener('click', function () {
            ratingInput.value = star.dataset.value; // Set rating value
            highlightStars(star.dataset.value, true); // Lock the selected stars
        });
    });

    // Function to highlight stars up to the given rating
    function highlightStars(value, lock = false) {
        stars.forEach((star) => {
            if (star.dataset.value <= value) {
                star.classList.add('hovered');
                if (lock) {
                    star.classList.add('selected');
                }
            } else {
                star.classList.remove('hovered');
                if (lock) {
                    star.classList.remove('selected');
                }
            }
        });
    }

    // Function to reset stars to the currently selected state
    function resetStars() {
        stars.forEach((star) => {
            if (!star.classList.contains('selected')) {
                star.classList.remove('hovered');
            }
        });
    }

    // Handle feedback form submission
    document.getElementById('feedback-submit').addEventListener('click', async function (event) {
        event.preventDefault();

        const rating = ratingInput.value;
        const comments = document.getElementById('comments').value.trim();

        if (!rating) {
            alert('Please select a star rating.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rating, comments }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                resetFeedbackForm();
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            alert(`Error submitting feedback: ${error.message}`);
        }
    });

    // Reset the feedback form
    function resetFeedbackForm() {
        ratingInput.value = '';
        document.getElementById('comments').value = '';
        stars.forEach((star) => star.classList.remove('selected', 'hovered'));
    }
});


// Fetch a notification from the server
async function fetchNotification() {
    try {
        const response = await fetch('http://localhost:5000/api/reminder');
        const data = await response.json();
        if (response.ok) {
            showAlert(data.message);
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        alert(`Error fetching notification: ${error.message}`);
    }
}

// Example of calling fetchNotification
fetchNotification();

// Geolocation feature
document.getElementById('get-location').addEventListener('click', function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            document.getElementById('location').value = `Latitude: ${lat}, Longitude: ${lng}`;
        }, function () {
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
