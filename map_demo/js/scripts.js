mapboxgl.accessToken = "pk.eyJ1Ijoic3dpdHR1dGgiLCJhIjoiY2t6aGZzcjZ1MDNucjJ1bnlpbGVjMHozNSJ9.wP4jf_xQ5-IDXtzRc2ECpA";

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-96, 37.8],
    zoom: 3
});

const geojson = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-77.032, 38.913]
            },
            properties: {
                title: 'Location',
                description: 'Washington, D.C.'
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-122.414, 37.776]
            },
            properties: {
                title: 'Location',
                description: 'San Francisco, California'
            }
        }
    ]
};

const housejson = {
    type: "HouseCollection",
    locations: [
        {
            geometry: {
                type: "Point",
                coordinates: [-73.994020, 40.738150]
            },
            properties: {
                type: "Name",
                description: "Current place staying"
            }
        },
        {
            geometry: {
                type: "Point",
                coordinates: [-73.997253, 40.721020]
            },
            properties: {
                type: "Name",
                description: "School dorm location"
            }
        }
    ]
}

for (const feature of geojson.features) {
    // create a HTML element for each feature
    let el = document.createElement("div");
    el.className = "marker";
     
    // make a marker for each feature and add it to the map
    new mapboxgl.Marker().setLngLat(feature.geometry.coordinates).setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`)).addTo(map);
}

for (const location of housejson.locations){
    let mark = document.createElement("div");
    mark.className = "marker";

    new mapboxgl.Marker().setLngLat(location.geometry.coordinates).setPopup(new mapboxgl.Popup({offset: 25}).setHTML(`<h3>${location.properties.type}</h3><p>${location.properties.description}</p>`)).addTo(map);
}