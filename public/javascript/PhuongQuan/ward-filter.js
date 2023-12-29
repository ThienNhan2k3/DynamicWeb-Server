var urlParams = new URLSearchParams(window.location.search);
let selectedArea = urlParams.get('selectedArea');
if (selectedArea) document.getElementById("selectedArea").querySelector("option[value='" + selectedArea + "']").selected = true;