let store = {
  user: { name: "Student" },
  apod: '',
  mars: '',
  rovers: ['Curiosity', 'Opportunity', 'Spirit'],
}


// add our markup to the page
const root = document.getElementById('root')


// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
//    render(root, store)
  renderRover(root, store)
})


const updateStore = (store, newState) => {
  store = Object.assign(store, newState)
  render(root, store)
}

const render = async (root, state) => {
  root.innerHTML = App(state)
}

// create content
const App = (state) => {
  let { rovers, apod } = state

  return `
      <header></header>
      <main>
          ${Greeting(store.user.name)}
          <section>
              <h3>Put things on the page!</h3>
              <p>Here is an example section.</p>
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
          <button onClick="tempButtonFunction()">Click me </button>
      </main>
      <footer></footer>
  `
}

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
  if (name) {
      return `
          <h1>Welcome, ${name}!</h1>
      `
  }

  return `
      <h1>Hello!</h1>
  `
}

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {

  // If image does not already exist, or it is not from today -- request it again
  const today = new Date()
  const photodate = new Date(apod.date)
  
  console.log("IOTD Dates: " + photodate.getDate(), today.getDate());

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
          <p>${apod.image.title}</p>
          <p>${apod.image.copyright}</p>
          <p>${apod.image.explanation}</p>
      `)
  }
}

// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = (state) => {
  let { apod } = state

  // Reference index.js express Route: /apod
  fetch(`http://localhost:8080/apod`)
      .then(res => res.json())
      .then(apod => updateStore(store, { apod }))

  return data
}



// TODO: Temporary Function - will be replaced
// ------------------------------------------------------  COMPONENTS
function tempButtonFunction(){
//  alert("Hello");
//  console.log(`Hello`);

// Copied from the addEventListener()
renderRover(root, store)
}

const updateStoreRover = (store, newState) => {
  store = Object.assign(store, newState)
  renderRover(root, store)
}

const renderRover = async (root, state) => {
  root.innerHTML = AppRover(state)
}

const AppRover = (state) => {
  let { rovers, apod, mars } = state

  return `
      <main>
          <section>
              <h3>Put things on the page!</h3>
              ${ImageOfTheDayRover(mars)}
          </section>
      </main>
  `
}

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDayRover = (mars) => {

  // If image does not already exist, or it is not from today -- request it again
//    const today = new Date()
//    const photodate = new Date(apod.date)
  
//    console.log("IOTD Dates: " + photodate.getDate(), today.getDate());

//    console.log("Date equality: " + photodate.getDate() === today.getDate());
//    if (!rovers || apod.date === today.getDate() ) {
  if (!mars) {
      getImageOfTheDayRover(store)
  }

  // check if the photo of the day is actually type video!
//    if (apod.media_type === "video") {
//        return (`
//            <p>See today's featured video <a href="${apod.url}">here</a></p>
//            <p>${apod.title}</p>
//            <p>${apod.explanation}</p>
//        `)
//    } else {
      return (`
          <p>Testing Mars Rover</p>
          <p>Mars ID: ${mars.response.photos[0].id}</p>
          <p>Mars launch date: ${mars.response.photos[0].rover.launch_date}</p>
          <p>Mars landing date: ${mars.response.photos[0].rover.landing_date}</p>
          <p>Mars status: ${mars.response.photos[0].rover.status}</p>
          <img src="${mars.response.photos[0].img_src}" height="350px" width="100%" />
          <p>Mars image date: ${mars.response.photos[0].earth_date}</p>
      `)
//    }
}

const getImageOfTheDayRover = (state) => {
  let { mars } = state

  fetch(`http://localhost:8080/rover`)
      .then(res => res.json())
      .then(mars => updateStoreRover(store, { mars }))
}
// ------------------------------------------------------  COMPONENTS