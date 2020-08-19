let url = new URL(window.location.href);
let id = url.searchParams.get("id");

let xhr = new XMLHttpRequest();
xhr.open("GET", `http://localhost:3000/products/${id}`);

function getItems(products) {
	let productImg = document.querySelector(".detail__img-image");
	let productName = document.querySelector(".titleLeft h1");
	let productPrice = document.querySelector(".detail__describe-price");
	let productBreadcrumb = document.querySelector(".breadcrumb a:nth-child(5)");
	let quantityForm = document.querySelector(
		".detail__describe-buy-quantity-form > div"
	);
	let subBtn = quantityForm.firstElementChild;
	let plusBtn = quantityForm.lastElementChild;
	let quantityInput = quantityForm.querySelector("input");
	let cartBtn = document.querySelector(
		".detail__describe-buy-quantity-form .btn"
	);

	productImg.style = `background: url(assets/product/${products.id}.jpg) no-repeat center; background-size: contain`;
	productName.innerHTML = products.name.toUpperCase();
	productPrice.innerHTML =
		products.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
		"<span>đ</span>";
	productBreadcrumb.innerHTML = products.name;
	subBtn.onclick = () => {
		if (quantityInput.value > 1) quantityInput.value--;
	};
	plusBtn.onclick = () => {
		quantityInput.value++;
	};
	cartBtn.onclick = () => addToCart(products, parseInt(quantityInput.value));
}

function addToCart(product, quantity) {
	let cart = JSON.parse(localStorage.getItem("cart"))
		? JSON.parse(localStorage.getItem("cart"))
		: [];
	let order = product;
	order.quantity = quantity;
	let founded = false;
	for (let i = 0; i < cart.length; i++) {
		if (cart[i].id == order.id) {
			founded = true;
			cart[i].quantity += quantity;
			break;
		}
	}
	if (founded == false) cart.push(order);
	console.log(cart);
	localStorage.setItem("cart", JSON.stringify(cart));
	window.location = "cart.html"
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
