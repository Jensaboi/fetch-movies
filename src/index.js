const BASE_URL = "https://www.omdbapi.com/"
const API_KEY = 'API KEY GOES HERE'

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

async function renderMovies(query){
    const moviesContainerEl = document.getElementById("movies-container")
    moviesContainerEl.innerHTML = ''
    try{
        const data = await fetchData(query)

        if(data === null){
            let noDataEl = document.createElement('div')
            noDataEl.innerHTML = `
                <p class="no-results-p">No search results for: ${query}...</p>
            `
            moviesContainerEl.appendChild(noDataEl)
            return
        }
        console.log(data)

        data.forEach(movie=>{
            const movieCard = document.createElement('div')
            movieCard.classList.add('movie-card')

            const img = new Image()
            img.src = movie.Poster
            img.alt = `${movie.Title} poster`
            movieCard.appendChild(img)

            const textBox = document.createElement('div')
            textBox.classList = "movie-text"
            textBox.innerHTML = `
                <h3>${movie?.Title ?? 'Unknown'}</h3>
                <p>${movie?.Year ?? 'Unknown'}</p>
            `
            movieCard.appendChild(textBox)
            img.onload = ()=>{
                moviesContainerEl.appendChild(movieCard)
                console.log("Image Loaded")
            }
            img.onerror = ()=>{
                console.log(movie.Poster + " failed to load")
            }
        })
       
    }catch(error){
        console.log(error)
    }
}

document.getElementById("search-btn").addEventListener("click", ()=>{
    renderMovies(searchInput.value)
    searchInput.value = ''
})