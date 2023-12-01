function showEditAdsplacementModal(btn) {
    document.querySelector('#idEdit').value = btn.dataset.id;
    document.querySelector('#addressEdit').value = btn.dataset.address;
    document.querySelector('#areaEdit').value = btn.dataset.area;
    document.querySelector('#adsTypeEdit').value = btn.dataset.adsType;
    document.querySelector('#locationTypeEdit').value = btn.dataset.locationType;
    document.querySelector('#statusEdit').value = btn.dataset.status;
}

async function editAdsplacement(e) {
    e.preventDefault();

    const formData = new FormData(document.getElementById("editAdsplacementForm"));
    const data = Object.fromEntries(formData.entries());

    let res = await fetch('/list-adsplacements', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    
    location.reload();
}

var urlParams = new URLSearchParams(window.location.search);
let selectedArea = urlParams.get('selectedArea');
document.getElementById("selectedArea").querySelector("option[value='" + selectedArea + "']").selected = true;