document.addEventListener('DOMContentLoaded', () => {
    // דוגמה לנתונים שמגיעים מהשרת
    // const onimage = {
    //     url: 'path/to/your/main-image.jpg',
    //     username: 'User Name',
    //     userProfilePic: 'path/to/user-profile-pic.jpg',
    //     likes: 123,
    //     relatedImages: [
    //         "https://randomuser.me/api/portraits/women/1.jpg",
    //         "https://randomuser.me/api/portraits/men/2.jpg",
    //         "https://randomuser.me/api/portraits/men/6.jpg"
    //     ]
    // };

    // עדכון התמונה הראשית והמידע
    document.getElementById('main-image').src = onimage.url;
    document.getElementById('username').textContent = onimage.username;
    document.getElementById('user-profile-pic').src = onimage.userProfilePic;
    document.getElementById('likes').textContent = onimage.likes;

    // הפונקציה להורדת התמונה
    document.getElementById('download-button').addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = onimage.url;
        link.download = 'downloaded-image.jpg';
        link.click();
    });

    // הוספת התמונות הקשורות
    const relatedImagesContainer = document.getElementById('related-images');
    onimage.relatedImages.forEach(imgSrc => {
        const imgElement = document.createElement('img');
        imgElement.src = imgSrc;
        relatedImagesContainer.appendChild(imgElement);
    });
});
 async function goToImagePage(onimage) {
    document.getElementById('main-image').src = onimage.url;
    document.getElementById('username').textContent = onimage.username;
    document.getElementById('user-profile-pic').src = onimage.userProfilePic;
    document.getElementById('likes').textContent = onimage.likes;
    
    document.getElementById('download-button').addEventListener('click', async() => {
        try {
            const response = await fetch(`http://localhost:3000/images/download/${imageId}`);
            if (response.ok) {
                // Create a link element, set its href to the URL of the file, and simulate a click
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
 }