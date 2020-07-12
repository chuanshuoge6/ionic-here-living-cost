import React, { useState, useEffect } from 'react';
import PageForm from './PageForm'
import JSSoup from 'jssoup'
import axios from 'axios'
import data from './data'

export default function Here() {
    const [map, setMap] = useState(null)
    const [layer, setLayer] = useState(null)
    const [loadData, setLoadData] = useState(false)

    useEffect(async () => {
        //await getData()
        //console.log(data.Cost_of_Living)

        getMap()
        setTimeout(async () => {
            await setLoadData(true)
            document.getElementById('refreshButton').click()
        }, 1000);
        return () => map.dispose();
    }, []);

    const H = window.H;

    const platform = new H.service.Platform({
        apikey: "JNIn_O9OQdca51JT5ofoou0WOKdp69bNG-XxHaHqPLo"
    });

    const defaultLayers = platform.createDefaultLayers();

    const getMap = () => {
        // Create an instance of the map
        const map = new H.Map(
            document.getElementById('mapView'),
            layer ? layer : defaultLayers.raster.normal.map,
            {
                // This map is centered over Europe
                zoom: 2.5,
                center: { lat: 51.048615, lng: -114.070847 },
                pixelRatio: window.devicePixelRatio || 1
            }
        );

        // add a resize listener to make sure that the map occupies the whole container
        window.addEventListener('resize', () => map.getViewPort().resize());

        // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
        var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

        // create default UI with layers provided by the platform
        var ui = H.ui.UI.createDefault(map, defaultLayers);

        function addMarkerToGroup(group, coordinate, info) {
            const colors = ['#0000FF', '#0080FF', '#00FFFF', '#80FF00', '#FFFF00', '#FF8000', '#FF0000']
            const level = Math.ceil((parseFloat(info) - 18.85) / 19.33)
            //add a marker with number on left
            const svgMarkup = '<svg width="24" height="24" ' +
                'xmlns="http://www.w3.org/2000/svg">' +
                '<path style="fill:' + colors[level] +
                ';" d="M16.5 24.447v-0.996c3.352 0.099 5.993 1.174 5.993 2.487 0 1.379-2.906 2.56-6.492 2.56s-6.492-1.181-6.492-2.56c0-1.313 2.641-2.389 5.992-2.487v0.996c-2.799 0.069-4.993 0.71-4.993 1.491 0 0.827 2.459 1.623 5.493 1.623 3.033 0 5.492-0.796 5.492-1.623-0.001-0.781-2.194-1.421-4.993-1.491zM10.516 8.995c0-3.033 2.521-5.493 5.556-5.493 3.034 0 5.493 2.46 5.493 5.493 0 2.607-1.818 4.786-4.256 5.348l-1.309 13.219-1.313-13.256c-2.362-0.615-4.171-2.756-4.171-5.311zM16 7.524c0-0.828-0.671-1.498-1.498-1.498s-1.499 0.67-1.499 1.498c0 0.827 0.671 1.498 1.499 1.498s1.498-0.67 1.498-1.498z"></path>' +
                '<text x="6" y="18" font-size="12pt" font-family="Arial" font-weight="bold" ' +
                'text-anchor="middle" fill="black">${markerText}</text>' +
                '</svg>';

            const icon = new H.map.Icon(svgMarkup.replace('${markerText}', ''))
            const marker = new H.map.Marker(coordinate, { icon: icon })
            // add custom data to the marker
            marker.setData(info);
            group.addObject(marker);
        }


        /**
         * Add two markers showing the position of Liverpool and Manchester City football clubs.
         * Clicking on a marker opens an infobubble which holds HTML content related to the marker.
         * @param  {H.Map} map      A HERE Map instance within the application
         */
        function addInfoBubble(map) {
            var group = new H.map.Group();

            map.addObject(group);

            // add 'tap' event listener, that opens info bubble, to the group
            group.addEventListener('tap', function (evt) {
                // event target is the marker itself, group is a parent event target
                // for all objects that it contains
                var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
                    // read custom data
                    content: evt.target.getData()
                });
                // show info bubble
                ui.addBubble(bubble);
            }, false);

            const searchString = 'https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=JNIn_O9OQdca51JT5ofoou0WOKdp69bNG-XxHaHqPLo&searchtext='
            const geoLocate = async (address, info) => {

                await axios.get(searchString + address.replace(', ', '+').replace(' ', '+'))
                    .then(function (response) {
                        // handle success
                        const result = response.data.Response.View[0].Result[0].Location.DisplayPosition;
                        const coord = { lat: result.Latitude, lng: result.Longitude }

                        addMarkerToGroup(group, coord, info);
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
            }

            if (loadData) {
                data.Cost_of_Living.map((item, index) => {
                    geoLocate(item.City, item.Groceries_Index)
                })
            }
        }

        // Now use the map as required...
        addInfoBubble(map);

        setMap(map)
    }

    const layerChange = async (selected) => {
        switch (selected) {
            case '1':
                await setLayer(defaultLayers.raster.normal.map)
                break
            case '2':
                await setLayer(defaultLayers.raster.normal.transit)
                break
            case '3':
                await setLayer(defaultLayers.raster.normal.mapnight)
                break
            case '4':
                await setLayer(defaultLayers.raster.normal.trafficincidents)
                break
            case '5':
                await setLayer(defaultLayers.raster.normal.xbase)
                break
            case '6':
                await setLayer(defaultLayers.raster.satellite.map)
                break
            case '7':
                await setLayer(defaultLayers.raster.satellite.xbase)
                break
            case '8':
                await setLayer(defaultLayers.raster.terrain.map)
                break
            case '9':
                await setLayer(defaultLayers.raster.terrain.xbase)
                break
            default:
                break
        }

        document.getElementById('refreshButton').click()
    }

    return (
        // Set a height on the map so it will display
        <div id='mapView' style={{ height: '100%' }}>
            <button id='refreshButton' onClick={() => { map.dispose(); getMap() }}
                style={{
                    position: 'fixed', top: '10px', left: '10px', zIndex: 2,
                    border: '2px solid green'
                }}
            >refresh</button>

            <select style={{
                position: 'fixed', top: '10px', left: '80px',
                height: '18px', width: '90px', zIndex: 2, fontSize: '13px'
            }}
                onChange={e => layerChange(e.target.value)}
            >
                <option value="1">default layer</option>
                <option value="2">transit</option>
                <option value="3">night</option>
                <option value="4">accident</option>
                <option value="5">xbase</option>
                <option value="6">satellite</option>
                <option value="7">satellite xbase</option>
                <option value="8">terrain</option>
                <option value="9">terrain xbase</option>
            </select>

            <button style={{ position: 'fixed', top: '10px', right: '10px', zIndex: 2 }}
                onClick={() => {
                    const formStyle = document.getElementById('pageForm').style
                    if (formStyle.display === 'none') {
                        formStyle.position = 'fixed'
                        formStyle.top = '30px'
                        formStyle.right = '10px'
                        formStyle.zIndex = 2
                        formStyle.display = 'block'
                        formStyle.backgroundColor = 'white'
                    }
                    else {
                        formStyle.display = 'none'
                    }
                }}>
                <i class="fa fa-bars"></i></button>

            <PageForm />

            <button style={{
                position: 'fixed', top: '10px', left: '50%', zIndex: 2,
                transform: 'translateX(-50%)', backgroundColor: '#F8C471',
                height: '50px', width: '50px', borderRadius: '25px',
                fontSize: '20px',
            }}
                onClick={() => alert('Groceries Index')}
            >Tip</button>

            <div style={{ position: 'fixed', top: '40px', left: '10px', zIndex: 2, fontSize: '12px' }}>
                lowest
                <button style={{ width: '10px', height: '10px', backgroundColor: '#0000FF' }}></button>
                <button style={{ width: '10px', height: '10px', backgroundColor: '#0080FF' }}></button>
                <button style={{ width: '10px', height: '10px', backgroundColor: '#00FFFF' }}></button>
                <button style={{ width: '10px', height: '10px', backgroundColor: '#80FF00' }}></button>
                <button style={{ width: '10px', height: '10px', backgroundColor: '#FFFF00' }}></button>
                <button style={{ width: '10px', height: '10px', backgroundColor: '#FF8000' }}></button>
                <button style={{ width: '10px', height: '10px', backgroundColor: '#FF0000' }}></button>
                highest
            </div>
        </div>
    );

}