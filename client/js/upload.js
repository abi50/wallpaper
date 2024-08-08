document.addEventListener('DOMContentLoaded', () => {
    console.log("enter page");
    loadCategories(); // טוען את רשימת הקטגוריות מהשרת כשדף נטען
    
    const dropZone = document.getElementById('dropZone');
    const imageInput = document.getElementById('image');
  // הוספת כפתור הסרה
  const removeBtn = document.createElement('button');
  removeBtn.innerText = '✖';
  removeBtn.classList.add('remove-btn');
  removeBtn.style.display = 'none'; // התחל עם הכפתור מוסתר
  removeBtn.addEventListener('click', () => {
      imageInput.value = '';
      dropZone.innerHTML = '<label for="image">Drag and drop an image here or click to browse</label>';
      removeBtn.style.display = 'none'; // הסתר את כפתור ההסרה
  });
//   dropZone.appendChild(removeBtn);





























dropZone.addEventListener('click', () => {
    console.log("open browser");
    imageInput.click(); // כאשר לוחצים על אזור הגרירה, פותח את חלון בחירת הקבצים
});

dropZone.addEventListener('dragover', (event) => {
    event.preventDefault(); // יש למנוע את ברירת המחדל
    dropZone.classList.add('dragover'); // מוסיף אפקט כשגוררים קובץ מעל אזור הגרירה
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover'); // מסיר את האפקט כשמפסיקים לגרור מעל אזור הגרירה
});

dropZone.addEventListener('drop', (event) => {
    event.preventDefault(); // יש למנוע את ברירת המחדל
    dropZone.classList.remove('dragover'); // מסיר את האפקט כשמשחררים את הקובץ באזור הגרירה

    const files = event.dataTransfer.files;
    console.log("Files on drop:", files); // בדוק את הקבצים המתקבלים
    handleFiles(files); // טיפול בקבצים שנפלטו

    uploadedFile = files[0]; // שמירת הקובץ במשתנה הגלובלי
});

imageInput.addEventListener('change', () => {
    if (imageInput.files.length > 0) {
        uploadedFile = imageInput.files[0]; // שמירת הקובץ במשתנה הגלובלי
        handleFiles(imageInput.files);
    }
});

function handleFiles(files) {
    console.log("Files on drop:", files); // בדוק את הקבצים המתקבלים
    const file = files[0]; // מניחים שנפל רק קובץ אחד
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            dropZone.innerHTML = `<img src="${e.target.result}" alt="Uploaded Image" style="max-width: 100%; max-height: 100%;">`;

            // הצגת כפתור ההסרה
            removeBtn.style.display = 'block';
            dropZone.appendChild(removeBtn); // מוסיפים את כפתור ההסרה לאזור הגרירה
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please upload an image file.');
    }
}

document.getElementById('uploadForm').addEventListener('submit', uploadImage); // מעלה את התמונה לשרת





















// dropZone.addEventListener('click', () => {
//     console.log("open browser");
//     imageInput.click(); // כאשר לוחצים על אזור הגרירה, פותח את חלון בחירת הקבצים
// });

// dropZone.addEventListener('dragover', (event) => {
//     event.preventDefault(); // יש למנוע את ברירת המחדל
//     dropZone.classList.add('dragover'); // מוסיף אפקט כשגוררים קובץ מעל אזור הגרירה
// });

// dropZone.addEventListener('dragleave', () => {
//     dropZone.classList.remove('dragover'); // מסיר את האפקט כשמפסיקים לגרור מעל אזור הגרירה
// });
    



// dropZone.addEventListener('drop', (event) => {
//     event.preventDefault(); // יש למנוע את ברירת המחדל
//     dropZone.classList.remove('dragover'); // מסיר את האפקט כשמשחררים את הקובץ באזור הגרירה

//     const files = event.dataTransfer.files;
//     console.log("Files on drop:", files); // בדוק את הקבצים המתקבלים
//     handleFiles(files); // טיפול בקבצים שנפלטו

//     // שמירת הקובץ לקלט imageInput
//     imageInput.files = files;
// });

// function handleFiles(files) {
//     console.log("Files on drop:", files); // בדוק את הקבצים המתקבלים
//     console.log("Files on drop:[0]", files[0]); // בדוק את הקבצים המתקבלים
//     const file = files[0]; // מניחים שנפל רק קובץ אחד
//     console.log("file :", file); // בדוק את הקבצים המתקבלים
//     if (file && file.type.startsWith('image/')) {
//         const reader = new FileReader();
//         reader.onload = function(e) {
//             dropZone.innerHTML = `<img src="${e.target.result}" alt="Uploaded Image" style="max-width: 100%; max-height: 100%;">`;

//             // הצגת כפתור ההסרה
//             removeBtn.style.display = 'block';
//             dropZone.appendChild(removeBtn); // מוסיפים את כפתור ההסרה לאזור הגרירה
//         };
//         reader.readAsDataURL(file);
//     } else {
//         alert('Please upload an image file.');
//     }
// }








    // dropZone.addEventListener('drop', (event) => {
    //     event.preventDefault(); // יש למנוע את ברירת המחדל
    //     dropZone.classList.remove('dragover'); // מסיר את האפקט כשמשחררים את הקובץ באזור הגרירה

    //     const files = event.dataTransfer.files;
    //     console.log("Files on drop:", files); // בדוק את הקבצים המתקבלים
    //     handleFiles(files); // טיפול בקבצים שנפלטו
    // });

    // function handleFiles(files) {
    //     console.log("Files on drop:", files); // בדוק את הקבצים המתקבלים
    //     console.log("Files on drop:[0]", files[0]); // בדוק את הקבצים המתקבלים
    //     const file = files[0]; // מניחים שנפל רק קובץ אחד
    //     console.log("file :", file); // בדוק את הקבצים המתקבלים
    //     if (file && file.type.startsWith('image/')) {
    //         const reader = new FileReader();
    //         reader.onload = function(e) {
    //             dropZone.innerHTML = `<img src="${e.target.result}" alt="Uploaded Image" style="max-width: 100%; max-height: 100%;">`;

    //             // הצגת כפתור ההסרה
    //             removeBtn.style.display = 'block';
    //             dropZone.appendChild(removeBtn); // מוסיפים את כפתור ההסרה לאזור הגרירה
    //         };
    //         reader.readAsDataURL(file);
    //     } else {
    //         alert('Please upload an image file.');
    //     }
    // }
    imageInput.addEventListener('change', () => {
        if (imageInput.files.length > 0) {
            const file = imageInput.files[0];
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    dropZone.querySelector('label').innerHTML = `<img src="${e.target.result}" alt="Uploaded Image" style="max-width: 100%; max-height: 100%;">`;
                    removeBtn.style.display = 'block'; // הצג את כפתור ההסרה
                };
                reader.readAsDataURL(file);
            } else {
                alert('Please upload an image file.');
            }
        }
    });

    
    
    document.getElementById('addCategoryBtn').addEventListener('click', () => {
        document.getElementById('newCategory').style.display = 'block';
        document.getElementById('saveCategoryBtn').style.display = 'block'; // מציג את השדות להוספת קטגוריה חדשה
    });
    
    document.getElementById('saveCategoryBtn').addEventListener('click', addCategory); // שומר את הקטגוריה החדשה
    
    document.getElementById('uploadForm').addEventListener('submit', uploadImage); // מעלה את התמונה לשרת
});

