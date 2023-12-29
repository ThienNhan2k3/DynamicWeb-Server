//Variable definition
const sipulatedColor = "#40eb34";
const nonSipulatedColor = "#d3eb34";
const reportedColor = "#eb3434";
const selfReportedColor = "#848991";
const unclusteredRadius = 12;
const accountType = document.querySelector("#account-type").innerText;
const accountWard = document.querySelector("#account-ward").innerText;
const accountDistrict = document.querySelector("#account-district").innerText;
let selectedLocation;
let selectedBoard;
let adsData; //Ads data from selected location

//Full geojson
let sipulated;
let nonSipulated;
let reported;

//filtered geojson
let filterSipulated;
let filterNonSipulated;
let filterReported;

const sipulatedPopup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false,
});
const nonSipulatedPopup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false,
});
const reportedPopup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false,
});

const serverPath = "http://localhost:5000";

//Function definition
const inspectCluster = (e, layer) => {
  const features = map.queryRenderedFeatures(e.point, {
    layers: [`${layer}-cluster`],
  });
  const clusterId = features[0].properties.cluster_id;
  map.getSource(layer).getClusterExpansionZoom(clusterId, (err, zoom) => {
    if (err) return;

    map.easeTo({
      center: features[0].geometry.coordinates,
      zoom: zoom,
    });
  });
};

const mouseEnterEventUnclustered = (e, layer) => {
  let popup;
  if (layer == "sipulated") {
    popup = sipulatedPopup;
  } else if (layer == "nonSipulated") {
    popup = nonSipulatedPopup;
  } else if (layer == "reported") {
    popup = reportedPopup;
  }

  map.getCanvas().style.cursor = "pointer";
  const coordinates = e.features[0].geometry.coordinates.slice();
  const { id, address, adsType, area, locationType, status } =
    e.features[0].properties;

  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }

  const popupDesc = `<b>${adsType}</b><p>${locationType}</p><p>${address}</p><h5>${status}</h5>`;
  popup.setLngLat(coordinates).setHTML(popupDesc).addTo(map);
};

const mouseLeaveEventUnclustered = (layer) => {
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

  map.getCanvas().style.cursor = "";
  popup.remove();
};

