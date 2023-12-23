var urlParams = new URLSearchParams(window.location.search);
let selectedArea = urlParams.get('selectedArea');
document.getElementById("selectedArea").querySelector("option[value='" + selectedArea + "']").selected = true;