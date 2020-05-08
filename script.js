const sessionStorage = window.sessionStorage;
const localStorage = window.localStorage;
const old = {...sessionStorage};
const myFavs = {...localStorage};
let tab = [];
let newIndex = 0;
let next = '';
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

function getMoreResult() {
    console.log(next);
    return $.ajax({
        url: next,
        dataType: "jsonp"
    }).then((nextResult) => {
        if (nextResult.data.length) {
            nextResult.data.forEach((song) => {
                createAudio(newIndex, song, 'audioList');
            })
        }
    });
}

function searchUserInput() {
    $('#searchButton').click( function(event) {
        event.preventDefault();
    });
    $('#userInput').keypress(function (event) {
        if (event.keyCode === 10 || event.keyCode === 13) {
            event.preventDefault();
        }
    });
    newIndex = 0;
    $('#audioList').empty();
    const searchOption = $("#searchOptions").val();
    let userInput = (document.getElementById('userInput').value).toLowerCase();
    return $.ajax({
        url: `https://api.deezer.com/search?q=${userInput}&order=${searchOption}&output=jsonp`,
        dataType: "jsonp",
    }).then((result) => {
        next = result.next;
        console.log(next);
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

function buttonTest(button, item) {
    console.log('YOOOOOOOO');
    let isFav = tab.find(id => id === item.id);
    if (!isFav) {
        button.classList.add("btn-success");
        button.innerHTML = "Ajouter aux favoris";
        button.onclick = function () {
            console.log('Added to fav');
            addToFavorite(item.id, item);
            button.classList.remove('btn-success');
            button.classList.add("btn-danger");
            button.innerHTML = "Retirer des favoris";
        };
    } else {
        button.classList.add("btn-danger");
        button.innerHTML = "Retirer des favoris";
        console.log(item.id);
        button.onclick = function () {
            console.log('Removed from fav');
            removeFromStorage(item.id);
            button.classList.remove('btn-danger');
            button.classList.add("btn-success");
            button.innerHTML = "Ajouter aux favoris";
        };
    }
}

function createAudio(index, deezerItem, divName) {
    newIndex += 1;
    const favButton = document.createElement('button');
    favButton.classList.add("btn");
    favButton.id = 'favButton';
    $("favButton").click(function (e) {
        e.preventDefault();
    });
    buttonTest(favButton, deezerItem);

    $(`#${divName}`).append($('<div>', {
        id: `audio_${index}`,
        class: "card audio col-3 mr-3 mb-3 d-flex flex-column justify-content-between"
    }).append($('<img>', {
        src: deezerItem.album.cover_big,
        class: "card-img-top"
    })).append($('<h5>', {
        class: "card-title px-3 ",
        text: deezerItem.title
    })).append($('<p>', {
        class: "card-text px-3 ",
        text: deezerItem.album.title
    })).append($('<audio>', {
        src: deezerItem.preview,
        class: "audioStyle",
        text: deezerItem.album.title,
        controls: true
    })));
    document.getElementById(`audio_${index}`).append(favButton);

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
