function showCancelRequestConfirmModal(btn) {
  document.querySelector('#tableName123').value = btn.dataset.table;
  document.querySelector('#requestId123').value = btn.dataset.id;
  document.querySelector('#cancelRequestConfirmModal #tableName').textContent = btn.dataset.tableName;
  document.querySelector('#cancelRequestConfirmModal #requestId').textContent = btn.dataset.id;
}