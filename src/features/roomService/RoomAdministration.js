import { doc, setDoc, deleteDoc } from "firebase/firestore"; 
const firestoreDB = require('../../config/constraints').db;

const roomAPIEndpoint = "http://localhost:3000/api/v1/rooms"

const CHATROOM_DOC = "ChatRoom";
const PLAYLIST_DOC = "Playlist";
const LASTPLAYED_DOC = "LastPlayed";

export async function createVirtualRoom(user_id, roomname, setNewlyCreatedRoom) {
    let newRoom = {}
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
        await setDoc(doc(firestoreDB, CHATROOM_DOC, roomkey), {
            messages: []
        });
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


async function deleteFromFireStore(roomkey) {
    try {
        await deleteDoc(doc(firestoreDB, CHATROOM_DOC, roomkey));
        await deleteDoc(doc(firestoreDB, PLAYLIST_DOC, roomkey));
        await deleteDoc(doc(firestoreDB, LASTPLAYED_DOC, roomkey));
    }
    catch (e) {
        console.log("Error adding document: ", e);
        return false;
    }
}

