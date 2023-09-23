// Sample data for blog posts (you can replace this with actual data)
const blogPosts = [
    {
        title: "The Importance of Sustainable Farming",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
    {
        title: "Tips for Maximizing Crop Yields",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
    // Add more blog posts here
];

// Function to dynamically load blog posts
function loadBlogPosts() {
    const blogPostsContainer = document.getElementById("blog-posts");

    blogPosts.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.classList.add("blog-post");
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
        `;
        blogPostsContainer.appendChild(postElement);
    });
}

// Load blog posts when the page is ready
document.addEventListener("DOMContentLoaded", loadBlogPosts);
