const fly_to_campus = document.getElementById("fly-to-campus");
fly_to_campus.addEventListener("click", fly_to_other_campus);

const zoom_in = document.getElementById("zoom-in");
zoom_in.addEventListener("click", zoom_in_campus);

const title_description = document.getElementById("title-description");
const building_description = document.getElementById("building-description");


let atTandon = false;
let zoom = false;

mapboxgl.accessToken = "pk.eyJ1Ijoic3dpdHR1dGgiLCJhIjoiY2t6aGZzcjZ1MDNucjJ1bnlpbGVjMHozNSJ9.wP4jf_xQ5-IDXtzRc2ECpA";

const wsp_boundary = [[-74.000646,40.729271], [-73.994106,40.732401]];
const tandon_boundary = [[-73.987995,40.692691], [-73.983082,40.695416]];

const tandon_coord = [-73.985538,40.694053];
const wsp_coord = [-73.997376,40.730836];
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v11',
    center: wsp_coord,
    bearing: 0,
    zoom: 17,
    //maxBounds: wsp_boundary
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
        },
        {
            geometry: {
                type: "Point",
                coordinates: [-73.985630, 40.694460]
            }, 
            info: {
                name: "Bern Dibner Library of Science and Technology",
                description: "Dibner Library maintains a variety of open and reservable study spaces, access to all Tandon required course materials, and assistance in using library resources."
            }
        },
        {
            geometry: {
                type: "Point",
                coordinates: [-73.986507, 40.694340]
            }, 
            info: {
                name: "Jacobs Academic Building",
                description: "The main academic building for Tandon School of Engineering students. With a plethora of classrooms, lecture halls, and research labs, Jacobs is also home to the Polytechnic Tutoring Center (PTC), which provides students with a great deal of academic support."
            }
        },
        {
            geometry: {
                type: "Point",
                coordinates: [-73.984873, 40.694314]
            }, 
            info: {
                name: "Wunsch Hall",
                description: "The Wunsch Building is a historic landmark located along MetroTech Commons as part of our Downtown Brooklyn Campus. The building currently is home to undergraduate and graduate admissions, as well as the Wasserman Center for Career Development."
            }
        }
        
        ]
}

for (const location of nyubuildingjson.locations){
    const el = document.createElement("div");
    el.className = "marker";

    new mapboxgl.Marker(el).setLngLat(location.geometry.coordinates).setPopup(new mapboxgl.Popup({offset: 25, anchor: "bottom"}).setHTML(`<h3>${location.info.name}</h3><p>${location.info.description}</p>`)).addTo(map);
}

function fly_to_other_campus() {

    if (!atTandon){
        map.flyTo({
            center: tandon_coord,
            bearing: 0,
            pitch: 0,
            zoom: 17,
            speed: 0.7,
            //maxBounds: tandon_boundary,
            essential: true,
        });
        fly_to_campus.innerHTML = "FLY TO MANHANTTAN CAMPUS";
    }
    else{
        map.flyTo({
            center: wsp_coord,
            bearing: 0,
            pitch: 0,
            zoom: 17,
            speed: 0.7,
            //maxBounds: wsp_boundary,
            essential: true
        });
        fly_to_campus.innerHTML = "FLY TO BROOKLYN CAMPUS";
    }

    zoom_in.innerHTML = "ZOOM IN";
    atTandon = !atTandon;
}

function zoom_in_campus() {

    if (!zoom){
        if (!atTandon){
            map.flyTo({
                bearing: 215,
                pitch: 50,
                zoom: 17.9,
                speed: 0.15
            });
        }
        else {
            map.flyTo({
                bearing: 3,
                pitch: 30,
                zoom: 18.2,
                speed: 0.15
            });
        }

        zoom_in.innerHTML = "ZOOM OUT";
    }
    else {
        
        
        map.flyTo({
            bearing: 0,
            pitch: 0,
            zoom: 17,
            speed: 0.15
        });

        zoom_in.innerHTML = "ZOOM IN";
    }

    zoom = !zoom;
}
