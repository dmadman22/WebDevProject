mapboxgl.accessToken = mapToken
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: campground.geometry.coordinates,
  zoom: 10
})

// Set marker options.
const marker = new mapboxgl.Marker({
    color: "#24d2d3",
    draggable: false
    }).setLngLat(campground.geometry.coordinates)
    .setPopup(new mapboxgl.Popup().setHTML(`<h4>${campground.title}</h4odem>`))
    .addTo(map);