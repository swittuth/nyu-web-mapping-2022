mapboxgl.accessToken = "pk.eyJ1Ijoic3dpdHR1dGgiLCJhIjoiY2t6aGZzcjZ1MDNucjJ1bnlpbGVjMHozNSJ9.wP4jf_xQ5-IDXtzRc2ECpA";

const boundary = [[-74.000646,40.729271],[-73.994106,40.732401]];

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v11',
    center: [-73.997376,40.730836],
    zoom: 16,
    maxBounds: boundary
});

map.on('load', () => {
    // Insert the layer beneath any symbol layer.
    const layers = map.getStyle().layers;
    const labelLayerId = layers.find(
    (layer) => layer.type === 'symbol' && layer.layout['text-field']
    ).id;
     
    // The 'building' layer in the Mapbox Streets
    // vector tileset contains building height data
    // from OpenStreetMap.
    map.addLayer(
        {
            'id': 'add-3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint': {
            'fill-extrusion-color': '#aaa',
     
            // Use an 'interpolate' expression to
            // add a smooth transition effect to
            // the buildings as the user zooms in.
            'fill-extrusion-height': ['interpolate',['linear'],['zoom'],15,0,15.05,['get', 'height']],
            'fill-extrusion-base': ['interpolate',['linear'],['zoom'],15,0,15.05,['get', 'min_height']],'fill-extrusion-opacity': 0.6
            }
        },
    labelLayerId
    );
});

const nyubuildingjson = {
    type: "NYU Building Location",
    locations: [
        {
            geometry: {
                type: "Point",
                coordinates: [-73.997017, 40.729660]
            },
            info: {
                name: "NYU Bobst Library",
                description: "Bobst Library has the most books in the world"
            }
        },
        {
            geometry: {
                type: "Point",
                coordinates: [-73.997711, 40.730000]
            },
            info: {
                name: "NYU Kimmel Center",
                description: "Center that provides space and resources for students, faculty, staff, departments, alumni and community organizations."
            }
        }
        ]
}

for (const location of nyubuildingjson.locations){
    let mark = document.createElement("div");
    mark.className = "marker";

    new mapboxgl.Marker().setLngLat(location.geometry.coordinates).setPopup(new mapboxgl.Popup({offset: 25}).setHTML(`<h3>${location.info.name}</h3><p>${location.info.description}</p>`)).addTo(map);
}