const sipulatedColorModal = "#40eb34";
const nonSipulatedColorModal = "#d3eb34";
const reportedColorModal = "#eb3434";
const selfReportedColorModal = "#848991";
const unclusteredRadiusModal = 12;

let selectedLocationModal;
let selectedBoardModal;
let adsDataModal; //Ads data from selected location

const sipulatedPopupModal = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false,
});
const nonSipulatedPopupModal = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false,
});
const reportedPopupModal = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false,
});

const serverPathModal = "http://localhost:5000";

const inspectClusterModal = (e, layer) => {
  const features = modalMap.queryRenderedFeatures(e.point, {
    layers: [`${layer}-cluster`],
  });
  const clusterId = features[0].properties.cluster_id;
  modalMap.getSource(layer).getClusterExpansionZoom(clusterId, (err, zoom) => {
    if (err) return;

    modalMap.easeTo({
      center: features[0].geometry.coordinates,
      zoom: zoom,
    });
  });
};

const mouseEnterEventUnclusteredModal = (e, layer) => {
  let popup;
  if (layer == "sipulated") {
    popup = sipulatedPopup;
  } else if (layer == "nonSipulated") {
    popup = nonSipulatedPopup;
  } else if (layer == "reported") {
    popup = reportedPopup;
  } else if (layer == "selfReported") {
    popup = selfReportedPopup;
  }

  modalMap.getCanvas().style.cursor = "pointer";
  const coordinates = e.features[0].geometry.coordinates.slice();
  const { id, address, adsType, area, locationType, status } =
    e.features[0].properties;

  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }

  const popupDesc = `<b>${adsType}</b><p>${locationType}</p><p>${address}</p><h5>${status}</h5>`;
  popup.setLngLat(coordinates).setHTML(popupDesc).addTo(modalMap);
};

const mouseLeaveEventUnclusteredModal = (layer) => {
  let popup;
  if (layer == "sipulated") {
    popup = sipulatedPopup;
  } else if (layer == "nonSipulated") {
    popup = nonSipulatedPopup;
  } else if (layer == "reported") {
    popup = reportedPopup;
  } else if (layer == "selfReported") {
    popup = selfReportedPopup;
  }

  modalMap.getCanvas().style.cursor = "";
  popup.remove();
};

mapboxgl.accessToken =
  "pk.eyJ1IjoiYm9vbnJlYWwiLCJhIjoiY2xvOWZ0eXQ2MDljNzJybXRvaW1oaXR3NyJ9.iu4mRTZ3mUFb7ggRtyPcWw";
const modalMap = new mapboxgl.Map({
  container: "mapbox_modal",

  style: "mapbox://styles/mapbox/streets-v12",
  center: [106.569958, 10.722345],
  zoom: 12,
});
// Map navigation control
modalMap.addControl(new mapboxgl.NavigationControl());
modalMap.addControl(new mapboxgl.FullscreenControl());

