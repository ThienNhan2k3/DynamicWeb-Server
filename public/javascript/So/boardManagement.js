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
