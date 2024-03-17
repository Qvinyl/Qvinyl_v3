import { CONNECTION_TYPE, HOSTSITE, ORM_PATH } from "../../config/db_config";
const roomAPIEndpoint = `${CONNECTION_TYPE}${HOSTSITE}${ORM_PATH}rooms`

export async function getAdminRooms(user_id, setRooms) {
    var getAdminRoomEndpoint = `${roomAPIEndpoint}/admin/${user_id}`
    fetch(getAdminRoomEndpoint, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(rooms => {
        setRooms(rooms);
        return true;
    })
    .catch((error) => {
        console.log(error);
    })
} 

export async function getRoomDataByKey(roomkey) {
    const getRoomDatabyKeyEndpoint = `${roomAPIEndpoint}/${roomkey}`;

    try {
        const response = await fetch(getRoomDatabyKeyEndpoint, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch room data. Status: ${response.status}`);
        }

        const roomData = await response.json();
        return roomData;
    } catch (error) {
        console.error('Error fetching room data:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
}

export async function fetchUserRooms(user_id) {
    var getUserRoomsEndpoint = `${roomAPIEndpoint}/getAllRooms/${user_id}`
    
    var response = await fetch(getUserRoomsEndpoint, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    });

    var rooms = await response.json();
    return await rooms;
}

export async function fetchUsersInRoom(roomkey) {
    var getRoomUsersEndpoint = `${roomAPIEndpoint}/getAllRoomUsers/${roomkey}`
    
    var response = await fetch(getRoomUsersEndpoint, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    });
    if (!response) {
        return []
    }
    var users = await response.json();
    return await users;
}