import { doc, setDoc, deleteDoc } from "firebase/firestore"; 
import { CONNECTION_TYPE, HOSTSITE, ORM_PATH } from "../../config/db_config";
const firestoreDB = require('../../config/constraints').db;

const roomAPIEndpoint = `${CONNECTION_TYPE}${HOSTSITE}${ORM_PATH}rooms`

const PLAYLIST_DOC = "Playlist";
const LASTPLAYED_DOC = "LastPlayed";

export async function createVirtualRoom(user_id, roomname) {
    var newRoom = {}
    await fetch(roomAPIEndpoint, {
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
    .then(roomContent => {
        addRoomToFireStore(roomContent.roomkey);
        newRoom = roomContent;
    })
    .catch((error) => {
        console.error(error)
        return false;
    });
    return newRoom;
}

async function addRoomToFireStore(roomkey) {
    try {
        await setDoc(doc(firestoreDB, PLAYLIST_DOC, roomkey), {
            queue: []
        });
        await setDoc(doc(firestoreDB, LASTPLAYED_DOC, roomkey), {
            history: []
        });
        return true;
    } 
    catch (e) {
        console.log("Error adding document: ", e);
        return false;
    }
}

export async function deleteVirtualRoom(roomkey) {
    var deleteRoomEndpoint = `${roomAPIEndpoint}/${roomkey}`
    fetch(deleteRoomEndpoint, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify ({
            roomkey: roomkey, 
        })
    })
    .then(response => {
        response.json()
        if (response.status === 200) {
            deleteFromFireStore(roomkey);
        } 
    })
    .catch((e) => {
        console.log(e);
    });
    return true;
}

export async function renameVirtualRoom(roomkey, roomName) {
    var updateRoomEndpoint = `${roomAPIEndpoint}/${roomkey}`
    var response = await fetch(updateRoomEndpoint, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify ({
            roomkey: roomkey, 
            room_name: roomName
        })
    })
    if (response.status !== 200) {
        return false;
    }    
    return await response.json();
}

async function deleteFromFireStore(roomkey) {
    try {
        await deleteDoc(doc(firestoreDB, PLAYLIST_DOC, roomkey));
        await deleteDoc(doc(firestoreDB, LASTPLAYED_DOC, roomkey));
    }
    catch (e) {
        console.log("Error adding document: ", e);
        return false;
    }
}

