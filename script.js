var allArticles = [];

//Function to call google api to fetch data from google sheet
async function getArticles() {
    const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyLI1in7pgT3QjI08A1EMYPLbH8YEMrgMx1zhxtE7P1navniu0ZUtKlzda5lex9o4d-/exec",
        {
            method: "GET",
        }
    );
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
}

//Function to return html format
async function getHtmlArticle(article) {
    const blog = article;
    const defaultImgId = "1YbeuDm7tKLlwrDD33b9G378SJhboUOdD";
    const imgUrl = JSON.parse(blog.img);
    var allImgs = "";
    for (let i = 0; i < 1 && i < imgUrl.length; i++) {
        allImgs =
            allImgs +
            '<img src="https://drive.google.com/uc?export=view&id=' +
            imgUrl[i] +
            '" class="card-img-top" alt="img">';
    }
    allImgs =
        allImgs.length > 0
            ? allImgs
            : '<img src="https://drive.google.com/uc?export=view&id=' +
            defaultImgId +
            '" class="card-img-top" alt="img">';
    return `
        <div class="col-lg-4 col-md-4 col-sm-6 col-12 text-center pb-3 pt-3 pl-3 pr-3">
            <div class="card shadow h-100" style="width: 18rem; height: 16vh">
                ${allImgs}
                <div class="card-body text-center flex">
                <h5 class="card-title">${blog.title.length > 40
            ? blog.title.substring(0, 40) + "..."
            : blog.title
        }</h5>
                <p class="card-text">${blog.date.length > 10 ? blog.date.substring(0, 10) : blog.date
        }</p>
                    <p class="card-text">${blog.content.length > 60
            ? blog.content.substring(0, 60) + "..."
            : blog.content
        }</p>
                    <a class="btn btn-primary pb-1 read-article" 
                            id="read-article" 
                            article='${JSON.stringify(blog)}' 
                            onclick="handleReadArticleClick(event)">
                            Read Article
                    </a>
                </div>
            </div>
        </div>
        `;
}

// Function to display limited blog posts
async function displayLimitedArticles() {
    const blogContainer = document.getElementById("top-articles");
    if (allArticles.length == 0) {
        const res = await getArticles();
        allArticles = res.data;
    }

    // Display only the first three articles
    for (let i = 0; i < 3 && i < allArticles.length; i++) {
        const blogCard = document.createElement("div");
        blogCard.classList.add("card");
        blogCard.innerHTML = await getHtmlArticle(allArticles[i]);
        blogContainer.appendChild(blogCard);
    }
}

// Call the function to display all articles when the page loads
window.addEventListener("DOMContentLoaded", displayLimitedArticles);

// Function to display limited blog posts
async function displayAllArticles() {
    const blogContainer = document.getElementById("all-articles");
    if (allArticles.length == 0) {
        const res = await getArticles();
        allArticles = res.data;
    }

    // Display only all articles
    for (let i = 0; i < allArticles.length; i++) {
        const blogCard = document.createElement("div");
        blogCard.classList.add("card");
        blogCard.innerHTML = await getHtmlArticle(allArticles[i]);
        blogContainer.appendChild(blogCard);
    }
}

// Call the function to display all articles when the page loads
window.addEventListener("DOMContentLoaded", displayAllArticles);

// Function to handle "Read Article" button click
function handleReadArticleClick(event) {
    // Prevent the default behavior of the anchor tag
    event.preventDefault();

    // Retrieve the clicked element
    const element = event.target;

    // Get the article attribute from the button
    const articleAttribute = element.getAttribute("article");

    // Parse the JSON string to get the article object
    const article = JSON.parse(articleAttribute);

    // If on index.html, redirect to articles.html
    if (isIndexPage()) {
        redirectToArticles();
    }
    // Display individual article details
    showIndividualArticle(
        article.title,
        article.date,
        article.img,
        article.content
    );
}

// Check if the current page is index.html
const isIndexPage = () => window.location.pathname.includes("index.html");

// Function to redirect to articles.html
const redirectToArticles = () => {
    if (isIndexPage()) {
        window.location.href = "article.html";
    }
};

// Function to display individual article and hide list of articles
function showIndividualArticle(title, date, imgs, content) {
    // Assuming you have elements with specific IDs to display article details
    document.getElementById("article-title").textContent = title;
    document.getElementById("article-date").textContent =
        date.length > 10 ? date.substring(0, 10) : date;
    document.getElementById("article-content").textContent = content;
    const defaultImgId = "1YbeuDm7tKLlwrDD33b9G378SJhboUOdD";
    const imgIds = JSON.parse(imgs);
    // Assuming 'images' is an array of image paths
    const carouselInner = document.querySelector(
        "#article-carousel .carousel-inner"
    );
    if (!carouselInner) {
        console.error("Carousel inner container not found");
        return;
    }
    carouselInner.innerHTML = ""; // Clear existing content

    imgIds.forEach((imagePath, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("carousel-item");
        if (index === 0) {
            itemDiv.classList.add("active"); // Set the first image as active
        }

        const imgElement = document.createElement("img");
        imgElement.src = "https://drive.google.com/uc?export=view&id=" + imagePath;
        imgElement.classList.add("d-block", "w-100");

        itemDiv.appendChild(imgElement);
        carouselInner.appendChild(itemDiv);
    });

    // Hide the list of articles and show the individual article
    document.getElementById("article").style.display = "none";
    document.getElementById("individual-article").style.display = "block";
}

// Function to handle "Back" button click
function handleBackButtonClick() {
    // Show the list of articles and hide the individual article
    document.getElementById("article").style.display = "block";
    document.getElementById("individual-article").style.display = "none";
}

// Event listener for "Back" button on individual article page
document
    .getElementById("back-btn")
    .addEventListener("click", handleBackButtonClick);
document
    .getElementById("read-article")
    .addEventListener("click", handleReadArticleClick);

//   https://script.google.com/macros/s/AKfycbzinSdlH9rflYJNjhn6HKSOyR4ar5QQ_o5b0B6RocH0B5cb8A4TzrG2NUjAfRC9bdlv6g/exec
