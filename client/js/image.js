document.addEventListener('DOMContentLoaded', () => {
    // דוגמה לנתונים שמגיעים מהשרת
    const imageData = {
        url: 'path/to/your/main-image.jpg',
        username: 'User Name',
        userProfilePic: 'path/to/user-profile-pic.jpg',
        likes: 123,
        relatedImages: [
            "https://randomuser.me/api/portraits/women/1.jpg",
            "https://randomuser.me/api/portraits/men/2.jpg",
            "https://randomuser.me/api/portraits/men/6.jpg"
        ]
    };

    // עדכון התמונה הראשית והמידע
    document.getElementById('main-image').src = imageData.url;
    document.getElementById('username').textContent = imageData.username;
    document.getElementById('user-profile-pic').src = imageData.userProfilePic;
    document.getElementById('likes').textContent = imageData.likes;

    // הפונקציה להורדת התמונה
    document.getElementById('download-button').addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = imageData.url;
        link.download = 'downloaded-image.jpg';
        link.click();
    });

    // הוספת התמונות הקשורות
    const relatedImagesContainer = document.getElementById('related-images');
    imageData.relatedImages.forEach(imgSrc => {
        const imgElement = document.createElement('img');
        imgElement.src = imgSrc;
        relatedImagesContainer.appendChild(imgElement);
    });
});
async function name(imageid) {
    const url=""

 const response = await fetch(url, {
            method: 'GET',
            credentials: 'include', // Include cookies if necessary
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const data = await response.json();

    
}