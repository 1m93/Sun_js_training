let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartTable = document.querySelector(".cart__table");
const continueBtn = document.getElementById("continueBtn");
const removeBtn = document.getElementById("removeBtn");
const removeItems = document.getElementsByClassName("cart__table-delete-btn");
const paymentBtn = document.getElementById("paymentBtn");
const totalPrice = document.querySelector(".cart__total");
let sumPrice = 0;

if (cart.length == 0) {
	cartTable.innerHTML += '<tr><td colspan="6">Giỏ hàng trống<td></tr>';
	totalPrice.style = "display: none";
} else {
	for (let i = 0; i < cart.length; i++) {
		let total = cart[i].price * cart[i].quantity;
		sumPrice += total;
		cartTable.innerHTML += `
		<tr>
			<td class="cart__table-img"> <img src="assets/product/${cart[i].id}.jpg" /></td>
			<td class="cart__table-name"> ${cart[i].name} </td>
			<td class="cart__table-price"> ${cart[i].price
				.toString()
				.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}<span>đ</span></td>
			<td class="cart__table-quantity"> ${cart[i].quantity} </td>
			<td class="cart__table-price"> ${total
				.toString()
				.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}<span>đ</span></td>
			<td class="cart__table-delete">
				<a class="cart__table-delete-btn">
					<i class="fas fa-trash-alt"></i>
				</a>
			</td>
		</tr>
	`;
	}
}

totalPrice.querySelector("p").innerHTML =
	sumPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<span>đ</span>";

continueBtn.onclick = () => {
	window.location = "pdlist_grid.html";
};

removeBtn.onclick = () => {
	localStorage.removeItem("cart");
	location.reload();
};

paymentBtn.onclick = () => {
	if (cart.length > 0) window.location = "paymentInfo.html";
	else alert("Giỏ hàng trống");
};

for (let i = 0; i < removeItems.length; i++) {
	removeItems[i].onclick = () => {
		cart.splice(i, 1);
		localStorage.setItem("cart", JSON.stringify(cart));
		location.reload();
	};
}
