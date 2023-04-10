import { CONNECTION_TYPE, HOSTSITE, ORM_PATH } from "../../config/db_config";

const usersAPIEndpoint = `${CONNECTION_TYPE}${HOSTSITE}${ORM_PATH}/users`

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