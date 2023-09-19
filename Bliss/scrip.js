// Get references to DOM elements
const movieNameRef = document.getElementById("movie-name");
const searchBtn = document.getElementById("search-btn");
const result = document.getElementById("result");

// Function to fetch and display movies
async function fetchMovies() {
    try {
        const response = await fetch(`http://www.omdbapi.com/?s=movie&type=movie&apikey=212af1a4&page=3&4`);
        const data = await response.json();

        if (data.Response === 'True') {
            const movies = data.Search.slice(0, 9);
            const moviesContainer = document.getElementById('movies');

            movies.forEach(movie => {
                const movieDiv = document.createElement('div');
                movieDiv.classList.add('movie');
                movieDiv.innerHTML = `
                    <img src="${movie.Poster}">
                    <h3>${movie.Title}</h3>
                    <button>Read</button>
                `;
                moviesContainer.appendChild(movieDiv);
            });
        } else {
            console.error('Error fetching movies:', data.Error);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call the function to fetch and display movies when the window loads
window.addEventListener("load", fetchMovies);

// Function to get movie details
const getMovie = async () => {
    const movieName = movieNameRef.value.trim();

    if (movieName.length === 0) {
        // Clear the result if there's no input value
        result.innerHTML = '';
        result.style.display = 'none';
    } else {
        const url = `http://www.omdbapi.com/?t=${movieName}&apikey=212af1a4`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.Response === "True") {
                result.innerHTML = `
                   
                    <img src="${data.Poster}">
                    <h2>${data.Title}</h2>
                    <div class="act">
                      
                       <span>Actors : &nbsp</span>   ${data.Actors}

                    </div>

                    <div class="act">
                    <span> Year : &nbsp</span> 
                        ${data.Year}
                    </div>

                    <div class="act">
                    <span>  Genre : &nbsp</span> 
                        ${data.Genre}</
                    </div>

                    <div class="act">
                    <span>  Language : &nbsp</span>
                         ${data.Language}</span>
                    </div>

                    <div class="act">
                    <span>  Plot : &nbsp</span>
                          ${data.Plot}
                    </div>
                `;
                result.style.display = 'block';
            } else {
                result.innerHTML = `<h3>No movie found with that name.</h3>`;
                result.style.display = 'block';
            }
        } catch (error) {
            console.error('Error fetching movie details:', error);
            result.innerHTML = `<h3>Error fetching movie details. Please try again later.</h3>`;
            result.style.display = 'block';
        }
    }
};

// Add event listener for the search button click
searchBtn.addEventListener('click', getMovie);

// Initial state of result display
if (movieNameRef.value === '') {
    result.style.display = 'none';
}
