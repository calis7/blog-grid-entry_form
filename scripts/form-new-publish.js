document.addEventListener("DOMContentLoaded", function () {
    const blogEntryForm = document.getElementById("blog-entry-form");

    blogEntryForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const category = document.getElementById("entry-category").value;
        const title = document.getElementById("entry-title").value;
        const text = document.getElementById("entry-text").value;
        const image = document.getElementById("entry-image").files[0];
        const profileImage = document.getElementById("entry-profile-image").files[0];

        addNewPost(category, title, text, image, profileImage);
        // Desplazarse a la grilla de publicaciones
        scrollPostsToView();
        blogEntryForm.reset();
    });

    // Function to add a new post to the existing posts
    function addNewPost(category, title, text, image, profileImage) {
        const postContainer = document.querySelector(".post.container");

        const postBox = document.createElement("div");
        postBox.classList.add("post-box", category);
        

        const img = document.createElement("img");
        if (image) {
            // Use a FileReader to display the selected image
            const reader = new FileReader();
            reader.onload = function () {
                img.src = reader.result;
                img.style.borderRadius = "10px"; // Add rounded corners to the image
            };
            reader.readAsDataURL(image);
        } else {
            img.src = "images/default.jpg"; // Replace with actual image URL
        }
        img.alt = title;
        img.classList.add("post-img");

        const postCategory = document.createElement("h2");
        postCategory.classList.add("category");
        postCategory.textContent = category;

        const postTitle = document.createElement("a");
        postTitle.classList.add("post-title");
        postTitle.textContent = title;
        postTitle.style.cursor= "pointer";

        // Agregar evento de clic para abrir en una nueva pestaña
        postTitle.addEventListener("click", function () {
            createPostDetailPage(category, title, text, image, profileImage);
        });

        const postDate = document.createElement("span");
        postDate.classList.add("post-date");
        const today = new Date();
        postDate.textContent = today.toLocaleDateString();

        const postDescription = document.createElement("p");
        postDescription.classList.add("post-description");
        postDescription.textContent = text;

        const profile = document.createElement("div");
        profile.classList.add("profile");

        const profileImg = document.createElement("img");
        if (profileImage) {
            // Use a FileReader to display the selected profile image
            const reader = new FileReader();
            reader.onload = function () {
                profileImg.src = reader.result;
                profileImg.style.borderRadius = "100%"; // Add rounded corners to the profile image
            };
            reader.readAsDataURL(profileImage);
        } else {
            profileImg.src = "images/default-profile.jpg"; // Replace with actual profile image URL
        }
        profileImg.alt = "Profile Image";
        profileImg.classList.add("profile-img");


        const profileName = document.createElement("span");
        profileName.classList.add("profile-name");

        const authorName = document.getElementById("entry-author").value;
        profileName.textContent = authorName || "Anonymous";

        profile.appendChild(profileImg);
        profile.appendChild(profileName);

        postBox.appendChild(img);
        postBox.appendChild(postCategory);
        postBox.appendChild(postTitle);
        postBox.appendChild(postDate);
        postBox.appendChild(postDescription);
        postBox.appendChild(profile);

        postContainer.insertBefore(postBox,postContainer.firstChild);
        /* postContainer.appendChild(postBox); */
    }

    // Función para desplazarse a la grilla de publicaciones
    function scrollPostsToView() {
        const postsSection = document.getElementById("return");
        postsSection.scrollIntoView({ behavior: "smooth" }); // El desplazamiento suave proporciona una animación agradable.
    }

    // Función para crear dinámicamente una página de detalle de publicación
    function createPostDetailPage(category, title, text, image, profileImage) {
        // Crear un nuevo documento HTML para la página de detalle
        const postDetailDocument = document.implementation.createHTMLDocument("Post Detail");

        // Estructura de la página de detalle
        postDetailDocument.body.innerHTML = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="/styles/post-detail.css">
                <link rel="stylesheet" href="/styles/style.css">      
                <title>${title} - Detalle de Publicación</title>
                </head>
                        

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,600;0,700;1,400&display=swap');
*{
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    scroll-behavior: smooth;
    scroll-padding-top: 2rem;
    box-sizing: border-box;
}

/* root values */
:root{
    --container-color: #1a1e21;
    --second-color: rgba(77, 228, 255);
    --text-color: #172317;
    --bg-color: #fff;
}


.article-detail {
    padding: 3rem 0;
    text-align: center;
}

.article-detail .article-image img {
    max-width: 40vw; /* Limita el ancho máximo de la imagen al ancho del contenedor */
    height: auto;
    display: block; /* Centra la imagen horizontalmente */
    margin: 0 auto; /* Centra la imagen horizontalmente */
    border-radius: 8px;
}

.article-content {
    max-width: 800px;
    margin: 0 auto;
}

.article-content .category {
    font-size: 0.9rem;
    font-weight: 500;
    text-transform: uppercase;
    color: var(--second-color);
}

.article-content .post-title {
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--text-color);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.article-content .post-date {
    display: flex;
    font-size: 0.875rem;
    text-transform: uppercase;
    margin-top: 4px;
    font-weight: 400;
}

.article-content .post-description {
    display: block;
    font-size: 1.2rem; /* Tamaño de letra más grande y visible */
    line-height: 1.6; /* Ajustar el espacio entre líneas */
    margin: 1rem 0;
    padding: 10px; /* Agregar espacio alrededor del texto */
    border: 1px solid #ccc; /* Agregar un borde gris */
    background-color: #f5f5f5; /* Fondo gris suave */
    border-radius: 10px; /* Bordes redondeados */
    text-align: justify; /* Justificar el texto */
}

.article-content .profile {
    display: flex;
    align-items: center;
    gap: 10px;
}

.article-content .profile-img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    border: 2px solid var(--second-color);
}

