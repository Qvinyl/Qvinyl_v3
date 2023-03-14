const roomAPIEndpoint = "http://localhost:3000/api/v1/rooms"


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
    var getRoomDatabyKeyEndpoint = `${roomAPIEndpoint}/${roomkey}`

    var response = await fetch(getRoomDatabyKeyEndpoint, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    });

    var roomData = await response.json();
    return await roomData;
}