const usersAPIEndpoint = "http://localhost:3000/api/v1/users"

export async function getUsers() {
    var response = await fetch(usersAPIEndpoint, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    });

    var users = await response.json();
    return await users;
}