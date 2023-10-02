// Sample data for blog posts (you can replace this with actual data)
const blogPosts = [
    {
        title: "The Importance of Sustainable Farming",
        content: "Lorem ipsum dolor sit amet, consectetur",
        imageUrl: "asset/dumy img farmer.jpg"
    },
    {
        title: "Tips for Maximizing Crop Yields",
        content: "Duis id quam nec sapien scelerisque dictum. Suspendisse ut dictum nunc. Nulla facilisi. Nunc vestibulum eleifend neque, non malesuada ligula congue in.",
        imageUrl: "asset/dumy img farmer.jpg"
    },
    {
        title: "Blog 1: Sustainable Farming Practices",
        content: "Vestibulum fermentum eros id lectus viverra, id elementum est tincidunt. Quisque vitae turpis in purus rhoncus venenatis.",
        imageUrl: "asset/dumy img farmer.jpg"
    },
    {
        title: "Blog 2: Crop Rotation Benefits",
        content: "Vestibulum fermentum eros id lectus viverra, id elementum est tincidunt. Quisque vitae turpis in purus rhoncus venenatis.",
        imageUrl: "asset/dumy img farmer.jpg"
    },
    {
        title: "Blog 3: Organic Farming Tips",
        content: "Praesent bibendum tellus at ullamcorper. Curabitur nec tincidunt ex, nec aliquet augue. Nunc interdum justo a velit ultricies, nec scelerisque nunc dictum.",
        imageUrl: "asset/dumy img farmer.jpg"
    },
    {
        title: "Blog 4: Farming in Monsoon Season",
        content: "Duis id quam nec sapien scelerisque dictum. Suspendisse ut dictum nunc. Nulla facilisi. Nunc vestibulum eleifend neque, non malesuada ligula congue in.",
        imageUrl: "asset/dumy img farmer.jpg"
    }
    // Add more blog posts here
];

// Function to display limited blog posts
function displayLimitedFarmerBlogs() {
    const blogContainer = document.getElementById("blog-posts");
    
    // Display only the first two blogs
    for (let i = 0; i < 3 && i < blogPosts.length; i++) {
        const blog = blogPosts[i];
        
        const blogCard = document.createElement("div");
        blogCard.classList.add("card");
        blogCard.innerHTML = `
        <div class="col-lg-4 col-md-4 col-sm-6 col-12 text-center pb-3 pt-3 pl-3 pr-3">
            <div class="card shadow h-100" style="width: 18rem; height: 16vh">
                <img src="${blog.imageUrl}" class="card-img-top" alt="${blog.title.substring(0,40)}">
                <div class="card-body text-center flex">
                    <h5 class="card-title">${blog.title.length>40 ? blog.title.substring(0,40)+"..." : blog.title}</h5>
                    <p class="card-text">${blog.content.length > 60 ? blog.content.substring(0,60)+"..." : blog.content}</p>
                    <a href="#" class="btn btn-primary pb-1">Read Article</a>
                </div>
            </div>
        </div>
        `;
        
        blogContainer.appendChild(blogCard);
    }
}

// Call the function to display limited blogs when the page loads
window.addEventListener("DOMContentLoaded", displayLimitedFarmerBlogs);
