import { doc, getDoc, updateDoc, arrayUnion, onSnapshot} from 'firebase/firestore';
const firestoreDB = require('../../../config/constraints').db;

const PLAYLIST_DOC = "Playlist";
const LAST_PLAYED_DOC = "LastPlayed";

export async function addToPlaylist(roomkey, element) {
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

export async function getRoomPlaylist(roomkey) {
    const roomRef = doc(firestoreDB, PLAYLIST_DOC, roomkey);
    const docSnap = await getDoc(roomRef);
    if (docSnap.exists()) {
        return docSnap.data().queue;
    } 
    return [];
}

export async function getLastPlayed(roomkey) {
    const roomRef = doc(firestoreDB, LAST_PLAYED_DOC, roomkey);
    const docSnap = await getDoc(roomRef);
    if (docSnap.exists()) {
        return docSnap.data().history;
    } 
    return [];
}

