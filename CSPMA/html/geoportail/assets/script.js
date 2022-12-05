mapboxgl.accessToken = 'pk.eyJ1IjoidGFoYTEwIiwiYSI6ImNsYXZzZGkyYjA2YmUzcm56Mmhwcm1yMWYifQ.5FHBugxp3d7mZrlLU2LPIQ';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    projection: 'globe', // Display the map as a globe, since satellite-v9 defaults to Mercator
    zoom: 14.6, // starting zoom
    center: [ -6.889906, 33.962222] // // starting center in [lng, lat]
});

map.on('style.load', () => {
    map.setFog({}); // Set the default atmosphere style
});

map.on('load', () => {


    //////////////////////////////////////////
    map.addSource('terrains', {
        type: 'geojson',
        // Use a URL for the value for the `data` property.
        data: 'data/terrains.geojson'
    });
    map.addLayer({
        'id': 'Terrains',
        'type': 'fill',
        'source': 'terrains', // reference the data source
        'layout': {},
        'paint': {
        'fill-color': '#008020', // blue color fill
        'fill-opacity': 0.5
        }
        });
    /////////////////////////////////////////////
    map.addSource('building', {
        type: 'geojson',
        // Use a URL for the value for the `data` property.
        data: 'data/Building.geojson'
    });
    map.addLayer({
        'id': 'building-extrusion',
        'type': 'fill-extrusion',
        'source': 'building',
        'paint': {
        // Get the `fill-extrusion-color` from the source `color` property.
        'fill-extrusion-color': '#964B00',
         
        // Get `fill-extrusion-height` from the source `height` property.
        'fill-extrusion-height': ['get','height'],
         
        // Get `fill-extrusion-base` from the source `base_height` property.
        'fill-extrusion-base':0,
         
        // Make extrusions slightly opaque to see through indoor walls.
        'fill-extrusion-opacity': 1
        }
        });

            //////////////////////////////////////////
    map.addSource('railway', {
        type: 'geojson',
        // Use a URL for the value for the `data` property.
        data: 'data/railway.geojson'
    });
    map.addLayer({
        'id': 'railway',
        'type': 'line',
        'source': 'railway',
        'layout': {
        'line-join': 'round',
        'line-cap': 'round'
        },
        'paint': {
        'line-color': '#Ffff00',
        'line-width': 8
        }
        });

                //////////////////////////////////////////
    map.addSource('routes', {
        type: 'geojson',
        // Use a URL for the value for the `data` property.
        data: 'data/routes.geojson'
    });
    map.addLayer({
        'id': 'routes',
        'type': 'line',
        'source': 'routes',
        'layout': {
        'line-join': 'round',
        'line-cap': 'round'
        },
        'paint': {
        'line-color': '#Ffa500',
        'line-width': 3
        }
        });

            //////////////////////////////////////////
    map.addSource('parkings', {
        type: 'geojson',
        // Use a URL for the value for the `data` property.
        data: 'data/parkings.geojson'
    });
    map.addLayer({
        'id': 'parkings',
        'type': 'fill',
        'source': 'parkings', // reference the data source
        'layout': {},
        'paint': {
        'fill-color': '#000000', // blue color fill
        'fill-opacity': 0.5
        }
        });

                 //////////////////////////////////////////
    map.addSource('piscine', {
        type: 'geojson',
        // Use a URL for the value for the `data` property.
        data: 'data/piscine.geojson'
    });
    map.addLayer({
        'id': 'piscine',
        'type': 'fill',
        'source': 'piscine', // reference the data source
        'layout': {},
        'paint': {
        'fill-color': '#2bfafa', // blue color fill
        'fill-opacity': 0.5
        }
        });

//////////////////////////////////////////
        map.addSource('veg', {
            type: 'geojson',
            // Use a URL for the value for the `data` property.
            data: 'data/veg.geojson'
        });
        map.addLayer({
            'id': 'veg',
            'type': 'fill',
            'source': 'veg', // reference the data source
            'layout': {},
            'paint': {
            'fill-color': '#008020', // blue color fill
            'fill-opacity': 0.5
            }
            });
           
            //////////////////////////////////////////
        map.addSource('pst_cdt', {
            type: 'geojson',
            // Use a URL for the value for the `data` property.
            data: 'data/pst_cdt.geojson'
        });
        map.addLayer({
            'id': 'piste_auto_ecole',
            'type': 'fill',
            'source': 'pst_cdt', // reference the data source
            'layout': {},
            'paint': {
            'fill-color': '#FF0000', // blue color fill
            'fill-opacity': 0.5
            }
            });

                     //////////////////////////////////////////
    map.addSource('tribune', {
        type: 'geojson',
        // Use a URL for the value for the `data` property.
        data: 'data/tribune.geojson'
    });
    map.addLayer({
        'id': 'tribune',
        'type': 'line',
        'source': 'tribune',
        'layout': {
        'line-join': 'round',
        'line-cap': 'round'
        },
        'paint': {
        'line-color': '#FF0000',
        'line-width': 3
        }
        });
       
        
                     //////////////////////////////////////////
    map.addSource('pst_crse', {
        type: 'geojson',
        // Use a URL for the value for the `data` property.
        data: 'data/pst_crse.geojson'
    });
    map.addLayer({
        'id': 'piste_course',
        'type': 'line',
        'source': 'pst_crse',
        'layout': {
        'line-join': 'round',
        'line-cap': 'round'
        },
        'paint': {
        'line-color': '#Fd6c9e',
        'line-width': 3
        }
        });


        const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
            });


            map.on('click', 'building', (e) => {
                // Copy coordinates array.
                const coordinates = e.features.geometry.coordinates.slice();
                const img = e.features.properties.img;
                 
                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                 
                new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(img)
                .addTo(map);
                });
                 
                // Change the cursor to a pointer when the mouse is over the places layer.
                map.on('mouseenter', 'building', () => {
                map.getCanvas().style.cursor = 'pointer';
                });
                 
                // Change it back to a pointer when it leaves.
                map.on('mouseleave', 'building', () => {
                map.getCanvas().style.cursor = '';
                });


});

