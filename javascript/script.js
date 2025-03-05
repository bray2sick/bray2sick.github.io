// Structured Data (JSON-LD)
const jsonLD = {
  '@context': 'http://schema.org',
  '@type': 'ProfilePage',
  mainEntity: {
    '@type': 'Person',
    name: 'Braydon Pettit',
    url: 'https://bray2sick.github.io/',
    sameAs: [
      'https://www.linkedin.com/in/braydon-pettit',
      'https://www.github.com/bray2sick',
    ],
  },
}

// Create a comment node showing where structured data is injected
const commentNode = document.createComment(' Structured Data (JSON-LD) ')
document.head.appendChild(commentNode)

// Create and append a script element to hold your JSON-LD data
const script = document.createElement('script')
script.type = 'application/ld+json'
script.textContent = JSON.stringify(jsonLD)
document.head.appendChild(script)

// Initialize EmailJS
;(function () {
  emailjs.init('wM7F83-IxVd2W7ffc')
})()

// EmailJS
const form = document.getElementById('form')
const result = document.getElementById('result')

// Add an event listener to the form for the 'submit' event
form.addEventListener('submit', async function (e) {
  e.preventDefault()
  result.innerHTML = 'Please wait...'
  result.style.opacity = '1'

  const serviceID = 'service_2c47lkp'
  const templateID = 'template_v8n1i6o'

  // Get the reCAPTCHA response token
  const token = grecaptcha.getResponse()

  // Check if the reCAPTCHA is completed
  if (!token) {
    result.innerHTML = 'Please complete the reCAPTCHA'
    setTimeout(() => {
      result.style.opacity = '0'
    }, 3000)
    return
  }

  // Create a FormData object from the form
  const formData = new FormData(form)
  formData.append('g-recaptcha-response', token)

  try {
    // Send the form data using EmailJS
    await emailjs.sendForm(serviceID, templateID, form)
    result.innerHTML = 'Sent!'
  } catch (error) {
    console.error(error)
    result.innerHTML = 'Something went wrong!'
  } finally {
    form.reset()
    grecaptcha.reset()
    setTimeout(() => {
      result.style.opacity = '0'
    }, 3000)
  }
})

// ScrollReveal
const revealConfigs = [
  {
    selector: 'h2',
    options: { duration: 1000, reset: true, easing: 'ease-in-out' },
  },
  {
    selector: '.about-me p',
    options: { interval: 400, reset: true, easing: 'ease-in-out' },
  },
  {
    selector: '.widget',
    options: { interval: 100, reset: true, easing: 'ease-in-out' },
  },
  {
    selector: '.project',
    options: {
      interval: 400,
      reset: true,
      easing: 'ease-in-out',
      origin: 'bottom',
      distance: '20px',
    },
  },
  {
    selector: '.g-recaptcha',
    options: {
      interval: 200,
      reset: true,
      easing: 'ease-in-out',
      origin: 'bottom',
      distance: '20px',
    },
  },
  {
    selector: '.form-group',
    options: {
      interval: 200,
      reset: true,
      easing: 'ease-in-out',
      origin: 'bottom',
      distance: '20px',
    },
  },
]

revealConfigs.forEach(({ selector, options }) => {
  ScrollReveal().reveal(selector, options)
})

// Disable right-click
document.addEventListener('DOMContentLoaded', (event) => {
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault()
  })
})

// Disable F12, Ctrl+Shift+C, Ctrl+Shift+I, Ctrl+Shift+K, Ctrl+U
document.addEventListener('keydown', function (event) {
  if (
    event.code === 'F12' ||
    (event.ctrlKey &&
      event.shiftKey &&
      (event.code === 'KeyI' ||
        event.code === 'KeyC' ||
        event.code === 'KeyK')) ||
    (event.ctrlKey && event.code === 'KeyU')
  ) {
    event.preventDefault()
  }
})
