import { doc, getDoc, updateDoc, arrayUnion, onSnapshot} from 'firebase/firestore';
const firestoreDB = require('../../../config/constraints').db;

const PLAYLIST_DOC = "Playlist";
const LAST_PLAYED_DOC = "LastPlayed";

var playlist = [];

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

export async function getRoomPlaylist(roomkey, setRoomPlaylist) {
    onSnapshot(doc(firestoreDB, PLAYLIST_DOC, roomkey), (doc) => {
        setRoomPlaylist(doc.data().queue)
        playlist = doc.data().queue;
    });
}

export async function getLastPlayed(roomkey, setLastPlaylist) {
    onSnapshot(doc(firestoreDB, LAST_PLAYED_DOC, roomkey), (doc) => {
        setLastPlaylist(doc.data().history)
    });
}

export function getCurrentQueuedElement(roomkey, setCurrentElement) {
    onSnapshot(doc(firestoreDB, PLAYLIST_DOC, roomkey), (doc) => {
        setCurrentElement(doc.data().queue[0])
    });
}

