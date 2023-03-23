import { HOSTSITE, ORM_PORT } from "../../config/db_config";

const usersAPIEndpoint = `http://${HOSTSITE}:${ORM_PORT}/api/v1/users`

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