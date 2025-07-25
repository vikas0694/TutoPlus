var dialogId = '';

const addModalStyle = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    doc.body.children[0].className = "modal";
    const element = doc.body.innerHTML
    return element
}

const createModal = (child) => {
    const parent = document.createElement('div')
    child = addModalStyle(child)
    parent.style.height = '100vh';
    parent.style.width = '100%';
    parent.style.background = 'rgba(0, 0, 0, 0.5)';
    parent.style.backdropFilter = 'blur(3px)'
    parent.style.display = 'flex';
    parent.style.justifyContent = 'center';
    parent.style.alignItems = 'center';
    parent.style.position = 'fixed';
    parent.style.top = 0;
    parent.style.left = 0;
    parent.style.bottom = 0;
    parent.style.right = 0;
    parent.style.zIndex = 1000;
    parent.innerHTML = child
    parent.addEventListener('click', () => {
        removeModal()
    })
    return parent
}

const removeModal = () => {
    const modal = document.getElementById(dialogId)
    if (modal) {
        modal.remove()
    }
}

async function loadDialogComponent() {
    dialogId = new Date().getTime() + '-modal';
    const res = await fetch('dialog.html');
    const html = await res.text();
    const wrapper = createModal(html)
    wrapper.setAttribute('id', dialogId)
    document.body.appendChild(wrapper);


    const tutorForm = document.getElementById('tutor-form')
    tutorForm.addEventListener('submit', async (e) => {
        const submitBtn = document.getElementById('apply-tutor-btn')
        const body = {
            name: document.getElementById('tutor-name').value,
            phone: document.getElementById('tutor-phone').value,
            email: document.getElementById('tutor-email').value,
            gender: document.getElementById('tutor-gender').value,
            experience: document.getElementById('tutor-experience').value,
            education: document.getElementById('tutor-education').value,
            preferredBoard: document.getElementById('tutor-preferredBoard').value,
            location: document.getElementById('tutor-location').value,
            area: document.getElementById('tutor-area').value,
            pincode: document.getElementById('tutor-pin').value,
            tutor: true
        }
        console.log(body)

        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzWZvfnmmmhNZotPjK9J9ew6dtg-LujDhvuh3qLfDSTvRKSbHHODL12aGyE810ngR2Ngg/exec'; // Replace with your Web App URL
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "text/plain;charset=utf-8"); // IMPORTANT FOR APPS SCRIPT 
        const raw = JSON.stringify(body);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {

            submitBtn.innerHTML = 'Please wait...';
            submitBtn.disabled = true;

            const response = await fetch(SCRIPT_URL, requestOptions);
            console.log('Response: - ', response);
            if (response.ok) {
                const result = await response.json();
                alert('Thank you! Our team will be contacing you soon.');
                tutorForm.reset();
                removeModal()
            } else {
                alert('Something went wrong. Please try again.');
            }

            submitBtn.innerHTML = 'Submit';
            submitBtn.disabled = false;

        } catch (error) {
            submitBtn.innerHTML = 'Submit';
            submitBtn.disabled = false;
            console.error('Submission error:', error);
            alert('Error submitting form. Please check your internet connection or try again later.');
        }
    })
}

let dialogInstance = null;

async function openDialog() {
    if (!dialogInstance) {
        dialogInstance = await loadDialogComponent();
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const tutorForm = document.getElementById('tutor-form')
    console.log(tutorForm, dialogId)
})