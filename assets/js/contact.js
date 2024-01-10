let publicKey = 'vwR4AXWqci-2xv8EA'
emailjs.init(publicKey)

const validateFormData = () => {
    const name = document.getElementById('name')
    if (!name.value) {
        alert("Name is required.")
        return false;
    }

    const email = document.getElementById('email')
    if (!email.value) {
        alert("Email is required.")
        return false;
    }

    const subject = document.getElementById('subject')
    if (!subject.value) {
        alert("Subject is required.")
        return false;
    }

    const message = document.querySelector("textarea[name='message']")
    if (!message.value) {
        alert("Message is required.")
        return false;
    }
    return true;
}

const fetchFormData = () => {
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const subject = document.getElementById('subject').value
    const message = document.querySelector("textarea[name='message']").value
    return {
        from_name: name,
        from_email: email,
        reply_to: email,
        to_name: 'Suraj Kumar Giri',
        subject: subject,
        message: message,
        date_time: new Date().toString()
    }
}

const contactForm = document.getElementsByTagName('form')[0]
contactForm.addEventListener('submit', (event) => {
    event.preventDefault()
}
)

document.querySelector('button[type="submit"]').addEventListener('click', () => {
    if (validateFormData()) {
        emailjs.send('service_gee98ws', 'template_oiozxsa', templateParams = fetchFormData(), publicKey)
            .then((response) => {
                document.getElementsByClassName('loading')[0].style.display = 'none';
                if (response.status == 200) {
                    console.log(document.getElementById('custom-error-message'))
                    document.getElementsByClassName('sent-message')[0].style.display = 'block';
                }
                else {
                    document.getElementById('custom-error-message').style.display = 'block';
                    document.getElementById('custom-error-message').innerHTML = 'Error: Something went wrong while sending request to the server.';
                }
            }
            )
        document.getElementsByClassName('sent-message')[0].style.display = 'none';
        document.getElementById('custom-error-message').style.display = 'none';
        document.getElementsByClassName('loading')[0].style.display = 'block';
    }
    else {
        document.getElementById('custom-error-message').style.display = 'block';
        document.getElementById('custom-error-message').innerHTML = 'Error: Please fill all the required fields.';
    }
})