modalMap.on("load", async () => {
  //Fetched section
  const fetchedsipulatedData = await fetch(
    `${serverPath}/citizen/get-sipulated`
  );
  const fetchedNonSipulatedData = await fetch(
    `${serverPath}/citizen/get-nonsipulated`
  );
  const fetchedReportData = await fetch(`${serverPath}/citizen/get-report`);
  const sipulated = await fetchedsipulatedData.json();
  const nonSipulated = await fetchedNonSipulatedData.json();
  const reported = await fetchedReportData.json();

  // Sipulated source data
  modalMap.addSource("sipulated", {
    type: "geojson",
    data: JSON.parse(sipulated),
    cluster: true,
    clusterMaxZoom: 15,
    clusterRadius: 20,
  });
  //Sipulated cluster
  modalMap.addLayer({
    id: "sipulated-cluster",
    type: "circle",
    source: "sipulated",
    filter: ["has", "point_count"],
    paint: {
      "circle-color": sipulatedColor,
      "circle-radius": ["step", ["get", "point_count"], 30, 4, 60, 8, 90],
    },
    layout: { visibility: "visible" },
  });
  //Sipulated count
  modalMap.addLayer({
    id: "sipulated-count",
    type: "symbol",
    source: "sipulated",
    filter: ["has", "point_count"],
    layout: {
      "text-field": "{point_count_abbreviated}",
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      "text-size": 12,
      "text-allow-overlap": true,
      visibility: "visible",
    },
  });
  //Sipulated uncluster
  modalMap.addLayer({
    id: "sipulated-unclustered",
    type: "circle",
    source: "sipulated",
    filter: ["!", ["has", "point_count"]],
    layout: { visibility: "visible" },
    paint: {
      "circle-color": sipulatedColor,
      "circle-radius": unclusteredRadius,
      "circle-stroke-width": 1,
      "circle-stroke-color": "#fff",
    },
  });
  //Sipulated label
  modalMap.addLayer({
    id: "sipulated-label",
    type: "symbol",
    source: "sipulated",
    filter: ["!", ["has", "point_count"]],
    layout: {
      "text-field": "QC",
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      "text-size": 12,
      "text-allow-overlap": true,
      visibility: "visible",
    },
    paint: {
      "text-color": "#f2f7f4",
    },
  });
  //Inspect a cluster on click
  modalMap.on("click", "sipulated-cluster", (e) => {
    inspectClusterModal(e, "sipulated");
  });
  //Get info when user moves their mouse over the unclustered layer

  modalMap.on("mouseenter", "sipulated-unclustered", (e) => {
    mouseEnterEventUnclusteredModal(e, "sipulated");
  });
  modalMap.on("mouseleave", "sipulated-unclustered", (e) => {
    mouseLeaveEventUnclusteredModal("sipulated");
  });
  modalMap.on("mouseenter", "sipulated-cluster", () => {
    modalMap.getCanvas().style.cursor = "pointer";
  });
  modalMap.on("mouseleave", "sipulated-cluster", () => {
    modalMap.getCanvas().style.cursor = "";
  });

  //Non sipulated section
  modalMap.addSource("nonSipulated", {
    type: "geojson",
    data: JSON.parse(nonSipulated),
    cluster: true,
    clusterMaxZoom: 15,
    clusterRadius: 15,
  });
  //Non sipulated cluster
  modalMap.addLayer({
    id: "nonSipulated-cluster",
    type: "circle",
    source: "nonSipulated",
    filter: ["has", "point_count"],
    paint: {
      "circle-color": nonSipulatedColor,
      "circle-radius": ["step", ["get", "point_count"], 25, 4, 50, 8, 75],
    },
    layout: { visibility: "visible" },
  });
  //Non sipulated count
  modalMap.addLayer({
    id: "nonSipulated-count",
    type: "symbol",
    source: "nonSipulated",
    filter: ["has", "point_count"],
    layout: {
      "text-field": "{point_count_abbreviated}",
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      "text-size": 12,
      "text-allow-overlap": true,
      visibility: "visible",
    },
  });
  //Non sipulated uncluster
  modalMap.addLayer({
    id: "nonSipulated-unclustered",
    type: "circle",
    source: "nonSipulated",
    filter: ["!", ["has", "point_count"]],
    layout: { visibility: "visible" },
    paint: {
      "circle-color": nonSipulatedColor,
      "circle-radius": unclusteredRadius,
      "circle-stroke-width": 1,
      "circle-stroke-color": "#fff",
    },
  });
  //Non sipulated label
  modalMap.addLayer({
    id: "nonSipulated-label",
    type: "symbol",
    source: "nonSipulated",
    filter: ["!", ["has", "point_count"]],
    layout: {
      "text-field": "QC",
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      "text-size": 12,
      "text-allow-overlap": true,
      visibility: "visible",
    },
    paint: {
      "text-color": "#f2f7f4",
    },
  });
  //Inspect a cluster on click
  modalMap.on("click", "nonSipulated-cluster", (e) => {
    inspectClusterModal(e, "nonSipulated");
  });
  //Get info when user moves their mouse over the unclustered layer

  modalMap.on("mouseenter", "nonSipulated-unclustered", (e) => {
    mouseEnterEventUnclusteredModal(e, "nonSipulated");
  });
  modalMap.on("mouseleave", "nonSipulated-unclustered", () => {
    mouseLeaveEventUnclusteredModal("nonSipulated");
  });
  modalMap.on("mouseenter", "nonSipulated-cluster", () => {
    modalMap.getCanvas().style.cursor = "pointer";
  });
  modalMap.on("mouseleave", "nonSipulated-cluster", () => {
    modalMap.getCanvas().style.cursor = "";
  });
  //Reported section
  modalMap.addSource("reported", {
    type: "geojson",
    data: JSON.parse(reported),
    cluster: true,
    clusterMaxZoom: 15,
    clusterRadius: 15,
  });
  //Reported cluster
  modalMap.addLayer({
    id: "reported-cluster",
    type: "circle",
    source: "reported",
    filter: ["has", "point_count"],
    paint: {
      "circle-color": reportedColor,
      "circle-radius": ["step", ["get", "point_count"], 15, 4, 30, 8, 45],
    },
    layout: { visibility: "visible" },
  });
  //Reported count
  modalMap.addLayer({
    id: "reported-count",
    type: "symbol",
    source: "reported",
    filter: ["has", "point_count"],
    layout: {
      "text-field": "{point_count_abbreviated}",
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      "text-size": 12,
      "text-allow-overlap": true,
      visibility: "visible",
    },
  });
  //Reported uncluster
  modalMap.addLayer({
    id: "reported-unclustered",
    type: "circle",
    source: "reported",
    filter: ["!", ["has", "point_count"]],
    layout: { visibility: "visible" },
    paint: {
      "circle-color": reportedColor,
      "circle-radius": unclusteredRadius,
      "circle-stroke-width": 1,
      "circle-stroke-color": "#fff",
    },
  });
  //Reported label
  modalMap.addLayer({
    id: "reported-label",
    type: "symbol",
    source: "reported",
    filter: ["!", ["has", "point_count"]],
    layout: {
      "text-field": "QC",
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      "text-size": 12,
      "text-allow-overlap": true,
      visibility: "visible",
    },
    paint: {
      "text-color": "#f2f7f4",
    },
  });
  //Inspect a cluster on click
  modalMap.on("click", "reported-cluster", (e) => {
    inspectClusterModal(e, "reported");
  });

  modalMap.on("mouseenter", "reported-unclustered", (e) => {
    mouseEnterEventUnclusteredModal(e, "reported");
  });
  modalMap.on("mouseleave", "reported-unclustered", () => {
    mouseLeaveEventUnclusteredModal("reported");
  });

  modalMap.on("mouseenter", "reported-cluster", () => {
    modalMap.getCanvas().style.cursor = "pointer";
  });
  modalMap.on("mouseleave", "reported-cluster", () => {
    modalMap.getCanvas().style.cursor = "";
  });
});

