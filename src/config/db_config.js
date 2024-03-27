// const HOSTSITE =  "localhost";
const HOSTSITE = "vbox.api.qvinyl.app";
// const HOSTSITE = "localhost"
const CON_PATH = "/conference/";


module.exports = {
    FB_API_KEY: "AIzaSyANAj5aNEE7CQiaqio9sLknwwqyhEkkn8I",
    FB_AUTH_DOMAIN: "qvinyl-v3.firebaseapp.com",
    // FB_DATABASE_URL: "https://qvinyl-d19ec.firebaseio.com",
    FB_PROJECT_ID: "qvinyl-v3",
    FB_STORAGE_BUCKET: "qvinyl-v3.appspot.com",
    FB_MESSAGING_SENDER_ID: "1095197449779",
    FB_APP_ID: "1:1095197449779:web:7efbd809f751e285800d46",

    CONNECTION_TYPE: "http://",
    HOSTSITE: `${HOSTSITE}`,
    SYNC_PATH: "/syncing/",
    YTS_PATH: "/youtubeSearch/",
    MSG_PATH: "/messaging/",
    CON_PATH: CON_PATH,
    ORM_PATH: "/data-sync/",


    // SYNC_PATH: ":7777",
    // YTS_PATH: ":9000/search",
    // MSG_PATH: ":9993",
    // NOT_PATH: ":5240",
    // ORM_PATH: ":3000/api/v1/",

    PEER_CONFIG: {
        host: `${HOSTSITE}`,
        port: 8878,
        path: "/callMeAPI",
    }

    // PEER_CONFIG: {
    //     host: `${HOSTSITE}`,
    //     path: `${CON_PATH}`,
    //     secure: false
    // }
};

