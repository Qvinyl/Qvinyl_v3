import { CONNECTION_TYPE, HOSTSITE, ORM_PATH } from "../../config/db_config";

const userAPIEndpoint = `${CONNECTION_TYPE}${HOSTSITE}${ORM_PATH}users`

export async function updateUserName(user_id, name) {
    var updateNameEndpoint = userAPIEndpoint + "/updateName/"
    var response = await fetch(updateNameEndpoint, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify ({
            user_id: user_id,
            name: name,
        })
    })
    return response.status === 200;
}