
console.log('Image.js script loaded');

async function initImageDetails() {

    const imageId = localStorage.getItem("selectedImageId");

    if (!imageId) {
        console.error('No image ID found in localStorage');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/images/getImageById/${imageId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch image details');
        }

        const imageData = await response.json();
        const pat = "/uploads/" + imageData.url;
        console.log(pat);

        document.getElementById('main-image').src = imageData.url;
        document.getElementById('username').textContent = imageData.userName;
        document.getElementById('user-profile-pic').src = "../images/profile.png";
        document.getElementById('likes').textContent = imageData.likes;
        document.getElementById('downloads').textContent = imageData.downloadsCounter;

        document.getElementById('download-button').addEventListener('click', async () => {
            try {
                const response = await fetch(`http://localhost:3000/images/download/${imageId}`);
                if (response.ok) {
                    const link = document.createElement('a');
                    link.href = `http://localhost:3000/images/download/${imageId}`;
                    link.download = `${imageId}.jpg`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } else {
                    console.error('Failed to download image:', response.statusText);
                }
            } catch (error) {
                console.error('Error downloading image:', error);
            }
        });

        const relatedImagesContainer = document.getElementById('related-images');
        imageData.relatedImages.forEach(imgSrc => {
            const imgElement = document.createElement('img');
            imgElement.src = imgSrc;
            relatedImagesContainer.appendChild(imgElement);
        });

    } catch (error) {
        console.error('Error fetching image details:', error);
    }
}

initImageDetails();





















// console.log('Image.js script loaded');
// function initImageDetails() {
// document.addEventListener('DOMContentLoaded', async () => {
//     // פונקציה לחילוץ ה-imageId מה-Local Storage
//     const imageId = localStorage.getItem("selectedImageId");

//     // אם אין imageId ב-Local Storage, נצא מהפונקציה
//     if (!imageId) {
//         console.error('No image ID found in localStorage');
//         return;
//     }

//     try {
//         // שליחה של בקשה לשרת כדי לקבל את פרטי התמונה
//         const response = await fetch(`http://localhost:3000/images/getImageById/${imageId}`);
//         if (!response.ok) {
//             throw new Error('Failed to fetch image details');
//         }

//         // קבלת פרטי התמונה מהשרת
//         const imageData = await response.json();
//         const pat="/uploads/"+imageData.url;
//         console.log(pat);
//         // עדכון התמונה הראשית והמידע על פי התמונה שהתקבלה מהשרת
//         document.getElementById('main-image').src = imageData.url;
//         document.getElementById('username').textContent = imageData.userName;
//         document.getElementById('user-profile-pic').src = "../images/profile.png";
//         document.getElementById('likes').textContent = imageData.likes;
//         document.getElementById('downloads').textContent = imageData.downloadsCounter;
//         // const  profilePic=document.getElementById('profile-pic');
       
        
       
//         // הפונקציה להורדת התמונה
//         document.getElementById('download-button').addEventListener('click', async () => {
//             try {
     
//                 const response = await fetch(`http://localhost:3000/images/download/${imageId}`);
//                 if (response.ok) {
//                     // Create a link element, set its href to the URL of the file, and simulate a click
//                     const link = document.createElement('a');
//                     link.href = `http://localhost:3000/images/download/${imageId}`;
//                     link.download = `${imageId}.jpg`;
//                     document.body.appendChild(link);
//                     link.click();
//                     document.body.removeChild(link);
   
//                     const response = await fetch(`http://localhost:3000/images/getImageById/${imageId}`, {
//                        method: 'GET',
//                        credentials: 'include'
//                    });
           
//                    if (!response.ok) {
//                        throw new Error('Failed to fetch image');
//                    }
           
//                    const image = await response.json();
//                    await fetch(`http://localhost:3000/images/increment-downloads/${image.imageId}`, {
//                        method: 'POST',
//                        credentials: 'include'
//                    });
           
//                }
           
//                 else {
//                     console.error('Failed to download image:', response.statusText);
//                 }
//             } 
//             catch (error) {
//                 console.error('Error downloading image:', error);
//             }
           
           
           
           
           
           
           
           
           
           
           
           
           
           
            // try {
            //     const downloadResponse = await fetch(`http://localhost:3000/images/download/${imageId}`);
            //     if (downloadResponse.ok) {
            //         // יצירת אלמנט של קישור להורדת התמונה
            //         const link = document.createElement('a');
            //         link.href = imageData.url;
            //         link.download = `${imageId}.jpg`;
            //         document.body.appendChild(link);
            //         link.click();
            //         document.body.removeChild(link);

            //         // עדכון מונה ההורדות
            //         document.getElementById('downloads').textContent = imageData.downloads + 1;
            //     } else {
            //         console.error('Failed to download image:', downloadResponse.statusText);
            //     }
            // } catch (error) {
            //     console.error('Error downloading image:', error);
            // }
        // });

//         // הוספת התמונות הקשורות
//         const relatedImagesContainer = document.getElementById('related-images');
//         imageData.relatedImages.forEach(imgSrc => {
//             const imgElement = document.createElement('img');
//             imgElement.src = imgSrc;
//             relatedImagesContainer.appendChild(imgElement);
//         });

//     } catch (error) {
//         console.error('Error fetching image details:', error);
//     }
// });
// }