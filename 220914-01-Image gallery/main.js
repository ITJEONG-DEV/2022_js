const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
/* Declaring the alternative text for each image file */
const imageDir = "./images/";
const IMAGE_LENGTH = 5;

var fileList = [];

for(let i=0; i<IMAGE_LENGTH; i++)
    fileList.push(imageDir + "pic" + (i+1) + ".jpg");

/* Looping through images */
for(let i=0; i<fileList.length; i++) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', fileList[i]);
    newImage.setAttribute('alt', fileList[i]);
    thumbBar.appendChild(newImage);

    newImage.onclick = function(e) {
        const currentSrc = e.target.getAttribute('src');
        displayedImage.setAttribute('src', currentSrc);
        displayedImage.setAttribute('alt', currentSrc);
    }
}

/* Wiring up the Darken/Lighten button */
btn.onclick = function(e) {
    const name = e.target.getAttribute('class');

    if(name=="dark") {
        btn.setAttribute('class', 'light');
        btn.textContent = 'Lighten';
        overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
    } else if(name=="light") {
        btn.setAttribute('class', 'dark');
        btn.textContent = 'Darken';
        overlay.style.backgroundColor = "rgba(0,0,0,0)";
    }
}