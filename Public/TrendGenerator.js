function selectParagraphsInTendingList() {
    const tendingList = document.getElementById('tending_list');
    if (tendingList) {
        const paragraphs = tendingList.getElementsByTagName('p');
        return Array.from(paragraphs);
    }
    return [];
}



let trending = ['#hey', '#hello', '#hi', '#howdy', '#hola', '#bonjour', '#ciao', '#hallo', '#salut', '#ola']; // Custom trends, will be fetched from the server later


function getMostTrending() {
    return trending;
}






function putTrendInList() {
    let x = 1;
    const tendingList = document.getElementById('trending_List');
    const trends = getMostTrending();
    trends.forEach(trend => {
        const p = document.createElement('p');
        p.textContent =  x + ". __  " + "" + trend;
        p.classList.add('trending_p'); 

        tendingList.appendChild(p);
        x++;
    });
}


document.addEventListener('DOMContentLoaded', function() {
    putTrendInList();
});