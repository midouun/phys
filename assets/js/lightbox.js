document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item img, .experiment-card img');
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);

    galleryItems.forEach(image => {
        image.addEventListener('click', () => {
            lightbox.classList.add('active');
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.alt;
            while (lightbox.firstChild) {
                lightbox.removeChild(lightbox.firstChild);
            }
            lightbox.appendChild(img);
        });
    });

    lightbox.addEventListener('click', e => {
        if (e.target !== e.currentTarget) return;
        lightbox.classList.remove('active');
    });
});
