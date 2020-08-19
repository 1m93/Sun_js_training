let xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:3000/products");

function getItems(products) {
	const productItems = [...document.querySelectorAll(".rowProductList__item")];
	for (let i = 0; i < productItems.length; i++) {
		productItems[
			i
		].firstElementChild.style = `background: url(assets/product/${products[i].id}.jpg) no-repeat bottom; background-size: contain`;
		let productDetail = productItems[i].lastElementChild;
		productDetail.firstElementChild.innerHTML = products[i].name;
		productDetail.firstElementChild.href = `detail.html?id=${products[i].id}`;
		productDetail.querySelector(".newprice").innerHTML =
			products[i].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
			"<span>đ</span>";
		productDetail.querySelector(".oldprice").innerHTML =
			products[i].oldPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
			"<span>đ</span>";
		productDetail.lastElementChild.onclick = () => addToCart(products[i], 1);
	}
}

function addToCart(product, quantity) {
	let cart = JSON.parse(localStorage.getItem("cart")) || [];
	let order = product;
	order.quantity = quantity;
	let founded = false;
	for (let  i = 0; i < cart.length; i++) {
		if (cart[i].id == order.id) {
			founded = true;
			cart[i].quantity += quantity;
			break;
		}
	}
	if (founded == false) cart.push(order) 
	console.log(cart);
	localStorage.setItem("cart", JSON.stringify(cart));
	var confirmBox = confirm(`Đã thêm ${product.name} vào giỏ hàng, chuyển đến trang giỏ hàng?`)
	if (confirmBox == true) window.location = "cart.html";
}

xhr.onreadystatechange = function () {
	if (xhr.readyState !== 4) return;
	if (xhr.status === 200) {
		getItems(JSON.parse(xhr.responseText));
	} else {
		console.log("HTTP error", xhr.status, xhr.statusText);
	}
};

xhr.send();
