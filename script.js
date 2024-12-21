window.addEventListener('load', () => {
    const loadTime = performance.now();
    const footer = document.querySelector('footer');
    const loadInfo = document.createElement('p');
    loadInfo.textContent = `Страница загрузилась за ${loadTime} миллисекунд.`;
    footer.appendChild(loadInfo);
});

const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
        link.style.color = 'gold';
        link.style.backgroundColor = '#444';
        link.style.padding = '5px';
        link.style.borderRadius = '5px';
    });

    link.addEventListener('mouseout', () => {
        link.style.color = '';
        link.style.backgroundColor = '';
        link.style.padding = '';
        link.style.borderRadius = '';
    });
});

window.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath ||
            (currentPath === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
