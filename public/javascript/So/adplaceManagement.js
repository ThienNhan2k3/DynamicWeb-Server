const myModalEl = document.getElementById("createModal");
myModalEl.addEventListener("hidden.bs.modal", function (event) {
  const invalidFeedbacks = document.querySelectorAll(".invalid-feedback");
  invalidFeedbacks.forEach((feedback) => feedback.remove());

  const createAlertMessage = document.querySelector("#create-alert-container");
  if (createAlertMessage) {
    createAlertMessage.remove();
  }

  const inputElements = document.querySelectorAll(".form-control");
  inputElements.forEach((inputElement) => {
    if (inputElement.classList.contains("is-invalid")) {
      inputElement.classList.remove("is-invalid");
    }
  });
});

const confirmEditButton = document.getElementById("confirm-edit-button");
if (confirmEditButton) {
  confirmEditButton.addEventListener("click", async (e) => {
    e.preventDefault();

    // Lấy dữ liệu từ form bằng FormData
    const formData = new FormData(document.getElementById("editForm"));

    // Chuyển đổi FormData thành đối tượng JavaScript
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Gửi request PUT đến server
    try {
      const res = await fetch("/department/adplaceManagement", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status} ${res.statusText}`);
      }

      location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  });
}

function districtSelectChange(districtSelect, wardSelect, callback) {
  // Kiểm tra xem quận đã được chọn chưa
  if (districtSelect.value === "") {
    // Nếu quận chưa được chọn, disable dropdown phường và làm rỗng nó
    wardSelect.disabled = true;
    wardSelect.innerHTML = '<option value="">Phường</option>';
    if (callback) {
      callback();
    }
    return; // Không cần thực hiện fetch nếu quận chưa được chọn
  }

  // Nếu quận đã được chọn, thực hiện fetch để lấy danh sách phường
  fetch(
    `/department/accountManagement/api/wards?district=${districtSelect.value}`
  )
    .then((res) => res.json())
    .then((data) => {
      wardSelect.innerHTML = "";
      let option = document.createElement("option");
      option.setAttribute("value", "");
      option.textContent = "Phường";
      wardSelect.appendChild(option);

      // Thêm từng phường vào dropdown
      for (let i = 0; i < data.length; i++) {
        option = document.createElement("option");
        option.setAttribute("value", data[i].ward);
        option.textContent = data[i].ward;
        wardSelect.appendChild(option);
      }

      // Bật dropdown phường và gọi callback nếu có
      wardSelect.disabled = false;
      if (callback) {
        callback();
      }
    })
    .catch((err) => console.error(err));
  findLocation();
}

async function showEditAdplaceModal(button) {
  console.log("Button clicked"); // Check if the function is triggered
  const districtField = document.querySelector("#districtSelectEditModal");
  const wardField = document.querySelector("#wardSelectEditModal");
  const id = button.dataset.id;
  const adtype = button.dataset.adstype;
  const district = button.dataset.district;
  const ward = button.dataset.ward;
  const locationType = button.dataset.location;
  const address = button.dataset.address;
  const status = button.dataset.status;
  const long = button.dataset.long;
  const lat = button.dataset.lat;

  console.log(ward);
  // Update the content of the editModal form with the retrieved data
  document.getElementById("adTypeSelectEditModal").value = adtype;
  document.getElementById("statusEditModal").value = status;
  document.getElementById("districtSelectEditModal").value = district;
  console.log(districtField.value);
  districtSelectChange(districtField, wardField, () => {
    document.getElementById("wardSelectEditModal").value = ward;
  });

  document.getElementById("addressEditModal").value = address;
  document.getElementById("locationTypeSelectEditModal").value = locationType;
  document.getElementById("idEditModal").value = id;

  document.getElementById("lngEditModal").value = long;
  document.getElementById("latEditModal").value = lat;
  //Set the marker to the map
  modalMap_edit.flyTo({ center: [long, lat] });

  dragMarker_edit.setLngLat([long, lat]).addTo(modalMap_edit);
}

//Open edit modal event
// const editModal=document.querySelector('#editModal')
// editModal.addEventListener('shown.bs.modal',async(e)=>{
//   const districtField=document.querySelector('#districtSelectEditModal')
//   const wardField=document.querySelector('#wardSelectEditModal')
//   await districtSelectChange(districtField,wardField)
//   wardField.value=
// })

function showDeleteAdplaceModal(btn) {
  const id = btn.dataset.id;
  console.log(id);
  document.getElementById("idDeleteModal").value = id;
}

const confirmDeleteButton = document.getElementById("confirm-delete-button");
if (confirmDeleteButton) {
  confirmDeleteButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const data = {
      adsPlacementId: document.getElementById("idDeleteModal").value,
    };
    console.log(data);
    const res = await fetch("/department/adplaceManagement", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    location.reload();
  });
}
