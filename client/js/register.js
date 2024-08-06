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
            localStorage.setItem("name", response.user.name);
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

    var settings = {
        "url": "http://localhost:3000/login",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({

            "email": email,
            "password": password
        }),
    };
    console.log(settings)
    return new Promise((resolve, reject) => {
        $.ajax(settings).done(function (response) {
            localStorage.setItem("token", response.token);
            localStorage.setItem("name", response.user.name);
            window.location.href = "../html/homePage.html";
            resolve(response.user);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status === 405) {
                alert("סיסמה שגויה");
            }
            if (jqXHR.status === 404) {
                alert("לא נמצא משתמש עבור האימייל שהוקש, נסה שוב!");
            }
            console.error("Error:", errorThrown);
            reject(errorThrown);
        });
    });
}