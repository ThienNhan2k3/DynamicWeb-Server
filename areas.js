const areas = [{"id":1,"district":"Quận 1","ward":"Phường Tân Định","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":2,"district":"Quận 1","ward":"Phường Đa Kao","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":3,"district":"Quận 1","ward":"Phường Bến Nghé","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":4,"district":"Quận 1","ward":"Phường Bến Thành","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":5,"district":"Quận 1","ward":"Phường Nguyễn Thái Bình","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":6,"district":"Quận 1","ward":"Phường Phạm Ngũ Lão","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":7,"district":"Quận 1","ward":"Phường Cầu Ông Lãnh","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":8,"district":"Quận 1","ward":"Phường Cô Giang","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":9,"district":"Quận 1","ward":"Phường Nguyễn Cư Trinh","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":10,"district":"Quận 1","ward":"Phường Cầu Kho","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":11,"district":"Quận 12","ward":"Phường Thạnh Xuân","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":12,"district":"Quận 12","ward":"Phường Thạnh Lộc","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":13,"district":"Quận 12","ward":"Phường Hiệp Thành","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":14,"district":"Quận 12","ward":"Phường Thới An","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":15,"district":"Quận 12","ward":"Phường Tân Chánh Hiệp","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":16,"district":"Quận 12","ward":"Phường An Phú Đông","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":17,"district":"Quận 12","ward":"Phường Tân Thới Hiệp","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":18,"district":"Quận 12","ward":"Phường Trung Mỹ Tây","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":19,"district":"Quận 12","ward":"Phường Tân Hưng Thuận","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":20,"district":"Quận 12","ward":"Phường Đông Hưng Thuận","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":21,"district":"Quận 12","ward":"Phường Tân Thới Nhất","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":22,"district":"Quận Gò Vấp","ward":"Phường 15","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":23,"district":"Quận Gò Vấp","ward":"Phường 13","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":24,"district":"Quận Gò Vấp","ward":"Phường 17","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":25,"district":"Quận Gò Vấp","ward":"Phường 6","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":26,"district":"Quận Gò Vấp","ward":"Phường 16","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":27,"district":"Quận Gò Vấp","ward":"Phường 12","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":28,"district":"Quận Gò Vấp","ward":"Phường 14","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":29,"district":"Quận Gò Vấp","ward":"Phường 10","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":30,"district":"Quận Gò Vấp","ward":"Phường 05","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":31,"district":"Quận Gò Vấp","ward":"Phường 07","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":32,"district":"Quận Gò Vấp","ward":"Phường 04","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":33,"district":"Quận Gò Vấp","ward":"Phường 01","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":34,"district":"Quận Gò Vấp","ward":"Phường 9","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":35,"district":"Quận Gò Vấp","ward":"Phường 8","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":36,"district":"Quận Gò Vấp","ward":"Phường 11","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":37,"district":"Quận Gò Vấp","ward":"Phường 03","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":38,"district":"Quận Bình Thạnh","ward":"Phường 13","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":39,"district":"Quận Bình Thạnh","ward":"Phường 11","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":40,"district":"Quận Bình Thạnh","ward":"Phường 27","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":41,"district":"Quận Bình Thạnh","ward":"Phường 26","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":42,"district":"Quận Bình Thạnh","ward":"Phường 12","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":43,"district":"Quận Bình Thạnh","ward":"Phường 25","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":44,"district":"Quận Bình Thạnh","ward":"Phường 05","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":45,"district":"Quận Bình Thạnh","ward":"Phường 07","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":46,"district":"Quận Bình Thạnh","ward":"Phường 24","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":47,"district":"Quận Bình Thạnh","ward":"Phường 06","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":48,"district":"Quận Bình Thạnh","ward":"Phường 14","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":49,"district":"Quận Bình Thạnh","ward":"Phường 15","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":50,"district":"Quận Bình Thạnh","ward":"Phường 02","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":51,"district":"Quận Bình Thạnh","ward":"Phường 01","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":52,"district":"Quận Bình Thạnh","ward":"Phường 03","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":53,"district":"Quận Bình Thạnh","ward":"Phường 17","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":54,"district":"Quận Bình Thạnh","ward":"Phường 21","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":55,"district":"Quận Bình Thạnh","ward":"Phường 22","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":56,"district":"Quận Bình Thạnh","ward":"Phường 19","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":57,"district":"Quận Bình Thạnh","ward":"Phường 28","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":58,"district":"Quận Tân Bình","ward":"Phường 02","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":59,"district":"Quận Tân Bình","ward":"Phường 04","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":60,"district":"Quận Tân Bình","ward":"Phường 12","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":61,"district":"Quận Tân Bình","ward":"Phường 13","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":62,"district":"Quận Tân Bình","ward":"Phường 01","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":63,"district":"Quận Tân Bình","ward":"Phường 03","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":64,"district":"Quận Tân Bình","ward":"Phường 11","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":65,"district":"Quận Tân Bình","ward":"Phường 07","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":66,"district":"Quận Tân Bình","ward":"Phường 05","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":67,"district":"Quận Tân Bình","ward":"Phường 10","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":68,"district":"Quận Tân Bình","ward":"Phường 06","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":69,"district":"Quận Tân Bình","ward":"Phường 08","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":70,"district":"Quận Tân Bình","ward":"Phường 09","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":71,"district":"Quận Tân Bình","ward":"Phường 14","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":72,"district":"Quận Tân Bình","ward":"Phường 15","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":73,"district":"Quận Tân Phú","ward":"Phường Tân Sơn Nhì","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":74,"district":"Quận Tân Phú","ward":"Phường Tây Thạnh","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":75,"district":"Quận Tân Phú","ward":"Phường Sơn Kỳ","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":76,"district":"Quận Tân Phú","ward":"Phường Tân Quý","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":77,"district":"Quận Tân Phú","ward":"Phường Tân Thành","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":78,"district":"Quận Tân Phú","ward":"Phường Phú Thọ Hòa","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":79,"district":"Quận Tân Phú","ward":"Phường Phú Thạnh","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":80,"district":"Quận Tân Phú","ward":"Phường Phú Trung","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":81,"district":"Quận Tân Phú","ward":"Phường Hòa Thạnh","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":82,"district":"Quận Tân Phú","ward":"Phường Hiệp Tân","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":83,"district":"Quận Tân Phú","ward":"Phường Tân Thới Hòa","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":84,"district":"Quận Phú Nhuận","ward":"Phường 04","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":85,"district":"Quận Phú Nhuận","ward":"Phường 05","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":86,"district":"Quận Phú Nhuận","ward":"Phường 09","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":87,"district":"Quận Phú Nhuận","ward":"Phường 07","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":88,"district":"Quận Phú Nhuận","ward":"Phường 03","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":89,"district":"Quận Phú Nhuận","ward":"Phường 01","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":90,"district":"Quận Phú Nhuận","ward":"Phường 02","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":91,"district":"Quận Phú Nhuận","ward":"Phường 08","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":92,"district":"Quận Phú Nhuận","ward":"Phường 15","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":93,"district":"Quận Phú Nhuận","ward":"Phường 10","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":94,"district":"Quận Phú Nhuận","ward":"Phường 11","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":95,"district":"Quận Phú Nhuận","ward":"Phường 17","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":96,"district":"Quận Phú Nhuận","ward":"Phường 13","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":97,"district":"Thành phố Thủ Đức","ward":"Phường Linh Xuân","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":98,"district":"Thành phố Thủ Đức","ward":"Phường Bình Chiểu","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":99,"district":"Thành phố Thủ Đức","ward":"Phường Linh Trung","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":100,"district":"Thành phố Thủ Đức","ward":"Phường Tam Bình","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":101,"district":"Thành phố Thủ Đức","ward":"Phường Tam Phú","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":102,"district":"Thành phố Thủ Đức","ward":"Phường Hiệp Bình Phước","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":103,"district":"Thành phố Thủ Đức","ward":"Phường Hiệp Bình Chánh","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":104,"district":"Thành phố Thủ Đức","ward":"Phường Linh Chiểu","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":105,"district":"Thành phố Thủ Đức","ward":"Phường Linh Tây","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":106,"district":"Thành phố Thủ Đức","ward":"Phường Linh Đông","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":107,"district":"Thành phố Thủ Đức","ward":"Phường Bình Thọ","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":108,"district":"Thành phố Thủ Đức","ward":"Phường Trường Thọ","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":109,"district":"Thành phố Thủ Đức","ward":"Phường Long Bình","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":110,"district":"Thành phố Thủ Đức","ward":"Phường Long Thạnh Mỹ","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":111,"district":"Thành phố Thủ Đức","ward":"Phường Tân Phú","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":112,"district":"Thành phố Thủ Đức","ward":"Phường Hiệp Phú","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":113,"district":"Thành phố Thủ Đức","ward":"Phường Tăng Nhơn Phú A","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":114,"district":"Thành phố Thủ Đức","ward":"Phường Tăng Nhơn Phú B","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":115,"district":"Thành phố Thủ Đức","ward":"Phường Phước Long B","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":116,"district":"Thành phố Thủ Đức","ward":"Phường Phước Long A","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":117,"district":"Thành phố Thủ Đức","ward":"Phường Trường Thạnh","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":118,"district":"Thành phố Thủ Đức","ward":"Phường Long Phước","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":119,"district":"Thành phố Thủ Đức","ward":"Phường Long Trường","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":120,"district":"Thành phố Thủ Đức","ward":"Phường Phước Bình","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":121,"district":"Thành phố Thủ Đức","ward":"Phường Phú Hữu","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":122,"district":"Thành phố Thủ Đức","ward":"Phường Thảo Điền","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":123,"district":"Thành phố Thủ Đức","ward":"Phường An Phú","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":124,"district":"Thành phố Thủ Đức","ward":"Phường An Khánh","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":125,"district":"Thành phố Thủ Đức","ward":"Phường Bình Trưng Đông","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":126,"district":"Thành phố Thủ Đức","ward":"Phường Bình Trưng Tây","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":127,"district":"Thành phố Thủ Đức","ward":"Phường Cát Lái","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":128,"district":"Thành phố Thủ Đức","ward":"Phường Thạnh Mỹ Lợi","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":129,"district":"Thành phố Thủ Đức","ward":"Phường An Lợi Đông","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":130,"district":"Thành phố Thủ Đức","ward":"Phường Thủ Thiêm","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":131,"district":"Quận 3","ward":"Phường 14","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":132,"district":"Quận 3","ward":"Phường 12","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":133,"district":"Quận 3","ward":"Phường 11","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":134,"district":"Quận 3","ward":"Phường 13","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":135,"district":"Quận 3","ward":"Phường Võ Thị Sáu","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":136,"district":"Quận 3","ward":"Phường 09","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":137,"district":"Quận 3","ward":"Phường 10","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":138,"district":"Quận 3","ward":"Phường 04","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":139,"district":"Quận 3","ward":"Phường 05","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":140,"district":"Quận 3","ward":"Phường 03","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":141,"district":"Quận 3","ward":"Phường 02","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":142,"district":"Quận 3","ward":"Phường 01","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":143,"district":"Quận 10","ward":"Phường 15","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":144,"district":"Quận 10","ward":"Phường 13","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":145,"district":"Quận 10","ward":"Phường 14","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":146,"district":"Quận 10","ward":"Phường 12","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":147,"district":"Quận 10","ward":"Phường 11","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":148,"district":"Quận 10","ward":"Phường 10","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":149,"district":"Quận 10","ward":"Phường 09","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":150,"district":"Quận 10","ward":"Phường 01","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":151,"district":"Quận 10","ward":"Phường 08","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":152,"district":"Quận 10","ward":"Phường 02","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":153,"district":"Quận 10","ward":"Phường 04","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":154,"district":"Quận 10","ward":"Phường 07","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":155,"district":"Quận 10","ward":"Phường 05","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":156,"district":"Quận 10","ward":"Phường 06","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":157,"district":"Quận 11","ward":"Phường 15","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":158,"district":"Quận 11","ward":"Phường 05","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":159,"district":"Quận 11","ward":"Phường 14","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":160,"district":"Quận 11","ward":"Phường 11","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":161,"district":"Quận 11","ward":"Phường 03","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":162,"district":"Quận 11","ward":"Phường 10","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":163,"district":"Quận 11","ward":"Phường 13","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":164,"district":"Quận 11","ward":"Phường 08","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":165,"district":"Quận 11","ward":"Phường 09","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":166,"district":"Quận 11","ward":"Phường 12","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":167,"district":"Quận 11","ward":"Phường 07","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":168,"district":"Quận 11","ward":"Phường 06","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":169,"district":"Quận 11","ward":"Phường 04","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":170,"district":"Quận 11","ward":"Phường 01","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":171,"district":"Quận 11","ward":"Phường 02","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":172,"district":"Quận 11","ward":"Phường 16","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":173,"district":"Quận 4","ward":"Phường 13","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":174,"district":"Quận 4","ward":"Phường 09","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":175,"district":"Quận 4","ward":"Phường 06","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":176,"district":"Quận 4","ward":"Phường 08","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":177,"district":"Quận 4","ward":"Phường 10","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":178,"district":"Quận 4","ward":"Phường 18","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":179,"district":"Quận 4","ward":"Phường 14","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":180,"district":"Quận 4","ward":"Phường 04","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":181,"district":"Quận 4","ward":"Phường 03","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":182,"district":"Quận 4","ward":"Phường 16","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":183,"district":"Quận 4","ward":"Phường 02","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":184,"district":"Quận 4","ward":"Phường 15","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":185,"district":"Quận 4","ward":"Phường 01","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":186,"district":"Quận 5","ward":"Phường 04","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":187,"district":"Quận 5","ward":"Phường 09","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":188,"district":"Quận 5","ward":"Phường 03","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":189,"district":"Quận 5","ward":"Phường 12","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":190,"district":"Quận 5","ward":"Phường 02","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":191,"district":"Quận 5","ward":"Phường 08","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":192,"district":"Quận 5","ward":"Phường 07","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":193,"district":"Quận 5","ward":"Phường 01","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":194,"district":"Quận 5","ward":"Phường 11","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":195,"district":"Quận 5","ward":"Phường 14","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":196,"district":"Quận 5","ward":"Phường 05","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":197,"district":"Quận 5","ward":"Phường 06","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":198,"district":"Quận 5","ward":"Phường 10","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":199,"district":"Quận 5","ward":"Phường 13","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":200,"district":"Quận 6","ward":"Phường 14","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":201,"district":"Quận 6","ward":"Phường 13","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":202,"district":"Quận 6","ward":"Phường 09","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":203,"district":"Quận 6","ward":"Phường 06","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":204,"district":"Quận 6","ward":"Phường 12","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":205,"district":"Quận 6","ward":"Phường 05","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":206,"district":"Quận 6","ward":"Phường 11","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":207,"district":"Quận 6","ward":"Phường 02","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":208,"district":"Quận 6","ward":"Phường 01","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":209,"district":"Quận 6","ward":"Phường 04","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":210,"district":"Quận 6","ward":"Phường 08","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":211,"district":"Quận 6","ward":"Phường 03","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":212,"district":"Quận 6","ward":"Phường 07","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":213,"district":"Quận 6","ward":"Phường 10","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":214,"district":"Quận 8","ward":"Phường 08","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":215,"district":"Quận 8","ward":"Phường 02","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":216,"district":"Quận 8","ward":"Phường 01","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":217,"district":"Quận 8","ward":"Phường 03","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":218,"district":"Quận 8","ward":"Phường 11","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":219,"district":"Quận 8","ward":"Phường 09","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":220,"district":"Quận 8","ward":"Phường 10","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":221,"district":"Quận 8","ward":"Phường 04","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":222,"district":"Quận 8","ward":"Phường 13","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":223,"district":"Quận 8","ward":"Phường 12","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":224,"district":"Quận 8","ward":"Phường 05","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":225,"district":"Quận 8","ward":"Phường 14","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":226,"district":"Quận 8","ward":"Phường 06","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":227,"district":"Quận 8","ward":"Phường 15","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":228,"district":"Quận 8","ward":"Phường 16","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":229,"district":"Quận 8","ward":"Phường 07","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":230,"district":"Quận Bình Tân","ward":"Phường Bình Hưng Hòa","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":231,"district":"Quận Bình Tân","ward":"Phường Bình Hưng Hoà A","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":232,"district":"Quận Bình Tân","ward":"Phường Bình Hưng Hoà B","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":233,"district":"Quận Bình Tân","ward":"Phường Bình Trị Đông","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":234,"district":"Quận Bình Tân","ward":"Phường Bình Trị Đông A","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":235,"district":"Quận Bình Tân","ward":"Phường Bình Trị Đông B","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":236,"district":"Quận Bình Tân","ward":"Phường Tân Tạo","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":237,"district":"Quận Bình Tân","ward":"Phường Tân Tạo A","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":238,"district":"Quận Bình Tân","ward":"Phường An Lạc","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":239,"district":"Quận Bình Tân","ward":"Phường An Lạc A","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":240,"district":"Quận 7","ward":"Phường Tân Thuận Đông","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":241,"district":"Quận 7","ward":"Phường Tân Thuận Tây","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":242,"district":"Quận 7","ward":"Phường Tân Kiểng","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":243,"district":"Quận 7","ward":"Phường Tân Hưng","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":244,"district":"Quận 7","ward":"Phường Bình Thuận","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":245,"district":"Quận 7","ward":"Phường Tân Quy","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":246,"district":"Quận 7","ward":"Phường Phú Thuận","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":247,"district":"Quận 7","ward":"Phường Tân Phú","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":248,"district":"Quận 7","ward":"Phường Tân Phong","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":249,"district":"Quận 7","ward":"Phường Phú Mỹ","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":250,"district":"Huyện Củ Chi","ward":"Thị trấn Củ Chi","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":251,"district":"Huyện Củ Chi","ward":"Xã Phú Mỹ Hưng","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":252,"district":"Huyện Củ Chi","ward":"Xã An Phú","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":253,"district":"Huyện Củ Chi","ward":"Xã Trung Lập Thượng","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":254,"district":"Huyện Củ Chi","ward":"Xã An Nhơn Tây","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":255,"district":"Huyện Củ Chi","ward":"Xã Nhuận Đức","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":256,"district":"Huyện Củ Chi","ward":"Xã Phạm Văn Cội","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":257,"district":"Huyện Củ Chi","ward":"Xã Phú Hòa Đông","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":258,"district":"Huyện Củ Chi","ward":"Xã Trung Lập Hạ","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":259,"district":"Huyện Củ Chi","ward":"Xã Trung An","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":260,"district":"Huyện Củ Chi","ward":"Xã Phước Thạnh","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":261,"district":"Huyện Củ Chi","ward":"Xã Phước Hiệp","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":262,"district":"Huyện Củ Chi","ward":"Xã Tân An Hội","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":263,"district":"Huyện Củ Chi","ward":"Xã Phước Vĩnh An","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":264,"district":"Huyện Củ Chi","ward":"Xã Thái Mỹ","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":265,"district":"Huyện Củ Chi","ward":"Xã Tân Thạnh Tây","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":266,"district":"Huyện Củ Chi","ward":"Xã Hòa Phú","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":267,"district":"Huyện Củ Chi","ward":"Xã Tân Thạnh Đông","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":268,"district":"Huyện Củ Chi","ward":"Xã Bình Mỹ","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":269,"district":"Huyện Củ Chi","ward":"Xã Tân Phú Trung","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":270,"district":"Huyện Củ Chi","ward":"Xã Tân Thông Hội","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":271,"district":"Huyện Hóc Môn","ward":"Thị trấn Hóc Môn","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":272,"district":"Huyện Hóc Môn","ward":"Xã Tân Hiệp","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":273,"district":"Huyện Hóc Môn","ward":"Xã Nhị Bình","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":274,"district":"Huyện Hóc Môn","ward":"Xã Đông Thạnh","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":275,"district":"Huyện Hóc Môn","ward":"Xã Tân Thới Nhì","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":276,"district":"Huyện Hóc Môn","ward":"Xã Thới Tam Thôn","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":277,"district":"Huyện Hóc Môn","ward":"Xã Xuân Thới Sơn","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":278,"district":"Huyện Hóc Môn","ward":"Xã Tân Xuân","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":279,"district":"Huyện Hóc Môn","ward":"Xã Xuân Thới Đông","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":280,"district":"Huyện Hóc Môn","ward":"Xã Trung Chánh","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":281,"district":"Huyện Hóc Môn","ward":"Xã Xuân Thới Thượng","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":282,"district":"Huyện Hóc Môn","ward":"Xã Bà Điểm","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":283,"district":"Huyện Bình Chánh","ward":"Thị trấn Tân Túc","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":284,"district":"Huyện Bình Chánh","ward":"Xã Phạm Văn Hai","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":285,"district":"Huyện Bình Chánh","ward":"Xã Vĩnh Lộc A","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":286,"district":"Huyện Bình Chánh","ward":"Xã Vĩnh Lộc B","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":287,"district":"Huyện Bình Chánh","ward":"Xã Bình Lợi","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":288,"district":"Huyện Bình Chánh","ward":"Xã Lê Minh Xuân","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":289,"district":"Huyện Bình Chánh","ward":"Xã Tân Nhựt","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":290,"district":"Huyện Bình Chánh","ward":"Xã Tân Kiên","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":291,"district":"Huyện Bình Chánh","ward":"Xã Bình Hưng","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":292,"district":"Huyện Bình Chánh","ward":"Xã Phong Phú","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":293,"district":"Huyện Bình Chánh","ward":"Xã An Phú Tây","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":294,"district":"Huyện Bình Chánh","ward":"Xã Hưng Long","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":295,"district":"Huyện Bình Chánh","ward":"Xã Đa Phước","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":296,"district":"Huyện Bình Chánh","ward":"Xã Tân Quý Tây","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":297,"district":"Huyện Bình Chánh","ward":"Xã Bình Chánh","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":298,"district":"Huyện Bình Chánh","ward":"Xã Quy Đức","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":299,"district":"Huyện Nhà Bè","ward":"Thị trấn Nhà Bè","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":300,"district":"Huyện Nhà Bè","ward":"Xã Phước Kiển","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":301,"district":"Huyện Nhà Bè","ward":"Xã Phước Lộc","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":302,"district":"Huyện Nhà Bè","ward":"Xã Nhơn Đức","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":303,"district":"Huyện Nhà Bè","ward":"Xã Phú Xuân","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":304,"district":"Huyện Nhà Bè","ward":"Xã Long Thới","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":305,"district":"Huyện Nhà Bè","ward":"Xã Hiệp Phước","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":306,"district":"Huyện Cần Giờ","ward":"Thị trấn Cần Thạnh","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":307,"district":"Huyện Cần Giờ","ward":"Xã Bình Khánh","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":308,"district":"Huyện Cần Giờ","ward":"Xã Tam Thôn Hiệp","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":309,"district":"Huyện Cần Giờ","ward":"Xã An Thới Đông","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":310,"district":"Huyện Cần Giờ","ward":"Xã Thạnh An","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":311,"district":"Huyện Cần Giờ","ward":"Xã Long Hòa","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"},{"id":312,"district":"Huyện Cần Giờ","ward":"Xã Lý Nhơn","updatedAt":"2023-11-21T04:14:54","createdAt":"2023-11-21T04:14:54"}]

module.exports = {areas};