// app script
const map = new google.maps.Map(document.getElementById("container"), {
	center: { lat: 59.9127, lng: 10.7461 },
	zoom: 15,
	mapTypeControlOptions: {
		mapTypeIds: [ "roadmap" ]
	}
});
const STATIONS = "https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json";
const TRIPS = "https://kristina-simakova.github.io/deckgl-demo/trips.json";

const deckOverlay = new deck.GoogleMapsOverlay({
	layers: [
		new deck.ScatterplotLayer({
			data: STATIONS,
			dataTransform: (d) => d.data.stations.filter((f) => f),
			getPosition: (f) => [ f.lon, f.lat ], //Method called to retrieve the position of each object.
			getRadius: (f) => 2,
			pickable: true,
			radiusMinPixels: 5, //minimum radius in pixels, adjust to ensure it shows when zooming out
			getColor: (f) => [ 51, 255, 60 ]
		}),
		new deck.ArcLayer({
			id: "arcs",
			data: TRIPS,
			getSourcePosition: (f) => [ f.start_station_longitude, f.start_station_latitude ],
			getTargetPosition: (f) => [ f.end_station_longitude, f.end_station_latitude ],
			getSourceColor: [ 0, 128, 200 ],
			getTargetColor: [ 200, 0, 80 ],
			getWidth: 2
		})
	]
});
deckOverlay.setMap(map);
