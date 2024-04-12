//get data from server
fetch("http://localhost:3000/posts")
.then((data)=> data.json() )
.then((posts)=>{

  displayPosts(posts)

})

function displayPosts(posts)
{
    let Posts= document.getElementById("Posts")


  for(post of posts){
    Posts.innerHTML+= ` <div id="cards"class=" mt-5 flex flex-col items-center bg-white border border-grey-200 rounded-lg shadow md:flex-row md:max-w-screen-xl hover:bg-gray-100 dark:border-red-900 dark:bg-gray-800 dark:hover:bg-gray-700">
    <div class="flex flex-col justify-between p-4 leading-normal">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${post.title}</h5>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${post.description}</p>
    </div>
    <div>
    </div>
    <img class="object-cover w-100  rounded-t-lg md:h-auto md:w-96 md:rounded-none md:rounded-l-lg" src="${post.img}" alt="loading...">
    <div id="iconsContainer"class="ml-4 ">
    <i onclick="deletePost(${post.id})" class="fa fa-minus text-3xl mt-10 mx-auto text-red-500 mr-8 icon-container hover:scale-150" aria-hidden="true"></i>
    <i onclick="editPost(${post.id})" class="fa fa-pencil-square-o text-3xl mt-10 mx-auto text-gray-50 icon-container hover:scale-150" aria-hidden="true"></i>
    </div>
  </div>`;
  }}
  
// edit post
function editPost(id) {
  fetch(`http://localhost:3000/posts/${id}`)
      .then((data) => data.json())
      .then((post) => {
          const update = document.getElementById("update");

          update.innerHTML = `
              <h4 class="text-center">Update Post</h4>
              <div class="max-w-md mx-auto">
                  <div class="relative z-0 w-full mb-5 group">
                      <input type="text" value="${post.title}" id="title_update" class="block py-2.5 px-0 w-full text-sm text-black-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                      <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
                  </div>
                  <div class="relative z-0 w-full mb-5 group">
                      <input type="text" value="${post.img}" id="image_update" class="block py-2.5 px-0 w-full text-sm text-black-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                      <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Image Link</label>
                  </div>
                  <div class="relative z-0 w-full mb-5 group">
                      <textarea type="text" id="description_update" rows="3" class="block py-2.5 px-0 w-full text-sm text-black-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required >${post.description}</textarea>
                      <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                  </div>
                  <button id="submitBtn" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
              </div>
          `;

          // Add event listener to submit button
          const submitBtn = document.getElementById("submitBtn");
          submitBtn.addEventListener("click", function () {
              const title = document.getElementById("title_update").value;
              const image = document.getElementById("image_update").value;
              const description = document.getElementById("description_update").value;

              // Send data to backend
              fetch(`http://localhost:3000/posts/${id}`, {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ title: title, img: image, description: description })
              })
                  .then((data) => data.json())
                  .then((response) => {
                      alert("Post updated successfully");
                  });
          });
      });
}

//to delete
function deletePost(id){
    fetch(`http://localhost:3000/posts/${id}`, {
        method:"DELETE"
    })
    .then((data)=> data.json() )
    .then((response)=>{

     alert("Post deleted successfully!")    
    })

}

// Add post
document.getElementById("addPost").addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const image = document.getElementById("img").value;
  const description = document.getElementById("description").value;

  fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title, img: image, description: description }),
  })
  .then((data) => data.json())
  .then((post) => {
      const postContainer = document.getElementById("postContainer");

      // Create a new div element for the post card
      const postCard = document.createElement("div");
      postCard.classList.add("mt-5", "flex", "flex-col", "items-center", "bg-white", "border", "border-gray-200", "rounded-lg", "shadow", "md:flex-row", "md:max-w-screen-xl", "hover:bg-gray-100", "dark:border-gray-700", "dark:bg-gray-800", "dark:hover:bg-gray-700");

      // Set inner HTML for the post card
      postCard.innerHTML = `
          <div class="bg-grey-900 flex flex-col justify-between p-4 leading-normal">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${post.title}</h5>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${post.description}</p>
          </div>
          <img class="object-cover w-96 h-72 rounded-t-lg md:h-auto md:w-96 md:rounded-none md:rounded-l-lg" src="${post.img}" alt="loading...">
          <div class="ml-4">
              <i onclick="deletePost(${post.id})" class="fa fa-minus text-3xl mt-10 mx-auto text-red-500 mr-8 icon-container hover:scale-150" aria-hidden="true"></i>
              <i onclick="editPost(${post.id})" class="fa fa-pencil-square-o text-3xl mt-10 mx-auto text-gray-50 icon-container hover:scale-150" aria-hidden="true"></i>
          </div>
      `;

      // Append the post card to the container
      postContainer.appendChild(postCard);
  });
});
