document.addEventListener('mousemove', (e) => {
    const image = document.getElementById('image');
    const { clientX, clientY } = e;
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const rotateX = (clientY - centerY) / 20;
    const rotateY = (clientX - centerX) / 20;

    image.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
});
