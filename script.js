function handleRSVP() {
    const btn = document.querySelector('.rsvp-btn');
    const originalText = btn.textContent;

    btn.textContent = 'Sending...';
    btn.style.background = '#10b981';
    btn.disabled = true;

    setTimeout(() => {
        btn.textContent = 'RSVP Sent! ✨';
        btn.style.background = '#059669';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '#6366f1';
            btn.disabled = false;
        }, 2500);
    }, 1200);
}

document.addEventListener('DOMContentLoaded', function() {

    document.querySelectorAll('.flag').forEach(flag => {
        flag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.transition = 'all 0.3s ease';
        });

        flag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            const section = this.getAttribute('data-section');
            document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
            document.getElementById(section + '-section').style.display = '';
        });
    });
});


function renderWishes() {
    const wishesList = document.getElementById('wishes-list');
    wishesList.innerHTML = '';
    const wishes = JSON.parse(localStorage.getItem('birthdayWishes') || '[]');
    wishes.forEach(wish => {
        const wishDiv = document.createElement('div');
        wishDiv.style.marginBottom = "12px";
        wishDiv.style.padding = "10px";
        wishDiv.style.background = "#f3f4f6";
        wishDiv.style.borderRadius = "8px";
        wishDiv.innerHTML = `<strong>${wish.name}:</strong> ${wish.message}`;
        wishesList.prepend(wishDiv);
    });
}

const wishForm = document.getElementById('wish-form');
if (wishForm) {
    renderWishes();
    wishForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('wish-name').value.trim() || "Anonymous";
        const message = document.getElementById('wish-message').value.trim();
        if (message) {
            const wishes = JSON.parse(localStorage.getItem('birthdayWishes') || '[]');
            wishes.push({ name, message });
            localStorage.setItem('birthdayWishes', JSON.stringify(wishes));
            renderWishes();
            wishForm.reset();
        }
    });
} else {
    if (document.getElementById('wishes-list')) renderWishes();
}