const search_img = document.querySelector("#search_img");
const movie_container = document.querySelector(".movie_container");
const search_btn = document.querySelector("#search_btn");
const search_bar = document.querySelector("#search_bar");
const load_more = document.querySelector("#load_more");
const previous_btn = document.querySelector("#previous_btn");
const spinner = document.querySelector(".spinner");
const noMovie = document.querySelector(".noMovie");

let currentMovie = "";
let currentIndex = 1;
search_bar.focus();
defaultMovies();
// S E A R C H   B U T T O N
function searchMovie() {

    let movieName = search_bar.value.trim();        
    if(movieName === ""){
        return;
    };
    if(movieName !== currentMovie){                 
        currentIndex = 1;
        currentMovie = movieName;
    }
    let url = `https://www.omdbapi.com/?s=${movieName}&page=${currentIndex}&apikey=eebe14fc`;
    
    spinner.style.display = "block";      //Loading spinner
    
    fetch(url)
    .then(Response => Response.json())
        .then(data => {
            
            spinner.style.display = "none";
            
            if (data.Search) {
                movie_container.innerHTML = "";
                data.Search.forEach(info => {
                    
                    let card = document.createElement("div");           //  making elements
                    let movie_img = document.createElement("img");      //    ^^^^^^^^^
                    let movie_name = document.createElement("h2");      //    ^^^^^^^^^
                    let movie_year = document.createElement("h3");      //    ^^^^^^^^^
                    
                    card.classList.add("card");                         //adding classes
                    movie_img.classList.add("movie_img");               // ^^^^^^^^
                    movie_name.classList.add("movie_name");             // ^^^^^^^^
                    movie_year.classList.add("movie_year");             // ^^^^^^^^
                    
                    if(info.Poster !== "N/A"){
                        movie_img.src = info.Poster;
                    }
                    else{
                        movie_img.src = "https://dummyimage.com/300x450/2b2b2b/ffffff&text=No+Poster";
                    }
                    movie_img.onerror = function(){
                        movie_img.src = "https://dummyimage.com/300x450/2b2b2b/ffffff&text=No+Poster";
                        
                    }
                    
                    movie_name.textContent = info.Title;
                    movie_year.textContent = info.Year;
                    
                    
                    
                    card.appendChild(movie_img);
                    card.appendChild(movie_name);
                    card.appendChild(movie_year);
                    
                    movie_container.appendChild(card);
                });
                load_more.style.display = "flex";
                previous_btn.style.display = "flex";
                noMovie.style.display = "none";
                
            }
            else {
                movie_container.innerHTML = '';
                noMovie.style.display = "block";
                load_more.style.display = "none";
                previous_btn.style.display = "none";
            }
        })
        
        
    };
    
    
    search_btn.addEventListener("click", function(){
        searchMovie();
    });
    search_bar.addEventListener("keydown",function(e){
        if(e.key === "Enter"){
            searchMovie();
    }
})

load_more.addEventListener("click",function(){
    currentIndex++;
    searchMovie();

})

previous_btn.addEventListener("click",function(){
    if(currentIndex === 1){
        return;
    }
    else{
        currentIndex--;
        searchMovie();
    }
})

function defaultMovies(){
    search_bar.value = "Batman";
    searchMovie();


}
