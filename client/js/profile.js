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
        document.getElementById('profile-pic').src =data.profile ||"http://localhost:3000" +data.profile; 

        
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
    
    // צור אלמנט <div> עבור התמונה
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

}}

async function updateUser() {

  const name=  document.getElementById('profile-name').value ;
   const email= document.getElementById('profile-email').value  ;
   const password= document.getElementById('profile-password').value ;
   const data = {
    name: name,
    email:email,
    password: password,
    // הוסף כאן ערכים נוספים לעדכון
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
    const userid=localStorage.getItem("userid")
    console.log("userid: ",userid)
   url='http://localhost:3000/users/'+userid
    console.log(url)
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include', // Include cookies if necessary
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }

    const data = await response.json();
console.log(data.favorites)
    
    let div=document.getElementById("user-collections")
        let i=0
       while (data.favorites[i]!=undefined){
         let urlImage='localhost:3000/images/'+data.favorites[i].imageId;
         const response = await fetch(urlImage, {
            method: 'GET',
            credentials: 'include', // Include cookies if necessary
         });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const image = await response.json();
        const imgElement = document.createElement('img');
        imgElement.src =image.url ||"http://localhost:3000" +image.url; 
         imgElement.alt = image.userName; 
         div.appendChild(imgElement);
        }
    
    i++
}