function navigateToLocation(long, lat) {
  map.flyTo({
    center: [parseFloat(long), parseFloat(lat)],
    zoom: 15,
  });
}

const myModal = document.getElementById("createModal");
//Resize map in the modal
myModal.addEventListener("shown.bs.modal", (event) => {
  modalMap.resize(); // Importance
});

//Dragable marker
const dragMarker = new mapboxgl.Marker({
  draggable: true,
});

//Find button handle
const findBtn = document.querySelector("#find-location");
findBtn.addEventListener("click", async (e) => {
  const addr = document.querySelector("#addressCreateModal").value;
  const ward = document.querySelector("#wardSelectCreateModal").value;
  const district = document.querySelector("#districtSelectCreateModal").value;

  //Make a request
  const apiKey = "8c7c7c956fdd4a598e2301d88cb48135";
  const query = `${addr}, ${ward}, ${district}`;
  const apiUrl = "https://api.opencagedata.com/geocode/v1/json";
  const requestUrl = `${apiUrl}?key=${apiKey}&q=${encodeURIComponent(
    query
  )}&pretty=1&no_annotations=1`;

  //Handle response
  const respond = await fetch(requestUrl);
  try {
    if (!respond.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await respond.json();
    console.log(data);
    if (data.length == 0) {
      //Handle case when no result
    } else {
      const geometry = data.results[0].geometry;
      modalMap.flyTo({ center: geometry });
      //Set the marker to the map
      dragMarker.setLngLat(geometry).addTo(modalMap);
    }
  } catch (err) {
    console.log(err);
  }
});

//Get lngLat of the marker
function onDragEnd() {
  const lngLat = dragMarker.getLngLat();
  //Handle here
  alert(lngLat);
}

dragMarker.on("dragend", onDragEnd);
