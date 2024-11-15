<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zwitter</title>
    <link rel="stylesheet" href="styles.css">
    <script src="script.js" defer></script>
    <script src="Postgenerator.js"></script>
</head>


<body>
    <button id="burgerButton"><img src="Resources/Burger-button.webp" alt="Burger Button"></button>
    
    <div class="LeftPanel">
        <div id="logo" class="leftPanelItems">
            <img class="LeftPanelImages" src="Resources/zwitter.png" alt="Zwitter">
            <p>Zwitter</p>
        </div>
        <div id="home" class="leftPanelItems">
            <img class="LeftPanelImages" src="Resources/Menu-home.png" alt="Home">
            <p>Home</p>
        </div>
        <div id="search" class="leftPanelItems">
            <img class="LeftPanelImages" src="Resources/Menu-Search.png" alt="Search">
            <p>Search</p>
        </div>
        <div id="notification" class="leftPanelItems">
            <img class="LeftPanelImages" src="Resources/Menu-Notification.png" alt="Notification">
            <p>Notification</p>
        </div>
        <div id="mails" class="leftPanelItems">
            <img class="LeftPanelImages" src="Resources/Menu-Mails.png" alt="Mails">
            <p>Mails</p>
        </div>
        <div id="bookmarked" class="leftPanelItems">
            <img class="LeftPanelImages" src="Resources/Menu-Bookmarked.png" alt="Bookmarked">
            <p>Bookmarked</p>
        </div>
        <div id="jobs" class="leftPanelItems">
            <img class="LeftPanelImages" src="Resources/Menu-Jobs.png" alt="Jobs">
            <p>Jobs</p>
        </div>
        <div id="communities" class="leftPanelItems">
            <img class="LeftPanelImages" src="Resources/Menu-Communities.png" alt="Communities">
            <p>Communities</p>
        </div>
        <div id="Profile" class="leftPanelItems">
            <img class="LeftPanelImages" src="Resources/Profile_photo.png" alt="Profile">
            <p>Profile</p>
        </div>
    </div>
    <div class="MainPanel">
        <div class="MainPanelHeader">
            <div class="ForYou">
                <p>For You</p>
            </div>
            <div class="Following">
                <p>Following</p>
            </div>
        </div>

        <div style="height: 0rem;"></div>

     
        <form id="postForm">
            <textarea id="postContent" placeholder="What's happening?" required></textarea>
            <textarea id="tags" placeholder="Add tags here" required></textarea>
            <input type="text" id="youtubeLink" placeholder="Paste YouTube link here" required>
            <button type="submit">Post</button>
        </form>
        
        <div id="posts"></div>
    </div>
    <div class="search-container"> <span class="search-icon">🔍</span> <input type="text" class="search-input" placeholder="Search Zwitter"> </div>

    <div class="RightPanel">
        <div id="trending" class="rightPanelItems">
            <li id="trending_List">
                <p class="trending_p">Trending</p>
            </li>
        </div>
    </div>
</body>
</html>
