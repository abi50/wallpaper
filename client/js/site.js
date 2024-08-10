document.addEventListener('DOMContentLoaded', () => {
    const imageContainer = document.getElementById('imageContainer');
    const searchSection = document.getElementById('searchSection');
    const navbarSearch = document.getElementById('navbarSearch');
    const mainSearchBar = document.getElementById('mainSearchBar');
    const searchBar = document.getElementById('searchBar');
    const profilePic = document.querySelector('.profile-pic');
    const profileName = document.querySelector('.profile-name');
    let page = 1;
    const limit = 10;
    let loading = false;  // חוסם למניעת טעינה כפולה
    if(localStorage.getItem("userid")!=null){
        profileName.innerHTML=localStorage.getItem("userName");
        console.log("../uploads/"+ localStorage.getItem("profile"));
        const pat="/uploads/"+localStorage.getItem("profile");
        console.log(pat);
        profilePic.src = `http://localhost:3000${pat}`;
    }
    else{
        profilePic.src ="../images/profile.png";
    }

    mainSearchBar.addEventListener('input', debounce(handleSearchInput, 300));
    searchBar.addEventListener('input', debounce(handleSearchInput, 300));

    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }

    function handleSearchInput() {
        console.log("in handleSearchInput ");
        let category = searchBar.value;
        if(category=="")
            category = mainSearchBar.value;
        page = 1;
        loadImages(page, limit, category);
    }

    async function loadImages(page, limit, category = '') {
        console.log("Loading images");
        console.log(category);
        loading = true;
        try {
           
            const url = category
                ? `http://localhost:3000/images/search?category=${category}&page=${page}&limit=${limit}`
                : `http://localhost:3000/images?page=${page}&limit=${limit}`;
            console.log(url);

            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const images = await response.json();
            if (page === 1) {
                imageContainer.innerHTML = '';  // לנקות תמונות קיימות אם זו טעינה חדשה
            }
            displayImages(images);
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            loading = false;
        }
    }

    function displayImages(images) {
        images.forEach(image => {
            const imageItem = document.createElement('div');
            imageItem.className = 'image-item';
            // imageItem.onclick = () => openModalImage(image);
            const img = document.createElement('img');
            img.src = `http://localhost:3000${image.url}`;
            img.addEventListener('contextmenu', (event) => {
                event.preventDefault(); // למנוע את תפריט ההקשר הרגיל של הדפדפן
                openModalImage(image);
            });
            const actions = document.createElement('div');
            actions.className = 'image-actions';
            actions.innerHTML = `
            <button class="download-btn" onclick="downloadImage('${image.imageId}')">
                <img src="../images/download.png" alt="Download" />
            </button>
            <div class="action-buttons">
                <button id="likeButton" onclick="likeImage(event, ${image.imageId})">
                    <img src="../images/social-network (4).png" alt="Like" />
                </button>
                <button onclick="favoriteImage( ${image.imageId})">
                    <img src="../images/circle-heart.png" alt="Favorite" />
                </button>
            </div>
            `;

            imageItem.appendChild(img);
            imageItem.appendChild(actions);
            imageContainer.appendChild(imageItem);
        });
    }
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > searchSection.offsetTop + searchSection.offsetHeight) {
            navbarSearch.style.display = 'block';
        } else {
            navbarSearch.style.display = 'none';
        }

        if (!loading && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
            page++;
            loadImages(page, limit);
        }
    });

    loadImages(page, limit);


    // הצגת המודאל וטעינת הדף השני
    const modal = document.getElementById("myModal");
    const openModalButton = document.getElementById("openModal");
    const closeModalButton = document.getElementsByClassName("close")[0];
    const modalBody = document.getElementById("modal-body");
    openModalButton.addEventListener("click", openModal)
    
    
    
    closeModalButton.onclick = function() {
        modal.style.display = "none";
    }
    
    // סגירת המודאל בלחיצה מחוץ לחלונית
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    
});

