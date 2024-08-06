document.addEventListener('DOMContentLoaded', () => {
    const imageContainer = document.getElementById('imageContainer');
    
    // Dummy image data
    const images = [
       
            {"src": "https://picsum.photos/200/300?random=1", "id": 1, "likes": 102, "category": 1},
            {"src": "https://picsum.photos/200/300?random=2", "id": 2, "likes": 234, "category": 2},
            {"src": "https://picsum.photos/200/300?random=3", "id": 3, "likes": 345, "category": 3},
            {"src": "https://picsum.photos/200/300?random=4", "id": 4, "likes": 412, "category": 4},
            {"src": "https://picsum.photos/200/300?random=5", "id": 5, "likes": 523, "category": 5},
            {"src": "https://picsum.photos/200/300?random=6", "id": 6, "likes": 634, "category": 6},
            {"src": "https://picsum.photos/200/300?random=7", "id": 7, "likes": 745, "category": 7},
            {"src": "https://picsum.photos/200/300?random=8", "id": 8, "likes": 856, "category": 8},
            {"src": "https://picsum.photos/200/300?random=9", "id": 9, "likes": 967, "category": 9},
            {"src": "https://picsum.photos/200/300?random=10", "id": 10, "likes": 1098, "category": 10},
            {"src": "https://picsum.photos/200/300?random=11", "id": 11, "likes": 210, "category": 1},
            {"src": "https://picsum.photos/200/300?random=12", "id": 12, "likes": 322, "category": 2},
            {"src": "https://picsum.photos/200/300?random=13", "id": 13, "likes": 433, "category": 3},
            {"src": "https://picsum.photos/200/300?random=14", "id": 14, "likes": 544, "category": 4},
            {"src": "https://picsum.photos/200/300?random=15", "id": 15, "likes": 655, "category": 5},
            {"src": "https://picsum.photos/200/300?random=16", "id": 16, "likes": 766, "category": 6},
            {"src": "https://picsum.photos/200/300?random=17", "id": 17, "likes": 877, "category": 7},
            {"src": "https://picsum.photos/200/300?random=18", "id": 18, "likes": 988, "category": 8},
            {"src": "https://picsum.photos/200/300?random=19", "id": 19, "likes": 1099, "category": 9},
    ];
    
    images.forEach(image => {
        const imageItem = document.createElement('div');
        imageItem.className = 'image-item';
        
        const img = document.createElement('img');
        img.src = image.src;
        
        const actions = document.createElement('div');
        actions.className = 'image-actions';
        actions.innerHTML = `
            <button onclick="downloadImage('${image.src}')">Download</button>
            <button onclick="likeImage(${image.id})">Like</button>
            <button onclick="favoriteImage(${image.id})">Favorite</button>
            <button onclick="addToCollection(${image.id})">Add to Collection</button>
        `;
        
        imageItem.appendChild(img);
        imageItem.appendChild(actions);
        imageContainer.appendChild(imageItem);
    });
});

function downloadImage(src) {
    // Logic to download image
    window.location.href = src; // Simple implementation for demonstration
}

function likeImage(id) {
    // Logic to like image
    alert(`Liked image ${id}`);
}

function favoriteImage(id) {
    // Logic to favorite image
    alert(`Favorited image ${id}`);
}

function addToCollection(id) {
    // Logic to add image to collection
    const collectionName = prompt('Enter collection name or leave empty to create new:');
    if (collectionName) {
        alert(`Added image ${id} to collection ${collectionName}`);
    }
}