.article-content .profile-name {
    font-size: 0.8rem;
    font-weight: 500;
}

footer{
    position: relative;
    width: 100%;
    height: auto;
    padding: 50px 100px;
    margin-top: 3rem;
    background: #111;
    display: flex;
    font-family: sans-serif;
    justify-content: space-between;
}

.footer-container{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    flex-direction: row;
}

.footer-container .sec{
    margin-right: 30px;
}

.footer-container .sec.aboutus{
    width: 40%;
}

.footer-container h2{
    position: relative;
    color: #fff;
    margin-bottom: 15px;
}

.footer-container h2::before{
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 50px;
    height: 2px;
    background: rgb(77, 228, 255);
}

footer p{
    color: #fff;
}

.sci{
    margin: 20px;
    display: flex;
}

.sci li{
    list-style: none;
}

.sci li a{
    display: inline-block;
    width: 40px;
    height: 40px;
    background: #222;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    text-decoration: none;
    border-radius: 4px;
    transition: .5s;
}

.sci li a:hover{
    background: rgb(77, 228, 255);
}

.sci i a .bx{
    color: #fff;
    font-size: 20px;
}

.quicklinks{
    position: relative;
    width: 25%;
}

.quicklinks ul li{
    list-style: none;
}

.quicklinks ul li a{
    color: #999;
    text-decoration: none;
    margin-bottom: 10px;
    display: inline-block;
    transition: .3s;
}

.quicklinks ul li a:hover{
    color: #fff;
}

.footer-container .contactBx{
    width: calc(35% - 60px);
    margin-right: 0 !important;
}

.contactBx .info{
    position: relative;
}

.contactBx .info li{
    display: flex !important;
    margin-bottom: 16px;
}

.contactBx .info li span:nth-child(1){
    color: #fff;
    font-size: 20px;
    margin-right: 10px;
}

.contactBx .info li span{
    color: #999;
}

.contactBx .info li a{
    color: #999;
    text-decoration: none;
    transition: .5s;
}

.contactBx .info li a:hover{
    color: #fff;
}

@media (max-width: 1060px){
    .container{
        margin: 0 auto;
        width: 95%;
    }

    .home-text{
        width: 100%
    }
}

