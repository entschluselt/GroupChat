const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
 

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}


const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right')
})
// receivingg the message
socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left')
})
// left chat 
socket.on('left', name =>{
    append(`${name} left the chat`, 'right')
})
// sending the message
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})
// dark and light mode

const light = document.getElementById('light');
const dark = document.getElementById('dark');
const body = document.querySelector('body');
const buttons = document.querySelectorAll('button');
dark.addEventListener('click', function(){
    body.style.background = "rgb(38,36,35)";
    buttons.style.background = "rgb(38, 34, 32)";
    buttons.style.color = "rgb(195, 173, 160)";
})
light.addEventListener('click', function(){
    body.style.background = "rgb(231, 190, 163)";
})