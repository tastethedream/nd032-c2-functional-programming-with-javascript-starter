

let store = {
    apod: '',
    rover: '',
    roverName: ['Curiosity', 'Opportunity', 'Spirit'],
    photos: [],
    data: null
};

// const map = Immutable.Map({
//     apod: '',
//     rover: '',
//     roverName: ['Curiosity', 'Opportunity', 'Spirit'],
//     photos: [],
//     data: null
// });

// add our markup to the page
const root = document.getElementById('root');

const roverButtons = document.getElementById('roverButtons');

const showRover = document.getElementById('showRover');


const render = async (root, state) => {
    root.innerHTML = welcomeScreen(state)
};

const renderRoverButtons = (roverButtons) => {
    roverButtons.innerHTML = selectionScreen()
};

const renderRoverImage = async (showRover, state) => {
    showRover.innerHTML = roverScreen(state)
};

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
    renderRoverButtons(roverButtons)
    renderRoverImage(showRover, store)
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
                        <button class="roverbutton" id="curiosity" onclick=" hideRoverScreen()">Curiosity</button>
                        <button class="roverbutton" id="opportunity" onclick="hideRoverScreen()">Opportunity</button>
                        <button class="roverbutton" id="spirit" onclick="hideRoverScreen()">Spirit</button>
                    </div>    
                </section>
            </main>
         </div>      
    `
};

// Create rover screen content

const roverScreen = (state) => {
   let { rover } = state
//     return `
//     <div id="showRover>
//         <main>
//             <section class="roverContainer>
//                 <div class="roverPic">
//                 <h1>Thank you for choosing Mars Rover:(insert rover name here)</h1> 
//                 <h2>Mission Manifest</h2> 
//                 <p> specific data from api displayed here</p>
//                  <h2>Images displayed here</h2> 
//                  ${RoverContent(rover)}       
//                 </div>    
//             </section>
//         </main>
   
//     </div>      
// `

return `
<div id="showRover>
    <main>
        <section class="roverContainer">
            <div class="roverPic">
            <h1>Thank you for choosing Mars Rover:add dynamic rover name here</h1> 
          
            <h2>Mission Manifest</h2> 
            <ul class="manifest">
                <li> Launch Date: insert api data here </li>
                <li> Landing Date: insert api data here </li>
                <li> Rover Status: insert api data here </li>           
            </ul>

            <h2>Rover Images</h2> 
            <h3>insert Images from api here </h> 
            ${RoverContent(rover)}
       
           
          
            </div>    
        </section>
    </main>

</div>      
`

};


// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store);
    //renderRoverImage(showRover, store);
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

    // if (apod.media_type === "video") {
    //     return (`
    //         <p>See today's featured video <a href="${apod.url}">here</a></p>
    //         <p>${apod.title}</p>
    //         <p>${apod.explanation}</p>
    //     `)
    // } else {
    //     return (`
    //         <P>Image of the day shown here</p>
    //         <p>Explanation shown here</p>
    //     `)
    // }
};

const RoverContent = (rover) => {

    //const landingDate = new Date(rover.landing_date)
    //const launchDate = rover.launch_date;
    getRoverContent(store)
    const roverName = rover.name;
    console.log(rover);
    console.log(roverName);

    //let roverImage = JSON.parse(JSON.stringify(rover));

      // If image does not already exist, or it is not from today -- request it again
    // const todays = new Date()
    // const photodates = new Date(rover.date)
    // console.log(photodates.getDate(), todays.getDate());

    // console.log(photodates.getDate() === todays.getDate());
    // if (!rover || rover.date === todays.getDate() ) {
    //     getRoverContent(store)
    //     console.log("rover content");
    

    // // if (apod.media_type === "video") {
    // //     return (`
    // //         <p>See today's featured video <a href="${apod.url}">here</a></p>
    // //         <p>${apod.title}</p>
    // //         <p>${apod.explanation}</p>
    // //     `)
    // } else {
    //     return (`
    //         <P>Rover manifest shown here</p>
    //         <p>Latest rover images shown here</p>
          
    //     `);
        
    // }
    return (`hello`)

};


    // check if the photo of the day is actually type video!
    // if (rover.media_type === "video") {
    //     return (`
    //         <p>See today's featured video <a href="${rover.url}">here</a></p>
    //         <p>${rover.title}</p>
    //         <p>${rover.explanation}</p>
    //     `)
    // } else {
        // return (`
        //     <img src="${rover.roverImage.url}" height="350px" width="100%" />
            
      
        // `)
    


// ------------------------------------------------------  API CALLS

// Image of the Day API call
const getImageOfTheDay = () => {
    //let { apod } = state

    fetch(`http://localhost:8080/apod`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))

};

// function getImageOfTheDay (url) {
//     //let { apod } = state
//     return fetch(url).then((response) => response.json());
// }
//     getImageOfTheDay("http://localhost:8080/apod").then((res) =>
//         console.log(res));
       



// RoverData API call

//roverImage API call

// const getRoverContent = (state) => {
// 	let { rover } = state
// 	console.log(state);
//     //fetch(`http://localhost:8080/rover/${state}`)
//     fetch(`http://localhost:8080/rover/curiosity`)
//         .then(res => res.json())
//         .then(rover => updateStore(store, { rover }))
// 		console.log(`client.js getRoverContent: ${rover.photos}`);
// 			// let a = data.data.photos
// 			// const newState = store.set("data", a)
// 			// updateStore(store, newState)
// 			// processData(newState)
const getRoverContent = () => {
    fetch(`http://localhost:8080/rover`)
        .then(res => res.json())
        .then(rover => updateStore(store, { rover }))

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



