export async function searchYouTube(searchTerm) {
    var searchEndpoint = "http://localhost:9000/search";
    var results = [];

    await fetch(searchEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify ({
            searchString: searchTerm,
        }),
    })
    .then(response => response.json())
    .then(searchResults => {
        results = searchResults
    })
    .catch((error) => {
        console.error(error);
    });
    return results;
}