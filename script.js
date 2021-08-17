// API KEY 2eb8dae5e1988df3f72f80c01551e09a

// Fetching
const getNowPlaying = async () => {
    try {
        let data = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=2eb8dae5e1988df3f72f80c01551e09a&language=en-US&page=1&region=ID');
        data = await data.json();
        let {results} = data;
        results = results.filter(el => el.poster_path !== null).slice(0,5);
        results.forEach(el => document.getElementsByClassName('now_playing')[0].insertAdjacentHTML('afterbegin', renderNowPlaying(el)))
    } catch (error) {
        console.log(error)
    }
}

const getUpcoming = async () => {
    try {
        let data = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=2eb8dae5e1988df3f72f80c01551e09a&language=en-US&page=1&region=ID');
        data = await data.json();
        let {results} = data;
        results = results.filter(el => el.poster_path !== null).slice(0,5);
        results.forEach(el => document.getElementsByClassName('upcoming')[0].insertAdjacentHTML('afterbegin', renderUpcoming(el)))
    } catch (error) {
        console.log(error);
    }
}

const getTopRated = async reg => {
    try {
        let data = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=2eb8dae5e1988df3f72f80c01551e09a&language=en-US&page=1&region=${reg}`);
        data = await data.json();
        let {results} = data;
        if (results.length > 0) {
            results = results.filter(el => el.poster_path !== null).slice(0,5);
            results.forEach((el, i) => document.getElementsByClassName('top_rated')[0].insertAdjacentHTML('beforeend', renderTopRated(el, i+1)))
            return
        }
        const html = `<h1 class="text-white font-bold">Oops, Country is not found</h1>`;
        document.getElementsByClassName('top_rated')[0].insertAdjacentHTML('afterbegin', html);
        return
        // console.log(results)
    } catch (error) {
        console.log(error)
    }
}

const getPopular = async reg => {
    try {
        let data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=2eb8dae5e1988df3f72f80c01551e09a&language=en-US&page=1&region=${reg}`);
        data = await data.json();
        let {results} = data;
        console.log(results.length)
        if (results.length > 0) {
            results = results.filter(el => el.poster_path !== null).slice(0,5);
            results.forEach((el, i) => document.getElementsByClassName('popular')[0].insertAdjacentHTML('beforeend', renderPopular(el, i+1)))
            return
        }
        const html = `<h1 class="text-white font-bold">Oops, Country is not found</h1>`;
        document.getElementsByClassName('popular')[0].insertAdjacentHTML('afterbegin', html);
        return
        // console.log(results)
    } catch (error) {
        console.log(error)
    }
}

async function reqApiSearch(query) {
    try {
        let data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=2eb8dae5e1988df3f72f80c01551e09a&language=en-US&query=${query}&page=1&include_adult=false`);
        data = await data.json();
        let result = data.results.filter(el => el.poster_path !== null);
        console.log(result)
        if (result.length === 0) {
            let html = `<h1 class="text-center text-4xl font-bold text-white">Sorry we cannot find your movie, try another keyword</h1>`
            document.getElementsByClassName('search_result')[0].insertAdjacentHTML('afterbegin', html);
            return
        }
        result.forEach((value, index, array) => document.getElementsByClassName('search_result')[0].insertAdjacentHTML('beforeend', renderSearch(value)))
    } catch (err) {
        console.log(err)
    }
}

async function specificMovie(id) {
    try {
        let data = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=2eb8dae5e1988df3f72f80c01551e09a&language=en-US`);
        data = await data.json();
        showModal(data)
    } catch (error) {
        console.log(error)
    }
}


// Component
const renderNowPlaying = (data) => {
    const html = `<div class="movie_card transform relative w-40 m-2 hover:shadow-2xl hover:scale-105">
    <div onclick="specificMovie('${data.id}')" class="text-left w-32 component mx-auto my-4">
    <img class="w-32" src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${data.poster_path}" alt="">
    <p class="text-base bg-red-600 text-white text-center">Now Playing</p>
    <h1 class="text-lg font-bold w-32">${data.original_title}</h1>
    <p class="w-32">${data.vote_average > 0 ? data.vote_average * 10 + '%' : 'Unrated'}</p>
    <p class="text-xs w-32">${data.release_date}</p>
    </div>
    </div>
    `
    return html;
}

const renderUpcoming = data => {
    const html = `<div class="movie_card transform relative w-40 m-2 hover:shadow-2xl hover:scale-105">
                <div onclick="specificMovie('${data.id}')" class="text-left w-32 component mx-auto my-4">
                    <img class="w-32" src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${data.poster_path}" alt="">
                    <p class="text-base bg-blue-600 text-white text-center">Upcoming</p>
                    <h1 class="text-lg font-bold w-32">${data.original_title}</h1>
                    <p class="w-32">${data.vote_average > 0 ? data.vote_average * 10 + '%' : 'Unrated'}</p>
                    <p class="text-xs text-gray-400 w-32">${data.release_date}</p>
                </div>
            </div>
    `
    return html;
}

const renderTopRated = (data,rank) => {
    const html = `<div class="movie_card transform hover:scale-105 relative w-40 m-2 hover:shadow-2xl">
                <div class="absolute right-0 bg-yellow-500 w-8 h-8 rounded-full text-white">
                    <p class="pos-cent font-bold text-xl">${rank}</p>
                </div>
                <div onclick="specificMovie('${data.id}')" class="text-left w-32 component mx-auto my-4">
                    <img class="w-32" src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${data.poster_path}" alt="">
                    <p class="text-base bg-yellow-500 text-white text-center">Top Rated</p>
                    <h1 class="text-lg font-bold w-32">${data.original_title}</h1>
                    <p class="w-32">${data.vote_average > 0 ? data.vote_average * 10 + '%' : 'Unknown'}</p>
                    <p class="text-xs text-gray-400 w-32">${data.release_date}</p>
                </div>
            </div>
    `
    return html
}

