//elements
let sendBtn = document.getElementById("sendBtn");
let textbox = document.getElementById("textbox");
let chatContainer = document.getElementById("chatContainer");

let user = {message:""}
let httpRequest;
let arrayOfPossibleMessages = [
    {"message":"How are you?",
    "response":"I'm great"
},
{"message":"Hi!",
"response":"Hi!"
},
{"message":"Who are you?",
"response":"I'm your assistent"
}
];

chatbotSendMessage("Please choose an option: ");
setTimeout(function(){
    
    initializOptions()
},1000)


function chatbotSendMessage(messageText){
    let messageElement = document.createElement("div");
    messageElement.classList.add("w-50");
    messageElement.classList.add("float-left");
    messageElement.classList.add("shadow-sm");
    messageElement.style.margin = "10px";
    messageElement.style.padding = "5px";
    messageElement.innerHTML = `
    <span>Chatbot:</span>
    <span class="messageSpan">${messageText}</span>
  `;
  messageElement.animate([{easing:"ease-in",opacity:0.4},{opacity:1}],{duration:500});
    chatContainer.appendChild(messageElement)
}

function sendMessage(messageText) {
  let messageElement = document.createElement("div");
  messageElement.classList.add("w-50");
  messageElement.classList.add("float-right");
  messageElement.classList.add("shadow-sm");
  messageElement.style.margin = "10px";
  messageElement.style.padding = "5px";
  messageElement.innerHTML = `
  <span>Pooria:</span>
  <span class="messageSpan">${messageText}</span>
`;
messageElement.animate([{easing:"ease-in",opacity:0.4},{opacity:1}],{duration:500});

  chatContainer.appendChild(messageElement)
}
function initializOptions(){
    let options = [
        {number:1, chocie:"Wheather"},
        {number:2, chocie:"Sports"},
        {number:3, chocie:"News"},
    ];
    let messageElement = document.createElement("div");
    messageElement.classList.add("w-50");
    messageElement.classList.add("float-left");
    messageElement.classList.add("shadow-sm");
    messageElement.style.margin = "10px";
    messageElement.style.padding = "5px";
    
  options.forEach((elm,i) => {    
    messageElement.innerHTML += `
   <br>
    <span class="messageSpan">${elm.number} ${elm.chocie}</span>
  `;
  })
  messageElement.animate([{easing:"ease-in",opacity:0.4},{opacity:1}],{duration:500});
    chatContainer.appendChild(messageElement)
}
async function getweatherRequest(lat,long){   
                  
            const res = await fetch(
                `http://api.weatherapi.com/v1/search.json?key=817f022a7871469e978151319242404&q=${lat},${long}`
              )
            const data = await res.json()
            return data   
        
}
function  getLocationAndWeather(){
    navigator.geolocation.getCurrentPosition(async(pos) => {
        let lat = pos.coords.latitude;
        let long = pos.coords.longitude;        
        let data = await getweatherRequest(lat,long);
        console.log(data);
        let city = data[0].name
        let messagTosend = "<br>";
        messagTosend +=  `
        <br>
         <span class="messageSpan">${city} </span>
       `;
    },(err) =>{

    })
};
        
function assistentResponse(messageText){
    let userChoice = parseInt(messageText.trim())
    switch (userChoice) {
        case 1:
        // get the weather
        // get location and weather
        getLocationAndWeather();
            break;
        
        case 2:
        // get sports news
        alert(" you choice sports news")

            break;

        case 3:
        // get general news
        alert(" you choice eneral news")

            break;

    
        default:
            chatbotSendMessage("Please select the correct option! ")
            break;
    }
}

sendBtn.addEventListener("click", function (e) {
    if(textbox.value == ""){
        alert("Please write in a message")
    }else{

        let messageText = textbox.value;
        user.message = messageText;
        sendMessage(messageText);
        textbox.value = "";
        assistentResponse(messageText)
        // processMessage(user.message);
    }
});

function  processMessage(message){
  let result = arrayOfPossibleMessages.filter(val => val.message == message);
  if(result.length > 0){

      let response = result[0].response;
      setTimeout(function(){
        chatbotSendMessage(response)
      },1000)
  }else{
    setTimeout(function(){
        chatbotSendMessage("I don't undrestand")
      },1000)
  }
};
     
