// API Key 2eb8dae5e1988df3f72f80c01551e09a
function renderNowPlaying(data) {
    const html = `<div onclick="alert('Film ${data.title} sedang berlangsung')" class="component m-4">
            <img class="w-32" src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}" alt="">
            <p class="text-base bg-red-600 text-white text-center">Now Playing</p>
            <h1 class="text-lg font-bold w-32">${data.title}</h1>
            <p class="w-32">${data.vote_average === 0 ? 'Unrated' : data.vote_average}</p>
            <p class="text-xs text-gray-300 w-32">${data.release_date}</p>
        </div>
    `
    return html;
} 

function renderUpcoming(data) {
    const html = `<div onclick="alert('Film ${data.title} akan segera tayang')" class="component m-4">
            <img class="w-32" src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}" alt="">
            <p class="text-base bg-blue-600 text-white text-center">Upcoming</p>
            <h1 class="text-lg font-bold w-32">${data.title}</h1>
            <p class="w-32">${data.vote_average === 0 ? 'Unrated' : data.vote_average}</p>
            <p class="text-xs text-gray-300 w-32">${data.release_date}</p>
        </div>
    `
    return html;
}

async function upComing() {
    document.getElementById('search__result').innerHTML = '';
    let data = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=2eb8dae5e1988df3f72f80c01551e09a&language=en-US&page=1&region=ID');
    data = await data.json();
    let result = data.results.filter(el => el.poster_path !== null);
    result.forEach(el => document.getElementsByClassName('upcoming')[0].insertAdjacentHTML('beforeend', renderUpcoming(el)));
}

upComing();

async function nowPlaying() {
    document.getElementById('search__result').innerHTML = '';
     let data = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=2eb8dae5e1988df3f72f80c01551e09a&language=en-US&page=1&region=ID');
     data = await data.json();
     let result = data.results;
     result.forEach(el => document.getElementById('main').insertAdjacentHTML("beforeend", renderNowPlaying(el)))
 }

 nowPlaying();

const renderInfo = (data) => {
    const html = `<div class="component m-4">
            <img class="w-32" src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}" alt="">
            <h1 class="text-lg font-bold w-32">${data.title}</h1>
            <p class="w-32">${data.vote_average === 0 ? 'Unrated' : data.vote_average}</p>
            <p class="text-xs text-gray-300 w-32">${data.release_date}</p>
        </div>
    `
    return html;
}

async function reqApiSearch(query) {
    try {
        let data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=2eb8dae5e1988df3f72f80c01551e09a&language=en-US&query=${query}&page=1&include_adult=false`);
        data = await data.json();
        let result = data.results.filter(el => el.poster_path !== null);
        console.log(result)
        result.forEach(el => document.getElementsByClassName('search__result')[0].insertAdjacentHTML('afterbegin', renderInfo(el)));
    } catch (err) {
        console.log(err)
    }
}

// async function reqApiMovie(query) {
//     try {
//         let data = await fetch(`https://api.themoviedb.org/3/movie/207936?api_key=2eb8dae5e1988df3f72f80c01551e09a&language=en-US`);
//         data = await data.json();
//         console.log(data)
//     } catch (err) {
//         console.log(err)
//     }
// }

function searchMovies(query) {
    const queryRegex = /\s+/gm;
    const transQuery = query.replaceAll(queryRegex, '%');
    reqApiSearch(transQuery);
}

document.getElementById('search_button').addEventListener('click', function() {
    const data =  document.getElementById('search_box').value;
    alert(data);
    document.getElementsByClassName('main')[0].innerHTML = '';
    document.getElementsByClassName('main2')[0].innerHTML = '';
    document.getElementsByClassName('search__result')[0].innerHTML = '';    
    searchMovies(data)
    document.getElementById('search_box').value = '';
});