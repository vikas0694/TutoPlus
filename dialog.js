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
        submitBtn.innerHTML = 'Please wait...';
        submitBtn.disabled = true;
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
        submitBtn.innerHTML = 'Uploading Resume...';
        body.resume = await uploadFile(document.getElementById('tutor-phone').value, 'form-resume', 'resume')
        submitBtn.innerHTML = 'Uploading PhotoId...';
        body.photoId = await uploadFile(document.getElementById('tutor-phone').value, 'form-id', 'id')

        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzWZvfnmmmhNZotPjK9J9ew6dtg-LujDhvuh3qLfDSTvRKSbHHODL12aGyE810ngR2Ngg/exec'; // Replace with your Web App URL
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "text/plain;charset=utf-8"); // IMPORTANT FOR APPS SCRIPT - FIXES CORS ERROR
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

    document.getElementById('form-resume').addEventListener('change', (e) => {
        const file = e.target.files[0];
        const maxSizeInMB = 1;
        const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

        if (file && file.size > maxSizeInBytes) {
            alert("File size exceeds 1MB limit. Please select a smaller file.");
            e.target.value = "";
        }
    })

    document.getElementById('form-id').addEventListener('change', (e) => {
        const file = e.target.files[0];
        const maxSizeInMB = 0.4;
        const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

        if (file && file.size > maxSizeInBytes) {
            alert("File size exceeds 400kb limit. Please select a smaller file.");
            e.target.value = "";
        }
    })
}

let dialogInstance = null;



document.addEventListener('DOMContentLoaded', () => {
    const tutorForm = document.getElementById('tutor-form')
    console.log(tutorForm, dialogId)
})



const UPLOAD_URL = `https://script.google.com/macros/s/AKfycbylzyrOcuqNHJGFMXiqAoSif7lSBGhjO9qnkUebCk6AghMEX--p_ZGh4DmCZHccZ-lLKw/exec`
async function uploadFile(fileName, inputType, type) {
    return new Promise((resolve, reject) => {
        try {
            const input = document.getElementById(inputType);
            const file = input.files[0];
            if (!file) return alert("Please select a " + type);
        
            const reader = new FileReader();
            let text = ''
            reader.onload = async function (e) {
                const base64 = e.target.result.split(',')[1];
        
                const body = JSON.stringify({
                    base64: base64,
                    fileName: `${type}-${fileName}`,
                    mimeType: file.type,
                });
        
                const response = await fetch(UPLOAD_URL, {
                    method: "POST",
                    contentType: "text/plain;charset=utf-8",
                    headers: {
                        "Content-Type": "text/plain;charset=utf-8"
                    },
                    body: body
                });
        
                text = await response.text();
                resolve(text);
            };
            reader.readAsDataURL(file);
        }
        catch(e) {
            reject(e)
        }

    })
}

async function openDialog() {
    if (!dialogInstance) {
        dialogInstance = await loadDialogComponent();
    }
}