const searchFunc = async (e) => {
  e.preventDefault();

  const apiKey = "8c7c7c956fdd4a598e2301d88cb48135";
  const query = locationInput.value;
  const apiUrl = "https://api.opencagedata.com/geocode/v1/json";
  const requestUrl = `${apiUrl}?key=${apiKey}&q=${encodeURIComponent(
    query
  )}&pretty=1&no_annotations=1`;

  const respond = await fetch(requestUrl);
  try {
    if (!respond.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await respond.json();
    console.log(data);
    const geometry = data.results[0].geometry;
    map.flyTo({ center: geometry });
  } catch (err) {
    console.log(err);
  }
};

const toggleEvent = (e, targetLayer) => {
  const layers = [
    `${targetLayer}-cluster`,
    `${targetLayer}-count`,
    `${targetLayer}-unclustered`,
    `${targetLayer}-label`,
  ];

  if (e.target.checked) {
    layers.forEach((layer) => {
      map.setLayoutProperty(layer, "visibility", "visible");
    });
  } else {
    layers.forEach((layer) => {
      map.setLayoutProperty(layer, "visibility", "none");
    });
  }
};

const getInfoOnclickUnclustered = async (e) => {
  selectedLocation = { ...e.features[0], lngLat: e.lngLat };
  const target = e.features[0];
  const fetchedData = await fetch(
    `${serverPath}/citizen/get-ads/${e.features[0].properties.id}`
  );
  const data = await fetchedData.json();
  adsData = JSON.parse(data);
  const HTMLaddBoardBtn = document.querySelector("#add-board-permit-btn");
  HTMLaddBoardBtn.dataset.id = selectedLocation.properties.id;
  HTMLaddBoardBtn.style.display = 'block';

  const HTMLdetails = document.querySelector("#board-details-toggle");
  const HTMLid = document.querySelector("#board-id");
  const HTMLnumber = document.querySelector("#num-ads");
  const HTMLtitle = document.querySelector("#board-title");
  const HTMLaddr = document.querySelector("#board-address");
  const HTMLsize = document.querySelector("#board-size");
  const HTMLqty = document.querySelector("#board-quantity");
  const HTMLform = document.querySelector("#board-form");
  const HTMLclassification = document.querySelector("#board-classification");
  const HTMLthumbnail = document.querySelector("#board-thumbnail");
  const HTMLpagination = document.querySelector("#board-pagination");
  const HTMLboardContract = document.querySelector("#board-contract");
  const HTMLaddPermitRequestBtn = document.querySelector("#createPermissionButton-half");

  if (adsData.length == 0) {
    HTMLdetails.style.display = 'none';
    HTMLid.innerHTML = "Chưa có thông tin";
    HTMLnumber.innerHTML = `<p>Địa điểm này có 0 quảng cáo</p>`;
    HTMLtitle.innerHTML = `Chưa có thông tin <span class="ms-2 badge bg-secondary" id="board-status">Chưa có thông tin</span></a>`;
    HTMLaddr.innerHTML = target.properties.address;
    HTMLsize.innerHTML = "Chưa có thông tin";
    HTMLqty.innerHTML = "Chưa có thông tin";
    HTMLform.innerHTML = target.properties.adsType;
    HTMLclassification.innerHTML = target.properties.locationType;
    HTMLthumbnail.src = "";
    HTMLboardContract.setAttribute("data-bs-content", ``);
    const popover = new bootstrap.Popover(HTMLboardContract);
    popover.update();
  } else {
    HTMLdetails.style.display = 'block';
    console.log('Status', adsData[0].status);
    HTMLaddPermitRequestBtn.style.display = (adsData[0].status != "") ? 'none' : 'block';
    HTMLid.innerHTML = adsData[0].id;

    HTMLaddPermitRequestBtn.dataset.id = adsData[0].id;

    HTMLnumber.innerHTML = `<p>Địa điểm này có ${adsData.length} quảng cáo`;
    HTMLtitle.innerHTML = `${
      adsData[0].BoardType.type
    }<span class="ms-2 badge ${
      adsData[0].status == "Đã cấp phép"
        ? "bg-success"
        : adsData[0].status == "Chưa cấp phép"
        ? "bg-warning"
        : adsData[0].status == "Bị báo cáo"
        ? "bg-danger"
        : "bg-dark"
    }" id="board-status">${
      adsData[0].status != "" ? adsData[0].status : "Chưa có quảng cáo"
    }</span></a>`;
    HTMLaddr.innerHTML = adsData[0].AdsPlacement.address;
    HTMLsize.innerHTML = adsData[0].size;
    HTMLqty.innerHTML = adsData[0].quantity;
    HTMLform.innerHTML = adsData[0].AdsPlacement.AdsType.type;
    HTMLclassification.innerHTML =
      adsData[0].AdsPlacement.LocationType.locationType;
    HTMLthumbnail.src = adsData[0].image;
    HTMLboardContract.setAttribute(
      "data-bs-content",
      `Ngày hết hạn: ${
        adsData[0].end != undefined
          ? adsData[0].end.split("T")[0]
          : "Chưa có thông tin"
      }`
    );
    const popover = new bootstrap.Popover(HTMLboardContract);
    popover.update();
  }

  //Update pagination
  let paginationData = "";
  paginationData += `<li class="page-item disabled">
    <a class="page-link" href="#" aria-label="Previous">
      <span aria-hidden="true">&laquo;</span></a></li>`;
  for (let i = 0; i < adsData.length; i++) {
    if (i == 3) {
      break;
    }
    if (i == 0) {
      paginationData += `<li class="page-item active" aria-current="page"><a class="page-link" href="#">${
        i + 1
      }</a></li>`;
    } else {
      paginationData += `<li class="page-item" aria-current="page"><a class="page-link" href="#">${
        i + 1
      }</a></li>`;
    }
  }
  if (adsData.length <= 1) {
    paginationData += `<li class="page-item disabled">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span></a></li>`;
  } else {
    paginationData += `<a class="page-link" href="#" aria-label="Next">
      <span aria-hidden="true">&raquo;</span></a>`;
  }
  HTMLpagination.innerHTML = paginationData;
  //Pagination feature
  const pagePrev = document.querySelector('.page-link[aria-label="Previous"]');
  const pageNext = document.querySelector('.page-link[aria-label="Next"]');
  const pageItems = document.querySelectorAll(
    '.page-item[aria-current="page"]'
  );
  pageItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      //Deactive previous
      const activeItem = document.querySelector(".page-item.active");
      activeItem.classList.remove("active");

      const page = e.target.innerText;
      HTMLid.innerHTML = adsData[page - 1].id;
      HTMLaddPermitRequestBtn.dataset.id = adsData[page - 1].id;
      HTMLaddPermitRequestBtn.style.display = (adsData[page - 1].status != "") ? 'none' : 'block';

      HTMLtitle.innerHTML = `${
        adsData[page - 1].BoardType.type
      }<span class="ms-2 badge ${
        adsData[page - 1].status == "Đã cấp phép"
          ? "bg-success"
          : adsData[page - 1].status == "Chưa cấp phép"
          ? "bg-warning"
          : adsData[page - 1].status == "Bị báo cáo"
          ? "bg-danger"
          : "bg-dark"
      }" id="board-status">${
        adsData[page - 1].status != ""
          ? adsData[page - 1].status
          : "Chưa có quảng cáo"
      }</span></a>`;
      HTMLaddr.innerHTML = adsData[page - 1].AdsPlacement.address;
      HTMLsize.innerHTML = adsData[page - 1].size;
      HTMLqty.innerHTML = adsData[page - 1].quantity;
      HTMLform.innerHTML = adsData[page - 1].AdsPlacement.AdsType.type;
      HTMLclassification.innerHTML =
        adsData[page - 1].AdsPlacement.LocationType.locationType;
      HTMLthumbnail.src = adsData[page - 1].image;
      HTMLboardContract.setAttribute(
        "data-bs-content",
        `Ngày hết hạn: ${
          adsData[page - 1].end != ""
            ? adsData[page - 1].end.split("T")[0]
            : "Chưa có thông tin"
        }`
      );
      const popover = new bootstrap.Popover(HTMLboardContract);
      popover.update();
      //Set active
      e.target.parentNode.classList.add("active");
      //Set enable/disable for prev/next button
      pagePrev.parentNode.classList.remove("disabled");
      pageNext.parentNode.classList.remove("disabled");
      if (page == 1) {
        pagePrev.parentNode.classList.add("disabled");
      } else if (page == adsData.length) {
        pageNext.parentNode.classList.add("disabled");
      }
    });
  });
  pagePrev.addEventListener("click", (e) => {
    if (pagePrev.parentNode.classList.contains("disabled")) {
      return;
    }
    const activeItem = document.querySelector(".page-item.active");
    activeItem.classList.remove("active");

    const page = parseInt(activeItem.firstChild.innerText) - 1;

    HTMLid.innerHTML = adsData[page - 1].id;
    HTMLtitle.innerHTML = `${
      adsData[page - 1].BoardType.type
    }<span class="ms-2 badge ${
      adsData[page - 1].status == "Đã cấp phép"
        ? "bg-success"
        : adsData[page - 1].status == "Chưa cấp phép"
        ? "bg-warning"
        : adsData[page - 1].status == "Bị báo cáo"
        ? "bg-danger"
        : "bg-dark"
    }" id="board-status">${
      adsData[page - 1].status != ""
        ? adsData[page - 1].status
        : "Chưa có quảng cáo"
    }</span></a>`;
    HTMLaddr.innerHTML = adsData[page - 1].AdsPlacement.address;
    HTMLsize.innerHTML = adsData[page - 1].size;
    HTMLqty.innerHTML = adsData[page - 1].quantity;
    HTMLform.innerHTML = adsData[page - 1].AdsPlacement.AdsType.type;
    HTMLclassification.innerHTML =
      adsData[page - 1].AdsPlacement.LocationType.locationType;
    HTMLthumbnail.src = adsData[page - 1].image;
    HTMLboardContract.setAttribute(
      "data-bs-content",
      `Ngày hết hạn: ${
        adsData[page - 1].end != ""
          ? adsData[page - 1].end.split("T")[0]
          : "Chưa có thông tin"
      }`
    );
    const popover = new bootstrap.Popover(HTMLboardContract);
    popover.update();
    //Set active
    activeItem.previousSibling.classList.add("active");
    //Deactive prev button if reach the first page
    pageNext.parentNode.classList.remove("disabled");
    pagePrev.parentNode.classList.remove("disabled");
    if (page == 1) {
      pagePrev.parentNode.classList.add("disabled");
    }
  });
  pageNext.addEventListener("click", (e) => {
    if (pageNext.parentNode.classList.contains("disabled")) {
      return;
    }
    const activeItem = document.querySelector(".page-item.active");
    activeItem.classList.remove("active");

    const page = parseInt(activeItem.firstChild.innerText) + 1;
    HTMLid.innerHTML = adsData[page - 1].id;

    HTMLtitle.innerHTML = `${
      adsData[page - 1].BoardType.type
    }<span class="ms-2 badge ${
      adsData[page - 1].status == "Đã cấp phép"
        ? "bg-success"
        : adsData[page - 1].status == "Chưa cấp phép"
        ? "bg-warning"
        : adsData[page - 1].status == "Bị báo cáo"
        ? "bg-danger"
        : "bg-dark"
    }" id="board-status">${
      adsData[page - 1].status != ""
        ? adsData[page - 1].status
        : "Chưa có quảng cáo"
    }</span></a>`;
    HTMLaddr.innerHTML = adsData[page - 1].AdsPlacement.address;
    HTMLsize.innerHTML = adsData[page - 1].size;
    HTMLqty.innerHTML = adsData[page - 1].quantity;
    HTMLform.innerHTML = adsData[page - 1].AdsPlacement.AdsType.type;
    HTMLclassification.innerHTML =
      adsData[page - 1].AdsPlacement.LocationType.locationType;
    HTMLthumbnail.src = adsData[page - 1].image;
    HTMLboardContract.setAttribute(
      "data-bs-content",
      `Ngày hết hạn: ${
        adsData[page - 1].end != ""
          ? adsData[page - 1].end.split("T")[0]
          : "Chưa có thông tin"
      }`
    );
    const popover = new bootstrap.Popover(HTMLboardContract);
    popover.update();
    //Set active
    activeItem.nextSibling.classList.add("active");
    //Deactive next button if reach the last page
    pageNext.parentNode.classList.remove("disabled");

    pagePrev.parentNode.classList.remove("disabled");

    if (page == adsData.length) {
      pageNext.parentNode.classList.add("disabled");
    }
  });
};