function loadScript(url, callback) {
    const script = document.createElement('script');
    script.src = url;
    script.defer = true;
    script.onload = () => {
        console.log(`${url} script loaded successfully.`);
        if (callback) callback();
    };
    script.onerror = () => console.error(`Failed to load script ${url}`);
    document.head.appendChild(script);
}

function openModalImage(image) {
    const modalBody = document.getElementById("modal-body");
    const modal = document.getElementById("myModal");

    localStorage.setItem("selectedImageId", image.imageId);

    fetch('http://localhost:3000/image')
        .then(response => response.text())
        .then(data => {
            modalBody.innerHTML = data;
            modal.style.display = "block";

            // קורא לפונקציה שתשלים את המשימה
            loadScript('../js/image.js', () => {
                // אם יש פונקציה בשם initImageDetails שצריכה לרוץ לאחר טעינת הסקריפט
                if (typeof initImageDetails === 'function') {
                    initImageDetails();
                }
            });
        });
}



function openModal() {
    const modalBody = document.getElementById("modal-body");
    const modal = document.getElementById("myModal");
    
        if(localStorage.getItem("userid")!=null){
            window.location.href = 'http://localhost:3000/profile';
        }
        fetch('http://localhost:3000/register')  // נניח שהדף השני נקרא register.html והוא נמצא באותה תיקייה
            .then(response => response.text())
            .then(data => {
                modalBody.innerHTML = data;
                modal.style.display = "block";
            });
    }





const likeImage = async (event, imageId) => {
    try {
        const response = await fetch(`http://localhost:3000/images/like/${imageId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const updatedImage = await response.json();
          
            alert(`Liked image ${imageId}.`);
        } else {
            alert('Failed to like image. Please try again.');
        }
    } catch (error) {
        console.error('Error liking image:', error);
        alert('An error occurred while liking the image.');
    }
};

const downloadImage = async (imageId) => {

    if(localStorage.getItem("userid")==null){
        openModal();
    }
    else
    {
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

                 const response = await fetch(`http://localhost:3000/images/getImageById/${imageId}`, {
                    method: 'GET',
                    credentials: 'include'
                });
        
                if (!response.ok) {
                    throw new Error('Failed to fetch image');
                }
        
                const image = await response.json();
                await fetch(`http://localhost:3000/images/increment-downloads/${image.imageId}`, {
                    method: 'POST',
                    credentials: 'include'
                });
        
            }
        
             else {
                 console.error('Failed to download image:', response.statusText);
             }
         } 
         catch (error) {
             console.error('Error downloading image:', error);
         }
    }
};

const  favoriteImage = async ( imageId) => {
    if(localStorage.getItem("userid")==null){
        openModal();
    }
    else{
           try {
               const userIdd = Number(localStorage.getItem("userid"));
               console.log(userIdd)
               console.log(imageId)
            //    const send= { "userId": userIdd, "imageId":}
               const response = await fetch('http://localhost:3000/images/add-to-favorites', {
                   method: 'POST',
                   headers: {
                       'Content-Type': 'application/json',
                   },
                   body: JSON.stringify({ userId: userIdd, imageId }),
               });
                console.log(response)
               if (response.ok) {
                   const updatedImage = await response.json();
                   // // const button=document.getElementById("likeButton");
                   // event.target.classList.add('animate-like');
                   // setTimeout(() =>  event.target.classList.remove('animate-like'), 1000);
                   alert(` Image  ${imageId} added to favorites.`);
               } else {
                   alert('Failed to add image to favorites. Please try again.');
               }
           } catch (error) {
               console.error('Error adding image:', error);
               alert('An error occurred while adding the image to favorites.');
           }
    }
}

function addToCollection(id) {
    const collectionName = prompt('Enter collection name or leave empty to create new:');
    if (collectionName) {
        alert(`Added image ${id} to collection ${collectionName}`);
    }
}

document.getElementById('uploadBtn').addEventListener('click', () => {
    if(localStorage.getItem("userid")==null){
        openModal();
    }
    else{
    window.location.href = 'http://localhost:3000/upload';
    }
});