import { doc, setDoc } from "firebase/firestore"; 
const firestoreDB = require('../../config/constraints').db;

async function addRoomToFireStore(roomkey) {
    try {
        await setDoc(doc(firestoreDB, "ChatRoom", roomkey), {
            messages: []
        });
        await setDoc(doc(firestoreDB, "Playlist", roomkey), {
            queue: []
        });
        await setDoc(doc(firestoreDB, "LastPlayed", roomkey), {
            history: []
        });
        return true;
    } 
    catch (e) {
        console.log("Error adding document: ", e);
        return false;
    }
}

export async function createVirtualRoom(user_id, roomname) {
    var createRoomEndpoint = "http://localhost:3000/rooms"
    await fetch(createRoomEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify ({
            admin: user_id, 
            room_name: roomname,
        })
    })
    .then(response => response.json())
    .then(contents => {
        let roomObj = JSON.parse(contents);
        let roomkey = roomObj.roomkey
        addRoomToFireStore(roomkey)
    })
    .catch((error) => {
        console.error(error)
        return false;
    });
    return true;
}

