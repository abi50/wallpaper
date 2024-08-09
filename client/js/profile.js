// profile.js
let imageFlage=false
document.addEventListener('DOMContentLoaded', async () => {
   
    // Fetch user data from the server
   const userid=localStorage.getItem("userid")
    console.log("userid: ",userid)
     url='http://localhost:3000/users/'+userid
    console.log(url)
    
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include', // Include cookies if necessary
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const data = await response.json();

        // Update profile information
        document.getElementById('profile-name').value = data.name;
        document.getElementById('profile-email').value = data.email;
        document.getElementById('profile-password').value = data.password; // Display asterisks for security
        document.getElementById('user-name').textContent = data.name;
        document.getElementById('user-email').textContent = data.email;
        console.log(data)
        // Update profile picture
        const  profilePic=document.getElementById('profile-pic');
        const pat="/uploads/"+localStorage.getItem("profile");
        console.log(pat);
        profilePic.src = `http://localhost:3000${pat}`;
        
       

    } catch (error) {
        console.error('Error loading profile data:', error);
        alert('There was an error loading your profile data.');
    }
});
 
async function loadImages(){


    
    if(imageFlage==false){
        imageFlage=true
    
try{
    const response = await fetch(url+'/images', {
        method: 'GET',
       credentials: 'include', // Include cookies if necessary
  });
  const data = await response.json();

data.forEach(item => {
    
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');

    // צור את אלמנט התמונה
    const imgElement = document.createElement('img');
    imgElement.src =item.url ||"http://localhost:3000" +item.url; 
    imgElement.alt = 'User image'; // טקסט תחליף לתמונה

    // צור את אלמנט כפתור המחיקה
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    
    // צור אלמנט שמציג את מספר הלייקים
    const likeCount = document.createElement('span');
    likeCount.textContent = `Likes: ${item.likes}`;
    likeCount.classList.add('like-count');

    // הוסף את התמונה, כפתור המחיקה, ומספר הלייקים ל-<div>
    imageContainer.appendChild(imgElement);
    imageContainer.appendChild(likeCount);
    imageContainer.appendChild(deleteButton);

    // הוסף את ה-<div> ל-container
    const images = document.getElementById('user-images');
    images.appendChild(imageContainer);

    // הוסף את האזנה לאירוע למחיקת התמונה
    deleteButton.addEventListener('click',async () => {
        imageContainer.remove();
        const imageUrl="http://localhost:3000/images/"+item.imageId
        console.log(item)
        try{
            console.log(item)
            const response = await fetch(imageUrl, {
                method: 'DELETE',
               credentials: 'include', // Include cookies if necessary
          });
        }
        catch(error){
            console.error('Error loading images data:', error);
            alert("You have not uploaded any image yet, you can start uploading now")
        }


    
  });
  
});


}
catch
{}

}

}

async function updateUser() {

  const name=  document.getElementById('profile-name').value ;
   const email= document.getElementById('profile-email').value  ;
   const password= document.getElementById('profile-password').value ;
   const data = {
    name: name,
    email:email,
    password: password,
};
try{
const response = await fetch(url ,{
    method: 'PUT',
    credentials: 'include', // כולל עוגיות (אם יש צורך)
    headers: {
        'Content-Type': 'application/json', // מגדיר את סוג התוכן ל-JSON
    },
    body: JSON.stringify(data) // המרה של אובייקט ה-JSON למחרוזת כדי לשלוח אותו ב-body של הבקשה
});

if (!response.ok) {
    throw new Error('Failed to update');
   
}
else
alert("successfully updated")
}
catch{
    alert("Incorrect details")
}
}

