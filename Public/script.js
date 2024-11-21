if (localStorage.getItem('user') === null) {
    window.location.href = 'logout.html';
}


//version 1.2;

const burgerButton = document.getElementById('burgerButton');
const leftPanel = document.querySelector('.LeftPanel');





burgerButton.addEventListener('click', () => {
    leftPanel.style.display = leftPanel.style.display === 'none' ? 'block' : 'none';
});



window.addEventListener('orientationchange', () => {
    leftPanel.style.display = window.matchMedia("(orientation: landscape)").matches ? 'block' : 'none';
});







document.addEventListener('DOMContentLoaded', function() {
    const forYou = document.querySelector('.ForYou');
    const following = document.querySelector('.Following');

    forYou.addEventListener('click', function() {
        forYou.classList.add('active');
        following.classList.remove('active');
    });

    following.addEventListener('click', function() {
        following.classList.add('active');
        forYou.classList.remove('active');
    });

    
});

function sendContentAsURL(paragraph) {
    // Get the content of the paragraph
    const content = paragraph.textContent || paragraph.innerText;

    // Encode the content to safely pass it in a URL
    const encodedContent = encodeURIComponent(content);

    // Construct the URL with the content as a query parameter
    const url = `/NewZwitter/MYzwitter/Public/search.html?content=${encodedContent}`;

    // Redirect to the new URL
    window.location.href = url;
}
