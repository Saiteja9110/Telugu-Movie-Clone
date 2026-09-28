const movies = [

    {
        title: "RRR",
        genre: "action",
        year: "2022",
        description:
            "An action drama featuring two fictional revolutionaries and their journey of friendship and courage."
    },

    {
        title: "Pushpa: The Rise",
        genre: "action",
        year: "2021",
        description:
            "A story following Pushpa Raj and his journey in the red sandalwood smuggling world."
    },

    {
        title: "Baahubali: The Beginning",
        genre: "action",
        year: "2015",
        description:
            "An epic historical action drama about a young man discovering his royal heritage."
    },

    {
        title: "Baahubali 2: The Conclusion",
        genre: "drama",
        year: "2017",
        description:
            "The continuation of the epic story revealing the events behind the kingdom and its characters."
    },

    {
        title: "Arjun Reddy",
        genre: "romance",
        year: "2017",
        description:
            "A romantic drama following the life of a passionate medical student."
    },

    {
        title: "Jersey",
        genre: "drama",
        year: "2019",
        description:
            "A sports drama about a former cricketer who attempts to return to the game."
    },

    {
        title: "Ala Vaikunthapurramuloo",
        genre: "comedy",
        year: "2020",
        description:
            "A family entertainer involving identity, relationships and an unexpected family secret."
    },

    {
        title: "DJ Tillu",
        genre: "comedy",
        year: "2022",
        description:
            "A comedy crime story following the energetic and unpredictable Tillu."
    },

    {
        title: "Fidaa",
        genre: "romance",
        year: "2017",
        description:
            "A romantic story involving two people from different backgrounds."
    },

    {
        title: "Rangasthalam",
        genre: "drama",
        year: "2018",
        description:
            "A period drama set in a village and centered around its people and local politics."
    },

    {
        title: "Eega",
        genre: "action",
        year: "2012",
        description:
            "A fantasy revenge story involving a man who returns in an unexpected form."
    },

    {
        title: "Jathi Ratnalu",
        genre: "comedy",
        year: "2021",
        description:
            "A comedy about three friends whose lives take an unexpected turn."
    }

];


const movieGrid =
    document.getElementById("movieGrid");

const favoriteGrid =
    document.getElementById("favoriteGrid");

const searchInput =
    document.getElementById("searchInput");

const genreFilter =
    document.getElementById("genreFilter");

let favorites = [];

let selectedMovie = null;


/* =========================
   DISPLAY MOVIES
========================= */

function displayMovies(movieList) {

    movieGrid.innerHTML = "";

    if (movieList.length === 0) {

        movieGrid.innerHTML =
            `<p>No movies found.</p>`;

        return;
    }


    movieList.forEach(movie => {

        const card =
            document.createElement("div");

        card.className = "movie-card";


        card.innerHTML = `

            <div class="poster">

                <h3>${movie.title}</h3>

            </div>


            <button
                class="favorite-btn
                ${favorites.includes(movie.title)
                    ? "active"
                    : ""}"
                onclick="toggleFavorite(
                    '${movie.title}',
                    event
                )"
            >
                ♥
            </button>


            <div class="movie-info">

                <h3>${movie.title}</h3>

                <p>
                    ${movie.year}
                    •
                    ${movie.genre}
                </p>

            </div>

        `;


        card.addEventListener(
            "click",
            function () {

                openMovie(movie);

            }
        );


        movieGrid.appendChild(card);

    });

}


/* =========================
   SEARCH
========================= */

function searchMovies() {

    const search =
        searchInput.value
        .toLowerCase()
        .trim();


    const genre =
        genreFilter.value;


    const filtered =
        movies.filter(movie => {

            const matchesSearch =
                movie.title
                .toLowerCase()
                .includes(search);


            const matchesGenre =
                genre === "all" ||
                movie.genre === genre;


            return (
                matchesSearch &&
                matchesGenre
            );

        });


    displayMovies(filtered);

}


searchInput.addEventListener(
    "input",
    searchMovies
);


genreFilter.addEventListener(
    "change",
    searchMovies
);


/* =========================
   FAVORITES
========================= */

function toggleFavorite(
    title,
    event
) {

    event.stopPropagation();


    if (favorites.includes(title)) {

        favorites =
            favorites.filter(
                movie => movie !== title
            );

    }

    else {

        favorites.push(title);

    }


    displayMovies(
        movies.filter(movie => {

            const search =
                searchInput.value
                .toLowerCase()
                .trim();

            return movie.title
                .toLowerCase()
                .includes(search);

        })
    );


    displayFavorites();

}


function displayFavorites() {

    favoriteGrid.innerHTML = "";


    if (favorites.length === 0) {

        favoriteGrid.innerHTML =
            `<p class="empty-message">
                Your favorite movies will appear here.
            </p>`;

        return;

    }


    favorites.forEach(title => {

        const movie =
            movies.find(
                item => item.title === title
            );


        const card =
            document.createElement("div");

        card.className = "movie-card";


        card.innerHTML = `

            <div class="poster">

                <h3>${movie.title}</h3>

            </div>

            <div class="movie-info">

                <h3>${movie.title}</h3>

                <p>
                    ${movie.year}
                    •
                    ${movie.genre}
                </p>

            </div>

        `;


        card.addEventListener(
            "click",
            () => openMovie(movie)
        );


        favoriteGrid.appendChild(card);

    });

}


/* =========================
   MOVIE MODAL
========================= */

function openMovie(movie) {

    selectedMovie = movie;


    document.getElementById(
        "modalTitle"
    ).textContent = movie.title;


    document.getElementById(
        "modalGenre"
    ).textContent =
        `${movie.year} • ${movie.genre}`;


    document.getElementById(
        "modalDescription"
    ).textContent =
        movie.description;


    document.getElementById(
        "modalPoster"
    ).innerHTML =
        `<h2>${movie.title}</h2>`;


    document.getElementById(
        "movieModal"
    ).classList.add("show");

}


function closeModal() {

    document.getElementById(
        "movieModal"
    ).classList.remove("show");

}


/* =========================
   PLAY
========================= */

function watchMovie() {

    if (!selectedMovie) return;


    alert(
        `"${selectedMovie.title}" selected.\n\n` +
        "This demo does not stream movies."
    );

}


function playFeatured() {

    alert(
        "Featured movie selected!\n\n" +
        "This project is a Netflix-style UI demo."
    );

}


function showFeaturedInfo() {

    openMovie(movies[0]);

}


/* Close modal */

document
    .getElementById("movieModal")
    .addEventListener(
        "click",
        function(event) {

            if (
                event.target === this
            ) {

                closeModal();

            }

        }
    );


/* Initial display */

displayMovies(movies);

displayFavorites();