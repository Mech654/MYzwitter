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


async function checkResourceExists(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        // Check if the resource is available
        if (response.ok) {
            return true; // Resource exists
        } else {
            return false; // Resource does not exist or there's an error
        }
    } catch (error) {
        console.log('Error fetching resource:', error);
        return false; // Failed to fetch resource
    }
}



async function getPost() {
    let url = 'upload.php';
    let options = { method: 'GET' };
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



async function uploadPosts() {
    const post = await getPost();

    if (post) {
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
    } else {
        console.log('No post data returned');
    }
}



function generateNewPosts() {
    uploadPosts();
}


function checkIfNearBottom() {
    const threshold = 100; 
    const scrollPosition = window.scrollY + window.innerHeight; 
    const documentHeight = document.documentElement.scrollHeight; 
    if (documentHeight - scrollPosition <= threshold) {
        generateNewPosts(); 
    }
}


window.addEventListener('scroll', checkIfNearBottom);
    


document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('postForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const postContent = document.getElementById('postContent').value;
        const tags = document.getElementById('tags').value;
        const videoId = document.getElementById('youtubeLink').value;
        const username = localStorage.getItem('user');


        loadPostsWithIframe(username, postContent, tags, videoId);

        document.getElementById('postContent').value = '';
        document.getElementById('tags').value = '';
        document.getElementById('youtubeLink').value = '';

        DownloadPosts(postContent, tags, videoId);


    });
});



document.addEventListener('DOMContentLoaded', (event) => {
    checkIfNearBottom();
    checkIfNearBottom();
    checkIfNearBottom();
    checkIfNearBottom();

});




async function DownloadPosts(postContent, tags, videoId) {
    let username = localStorage.getItem('user');
    const formData = new FormData();
    formData.append('username', username);
    formData.append('postContent', postContent);
    formData.append('tags', tags);
    formData.append('videoId', videoId);

    try {
        const response = await fetch('../Server/download.php', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                alert('Download successful');
                return true;
            } else {
                alert(data.message || 'Download failed');
                return false;
            }
        } else {
            console.log('Error:', response.status);
        }
    } catch (error) {
        console.log('Error:', response.status);
    }

    return false;

}

