// Selectors
const album = document.querySelector('.album-container');
const searchBar = document.querySelector('#searchBar');
const searchNumber = document.querySelector('#searchNumber');
const numberOfResult = document.querySelector('#number');
const loading = document.querySelector('.loading');

// Data
let AlbumArray = [];

// CRUD - READ
const getAlbums = async () => {
    // const currentURL = await fetch("https://itunes.apple.com/search?term=$%7BDrake%7D&media=music&entity=album&attribute=artistTerm&limit=200%22")
    const updateURL = await fetch("https://itunes.apple.com/search?term=" + searchBar.value)
    const data = await updateURL.json();
    //console.log(data.results);
    const size = data.resultCount;
    numberOfResult.innerHTML = size;
    return data.results;
}

submit.addEventListener('click', (e) => {
    if (searchBar.value === "") {
        alert("Cannot be empty!");
    } else {
        getAlbums();
        loading.style.visibility="visible";
        setTimeout(() => {
            generateAlbum();
            loading.style.visibility="hidden";
          }, 3000)
        searchNumber.innerHTML = searchBar.value;
    }
})

// Render
const createTmp = (arr) => {
    let tmp = "";
    arr.forEach((item) => {
        tmp += `
        <div class="album-item">
            <img class="item-art" src=${item.artworkUrl60}>
            <div class="item-name">${item.collectionName}</div>
        </div>
        `
    });
    return tmp;
};

const render = (ele, tmp) => {
    ele.innerHTML = tmp;
};

const generateAlbum = async () => {
    const data = await getAlbums();

    // const artwork = data.map(albums => {
    //     return albums.artworkUrl60;
    // });

    // const artistName = data.map(name => {
    //     return name.artistName;
    // });

    // const songName = data.map(song => {
    //     return song.collectionName;
    // })

    // console.log(artwork.length)
    // console.log(artistName[0])
    // console.log(songName);

    AlbumArray = data.map(album => {
        return album;
    })

    const template = createTmp(AlbumArray);
    render(album, template);

    // console.log(AlbumArray)
    return AlbumArray;
}

// Invoke Functions
// getAlbums();
// generateAlbum();
