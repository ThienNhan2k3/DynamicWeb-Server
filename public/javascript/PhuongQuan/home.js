function showAddPermitRequestModal(btn) {
  document.querySelector('#boardIdEdit').value = btn.dataset.id;
}

function updateCompanyInfo(e, formId) {
  var val = document.querySelector(`${formId} #companyNameEdit`).value;
  var opts = document.querySelector(`${formId} #datalistOptions`).childNodes;

  let companyIdEdit = document.querySelector(`${formId} #companyIdEdit`);
  let emailEdit = document.querySelector(`${formId} #emailEdit`);
  let phoneEdit = document.querySelector(`${formId} #phoneEdit`);
  let address = document.querySelector(`${formId} #addressEdit`);

  for (var i = 0; i < opts.length; i++) {
    if (opts[i].value === val) {

      companyIdEdit.value = opts[i].dataset.id;
      emailEdit.value = opts[i].dataset.email;
      phoneEdit.value = opts[i].dataset.phone;
      address.value = opts[i].dataset.address;

      emailEdit.disabled = true;
      phoneEdit.disabled = true;
      address.disabled = true;

      break;
    }

    if (i == opts.length - 1) {
      companyIdEdit.value = "?";
      emailEdit.value = "";
      phoneEdit.value = "";
      address.value = "";

      emailEdit.disabled = false;
      phoneEdit.disabled = false;
      address.disabled = false;
    }
  }
}