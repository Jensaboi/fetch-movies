const BASE_URL = "https://www.omdbapi.com/"
const API_KEY = 'ENTER_YOUR_API_KEY'

const searchInput = document.getElementById('search-input')

async function fetchData(query){

    try{
        const response = await fetch(`${BASE_URL}?s=${query.trim()}&apikey=${API_KEY}&plot=short`, {method: 'GET'})
        
        if(!response.ok){ 
            throw new Error('Something is wrong with the API')

        } 
        const data = await response.json()
        
        return data.Search ?? null

    }catch(error){
        console.log(error)
    }

}

async function renderMovies(){
    const moviesContainerEl = document.getElementById("movies-container")
    moviesContainerEl.innerHTML = ''
    try{
        const data = await fetchData(searchInput.value)
        if(data === null){
            let noDataEl = document.createElement('div')
            noDataEl.innerHTML = `
                <p class="no-results-p">No search results for: ${searchInput.value}...</p>
            `
            moviesContainerEl.appendChild(noDataEl)
            return
        }
        data.forEach(movie=>{
            const movieCard = document.createElement('div')
            movieCard.classList.add('movie-card')
            movieCard.innerHTML = `
                <img alt="${movie.Title} poster">
                <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
            `
            const img = movieCard.querySelector('img')
            img.src = movie.Poster

            img.onload = ()=>{
                console.log("Image Loaded")
            }
            img.onerror = ()=>{
                img.src = "/icons/notfound.avif"
            }

            moviesContainerEl.appendChild(movieCard)
        })
    }catch(error){

    }
}

document.getElementById("search-btn").addEventListener("click", ()=>{
    renderMovies()
    
})