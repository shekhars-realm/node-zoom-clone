const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const myVideo = document.createElement('video')

myVideo.muted = true

var peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: 3000   
});

let videoStream

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    videoStream = stream
    addVideoStream(myVideo, stream);
})

peer.on('open', id => {
    socket.emit("join-room", ROOM_ID, id);
})

socket.on('user-connected', (userId) => {
    connectToNewUser(userId, videoStream)
})

const connectToNewUser = (userId, videoStream) => {
    // const call = peer.call(userId, videoStream)
    console.log(userId)
}

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(video)
}