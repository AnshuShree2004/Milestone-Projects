// JavaScript for your application
const blogList = document.getElementById("blogList");
const openModalButton = document.getElementById("openModal");
const modal = document.getElementById("myModal");
const closeButton = document.querySelector(".close");
const blogForm = document.getElementById("blogForm");

// Function to get blog posts from LocalStorage
function getBlogPosts() {
    const storedPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    return storedPosts;
}

// Function to save blog posts to LocalStorage
function saveBlogPosts(posts) {
    localStorage.setItem("blogPosts", JSON.stringify(posts));
}

// Function to display blog posts
function displayBlogPosts() {
    const posts = getBlogPosts();
    blogList.innerHTML = '';

    posts.forEach((post, index) => {
        const blogPost = document.createElement("div");
        blogPost.classList.add("blog-post");
        blogPost.innerHTML = `
            <h2>${post.title}</h2>
            <img src="${post.imageUrl}" alt="${post.title}">
            <p>${post.description}</p>
           
           
        `;

        // Add a click event listener to open the blog post in a new page
        blogPost.addEventListener("click", () => {
            openBlogInNewPage(post);
        });

        blogList.appendChild(blogPost);
    });
}

// Function to open a blog post in a new page
function openBlogInNewPage(post) {
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
        <html>
        <head>
            <title>${post.title}</title>
            <link rel="stylesheet" href="blog.css">
        </head>
        <body>
           
            <main>
                <div class="blog-post">
                    <h1>${post.title}</h1>
                    <img src="${post.imageUrl}" alt="${post.title}">
                    <p><strong>Author: </strong> ${post.author}</p>
                    <p><strong>Description: </strong>${post.description}</p>
                   
                    <p><strong>Content: </strong>${post.content}</p>
                </div>
            </main>
        </body>
        </html>
    `);
    newWindow.document.close(); // Close the document for writing
}

// Event listener to open the modal
openModalButton.addEventListener("click", () => {
    modal.style.display = "block";
});

// Event listener to close the modal
closeButton.addEventListener("click", () => {
    modal.style.display = "none";
});

// Event listener to add a new blog
blogForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const description = document.getElementById("description").value;
    const content = document.getElementById("content").value;
    const imageUrl = document.getElementById("imageUrl").value;

    // Create a new blog post object
    const newPost = {
        title,
        author,
        description,
        content,
        imageUrl
    };

    // Get existing blog posts from LocalStorage, add the new post, and save it back
    const posts = getBlogPosts();
    posts.push(newPost);
    saveBlogPosts(posts);

    // Display updated blog posts
    displayBlogPosts();

    // Clear the form inputs
    blogForm.reset();

    // Close the modal
    modal.style.display = "none";
});

// Initial display of blog posts when the page loads
displayBlogPosts();