@media (max-width: 768px){
    .nav{
        padding: 10px 0;
    }

    section{
        padding: 2rem 0 !important;
    }

    .header-content{
        margin-top: 3rem !important;
    }

    .home{
        min-height: 380px;
    }

    .home-title{
        font-size: 3rem;
    }

    .header-title{
        font-size: 2rem;
    }

    .header-img{
        height: 370px;
    }

    .about{
        flex-direction: column;
    }

    .about .contentBx{
        min-width: 100%;
        width: 100%;
        text-align: center;
        padding-right: 0px;
    }

    .about .contentBx,
    .about .imgBx{
        min-width: 100%;
        width: 100%;
        padding-right: 0px;
        text-align: center;
    }

    .about .imgBx{
        min-height: 250px;
    }

    .btn2{
        margin-bottom: 30px;
    }

    .post-header{
        height: 435px;
    }

    .post-header{
        margin-top: 9rem !important;
    }
}

@media (max-width: 570px){
    .post-header{
        height: 390px;
    }

    .header-title{
        width: 100%;
    }

    .header-img{
        height: 340px;
    }
}

@media (max-width: 396px){
    .home-title{
        font-size: 2rem;
    }

    .home-subtitle{
        font-size: 0.9rem;
    }

    .home{
        min-height: 300px;
    }

    .post-box{
        padding: 10px;
    }

    .header-title{
        font-size: 1.4rem;
    }

    .header-img{
        height: 240px;
    }

    .post-header{
        height: 335px;
    }

    .header-img{
        height: 340px;
    }
}

/* Footer Media Query */
@media (max-width: 991px){
    footer{
        padding: 40px;
        font-size: 20px;
    }

    footer .footer-container{
        flex-direction: column;
    }

    footer .footer-container .sec{
        margin-right: 0;
        margin-bottom: 40px;
    }

    footer .footer-container .sec.aboutus{
        width: 100% !important;
    }

    footer .footer-container .quicklinks{
        width: 100%;
    }

    footer .footer-container .contactBx{
        width: 100%;
    }
}


</style>
                
             
       
            <body>
                <header>
                    <div class="nav">
                        <a class="logo">Tu Blog</a>
                    </div>
                </header>
                <article class="article-detail container">
                    <div class="article-image">
                        <img src="${image ? URL.createObjectURL(image) : 'images/default.jpg'}" alt="Article Image">
                    </div>
                    <div class="article-content">
                        <h2 class="category">${category}</h2>
                        <h1 class="post-title">${title}</h1>
                        <span class="post-date">${new Date().toLocaleDateString()}</span>
                        <p class="post-description">${text}</p>
                        <div class="profile">
                            <img src="${profileImage ? URL.createObjectURL(profileImage) : 'images/default-profile.jpg'}" alt="Author Image" class="profile-img">
                            <span class="profile-name">Author Name</span>
                        </div>
                    </div>
                </article>
                
    <footer>
    <div class="footer-container">
        <div class="sec aboutus">
            <h2>Acerca de Nosotros</h2>
            <p>Tu Blog es un lugar donde puedes compartir tus pensamientos y experiencias con el mundo.</p>
        </div>
        <div class="sec quicklinks">
            <h2>Enlaces Rápidos</h2>
            <ul>
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Acerca</a></li>
                <li><a href="#">Contacto</a></li>
            </ul>
        </div>
        <div class="sec contactBx">
            <h2>Contacto</h2>
            <ul class="info">
                <li>
                    <span><i class="bx bx-map"></i></span>
                    <span>Dirección: Ciudad, País</span>
                </li>
                <li>
                    <span><i class="bx bx-phone"></i></span>
                    <span>Teléfono: +123 456 789</span>
                </li>
                <li>
                    <span><i class="bx bx-envelope"></i></span>
                    <a href="mailto:info@example.com">info@example.com</a>
                </li>
            </ul>
        </div>
    </div>
</footer>
            </body>
            </html>
        `;

        // Agregar la página de detalle al documento principal
        const postDetailHTML = new XMLSerializer().serializeToString(postDetailDocument);
        const postDetailBlob = new Blob([postDetailHTML], { type: "text/html" });
        const postDetailURL = URL.createObjectURL(postDetailBlob);

        // Redirigir a la nueva página de detalle
        window.open(postDetailURL, '_blank');
    }
});
