const map = Immutable.Map({
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
    tab: 'pod',
    roverData: null,
    roverPhotos: [],
  });
  
  const root = document.getElementById('root');
  
  const render = async (rootParam, state) => {
    rootParam.innerHTML = App(state);
  };
  
  // listening for load event because page should load before any JS is called
  window.addEventListener('load', () => {
    render(root, map);
  });
  
  // ------------------------------------------------------  UTIL FUNCTIONS BELOW
  function RoverImages(imgArray) {
    const output = imgArray.map(
      img => `<img src="${img}" height="350px" width="100%" />`
    );
    return output.join('');
  }
  
  const updateStore = (storeParam, newState) => {
    const newMap = storeParam.merge(newState);
    render(root, newMap);
  };
  
  // W3Schools tab reference:
  // https://www.w3schools.com/howto/howto_js_full_page_tabs.asp
  function setTab(tab) {
    const newMap = map.set('tab', tab);
    render(root, newMap);
  }
  // ------------------------------------------------------  UTIL FUNCTIONS ABOVE
  
  // ------------------------------------------------------  API CALLS BELOW
  const getImageOfTheDay = state => {
    const stateObj = state.toJS();
    const { apod } = stateObj;
  
    fetch(`http://localhost:3000/apod`)
      .then(res => res.json())
      .then(apod => {
        updateStore(state, { apod });
      });
  };
  
  const getRoverData = (rover, state) => {
    fetch(`http://localhost:3000/rover`)
      .then(response => response.json())
      .then(r => {
        const roversByName = {
          // curiosity: {}
        };
  
        r.rovers.forEach(roverPram => {
          roversByName[roverPram.name.toLowerCase()] = roverPram;
        });
  
        const { max_date: maxDate } = roversByName[rover];
        fetch(`http://localhost:3000/rover/${rover}/${maxDate}`)
          .then(response => response.json())
          .then(roverPhotos => {
            updateStore(state, {
              roverData: roversByName[rover],
              roverPhotos: roverPhotos.photos.map(photo => photo.img_src),
            });
          });
      });
  };