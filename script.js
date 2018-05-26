
const mainPage = document.getElementById('main-page');
const projects = document.getElementById('projects');
const technology = document.getElementById('technology');
const prices = document.getElementById('prices');
const contacts = document.getElementById('contacts');
const help = document.getElementById('help');

const content = document.querySelector('.main-content');



changeContent(projects, 'page0');

changeContent(technology, 'page1');

changeContent(prices, 'page2');

changeContent(contacts, 'page3', submitForm);

changeContent(help, 'page3', submitForm);

loadIndex();


document.addEventListener("DOMContentLoaded", function() {

    const reloadingUrl = window.location.pathname.slice(2);

    if (reloadingUrl == 'ndex.html') return;

    console.log(reloadingUrl);

    const request = new XMLHttpRequest();

    request.addEventListener('load', function() {
        content.innerHTML = request.responseText;
        if (reloadingUrl == 'page3') submitForm();
    });

    request.open('GET', reloadingUrl);
    request.send();
});



function loadIndex() {
    mainPage.addEventListener('click', function(event) {
        event.preventDefault();

        window.location = '/index.html';

    });
}


function changeContent(page, url, handler) {
    page.addEventListener('click', function(event) {
        event.preventDefault();

        history.pushState(null, page, 'n' + url);

        const request = new XMLHttpRequest();

        request.addEventListener('load', function() {
            content.innerHTML = request.responseText;
            if(handler) handler();
        });

        request.open('GET', url);
        request.send();

    });
}


function submitForm() {
    const submitButton = document.getElementById('button');
    submitButton.addEventListener('click', function() {
        const dataForm = document.getElementsByClassName('data');
        const JSONForm = collectionToJSON(dataForm);

        console.log(JSONForm);

        const sendForm = new XMLHttpRequest();

        sendForm.addEventListener('load', function() {
            content.innerHTML = sendForm.responseText;
        });

        sendForm.open('POST', 'form');
        sendForm.setRequestHeader("Content-Type", "application/json");
        sendForm.send(JSONForm);
    });
}


function collectionToJSON(collection) {
    const dataList = {};
    for (let i = 0; i < collection.length; i++) {
        dataList[collection[i].name] = collection[i].value;
    }
    return JSON.stringify(dataList);
}