async function loadCategories() {
    try {
        console.log("try to get category");
        const response = await fetch('http://localhost:3000/category/categories'); // שולח בקשה לשרת לקבל את רשימת הקטגוריות
        if (!response.ok) {
           console.log("dont get category");
        }
        const categories = await response.json();
        console.log(categories);
        
        const categoriesContainer = document.getElementById('categoriesContainer');
        categoriesContainer.innerHTML = '';
        
        categories.forEach(category => {
            const categoryDiv = document.createElement('div');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = category.code;
            checkbox.id = `category-${category.code}`;
            
            const label = document.createElement('label');
            label.htmlFor = `category-${category.code}`;
            label.innerText = category.name;
            
            categoryDiv.appendChild(checkbox);
            categoryDiv.appendChild(label);
            categoriesContainer.appendChild(categoryDiv); // יוצר אלמנט של checkbox לכל קטגוריה ומוסיף אותו לדף
        });
    } catch (error) {
        console.error('Failed to load categories:', error);
    }
}

async function addCategory() {
    const categoryName = document.getElementById('newCategory').value;
    
    const response = await fetch('http://localhost:3000/category', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: categoryName })
    });
    
    if (response.ok) {
        loadCategories(); // טוען מחדש את רשימת הקטגוריות לאחר הוספת קטגוריה חדשה
        document.getElementById('newCategory').value = '';
        document.getElementById('newCategory').style.display = 'none';
        document.getElementById('saveCategoryBtn').style.display = 'none'; // מסיר את שדות הקטגוריה החדשה מהתצוגה
    } else {
        const errorData = await response.json();
        console.log(errorData)
        alert(`Failed to add category: ${errorData.error}`); // מציג את הודעת השגיאה למשתמש
    }
}

