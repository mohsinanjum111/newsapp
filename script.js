function reload(){
    window.location.reload();
}

window.addEventListener("load", () => {
    fetchNews("Pakistan");
})

function fetchNews(query) {
    fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=0b0ab8c845694dc2bc13990c250f650f`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data.articles);
            bindData(data.articles);
        })
}

const bindData = function (datavalue) {
    var cardscontainer = document.getElementById("cards-container");
    cardscontainer.innerHTML = '';
    datavalue.forEach((d) => {
        if (!d.urlToImage) {
            return ;
        }
        var carddiv = document.createElement("div");
        cardscontainer.appendChild(carddiv);
        const date = new Date(d.publishedAt).toLocaleString("en-US", {
            timeZone: "Asia/Jakarta",
        });
        carddiv.classList.add("card");
        carddiv.innerHTML = `
            <div class="card-header">
               <img src="${d.urlToImage}" alt="news-image" id="news-img">
            </div>
            <div class="card-content">
                <h3 id="news-title">${d.title}</h3>
                <h6 class="news-source" id="news-source">${d.source.name} . ${date}</h6>
                <p class="news-desc" id="news-desc">${d.description}</p>
            </div>
            `;
            
            carddiv.addEventListener("click", () => {
                window.open(d.url, "_blank")
            })
    });
}

let curSelectedNav = null;
function onNavItemClick(input) {
    fetchNews(input);
    const navItem = document.getElementById(input);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById('search-button');
const searchtext = document.getElementById('search-text'); 
searchButton.addEventListener("click" , ()=>{
    const inputvalue = searchtext.value;
    if(!inputvalue){
        return;
    }
    fetchNews(inputvalue);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});