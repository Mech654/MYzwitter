<?php


$objCon = new mysqli($dbHost, $dbUser, $dbPass, $dbName);

$tag = $_POST['message'];

$sql = "SELECT * FROM Posts WHERE tags LIKE '%$tag%';";

$query_result = $objCon->query($sql);

$posts = [];

while ($row = $query_result->fetch_object()) {
    $posts[] = [
        'username' => $row->username,
        'postContent' => $row->postContent,
        'tags' => $row->tags,
        'videoId' => $row->videoId,
        'newPostId' => $row->postId
    ];
}

if (!empty($posts)) {
    echo json_encode(['success' => true, 'posts' => $posts]);
} else {
    echo json_encode(['success' => false, 'message' => 'No posts found.']);
}

$objCon->close();
?>
