// API KEY 2eb8dae5e1988df3f72f80c01551e09a

function renderPopular(data, rank) {
    const html = `<div class="relative w-40 m-2 hover:shadow-2xl hover:border-4 hover:border-gray-500">
        <div class="absolute right-0 bg-indigo-500 w-8 h-8 rounded-full text-white">
            <p class="pos-cent font-bold text-xl">${rank}</p>
        </div>
        <div onclick="specificMovie('${data.id}')" class="text-left w-32 component mx-auto my-4">
            <img class="w-32" src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}" alt="">
            <p class="text-base bg-indigo-500 text-white text-center">Popular</p>
            <h1 class="text-lg font-bold w-32">${data.original_title}</h1>
            <p class="w-32">${data.vote_average === 0 ? 'Unrated' : data.vote_average * 10 + "%"}</p>
            <p class="text-xs text-gray-400 w-32">${data.release_date !== "" ? data.release_date : "Unknown Release Date" }</p>
        </div>
    </div>
    `
    return html;
}

async function getPopular(reg) {
    try {
        let data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=2eb8dae5e1988df3f72f80c01551e09a&language=en-US&page=1&region=${reg}`);
        data = await data.json();
        const result = data.results.filter((el, i) => i < 5);
        result.forEach((el, i) => document.getElementById('popular').insertAdjacentHTML('beforeend', renderPopular(el, i+1)));
    } catch (error) {
        console.log(error)
    }
}

getPopular('ID');

function renderTopIndo(data, rank) {
    const html = `<div class="relative w-40 m-2 hover:shadow-2xl hover:border-4 hover:border-gray-500">
        <div class="absolute right-0 bg-yellow-500 w-8 h-8 rounded-full text-white">
            <p class="pos-cent font-bold text-xl">${rank}</p>
        </div>
        <div onclick="specificMovie('${data.id}')" class="text-left w-32 component mx-auto my-4">
            <img class="w-32" src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}" alt="">
            <p class="text-base bg-yellow-500 text-white text-center">Top Rated</p>
            <h1 class="text-lg font-bold w-32">${data.original_title}</h1>
            <p class="w-32">${data.vote_average === 0 ? 'Unrated' : data.vote_average * 10 + "%"}</p>
            <p class="text-xs text-gray-400 w-32">${data.release_date !== "" ? data.release_date : "Unknown Release Date" }</p>
        </div>
    </div>
    `
    return html;
} 

async function getTopOnIndo(reg) {
    try {
        let data = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=2eb8dae5e1988df3f72f80c01551e09a&language=en-US&page=1&region=${reg}`);
        data = await data.json();
        const result = data.results.filter((el, i) => i < 5);
        if (result.length > 0) {
            result.forEach((el, i) => document.getElementsByClassName('top__rated')[0].insertAdjacentHTML('beforeend', renderTopIndo(el, i+1)))
            return
        }
        let html = `<h1>No Country is Found</h1>`
        document.getElementsByClassName('top__rated')[0].insertAdjacentHTML('afterbegin', html);
    } catch (error) {
        console.log(error)
    }
}

getTopOnIndo('ID')

function closeModal() {
    document.getElementsByClassName('modal__film')[0].classList.add('hidden');
    document.getElementsByClassName('modal__film')[0].innerHTML = '';
}

function showModal(data) {
    const {production_companies: prod, genres: genre} = data
    // console.log(genre)
    const html = `<div class="myModal">
            <div class="modal-content rounded-3xl">
                <div onclick="closeModal();" class="relative close__button mb-4 w-8 h-8 bg-red-300 rounded-full float-right hover:shadow-2xl hover:bg-red-900">
                    <a href="#" class="pos-cent text-white font-bold">X</a>
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
                <div class="flex justify-end">
                    <a class="" href="https://www.themoviedb.org/movie/${data.id}"><button class= "px-8 py-2  bg-blue-800 rounded-lg text-white border-2 border-blue-500 hover:bg-blue-400 hover:shadow-2xl">More</button></a>
                </div>
            </div>
        </div>
    `
    document.getElementsByClassName('modal__film')[0].insertAdjacentHTML('afterbegin', html);
    document.getElementsByClassName('modal__film')[0].classList.remove('hidden');

}

function renderNowPlaying(data) {
    const html = `<div class="w-40 m-2 hover:shadow-2xl hover:border-4 hover:border-gray-500">
        <div onclick="specificMovie('${data.id}')" class="w-32 component mx-auto my-4">
            <img class="w-32" src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}" alt="">
            <p class="text-base bg-red-600 text-white text-center">Now Playing</p>
            <h1 class="text-lg font-bold w-32">${data.original_title}</h1>
            <p class="w-32">${data.vote_average === 0 ? 'Unrated' : data.vote_average * 10 + "%"}</p>
            <p class="text-xs text-gray-400 w-32">${data.release_date !== "" ? data.release_date : "Unknown Release Date" }</p>
        </div>
    </div>
    `
    return html;
} 

function renderUpcoming(data) {
    const html = `<div class="w-40 m-2 hover:shadow-2xl hover:border-4 hover:border-gray-500">
        <div onclick="specificMovie('${data.id}')" class="component m-4">
                <img class="w-32" src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}" alt="">
                <p class="text-base bg-blue-600 text-white text-center">Upcoming</p>
                <h1 class="text-lg font-bold w-32">${data.original_title}</h1>
                <p class="w-32">${data.vote_average === 0 ? 'Unrated' : data.vote_average * 10 + "%"}</p>
                <p class="text-xs text-gray-400 w-32">${data.release_date !== "" ? data.release_date : "Unknown Release Date"}</p>
            </div>
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
    const html = `<div class="w-40 m-2 hover:shadow-2xl hover:border-4 hover:border-gray-500">
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

async function reqApiSearch(query) {
    try {
        let data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=2eb8dae5e1988df3f72f80c01551e09a&language=en-US&query=${query}&page=1&include_adult=false`);
        data = await data.json();
        let result = data.results.filter(el => el.poster_path !== null);
        console.log(result)
        if (result.length === 0) {
            let html = `<h1>Sorry we cannot find your movie, try another keyword</h1>`
            document.getElementsByClassName('search__result')[0].insertAdjacentHTML('afterbegin', html);
            return
        }
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
    document.getElementsByClassName('main4')[0].innerHTML = '';
    document.getElementsByClassName('search__result')[0].innerHTML = '';  
    searchMovies(data)
    document.getElementById('search_box').value = '';
});

document.getElementById('search__top').addEventListener('click', function() {
    const data = document.getElementById("top__box").value;
    document.getElementById('top__rated').innerHTML = ''; 
    if (data.length > 2) {
        alert('Gunakan 2 Digit');
        document.getElementById("top__box").value = '';
        getTopOnIndo(data)
        return
    }
    getTopOnIndo(data);
    window.location.href = '#main4'
})

document.getElementById('search__pop').addEventListener('click', function() {
    const data = document.getElementById("pop__box").value;
    document.getElementById('popular').innerHTML = ''; 
    if (data.length > 2) {
        alert('Gunakan 2 Digit');
        document.getElementById("pop__box").value = '';
        getPopular('ID');
        return
    }
    getPopular(data);
    window.location.href = '#main4'
})