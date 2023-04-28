import { doc, updateDoc, arrayUnion, onSnapshot} from 'firebase/firestore';
const firestoreDB = require('../../../config/constraints').db;

const PLAYLIST_DOC = "Playlist";
const LAST_PLAYED_DOC = "LastPlayed";

var subscription;

export async function addToPlaylist(roomkey, element) {
    const roomRef = doc(firestoreDB, PLAYLIST_DOC, roomkey);
    var updatedSuccessfully = false;
    await updateDoc(roomRef, {
        queue: arrayUnion({
            url: element.url,
            title: element.title,
            thumbnail: element.thumbnail,
            queuedBy: element.queuedBy
        })
    })
    .then(() => {
        updatedSuccessfully = true;
    })
    .catch((e) => {
        console.log("Error adding document: ", e);
        updatedSuccessfully = false;
    });
    return updatedSuccessfully;
}

export async function getRoomPlaylist(roomkey, setRoomPlaylist, dispatch) {
    onSnapshot(doc(firestoreDB, PLAYLIST_DOC, roomkey), (doc) => {
        if (doc.data() === undefined) { 
            return [];
        }
        dispatch(setRoomPlaylist(doc.data().queue));
    });
}

export async function getLastPlayed(roomkey, setLastPlaylist, dispatch) {
    onSnapshot(doc(firestoreDB, LAST_PLAYED_DOC, roomkey), (doc) => {
        if (doc.data() === undefined) { 
            return [];
        }
        dispatch(setLastPlaylist(doc.data().history.reverse()))
    });
}

export async function getCurrentQueuedElement(roomkey, setCurrentElement) {
    subscription = onSnapshot(doc(firestoreDB, PLAYLIST_DOC, roomkey), (doc) => {
        if (doc.data() === undefined) { 
            return;
        }
        if (doc.data().queue[0]) {
            setCurrentElement(doc.data().queue[0]);
        }
        else {
            setCurrentElement({});
        }
    });
}

export async function unsubscribe() {
    subscription();
}

