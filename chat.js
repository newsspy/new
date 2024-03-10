import { createSocket } from './socket.js'

const $ = (x) => document.querySelector(x)
const esc = (x) => {
  const txt = document.createTextNode(x)
  const p = document.createElement('p')
  p.appendChild(txt)
  return p.innerHTML
}

const ws = await createSocket()
const debounceTime = 1000
let base = Math.floor(Math.random() * 50 + 30)
const noise = Math.floor(Math.random() * 10 - 5)

if (!sessionStorage.getItem('peopleOnline')) {
  sessionStorage.setItem('peopleOnline', base)
} else {
  base = +sessionStorage.getItem('peopleOnline')
}




// var userName;


let timeout

const $peopleOnline = $('#peopleOnline p span')
const $skipBtn = $('#skip-btn')
const $sendBtn = $('#send-btn')
const $msgs = $('#messages')
const $msgArea = $('#message-area')
const $typing = $('#typing')
const $input = $('#message-input')
const $cashBtn = $('#cash-btn')

// const $cash=$("#cash");
// const $cashbutton=$('#cashbutton')

// const 
function configureChat() {
  $input.focus()



  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      $skipBtn.click()
      e.preventDefault()
    }
  })


  $input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      clearInterval(timeout)
      ws.emit('typing', false)
      $sendBtn.click()
      return e.preventDefault()
    }
    ws.emit('typing', true)
  })

  $input.addEventListener('keyup', function (e) {
    clearInterval(timeout)
    timeout = setTimeout(() => {
      ws.emit('typing', false)
    }, debounceTime)
  })
}


const initializeConnection = () => {
  $msgs.innerHTML = `
    <div class="message-status">Looking for people online...</div>

  `
  // search for peoples 

  $sendBtn.disabled = true
  $input.value = 'enter your value'
  $input.readOnly = true

// $$cashBtn.disabled= true
// $input.value = 'enter your value'
// $input.readOnly = true

  ws.emit('peopleOnline')
  const params = new URLSearchParams(window.location.search)
  const interests =
    params
      .get('interests')
      ?.split(',')
      .filter((x) => !!x)
      .map((x) => x.trim()) || []
  ws.emit('match', { data: 'text', interests })
}

$skipBtn.addEventListener('click', async () => {
  ws.emit('disconnect')
  initializeConnection()
})



  // Welcome message for the current user
  socket.emit('current', { message: 'Welcome new user' });

  // Message for all connected users except the current user
  socket.broadcast.emit('current', { message: db.collection('users').size() + ' users connected' });

  // Listen for new messages
  socket.on('message', function(data) {
    console.log('Message received:', data.message);

    // Save the message to the database
    db.collection('messages').add({
      username: data.username,
      message: data.message,
      timestamp: new Date()
    });

    // Broadcast the message to all connected users
    socket.broadcast.emit('message', data.message);
  });
$sendBtn.addEventListener('click', () => {
  const msg = $input.value.trim()
  if (!msg) return

  const msgE = document.createElement('div')
  msgE.className = 'message'
  msgE.innerHTML = `<span class="you">You:</span> ${esc(msg)}`

  $msgs.appendChild(msgE)
  $msgArea.scrollTop = $msgArea.scrollHeight
  $input.value = ''

  ws.emit('message', esc(msg))
})

ws.register('peopleOnline', async (data) => {
  $peopleOnline.innerHTML = base + noise + +data
})

ws.register('connected', async (data) => {
  const params = new URLSearchParams(window.location.search)
  const interests =
    params
      .get('interests')
      ?.split(',')
      .filter((x) => !!x)
      .map((x) => x.trim()) || []

    // here i want to add message field 

  
    let commonInterests = data.at(-1) || ''
    const first = data.slice(0, -1)
    if (first.length) {
      commonInterests = `${first.join(', ')} and ${commonInterests}`
    }
  
    $msgs.innerHTML = ''
    const status = document.createElement('div')
    status.className = 'message-status'
    status.innerHTML = 'You are now talking to a random stranger'
    $msgs.appendChild(status)
    // if (commonInterests) {
    //   const status = document.createElement('div')
    //   status.className = 'message-status'
    //   status.innerHTML = `You both like ${esc(commonInterests)}`
    //   $msgs.appendChild(status)
    // } else if (interests.length) {
    //   const status = document.createElement('div')
    //   status.className = 'message-status'
    //   status.innerHTML =
    //     "Couldn't find a person with similar interest, so we connect with random stranger. add more interests!"
  
    //     // here i want to message and add a similar ammount peroson 
  
    //   $msgs.appendChild(status)
    // }
    $msgArea.scrollTop = $msgArea.scrollHeight
    $sendBtn.disabled = false
    $input.readOnly = false
  })

  let commonInterests = data.at(-1) || ''
  const first = data.slice(0, -1)
  if (first.length) {
    commonInterests = `${first.join(', ')} and ${commonInterests}`
  }

  $msgs.innerHTML = ''
  const status = document.createElement('div')
  status.className = 'message-status'
  status.innerHTML = 'You are now talking to a random stranger'

  

  // $msgs.appendChild(status)
  // if (commonInterests) {
  //   const status = document.createElement('div')
  //   status.className = 'message-status'
  //   status.innerHTML = `You both like ${esc(commonInterests)}`
  //   $msgs.appendChild(status)
  // } else if (interests.length) {
  //   const status = document.createElement('div')
  //   status.className = 'message-status'
  //   status.innerHTML =
  //     "Couldn't find a person with similar interest, so we connect with random stranger. add more interests!"

  //     // here i want to message and add a similar ammount peroson 

  //   $msgs.appendChild(status)
  // }
  $msgArea.scrollTop = $msgArea.scrollHeight
  $sendBtn.disabled = false
  $input.readOnly = false
// })





// const paypalShare = document.createElement('a');
// paypalShare.href = 'https://www.paypal.me/Ayushajmera4';
// paypalShare.target = '_blank';
// paypalShare.onclick = function() { 
//     // Replace with your tracking function or remove if not needed
//     trackEvent('click', 'donate', 'PayPal Donation', null); 
// };
// paypalShare.innerHTML = '<img src="/assets/paypaldonate.png" alt="Donate with PayPal" width="175px">';

// // Append PayPal share link to $msgs
// $msgs.appendChild(paypalShare);












ws.register('message', async (msg) => {
  if (!msg) return

  const msgE = document.createElement('div')
  msgE.className = 'message'
  msgE.innerHTML = `<span class="strange">Stranger:</span> ${esc(msg)}`

  $msgs.appendChild(msgE)
  $msgArea.scrollTop = $msgArea.scrollHeight
})

ws.register('typing', async (isTyping) => {
  $typing.style.display = isTyping ? 'block' : 'none'
  $msgArea.scrollTop = $msgArea.scrollHeight
})

ws.register('disconnect', async () => {
  console.log('received disconnect request')
  initializeConnection()
})

configureChat()
initializeConnection()
