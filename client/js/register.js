

let uploadedProfileImage = null;

document.getElementById('profile-image').addEventListener('change', function(event) {
    uploadedProfileImage = event.target.files[0];
});

async function uploadProfileImage() {
    if (!uploadedProfileImage) {
        return null; // אם אין תמונה נבחרה, מחזירים null
    }
    console.log(uploadedProfileImage)
    const formData = new FormData();
    formData.append('image', uploadedProfileImage);

    try {
        const response = await fetch('http://localhost:3000/images/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            return result.imageUrl; // מחזירים את URL התמונה
        } else {
            const errorData = await response.json();
            console.error(`Failed to upload image: ${errorData.error}`);
            alert(`Failed to upload image: ${errorData.error}`);
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to upload image');
        return null;
    }
}



async function home() {
    window.location.href='http://localhost:3000/home';
}




async function addUser() {
    console.log("enters in adduser");

    let name = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let profileImage = document.getElementById('profileImage').files[0]; // Assuming the profile image is uploaded through a file input

    if (!profileImage) {
        alert("Please select a profile image.");
        return;
    }

    console.log(profileImage.name);

    // Upload the profile image
    const formData = new FormData();
    formData.append('image', profileImage);
    // formData.append('categories',[]);

    formData.append('userName',name);
    formData.append('isDeleted',true);


    try {
        
        console.log("Sending request to server");
        const response = await fetch('http://localhost:3000/images/upload', {
            method: 'POST',
            body: formData
        });
        console.log("Request sent, awaiting response");
        if (response.ok) 
            alert('Image uploaded successfully');
           

        
        const userResponse = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                profile: profileImage.name
            })
        });

        if (!userResponse.ok) {
            throw new Error('User registration failed');
        }

        const userData = await userResponse.json();
        console.log("start fetch");

        localStorage.setItem("token", userData.token);
        localStorage.setItem("userid", userData.user.userId);
        localStorage.setItem("userName", userData.user.name);
        localStorage.setItem("profile", profileImage.name);

        console.log("add success");
        window.location.href = "../views/site.html";
        
    } catch (error) {
        if (error.message === 'Image upload failed') {
            console.error("Image upload error:", error);
        } else if (error.message === 'User registration failed') {
            alert("Please enter a valid email, user creation failed");
        } else {
            console.error("Error:", error);
        }
    }
}


function login(){
    console.log("enter in login")
    let name = document.getElementById('username-login').value;
    let password = document.getElementById('password-login').value;
    let email = document.getElementById('email-login').value;

    var settings = {
        "url": "http://localhost:3000/auth/login",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({

            "name": name,
            "password": password,
            "email":email

        
        }),
    };
    console.log(settings)
    return new Promise((resolve, reject) => {
        $.ajax(settings).done(function (response) {
            console.log("enter in ajax")
            localStorage.setItem("token", response.token);
            console.log(response.user)
            localStorage.setItem("userid", response.user.userId);

            localStorage.setItem("userName", response.user.name);
            console.log(response.user.name)
            localStorage.setItem("profile", response.user.profile);
            console.log(response.user.profile);
            window.location.href = "http://localhost:3000/home";
            resolve(response.user);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status === 405) {
                alert("סיסמה שגויה");
            }
            if (jqXHR.status === 404) {
                alert("לא נמצא משתמש עבור המייל  שהוקש, נסה שוב!");
            }
            console.error("Error:", errorThrown);
            reject(errorThrown);
        });
    });
}
