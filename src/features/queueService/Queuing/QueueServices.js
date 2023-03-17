import { doc, updateDoc, arrayUnion, onSnapshot} from 'firebase/firestore';
const firestoreDB = require('../../../config/constraints').db;

const PLAYLIST_DOC = "Playlist";
const LAST_PLAYED_DOC = "LastPlayed";

export async function addToPlaylist(roomkey, element) {
    console.log(element);
    console.log(roomkey);
    const roomRef = doc(firestoreDB, PLAYLIST_DOC, roomkey);
    
    await updateDoc(roomRef, {
        queue: arrayUnion({
            url: element.url,
            title: element.title,
            thumbnail: element.thumbnail,
            queuedBy: element.queuedBy
        })
    })
    .then(() => {
        return true;
    })
    .catch((e) => {
        console.log("Error adding document: ", e);
        return false;
    });
}

export async function getRoomPlaylist(roomkey, setRoomPlaylist) {
    onSnapshot(doc(firestoreDB, PLAYLIST_DOC, roomkey), (doc) => {
        if (doc.data() === undefined) { 
            return;
        }
        setRoomPlaylist(doc.data().queue)
    });
}

export async function getLastPlayed(roomkey, setLastPlaylist) {
    onSnapshot(doc(firestoreDB, LAST_PLAYED_DOC, roomkey), (doc) => {
        if (doc.data() === undefined) { 
            return;
        }
        setLastPlaylist(doc.data().history)
    });
}

export function getCurrentQueuedElement(roomkey, setCurrentElement) {
    onSnapshot(doc(firestoreDB, PLAYLIST_DOC, roomkey), (doc) => {
        if (doc.data() === undefined) { 
            return;
        }
        if (doc.data().queue[0]) {
            setCurrentElement(doc.data().queue[0])
        }
        else {
            setCurrentElement({})
        }
    });
}

