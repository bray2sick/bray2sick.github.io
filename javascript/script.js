// Web3Forms
const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    result.innerHTML = "Please wait...";
    result.style.opacity = "1";

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = json.message;
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function () {
            form.reset();
            setTimeout(() => {
                result.style.opacity = "0";
            }, 3000);
        });
});

// ScrollReveal
ScrollReveal().reveal('h2', {
    duration: 1000,
    reset: true,
    easing: 'ease-in-out',
});
ScrollReveal().reveal('.about-me p', {
    interval: 400,
    reset: true,
    easing: 'ease-in-out',
});
ScrollReveal().reveal('.widget', {
    interval: 100,
    reset: true,
    easing: 'ease-in-out',
});
ScrollReveal().reveal('.project', {
    interval: 400,
    reset: true,
    easing: 'ease-in-out',
    origin: 'bottom',
    distance: '20px'
});
ScrollReveal().reveal('.form-group', {
    interval: 200,
    reset: true,
    easing: 'ease-in-out',
    origin: 'bottom',
    distance: '20px'
});

// Disable right-click
document.addEventListener('DOMContentLoaded', (event) => {
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });
});

// Disable F12
document.addEventListener('keydown', function (event) {
    if (event.code === 'F12') {
        event.preventDefault();
    }
});

// Disable Ctrl+Shift+C, Ctrl+Shift+I, Ctrl+Shift+K, Ctrl+U
document.onkeydown = function (e) {
    if (e.ctrlKey && e.shiftKey && (e.code === 'KeyI' || e.code === 'KeyC' || e.code === 'KeyK')) {
        return false;
    }
    if (e.ctrlKey && e.code === 'KeyU') {
        return false;
    }
};