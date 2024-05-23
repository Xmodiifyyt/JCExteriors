document.addEventListener('DOMContentLoaded', () => {
    const reviewForm = document.getElementById('reviewForm');
    const submittedReviews = document.getElementById('submittedReviews');
    const confirmationMessage = document.getElementById('confirmationMessage');

    // Load reviews from local storage
    const loadReviews = () => {
        try {
            const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
            reviews.forEach(review => displayReview(review));
        } catch (error) {
            console.error('Failed to load reviews from local storage:', error);
        }
    };

    // Save reviews to local storage
    const saveReviews = (reviews) => {
        try {
            localStorage.setItem('reviews', JSON.stringify(reviews));
        } catch (error) {
            console.error('Failed to save reviews to local storage:', error);
        }
    };

    // Display review
    const displayReview = ({ name, review, rating }) => {
        const reviewContainer = document.createElement('div');
        reviewContainer.className = 'review';
        const reviewContent = `
            <p>"${review}" - <strong>${name}</strong></p>
            <p>${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</p>
        `;
        reviewContainer.innerHTML = reviewContent;
        submittedReviews.appendChild(reviewContainer);
    };

    reviewForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('reviewerName').value;
        const review = document.getElementById('reviewText').value;
        const rating = parseInt(document.querySelector('input[name="rating"]:checked').value);

        if (rating < 1 || rating > 5) {
            alert('Please enter a rating between 1 and 5.');
            return;
        }

        const newReview = { name, review, rating };
        displayReview(newReview);

        try {
            const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
            reviews.push(newReview);
            saveReviews(reviews);
        } catch (error) {
            console.error('Failed to update reviews in local storage:', error);
        }

        reviewForm.reset();
        confirmationMessage.style.display = 'block';
        setTimeout(() => {
            confirmationMessage.style.display = 'none';
        }, 3000);
    });

    loadReviews();
});