const renderPopular = (data, rank) => {
    const html = `<div class="movie_card transform relative w-40 m-2 hover:shadow-2xl hover:scale-105">
                <div class="absolute right-0 bg-indigo-500 w-8 h-8 rounded-full text-white">
                    <p class="pos-cent font-bold text-xl">${rank}</p>
                </div>
                <div onclick="specificMovie('${data.id}')" class="text-left w-32 component mx-auto my-4">
                    <img class="w-32" src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${data.poster_path}" alt="">
                    <p class="text-base bg-indigo-500 text-white text-center">Popular</p>
                    <h1 class="text-lg font-bold w-32">${data.original_title}</h1>
                    <p class="w-32">${data.vote_average > 0 ? data.vote_average * 10 + '%' : 'Unknown'}</p>
                    <p class="text-xs text-gray-400 w-32">${data.release_date}</p>
                </div>
            </div>
    `
    return html;
}

const renderSearch = data => {
    const html = `<div class="movie_card transform w-40 m-2 hover:shadow-2xl hover:scale-105">
        <div onclick="specificMovie('${data.id}')" class="component m-4">
            <img class="w-32" src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}" alt="">
            <h1 class="text-lg font-bold w-32">${data.original_title}</h1>
            <p class="w-32">${data.vote_average === 0 ? 'Unrated' : data.vote_average * 10 + "%"}</p>
            <p class="text-xs text-gray-400 w-32">${data.release_date !== "" ? data.release_date : "Unknown release date"}</p>
        </div>
    </div>
    `
    return html;
}

function showModal(data) {
    const {production_companies: prod, genres: genre} = data
    // console.log(genre)
    const html = `<div class="myModal">
            <div class="modal-content rounded-3xl">
                <div onclick="closeModal();" class="relative close__button mb-4 w-8 h-8 bg-red-300 rounded-full float-right hover:shadow-2xl hover:bg-red-900">
                    <a role="button" class="pos-cent text-white font-bold">X</a>
                </div>
                <div class="info flex my-4 flex-wrap justify-center gap-x-16">
                    <img class="w-96"src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${data.poster_path}" alt="">
                    <div class="info__film w-96">
                        <h1 class="text-3xl font-bold">${data.original_title}</h1>
                        <p>Produced by <span class="text-lg font-bold">${prod.length > 0 ? prod[0].name : `-`}</span></p>
                        <p class="my-8 leading-relaxed">${data.overview}</p>
                        <div class="rating__date">
                            <div class="inline-block w-24 h-8 bg-red-400 text-white inline-block mr-2 mb-4">
                                <p class="py-1 text-center">${data.vote_average > 0 ? data.vote_average * 10 + '%'  + ' Score': 'No Rating'}</p>
                            </div>
                            <div class="inline-block w-32 bg-indigo-500 text-white">
                                <p class="py-1 text-center">${data.release_date !== "" ? data.release_date : "No Release Date"}</p>
                            </div>
                        </div>
                        ${genre.length > 0 ? genre.map(el => {
                            return `<div class="inline-block relative genres mr-1 mb-1 h-8 bg-green-500 text-white">
                                <p class="text-center py-1 px-6">${el.name}</p>
                            </div>`
                        }) : 'Unknown'}
                    </div>
                </div>
                <div class="close_modal flex justify-end">
                    <a class="" href="https://www.themoviedb.org/movie/${data.id}"><button class= "px-8 py-2  bg-blue-800 rounded-lg text-white border-2 border-blue-500 hover:bg-blue-400 hover:shadow-2xl">More</button></a>
                </div>
            </div>
        </div>
    `
    document.getElementsByClassName('modal')[0].insertAdjacentHTML('afterbegin', html);
    document.getElementsByClassName('modal')[0].classList.remove('hidden');

}

// Click Event
const hideSection = (...hidden) => {
    let x = hidden.flat(1);
    x.forEach((el, i) => {
        if (i < 3) {
            document.getElementById(el).classList.add('hidden')
        } else {
            document.getElementById(el).classList.remove('hidden')
        }
    });
}

document.getElementById('search_box').addEventListener('click', () => {
    let data = document.getElementById('search_input').value;
    document.getElementsByClassName('search_result')[0].innerHTML = '';
    hideSection('top_rated', 'popular');
    hideSection('now_playing', 'upcoming');
    document.getElementById('search_result').classList.remove('hidden');
    reqApiSearch(data)
});

document.getElementById('pop_search').addEventListener('click', () => {
    let data = document.getElementById('pop_result').value;
    document.getElementsByClassName('popular')[0].innerHTML = '';
    getPopular(data);
});

document.getElementById('top_search').addEventListener('click', () => {
    let data = document.getElementById('top_result').value;
    document.getElementsByClassName('top_rated')[0].innerHTML = '';
    getTopRated(data);
});

function testFunc() {
    let x = document.getElementsByClassName('nav_select')[0].value;
    x = x.split(',');
    console.log(x)
    hideSection(x);
}


// Other Function
function closeModal() {
    document.getElementsByClassName('modal')[0].classList.add('hidden');
    document.getElementsByClassName('modal')[0].innerHTML = '';
}


// Invoking
getNowPlaying();
getUpcoming();
getTopRated('ID');
getPopular('ID');

// window.location.replace(`${window.location.protocol}//${window.location.hostname}:${wind}`);