const initLngLat=async()=>{
  const apiKey = "8c7c7c956fdd4a598e2301d88cb48135";
  const query = `${accountDistrict} ${accountWard} Hồ Chí Minh`;
  const apiUrl = "https://api.opencagedata.com/geocode/v1/json";
  const requestUrl = `${apiUrl}?key=${apiKey}&q=${encodeURIComponent(
    query
  )}&pretty=1&no_annotations=1`;

  const respond = await fetch(requestUrl);
  try {
    if (!respond.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await respond.json();
    console.log(data);
    const geometry = data.results[0].geometry;
    map.flyTo({ center: geometry });
  } catch (err) {
    console.log(err);
  }
}
//Map generation
mapboxgl.accessToken =
  "pk.eyJ1IjoiYm9vbnJlYWwiLCJhIjoiY2xvOWZ0eXQ2MDljNzJybXRvaW1oaXR3NyJ9.iu4mRTZ3mUFb7ggRtyPcWw";
const map = new mapboxgl.Map({
  container: "mapbox",

  style: "mapbox://styles/mapbox/streets-v12",
  center: [106.569958, 10.722345],
  zoom: 17,
});

// Map navigation control
map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.FullscreenControl());

map.on("load", async () => {
  //Set default lnglat
  await initLngLat()
  //Fetched section
  const fetchedsipulatedData = await fetch(
    `${serverPath}/citizen/get-sipulated`
  );
  const fetchedNonSipulatedData = await fetch(
    `${serverPath}/citizen/get-nonsipulated`
  );
  const fetchedReportData = await fetch(`${serverPath}/citizen/get-report`);
  sipulated = await fetchedsipulatedData.json();
  nonSipulated = await fetchedNonSipulatedData.json();
  reported = await fetchedReportData.json();

  sipulated = JSON.parse(sipulated);
  nonSipulated = JSON.parse(nonSipulated);
  reported = JSON.parse(reported);

  filterSipulated = Object.assign({}, sipulated);
  filterNonSipulated = Object.assign({}, nonSipulated);
  filterReported = Object.assign({}, reported);
  console.log(reported);

  // Sort for placement that belongs to specified area
  if (accountType == "Quan") {
    filterSipulated.features = sipulated.features
      .filter((p) => {
        return p.properties.area.district == accountDistrict;
      })
      .slice();

    filterNonSipulated.features = nonSipulated.features
      .filter((p) => {
        return p.properties.area.district == accountDistrict;
      })
      .slice();

    filterReported.features = reported.features
      .filter((p) => {
        return p.properties.area.district == accountDistrict;
      })
      .slice();
    console.log(reported);
  } else if (accountType == "Phuong") {
    filterSipulated.features = sipulated.features.filter((p) => {
      return (
        p.properties.area.district == accountDistrict &&
        p.properties.area.ward == accountWard
      );
    });

    filterNonSipulated.features = nonSipulated.features.filter((p) => {
      return (
        p.properties.area.district == accountDistrict &&
        p.properties.area.ward == accountWard
      );
    });

    filterReported.features = reported.features.filter((p) => {
      return (
        p.properties.area.district == accountDistrict &&
        p.properties.area.ward == accountWard
      );
    });
  }

  // Sipulated source data
  map.addSource("sipulated", {
    type: "geojson",
    data: filterSipulated,
    cluster: true,
    clusterMaxZoom: 15,
    clusterRadius: 20,
  });
  //Sipulated cluster
  map.addLayer({
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
  map.addLayer({
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
  map.addLayer({
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
  map.addLayer({
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
  map.on("click", "sipulated-cluster", (e) => {
    inspectCluster(e, "sipulated");
  });
  //Get info when user moves their mouse over the unclustered layer

  map.on("mouseenter", "sipulated-unclustered", (e) => {
    mouseEnterEventUnclustered(e, "sipulated");
  });
  map.on("mouseleave", "sipulated-unclustered", (e) => {
    mouseLeaveEventUnclustered("sipulated");
  });
  //Get unclustered info on click
  map.on("click", "sipulated-unclustered", async (e) => {
    await getInfoOnclickUnclustered(e);
  });
  map.on("mouseenter", "sipulated-cluster", () => {
    map.getCanvas().style.cursor = "pointer";
  });
  map.on("mouseleave", "sipulated-cluster", () => {
    map.getCanvas().style.cursor = "";
  });

  //Non sipulated section
  map.addSource("nonSipulated", {
    type: "geojson",
    data: filterNonSipulated,
    cluster: true,
    clusterMaxZoom: 15,
    clusterRadius: 15,
  });
  //Non sipulated cluster
  map.addLayer({
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
  map.addLayer({
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
  map.addLayer({
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
  map.addLayer({
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
  map.on("click", "nonSipulated-cluster", (e) => {
    inspectCluster(e, "nonSipulated");
  });
  //Get info when user moves their mouse over the unclustered layer

  map.on("mouseenter", "nonSipulated-unclustered", (e) => {
    mouseEnterEventUnclustered(e, "nonSipulated");
  });
  map.on("mouseleave", "nonSipulated-unclustered", () => {
    mouseLeaveEventUnclustered("nonSipulated");
  });
  //Get infor onclick
  map.on("click", "nonSipulated-unclustered", async (e) => {
    await getInfoOnclickUnclustered(e);
  });
  map.on("mouseenter", "nonSipulated-cluster", () => {
    map.getCanvas().style.cursor = "pointer";
  });
  map.on("mouseleave", "nonSipulated-cluster", () => {
    map.getCanvas().style.cursor = "";
  });
  //Reported section
  map.addSource("reported", {
    type: "geojson",
    data: filterReported,
    cluster: true,
    clusterMaxZoom: 15,
    clusterRadius: 15,
  });
  //Reported cluster
  map.addLayer({
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
  map.addLayer({
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
  map.addLayer({
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
  map.addLayer({
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
  map.on("click", "reported-cluster", (e) => {
    inspectCluster(e, "reported");
  });

  map.on("mouseenter", "reported-unclustered", (e) => {
    mouseEnterEventUnclustered(e, "reported");
  });
  map.on("mouseleave", "reported-unclustered", () => {
    mouseLeaveEventUnclustered("reported");
  });
  // Get info on click
  map.on("click", "reported-unclustered", async (e) => {
    await getInfoOnclickUnclustered(e);
  });
  map.on("mouseenter", "reported-cluster", () => {
    map.getCanvas().style.cursor = "pointer";
  });
  map.on("mouseleave", "reported-cluster", () => {
    map.getCanvas().style.cursor = "";
  });
});

//Toggle layer
const sipulatedToggle = document.querySelector("#firstCheckboxStretched");
const nonSipulatedToggle = document.querySelector("#secondCheckboxStretched");
const reportedToggle = document.querySelector("#thirdCheckboxStretched");
const selfReportedToggle = document.querySelector("#forthCheckboxStretched");

sipulatedToggle.addEventListener("change", (e) => {
  toggleEvent(e, "sipulated");
});
nonSipulatedToggle.addEventListener("change", (e) => {
  toggleEvent(e, "nonSipulated");
});
reportedToggle.addEventListener("change", (e) => {
  toggleEvent(e, "reported");
});

// Reverse geo-location
const locationInput = document.querySelector("#location-input");
const searchBtn = document.querySelector("#search-button");

searchBtn.addEventListener("click", searchFunc);
locationInput.addEventListener("keypress", (e) => {
  e.preventDefault();
  if (e.key == "Enter") {
    searchFunc(e);
  }
});

//Get board ID example
const createPermissionButtonHalf = document.querySelector(
  "#createPermissionButton-half"
);
 
createPermissionButtonHalf.addEventListener("click", (e) => {
  let page =
    document.querySelector(".page-item.active") != null
      ? document.querySelector(".page-item.active").innerText
      : undefined;

  if (page == undefined) {
    return;
  }
  selectedBoard = adsData[page - 1];
});

//Update map when select specified ward
const filterSelect = document.querySelector("#filterSelect");
filterSelect.addEventListener("change", (e) => {
  // e.preventDefault();
  console.log("CHanged");
  const selectedWardsHTML = filterSelect.selectedOptions;
  let selectedWard = [];
  for (let i = 0; i < selectedWardsHTML.length; i++) {
    selectedWard.push(selectedWardsHTML[i].label);
  }

  //Refilter
  console.log(reported);

  filterSipulated.features = sipulated.features
    .filter((p) => {
      return (
        p.properties.area.district == accountDistrict &&
        selectedWard.includes(p.properties.area.ward)
      );
    })
    .slice();

  filterNonSipulated.features = nonSipulated.features
    .filter((p) => {
      return (
        p.properties.area.district == accountDistrict &&
        selectedWard.includes(p.properties.area.ward)
      );
    })
    .slice();

  filterReported.features = reported.features
    .filter((p) => {
      return (
        p.properties.area.district == accountDistrict &&
        selectedWard.includes(p.properties.area.ward)
      );
    })
    .slice();

  //Change data and rerender map
  map.getSource("sipulated").setData(filterSipulated);
  map.getSource("nonSipulated").setData(filterNonSipulated);
  map.getSource("reported").setData(filterReported);
});

