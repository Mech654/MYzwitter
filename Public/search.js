let decodedContent;

function getContentFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const content = urlParams.get('content');
    decodedContent = decodeURIComponent(content);
    
    // Remove all '#' characters from the decoded content
    decodedContent = decodedContent.replace(/#/g, '');

    console.log(decodedContent);
}



getContentFromURL();


function loadPostsWithIframe(username, postContent, tags = '', videoId = '') {
    // If tags exist, split by commas, prepend # to each, and create a paragraph for each tag
    const formattedTags = tags.split(',').map((tag) => {
        const formattedTag = `#${tag.trim()}`;  // Ensure # is included at the start
        return `<p style="margin-right: 10px; color: deepskyblue" onclick="sendContentAsURL(this)">${formattedTag}</p>`;
    }).join('');

    const postHtml = `
              <div class="post">
              <div class="postContent">
                    <div style="display: flex" id="flexContainer">
                        <img src="Resources/Profile_photo.png" style="width: 10%; height: 10%">
                        <p style="margin-left: 50px;">${username}</p>
                    </div>
                    <p>${postContent}</p>
                    ${tags ? `<div style="display: flex">${formattedTags}</div>` : ''}
                    ${videoId ? `
                    <div class="videoContainer">
                    <iframe 
                    src="${videoId}" 
                    frameborder="10" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                    </iframe>
                    </div>
                    ` : ''}
              </div>
              </div>
    `;

    document.getElementById('posts').innerHTML += postHtml;
}





function loadPostsWithoutIframe(username, postContent, tags = '') {


    // If tags exist, split by commas, prepend # to each, and create a paragraph for each tag
    const formattedTags = tags.split(',').map((tag) => {
        const formattedTag = `#${tag.trim()}`;  // Ensure # is included at the start
        return `<p style="margin-right: 10px; color: deepskyblue" onclick="sendContentAsURL(this)">${formattedTag}</p>`;
    }).join('');

    const postHtml = `
              <div class="post">
              <div class="postContent">
                    <div style="display: flex" id="flexContainer">
                        <img src="Resources/Profile_photo.png" style="width: 10%; height: 10%">
                        <p style="margin-left: 50px;">${username}</p>
                    </div>
                    <p>${postContent}</p>
                    ${tags ? `<div style="display: flex">${formattedTags}</div>` : ''}
              </div>
              </div>
    `;

    document.getElementById('posts').innerHTML += postHtml;
}



async function getPost(tag = '') {
    if (tag !== '') {
        decodedContent = tag;
    }
    

    const formData = new FormData();
    formData.append('message', decodedContent);
    let url = 'search.php';
    let options = {
        method: 'POST',
        body: formData
    };

    try {
        // Fetch the data
        const response = await fetch(url, options);

        // Check if the response is successful
        if (response.ok) {
            const data = await response.json();

            // Check if the API response indicates success
            if (data.success) {
                return data;
            } else {
                console.log('Error: No success in response');
                return null;  // Return null if data.success is false
            }
        } else {
            console.log('Error:', response.status);
            return null;  // Return null if response isn't successful (e.g., 404 or 500)
        }
    } catch (error) {
        console.log('Error during fetch operation:', error);
        return null;  // Return null if there's a fetch error (e.g., network issues)
    }
}




async function uploadPosts(tag) {

    console.log("uploading posts");
    const raw_data = await getPost();

    if (raw_data) {
        // Access posts from the correct field: raw_data.posts
        raw_data.posts.forEach(async (post) => {
            if (post.videoId && post.videoId !== 'undefined') {
                const isYouTubeVideo = post.videoId.includes('youtube.com') || post.videoId.includes('youtu.be');
                let videoEmbedUrl = post.videoId;

                if (isYouTubeVideo) {
                    // If it's a YouTube video, extract the embed URL
                    const videoIdMatch = post.videoId.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/);
                    videoEmbedUrl = `https://www.youtube.com/embed/${videoIdMatch[1]}`;
                    loadPostsWithIframe(post.username, post.postContent, post.tags, videoEmbedUrl);  // Fixed here
                } else {
                    // For non-YouTube videos, check if the resource exists before embedding
                    if ((await checkResourceExists(post.videoId)) === true) {
                        console.log("sending user: " + post.username);
                        loadPostsWithIframe(post.username, post.postContent, post.tags, post.videoId);  // Fixed here
                    } else {
                        loadPostsWithoutIframe(post.username, post.postContent, post.tags);
                    }
                }
            } else {
                loadPostsWithoutIframe(post.username, post.postContent, post.tags);
            }
        });
    } else {
        console.log('No post data returned');
    }
    end = true;
}


uploadPosts();

const searchInput = document.getElementById("searchInput");

function performSearch() {
  const searchValue = searchInput.value.trim();
  if (searchValue) {
    console.log("Searching for:", searchValue);
  } else {
    console.log("Please enter a search term.");
  }
}

searchInput.addEventListener("keydown", function(event) {
    console.log(event.key);
  if (event.key === "Enter") {
    performSearch();
  }
});
