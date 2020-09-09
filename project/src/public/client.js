let store = {
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
    photos: '',
    manifest: ''
}

// add our markup to the page
const root = document.getElementById('root');

const roverButtons = document.getElementById('roverButtons');

const showRover = document.getElementById('showRover');


const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
    renderRoverButtons(roverButtons)
    renderRoverImage(showRover, store)
};

const render = async (root, state) => {
    root.innerHTML = welcomeScreen(state)
};

const renderRoverButtons = (roverButtons) => {
    roverButtons.innerHTML = selectionScreen()
};

const renderRoverImage = async (showRover) => {
    showRover.innerHTML = roverScreen()
};


// create welcome screen content

const welcomeScreen = (state) => {
    let { apod } = state

    return `
        <div id="welcome">
            <header>
                <h1 class="welcomeTitle">Mars Rover Dashboard!</h1>
            </header>
            <main>
                <section>
                    <h3>NASA Image Of The Day!</h3>
                    <p>
                        One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact, this website is one of
                         the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video.
                         This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other
                        applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image
                         explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds;
                        but generally help with discoverability of relevant imagery.
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
                        <button class="roverbutton" id="curiosity" onclick="hideRoverScreen()">Curiosity</button>
                    </div>    
                </section>
            </main>
        
            <footer>
                <h4> Copyright Dawn Rose 2020 </h4>
            </footer>
         </div>      
    `
};

const roverScreen = () => {
    //let { photos } = state
    return `
    <div id="showRover>
        <main>
            <section class="roverContainer>
                <div class="roverPic">
                 <h1>Image displayed here</h1> 
              
                </div>    
            </section>
        </main>
    
    </div>      
`
};


// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
});

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
// const Greeting = (name) => {
//     if (name) {
//         return `
//             <h1>Welcome, ${name}!</h1>
//         `
//     }

//     return `
//         <h1>Hello!</h1>
//     `
// }

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
            <p>${apod.title}</p>
            <p>${apod.explanation}</p>
        `)
    } else {
        return (`
            <img src="${apod.image.url}" height="350px" width="100%" />
            <p>${apod.image.explanation}</p>
        `)
    }
}

// const RoverOfTheDay = (photos) => {

//     // If image does not already exist, or it is not from today -- request it again
//     const today = new Date()
//     const photodate = new Date(photo.date)
//     console.log(photodate.getDate(), today.getDate());

//     console.log(photodate.getDate() === today.getDate());
//     if (!photos || photos.date === today.getDate() ) {
//         getRoverImage(store)
//     }

// ------------------------------------------------------  API CALLS

// Image of the Day API call
const getImageOfTheDay = (state) => {
    let { apod } = state

    fetch(`http://localhost:8080/apod`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))

    //return data
};

// RoverData API call

// RoverImage API call

const getRoverImage = (state) => {
    let { photos } = state

    fetch(`http://localhost:8080/photos`)
        .then(res => res.json())
        .then(apod => updateStore(store, { photos }))

};

// Remove welcome screen when select rover button is clicked
function hideWelcome(){
    document.getElementById('welcome').style.display='none';
       //alert("choose rover button was clicked");
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

  // Hide Rover screen until required
function hideRoverScreen() {
    // get the selection Screen
    const showScreen = document.getElementById('showRover');

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
  


