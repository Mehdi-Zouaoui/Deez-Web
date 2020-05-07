const sessionStorage = window.sessionStorage;
const localStorage = window.localStorage;
const old = {...sessionStorage};
const myFavs = {...localStorage};
let tab = [];
let oldSearchArray = [];
Object.keys(myFavs).map(function (key) {
        tab.push(JSON.parse(myFavs[key]).id);
    }
);


function oldSearch() {
    Object.keys(old).map(function (key) {
        oldSearchArray.push(JSON.parse(old[key]));
    });
    oldSearchArray.forEach((song, index) => {
        createAudio(index, song, 'audioList');
    })

}


function searchUserInput() {
    $('#audioList').empty();
    const searchOption = $("#searchOptions").val();
    let userInput = (document.getElementById('userInput').value).toLowerCase();
    return $.ajax({
        url: `https://api.deezer.com/search?q=${userInput}&order=${searchOption}&output=jsonp`,
        dataType: "jsonp",
    }).then((result) => {
        if (result.data.length) {
            console.log("Résultat :", result.data);
            result.data.forEach((song, index) => {
                createAudio(index, song, 'audioList');
                sessionStorage.setItem(index, JSON.stringify(song));
            });
        } else {
            $('body').append('<div id="test">Pas de résultat pour la recherche , veuillez réessayer</div>');
        }
    }).catch(err => {
        console.log(err);
        $('body').append('<div id="test">Test</div>');
    });

}

function createAudio(index, deezerItem, divName) {

    const favButton = document.createElement('button');
    favButton.id = 'favButton';
    let isFav = tab.find(id => id === deezerItem.id);
    if (!isFav) {
        favButton.classList.add("btn", "btn-info");
        favButton.innerHTML = "Ajouter aux favoris";
        favButton.onclick = function () {
            addToFavorite(deezerItem.id, deezerItem);
            $('#favButton').toggleClass('btn-primary');
        };
    } else {
        favButton.classList.add("btn", "btn-danger");
        favButton.innerHTML = "Retirer des favoris";
        console.log(deezerItem.id);
        favButton.onclick = function () {
            removeFromStorage(deezerItem.id);
            $('#favButton').toggleClass('btn-primary');
        };
    }
    $(`#${divName}`).append($('<div>', {
        id: `audio_${index}`,
        class: "card audio col-3 mr-3"
    }).append($('<img>', {
        src: deezerItem.album.cover_big,
        class: "card-img-top"
    })).append($('<h5>', {
        class: "card-title",
        text: deezerItem.title
    })).append($('<p>', {
        class: "card-text",
        text: deezerItem.album.title
    })).append($('<audio>', {
        src: deezerItem.preview,
        class: "audioStyle",
        text: deezerItem.album.title,
        controls: true
    })));
    document.getElementById(`audio_${index}`).append( favButton);
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
    const randomFav = localStorage.getItem(tab[Math.floor(Math.random() * ((tab.length - 1)))]);
    console.log(JSON.parse(randomFav));
    createAudio('0', JSON.parse(randomFav), 'audioRandom');
}

// getSingleItem('2');
function randomGenerator() {

}
