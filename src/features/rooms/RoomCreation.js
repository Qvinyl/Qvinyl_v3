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
        await setDoc(doc(firestoreDB, "Last25Played", roomkey), {
            history: []
        });
        return true;
    } 
    catch (e) {
        console.log("Error adding document: ", e);
        return false;
    }
}

export async function createVirtualRoom() {
    var roomkey = null;
     
    addRoomToFireStore()
    return "Hello World!"
}

