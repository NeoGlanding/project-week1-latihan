// API KEY 2eb8dae5e1988df3f72f80c01551e09a

function closeModal() {
    document.getElementsByClassName('modal__film')[0].classList.add('hidden');
    document.getElementsByClassName('modal__film')[0].innerHTML = '';
}
function showModal(data) {
    const prod = data.production_companies;
    // console.log(prod)
    // console.log(prod.forEach(el => console.log(el.name)))
    const genre = data.genres;
    // console.log(genre)
    const html = `<div class="myModal">
            <div class="modal-content">
                <div onclick="closeModal();" class="relative close__button mb-4 w-8 h-8 bg-red-300 rounded-full float-right hover:shadow-2xl hover:bg-red-900">
                    <a href="#" class="pos-cent text-white font-bold">X</a>
                </div>
                <div class="info flex mt-4 flex-wrap justify-center gap-x-16">
                    <img class="w-96"src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${data.poster_path}" alt="">
                    <div class="info__film w-96">
                        <h1 class="text-xl font-bold">${data.title}</h1>
                        <p>Produced by <span class="text-lg font-bold">${prod.length > 0 ? prod[0].name : `Unknown`}</span></p>
                        <p class="my-8 leading-relaxed">${data.overview}</p>
                        <div class="rating__date">
                            <p class="w-16 h-8 bg-red-400 text-white inline-block">Rating</p>
                            <p class="inline-block">${data.release_date}</p>
                        </div>
                        <div class="genres">
                            <p class="inline-block w-20 h-12">${genre[0].name}</p>
                        </div>
                        <button>More</button>
                    </div>
                </div>
            </div>
        </div>
    `
    document.getElementsByClassName('modal__film')[0].insertAdjacentHTML('afterbegin', html);
    document.getElementsByClassName('modal__film')[0].classList.remove('hidden');

}

function renderNowPlaying(data) {
    const html = `<div onclick="specificMovie('${data.id}')" class="component m-4 hover:shadow-2xl hover:animate-ping">
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
    const html = `<div onclick="specificMovie('${data.id}')" class="component m-4 hover:shadow-2xl hover:animate-ping">
            <img class="w-32" src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}" alt="">
            <p class="text-base bg-blue-600 text-white text-center">Upcoming</p>
            <h1 class="text-lg font-bold w-32">${data.title}</h1>
            <p class="w-32">${data.vote_average === 0 ? 'Unrated' : data.vote_average}</p>
            <p class="text-xs text-gray-300 w-32">${data.release_date}</p>
        </div>
    `
    // console.log(data.toString())
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
    const html = `<div onclick="specificMovie('${data.id}')" class="component m-4 hover:shadow-2xl hover:animate-ping">
            <img class="w-32" src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}" alt="">
            <h1 class="text-lg font-bold w-32">${data.title}</h1>
            <p class="w-32">${data.vote_average === 0 ? 'Rating Not Found' : data.vote_average}</p>
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

async function specificMovie(id) {
    let data = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=2eb8dae5e1988df3f72f80c01551e09a&language=en-US`);
    data = await data.json();
    showModal(data)
}

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