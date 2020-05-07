let deezerArray = [];
const localStorage = window.localStorage;
let oldSearch = [];
const myFavs = {...localStorage};
let tab = [];
Object.keys(myFavs).map(function (key, index) {
       tab.push(JSON.parse(myFavs[key]).id);
    }
);
console.log(tab);

function searchUserInput() {
    $('#audioList').empty();
    const searchOption = $("#searchOptions").val();
    let userInput = (document.getElementById('userInput').value).toLowerCase();
    console.log(`https://api.deezer.com/search?q=${userInput}&order=${searchOption}&output=jsonp`);

    return $.ajax({
        url: `https://api.deezer.com/search?q=${userInput}&order=${searchOption}&output=jsonp`,
        dataType: "jsonp",
    }).then((result) => {
        if (result.data.length) {
            console.log("Résultat :", result.data);
            result.data.forEach((song, index) => {
                deezerArray.push(song);
                createAudio(index, song, 'audioList');
            });
        } else {
            $('body').append('<div id="test">Pas de résultat pour la recherche , veuillez réessayer</div>');
        }
        console.log('Array', deezerArray)
    }).catch(err => {
        console.log(err);
        $('body').append('<div id="test">Test</div>');
    });
}

function test() {
    let userInput = (document.getElementById('userInput').value).toLowerCase();
    console.log(userInput);
}

function createAudio(index , deezerItem, divName) {
    // $(`#${divName}`).empty();
    console.log(deezerItem);
    const audioDiv = document.createElement('div');
    audioDiv.id = `audio_${index}`;
    audioDiv.classList.add("card", "audio", "col-3", "mr-3");
    const audioImg = document.createElement('img');
    audioImg.src = deezerItem.album.cover_big;
    audioImg.classList.add("card-img-top");
    const audioTitle = document.createElement('h5');
    const title = document.createTextNode(deezerItem.title);
    audioTitle.appendChild(title);
    audioTitle.classList.add("card-title");
    const audioAlbum = document.createElement('p');
    const album = document.createTextNode(deezerItem.album.title);
    audioAlbum.appendChild(album);
    audioAlbum.classList.add("card-text");
    const audio = document.createElement('audio');
    audio.src = deezerItem.preview;
    audio.classList.add("audioStyle");
    audio.controls = true;
    const favButton = document.createElement('button');
    let isFav = tab.find(id => id === deezerItem.id);
    if(!isFav){
        favButton.classList.add("btn", "btn-info");
        favButton.innerHTML = "Ajouter aux favoris";
        favButton.onclick = function () {
            addToFavorite(deezerItem.id, deezerItem);
        };
    }else {
        favButton.classList.add("btn", "btn-danger");
        favButton.innerHTML = "Retirer des favoris";
        console.log(deezerItem.id);
        favButton.onclick = function () {
            removeFromStorage(deezerItem.id);
        };
    }

    $(`#${divName}`).append(audioDiv);

    document.getElementById(`audio_${index}`).append(audioImg, audioTitle, audioAlbum, audio, favButton);
}

function clearStorage() {
    localStorage.clear()
}

function getSingleItem(index) {
    console.log(localStorage.getItem(index));
}

function addToFavorite(key, item) {
    localStorage.setItem(key, JSON.stringify(item));
}

function removeFromStorage(key) {
    console.log(key + 'removed');
    localStorage.removeItem(key);
}

function getFavListe() {
    const favList = {...localStorage};
    Object.keys(favList).map(function (key, index) {
        createAudio(index, JSON.parse(favList[key]), 'favList');
    })

}

function getRandomFav() {
    $('#audioRandom').empty();
    const randomFav = localStorage.getItem(Math.floor(Math.random() * ((localStorage.length - 1))));
    console.log(JSON.parse(randomFav));
    createAudio('0', JSON.parse(randomFav), 'audioRandom');
}

// getSingleItem('2');
function randomGenerator() {

}
