
let store = {
    apod: '',
    marsRover: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
    user: 'Dawn'
};

// add our markup to the page
const root = document.getElementById('root');

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store);
});

const render = async (root, state) => {
    root.innerHTML = welcomeScreen(state)
};

const renderRoverButtons = () => {
    const roverButtons = document.getElementById('roverButtons');
    roverButtons.innerHTML = selectionScreen()
};

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
    renderRoverButtons(roverButtons)
};

const updateRoverStore = (store, newstate) => {
    store = Object.assign(store, newstate)
    renderRover(showRover, store)
};

const renderRover = async (showRover, state) => {
  showRover.innerHTML = roverScreen(state)
};

// create welcome screen content
const welcomeScreen = (state) => {
    let { apod } = state

    return `
        <div id="welcome">
            <header>
                <h1 class="welcomeTitle">Hello ${store.user},  welcome to the Mars Rover Dashboard!</h1>
            </header>
            <main>
                <section>
                    <h2>NASA Image Of The Day!</h2>
                    <p>
                        One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact, this website is one of the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video.
                    </p>
                    ${ImageOfTheDay(apod)}
                </section>
                <div class="buttonContainer">
                    <div class="centre">
                        <button id="goToRovers" onclick="hideWelcome(); hideSelectionScreen()">Click here to select your Mars Rover</button>
                    </div>    
                </div>
            </main>
        
         </div>      
    `
};

// Remove welcome screen when select rover button is clicked
function hideWelcome(){
    document.getElementById('welcome').style.display ='none';
};

// Hide selection screen until required
function hideSelectionScreen() {
    // get the selection Screen
    const showScreen = document.getElementById('selection');
    // get the current value of the screen display property
    const displaySetting = showScreen.style.display;

    if (displaySetting == 'block') {
      // if screen is visable hide it
      showScreen.style.display = 'none';
    } else {
      // if screen is hidden. show it
      showScreen.style.display = 'block';
    }
};

// create selection screen content
const selectionScreen = () => {
        return `
        <div id="selection" class="hidden">
            <header>
                <h1 class="welcomeTitle">Please Select Your Rover</h1>
            </header>
            <main>
                <section class="selectionContainer>
                    <div class="buttons">
                        <button class="roverbutton"id="curiosity"onclick="curiosityButton()">Curiosity</button>
                        <button class="roverbutton" id="opportunity" onclick="opportunityButton()">Opportunity</button>
                        <button class="roverbutton" id="spirit" onclick="spiritButton()">Spirit</button>
                    </div>    
                </section>
            </main>
         </div>      
    `
};

function curiosityButton() {
    hideRoverScreen()
    getCuriosityContent(store)
}

function opportunityButton() {
    hideRoverScreen()
    getOpportunityContent(store)
}

function spiritButton() {
    hideRoverScreen()
    getSpiritContent(store)
}

// Hide Rover screen until required
function hideRoverScreen() {
    // get the selection Screen
    const showScreen = document.getElementById('showRover');
    // get the current value of the screen display property
    const displaySetting = showScreen.style.display;
      showScreen.style.display = 'block';
 }


  const roverScreen = (state) => {

    let { rovers, apod, marsRover } = state

    const imageView = marsRover.result.photos.map((photo) => {
        return ` 
            <h2>You have selected: ${photo.rover.name}</h2>
            <h3>Mission Manifest</h3> 
            <ul class="manifest">
                <li> Launch Date: ${photo.rover.launch_date}</li>
                <li> Landing Date: ${photo.rover.landing_date}</li>
                <li> Rover Status:  ${photo.rover.status} </li>           
            </ul>

            <h3>Rover Images</h3> 

            <h4>These images were captured on:  ${photo.earth_date}</h4>
            
            <img src="${photo.img_src}" height="350px" width="100%" />
            `
    });
  
return imageView.join("");

  };

// ------------------------------------------------------  COMPONENTS
// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {

    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()
    const photodate = new Date(apod.date)
    console.log(photodate.getDate(), today.getDate());
    console.log(photodate.getDate() === today.getDate());
    if (!apod || apod.date === today.getDate() ) {
        getImageOfTheDay(store)
    }
    // check if the photo of the day is actually type video!
    if (apod.media_type === "video") {
        return (`
            <p>See today's featured video <a href="${apod.url}">here</a></p>
            <h3>${apod.title}</h3>
            <p>${apod.explanation}</p>
        `)
    } else {
        return (`
            <img src="${apod.image.url}" height="350px" width="100%" />
            <h3>${apod.image.title}</h3>
            <p>${apod.image.explanation}</p>
        `)
    }
};
  
// ------------------------------------------------------  API CALLS

// Image of the Day API call
const getImageOfTheDay = (state) => {
    let { apod } = state

    fetch(`http://localhost:8080/apod`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))
};

const getCuriosityContent = (state) => {
    let { marsRover } = state

    fetch(`http://localhost:8080/curiosity`)
        .then(res => res.json())
        .then(marsRover => updateRoverStore(store, { marsRover }))
};

const getOpportunityContent = (state) => {
    let { marsRover } = state

    fetch(`http://localhost:8080/opportunity`)
        .then(res => res.json())
        .then(marsRover => updateRoverStore(store, { marsRover }))
};

const getSpiritContent = (state) => {
    let { marsRover } = state

    fetch(`http://localhost:8080/spirit`)
        .then(res => res.json())
        .then(marsRover => updateRoverStore(store, { marsRover }))
};




