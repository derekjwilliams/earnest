function setLocations(value) {
  const locationNodes = value.data.allLocations.nodes

  locationNodes.forEach(node => {
      const div = document.createElement('div')
      div.innerHTML = `
          <div class="location">
              <div class="province-state">${node.provinceState}</div>
              <div class="country-region">${node.countryRegion}</div>
          </div>
      `
      document.querySelector('.locations').appendChild(div)
  })
}

const getLocationsCount = (count, after) => 
fetch("http://localhost:5000/graphql", {
  "headers": {
    "accept": "application/json",
    "accept-language": "en-US,en;q=0.9,fr;q=0.8",
    "content-type": "application/json",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin"
  },
  "referrer": "http://localhost:5000/graphiql",
  "referrerPolicy": "no-referrer-when-downgrade",
  "body": "{\"query\":\"{\\n  allLocations (first: " + count + ") {\\n    nodes {\\n      provinceState\\n      countryRegion\\n    }\\n  }\\n}\\n\",\"variables\":{\"projectReference\":{\"projectReference\":{\"projectId\":\"3\"}}}}",
  "method": "POST",
  "mode": "cors"
}).then(response => response.json()).then(json => setLocations(json))

const moreLocations = () => {
    const list = document.querySelectorAll('.lang-grid--trans');
    list.forEach(function (item) {
        if (item.classList.contains('hide')) {
            item.classList.remove('hide');
        } else {
            item.classList.add('hide');
        }
    })
}
getLocationsCount(20)
document.querySelector('.getmore').addEventListener('click', moreLocations);

if (typeof exports !== 'undefined') {
    module.exports = {
        getItem,
        setItems,
        triggerItem
    };
}