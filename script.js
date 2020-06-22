const getS = selector => document.querySelector(selector);
let searchFilm = getS('.searchText');
let filmsArray;

// функція пошуку за ключовими словами
// підставляєм в урлу ключове слово з інпута
function search() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://www.omdbapi.com/?s=${searchFilm.value}&apikey=a11fdceb`);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // парсимо отриману інфу з JSON у звичайний обєкт
            filmsArray = JSON.parse(xhr.response);
            // запускаєм рендер дівок з фільмами
            render();
        }
    }
    xhr.send();
}

// генерація блоків з фільмами
// кажній дівці додєм відповідні дані аступного фільму з масиву який розпарсили
function render() {
    getS('.films').innerHTML = "";
    for (let i = 0; i < 10; i++) {
        getS('.films').innerHTML += `<div class="film">
        <div class="img poster${i}"></div>
        <div class="name">${filmsArray.Search[i].Title}</div>
        <div class="inf">
            <div class="type">${filmsArray.Search[i].Type}</div>
            <div class="year">${filmsArray.Search[i].Year}</div>
        </div>
        <input type="button" value="More details" onclick="details('${filmsArray.Search[i].imdbID}')">
    </div>`;
        getS(`.poster${i}`).style.backgroundImage = `url('${filmsArray.Search[i].Poster}')`;
    }
}

// передавання даних про конкретний фільм в нашу модалку
// id фільму передаємо як параметр в урлу
function details(id) {
    getS('#id01').style.display = 'block'
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://www.omdbapi.com/?i=${id}&apikey=a11fdceb`);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const { Title, Rated, Year, Genre, Plot, Writer, Director, Actors, BoxOffice, Awards, Ratings, Poster } = JSON.parse(xhr.responseText);
            getS('.poster').style.backgroundImage = `url('${Poster}')`;
            getS('.movieName').textContent = Title;
            getS('.genre').textContent = `${Rated} ${Year} ${Genre}`;
            getS('.description').textContent = Plot;
            getS('.writtenBy').innerHTML = `<div><b>Written By: </b>${Writer}</div>`;
            getS('.derictedBy').innerHTML = `<div><b>Directed By: </b>${Director}</div>`;
            getS('.starring').innerHTML = `<div><b>Starring: </b>${Actors}</div>`;
            getS('.boxOfice').innerHTML = `<div><b>BoxOffice: </b>${BoxOffice}</div>`;
            getS('.Awards').innerHTML = `<div><b>Awards: </b>${Awards}</div>`;
            getS('.ratings').innerHTML = `<div><b>Ratings:</b></div>
            <div>${Ratings[0].Source} ${Ratings[0].Value}</div> 
            <div>${Ratings[1].Source} ${Ratings[1].Value}</div> 
            <div>${Ratings[2].Source} ${Ratings[2].Value}</div>`;
        }
    }
    xhr.send();
}

// закриття модалки при кліку за її межами
window.onclick = function (event) {
    if (event.target == getS('#id01')) {
        getS('#id01').style.display = "none";
    }
}
// закриття модалки при кліку на неї
function closeModal() {
    getS('#id01').style.display = 'none'
}