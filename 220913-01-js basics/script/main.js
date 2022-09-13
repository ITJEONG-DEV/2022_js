// change textContent
let myHeading = document.querySelector('h1');
myHeading.textContent = "Hello world!";

// if-else
// let iceCream = 'chocolate';
// if (iceCream === 'chocolate') {
//     alert('Yay, I love chocolate ice cream!');
// } else {
//     alert('Awwww, but chocolate is my favorite...');
// }

// event
// document.querySelector('html').onclick = function() {
//     alert('Ouch! Stop poking me!');
// }

// event2
function setUserName() {
    let myName = prompt('Please enter your name.');
    if(!myName || myName === null) {
        setUserName();
    } else {
        localStorage.setItem('name', myName);
        myHeading.innerHTML = 'Mozilla is cool, ' + myName;
    }
}

if(!localStorage.getItem('name')) {
    setUserName();
} else {
    let storedName = localStorage.getItem('name');
    myHeading.textContent = 'Mozilla is cool, ' + storedName;
}

let myButton = document.querySelector('button');
myButton.onclick = function() {
    setUserName();
}
