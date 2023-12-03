function showEditBoardModal(btn) {
    document.querySelector('#boardIdEdit').value = btn.dataset.id;
    document.querySelector('#typeEdit').value = btn.dataset.type;
    document.querySelector('#sizeEdit').value = btn.dataset.size;
    document.querySelector('#quantityEdit').value = btn.dataset.quantity;
}