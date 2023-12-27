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
}

function showEditBoardModal(button) {
  console.log("button clicked");
  const id = button.dataset.id;
  const size = button.dataset.size;
  const quantity = button.dataset.quantity;
  const address = button.dataset.address;
  const type = button.dataset.type;
  const district = button.dataset.district;
  const ward = button.dataset.ward;
  console.log(id, size, quantity, address, type, district, ward);
  const dimensionsArray = size.split("x");

  const height = parseInt(dimensionsArray[0].trim());
  const width = parseInt(dimensionsArray[1].trim());

  console.log(id, height, width, quantity, address, type, district, ward);

  document.getElementById("heightEditModal").value = height;
  document.getElementById("weightEditModal").value = width;
  document.getElementById("quantityEditModal").value = quantity.split(" ")[0];
  document.getElementById("addressEditModal").value = address;
  document.getElementById("boardTypeSelectEditModal").value = type;
  document.getElementById("districtSelectEditModal").value = district;
  document.getElementById("wardSelectEditModal").value = ward;
  document.getElementById("idEditModal").value = id;
}

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
      const res = await fetch("/department/boardManagement", {
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

function showDeleteBoardModal(btn) {
  const id = btn.dataset.id;
  console.log(id);
  document.getElementById("idDeleteModal").value = id;
}

const confirmDeleteButton = document.getElementById("confirm-delete-button");
if (confirmDeleteButton) {
  confirmDeleteButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const data = {
      boardId: document.getElementById("idDeleteModal").value,
    };
    console.log(data);
    const res = await fetch("/department/boardManagement", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    location.reload();
  });
}