async function favorateImage() {
    try {
        const userId = localStorage.getItem("userid");
        console.log("userId: ", userId);
        const url = `http://localhost:3000/users/${userId}`;
        console.log(url);

        // קבלת נתוני המשתמש
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include', // Include cookies if necessary
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        console.log(userData.favorites);

        // אם אין תמונות מועדפות, יצא מהפונקציה
        if (!userData.favorites || userData.favorites.length === 0) {
            console.log('No favorite images found.');
            return;
        }

        // מיכל לתמונות
        const imageContainer = document.getElementById("image-container");

        // עבור כל תמונה מועדפת
        for (const imageId of userData.favorites) {
            try {
                // קריאה לשרת כדי לקבל את פרטי התמונה
                const imageResponse = await fetch(`http://localhost:3000/images/getImageById/${imageId}`, {
                    method: 'GET',
                    credentials: 'include'
                });

                if (!imageResponse.ok) {
                    throw new Error('Failed to fetch image details');
                }

                const imageData = await imageResponse.json();
                const imageUrl = `http://localhost:3000${imageData.url}`;

                // יצירת אלמנט עבור התמונה
                const imageItem = document.createElement('div');
                imageItem.className = 'image-item';

                const img = document.createElement('img');
                img.src = imageUrl;
                img.addEventListener('contextmenu', (event) => {
                    event.preventDefault(); // למנוע את תפריט ההקשר הרגיל של הדפדפן
                    openModalImage(imageData);
                });

                // יצירת אלמנט עבור פעולות התמונה
                const actions = document.createElement('div');
                actions.className = 'image-actions';
                actions.innerHTML = `
                    <button class="download-btn">
                        <img src="../images/download.png" alt="Download" />
                    </button>
                    <div class="action-buttons">
                        <button>
                            <img src="../images/circle-heart.png" alt="Favorite" />
                        </button>
                        <button id="likeButton">
                            <img src="../images/social-network (4).png" alt="Like" />
                        </button>
                    </div>
                `;

                // יצירת אלמנט להצגת מספר ההורדות והלייקים
                const imageInfo = document.createElement('div');
                imageInfo.className = 'image-info';
                imageInfo.innerHTML = `
                    <span>Downloads: ${imageData.downloadsCounter}</span>
                    <span>Likes: ${imageData.likes}</span>
                `;

                // הוספת האלמנטים לפריט התמונה
                imageItem.appendChild(img);
                imageItem.appendChild(actions);
                imageItem.appendChild(imageInfo);

                // הוספת פריט התמונה למיכל התמונות
                imageContainer.appendChild(imageItem);

            } catch (error) {
                console.error('Error loading image:', error);
            }
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

async function myImages() {

    const userid=localStorage.getItem("userid");
    console.log("userid: ",userid);
    url='http://localhost:3000/users/'+userid;
    console.log(url);
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include', // Include cookies if necessary
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }

    const data = await response.json();
    console.log(data.favorites);

    for (const imageId of data.myImages) {
        try {
            // קריאה לשרת כדי לקבל את פרטי התמונה לפי imageId
            const response = await fetch(`http://localhost:3000/images/getImageById/${imageId}`, {
                method: 'GET',
                credentials: 'include'
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch image');
            }
    
            const image = await response.json();
    
            // יצירת אלמנט עבור התמונה
            const imageItem = document.createElement('div');
            imageItem.className = 'image-item';
    
            const img = document.createElement('img');
            img.src = `http://localhost:3000${image.url}`;
            img.addEventListener('contextmenu', (event) => {
                event.preventDefault(); // למנוע את תפריט ההקשר הרגיל של הדפדפן
                openModalImage(image);
            });
    
            // יצירת אלמנט עבור פעולות התמונה
            const actions = document.createElement('div');
            actions.className = 'image-actions';
            actions.innerHTML = `
                <button class="download-btn" ">
                    <img src="../images/download.png" alt="Download" />
                </button>
                <div class="action-buttons">
                    <button ">
                        <img src="../images/circle-heart.png" alt="Favorite" />
                    </button>
                    <button id="likeButton"">
                        <img src="../images/social-network (4).png" alt="Like" />
                    </button>
                    
                </div>
            `;
    
            // יצירת אלמנט להצגת מספר ההורדות והלייקים
            const imageInfo = document.createElement('div');
            imageInfo.className = 'image-info';
            imageInfo.innerHTML = `
                <span>Downloads: ${image.downloadsCounter}</span>
                <span>Likes: ${image.likes}</span>
            `;
    
            // הוספת האלמנטים לפריט התמונה
            imageItem.appendChild(img);
            imageItem.appendChild(actions);
            imageItem.appendChild(imageInfo);
    
            // הוספת פריט התמונה למיכל התמונות
            const imageContainer = document.getElementById("imageUploaded-container");
            imageContainer.appendChild(imageItem);
    
        } catch (error) {
            console.error('Error loading image:', error);
        }
    }
}

async function logout() {
    window.location.href='http://localhost:3000/register';
    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            credentials: 'include', // Include cookies if necessary
        });

        if (!response.ok) {
            throw new Error('Logout failed');
        }

        // Redirect to login or home page
        window.location.href = 'http://localhost:3000/login'; // Replace with your desired redirect URL
    } catch (error) {
        console.error('Error logging out:', error);
        alert('An error occurred while logging out. Please try again.');
    }
}async function home() {
    window.location.href='http://localhost:3000/home';
}