// async function uploadImage(event) {
//     console.log("Entered uploadImage function", event);
//     const uploadFo = document.getElementById('uploadForm');
//     console.log( uploadFo);

//     event.preventDefault();
//     const imageInput = document.getElementById('image');
//     // console.log( event.dataTransfer.files);
    
//     if (!imageInput.files.length) {
//         alert('Please select an image file.');
//         return;
//     }
    
//     const formData = new FormData();
//     const image = imageInput.files[0];
//     // document.getElementById('image').files[0];
//     formData.append('image', image);

//     const selectedCategories = Array.from(document.querySelectorAll('#categoriesContainer input:checked'))
//                                     .map(checkbox => checkbox.value);
//     formData.append('categories', JSON.stringify(selectedCategories));
    
//     formData.append('userName', localStorage.getItem("userName")); // תוסיף כאן את שם המשתמש הנכון
//     console.log("Form data prepared", formData);

//     try {
//         console.log("Sending request to server");
//         const response = await fetch('http://localhost:3000/images/upload', {
//             method: 'POST',
//             body: formData
//         });

//         console.log("Request sent, awaiting response");
//         if (response.ok) {
//             alert('Image uploaded successfully');
//             window.location.href = 'http://localhost:3000/home';
//         } else {
//             const errorData = await response.json();
//             console.log(errorData)
//             alert(`Failed to add category: ${errorData.error}`); // מציג את הודעת השגיאה למשתמש
//             // alert('Failed to upload image');
//             // console.error('Response status:', response.status);
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         alert('Failed to upload image');
//     }
// }






async function uploadImage(event) {
    console.log("Entered uploadImage function", event);
    event.preventDefault();
    
    if (!uploadedFile) { // בדיקה אם קובץ נבחר
        alert('Please select an image file.');
        return;
    }
    
    const formData = new FormData();
    formData.append('image', uploadedFile); // משתמשים בקובץ שהוקלט במשתנה הגלובלי
    
    const selectedCategories = Array.from(document.querySelectorAll('#categoriesContainer input:checked'))
                                    .map(checkbox => checkbox.value);
    formData.append('categories', JSON.stringify(selectedCategories));
    
    formData.append('userName', localStorage.getItem("userName")); // תוסיף כאן את שם המשתמש הנכון
    console.log("Form data prepared", formData);
    
    try {
        console.log("Sending request to server");
        const response = await fetch('http://localhost:3000/images/upload', {
            method: 'POST',
            body: formData
        });
    
        console.log("Request sent, awaiting response");
        if (response.ok) {
            alert('Image uploaded successfully');
            window.location.href = 'http://localhost:3000/home';
        } else {
            const errorData = await response.json();
            console.log(errorData)
            alert(`Failed to add category: ${errorData.error}`); // מציג את הודעת השגיאה למשתמש
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to upload image');
    }
    }