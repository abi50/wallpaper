function addUser() {
console.log("enters in adduser")
    let name = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let profile = document.getElementById('profile').value;

    var settings = {
        "url": "http://localhost:3000/auth/register",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "name": name,
            "email": email,
            "password": password,
            "profile": profile
        }),
    }
    console.log(settings);
    $.ajax(settings)
        .done(async function (response) {
            console.log("start ajax")
           console.log(response.token)
            localStorage.setItem("token", response.token);
            localStorage.setItem("userid", response.user.userId);
            localStorage.setItem("userName", response.user.name);
            console.log("add saccssec")
            window.location.href = "../views/site.html";
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.status);
            if (jqXHR.status === 400) {
                alert("הקש מייל שאינו קיים במערכת, ההוספה נכשלה");
            } else {
                console.error("Error:", errorThrown);
            }users
        });






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

