document.addEventListener("DOMContentLoaded", function () {
    // Obtén los elementos del DOM en la página de detalle
    const postDetailImage = document.getElementById("post-detail-image");
    const postDetailCategory = document.getElementById("post-detail-category");
    const postDetailTitle = document.getElementById("post-detail-title");
    const postDetailDate = document.getElementById("post-detail-date");
    const postDetailDescription = document.getElementById("post-detail-description");
    const postDetailProfileImage = document.getElementById("post-detail-profile-image");
    const postDetailAuthor = document.getElementById("post-detail-author");

    // Simula datos de detalle de la publicación (puedes cargar estos datos dinámicamente)
    const postData = {
        category: "Categoría de Ejemplo",
        title: "Título de la Publicación",
        date: new Date().toLocaleDateString(),
        description: "Este es el contenido detallado de la publicación. Puede ser bastante largo y descriptivo.",
        profileImage: "images/default-profile.jpg", // Reemplaza con la URL de la imagen de perfil
        author: "Nombre del Autor",
        image: "images/default.jpg", // Reemplaza con la URL de la imagen de la publicación
    };

    // Llena la página de detalle con los datos de la publicación
    postDetailCategory.textContent = postData.category;
    postDetailTitle.textContent = postData.title;
    postDetailDate.textContent = postData.date;
    postDetailDescription.textContent = postData.description;
    postDetailProfileImage.src = postData.profileImage;
    postDetailAuthor.textContent = postData.author;
    postDetailImage.src = postData.image;
});
