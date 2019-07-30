const socket = io();

const messageBox = document.getElementById('message');
const chat = document.getElementById('chat');

const nickForm = document.getElementById('nickForm');
const nickName = document.getElementById('nickname');
const users = document.getElementById('usernames');
const nickError = document.getElementById('nickError');

const my_func = event =>{
    event.preventDefault();
    socket.emit('send message', messageBox.value, data =>{
        const element = document.createElement('p');
        element.className= 'error';
        element.appendChild(document.createTextNode(data));
        chat.appendChild(element);
    });
    messageBox.value = "";
};

const my_func2 = event =>{
    event.preventDefault();
    socket.emit('new user', nickName.value, data =>{
        if(data){
            document.getElementById('nickWrap').style.display = 'none';
            document.getElementById('contentWrap').style.display = 'initial';
        }else{
            nickError.innerHTML = '<div class="alert alert-danger"> That Username Already Exist </div>'; 
        }
        nickName.value = "";
    });
};

socket.on('new message', function(data){
    const node = document.createElement('b');
    const userText = document.createTextNode(data.nick+ ':');
    node.appendChild(userText);
    const salLin = document.createElement('br');
   
    
    chat.appendChild(node);
    chat.appendChild(document.createTextNode(' '+ data.msg));
    chat.appendChild(salLin);
  
  
  
});

socket.on('usernames', data =>{
    let html = '';
    for(let i = 0; i< data.length; i++){
        html += '<p>' + data[i] +'</p>';
    }
    users.innerHTML = html;
});

socket.on('whisper', data =>{
    const element = document.createElement('p');
    element.className= 'whisper';
    const negrita = document.createElement('b');
    negrita.appendChild(document.createTextNode(data.nick+ ':'));
    element.appendChild(negrita);
    element.append(document.createTextNode(' '+data.msg));
    chat.appendChild(element);
})

socket.on('load old msgs', data =>{
    for(let i = 0; i< data.length; i++){
        const node = document.createElement('b');
        node.className = 'whisper';
        const userText = document.createTextNode(data[i].nick+ ':');
        node.appendChild(userText);
        const salLin = document.createElement('br');
       
        
        chat.appendChild(node);
        chat.appendChild(document.createTextNode(' '+ data[i].msg));
        chat.appendChild(salLin);
    }
});

const messageForm = document.getElementById('message-form');

messageForm.addEventListener('submit', my_func, true);
nickForm.addEventListener('submit', my_func2, true);




