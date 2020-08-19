let paymentInfo = JSON.parse(localStorage.getItem("paymentInfo")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const name = document.getElementsByClassName("payment__info-name")[0];
const address = document.getElementsByClassName("payment__info-address")[0];
const phone = document.getElementsByClassName("payment__info-phone")[0];
const email = document.getElementsByClassName("payment__info-email")[0];
const cartTable = document.querySelector(".payment__cart-table");
const totalPrice = document.querySelector(".payment__cart-total-price");
const backBtn = document.getElementById("backBtn");
const deleteBtn = document.getElementById("deleteBtn");
const payBtn = document.getElementById("payBtn");

name.innerHTML = `Họ tên người nhận: ${paymentInfo[0].lastName} ${paymentInfo[0].firstName}`;
address.innerHTML = `Địa chỉ nhận hàng: ${paymentInfo[0].address}, ${paymentInfo[0].city}`;
phone.innerHTML = `Số điện thoại: ${paymentInfo[0].phone}`;
email.innerHTML = `Email: ${paymentInfo[0].email}`;

let sumPrice = 0;
for (let i = 0; i < cart.length; i++) {
	let total = cart[i].price * cart[i].quantity;
	sumPrice += total;
	cartTable.innerHTML += `
		<tr>
			<td class="payment__cart-table-name"> ${cart[i].name} </td>
			<td class="payment__cart-table-price"> ${cart[i].price
				.toString()
				.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}<span>đ</span></td>
			<td class="payment__cart-table-quantity"> ${cart[i].quantity} </td>
			<td class="payment__cart-table-price"> ${total
				.toString()
				.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}<span>đ</span></td>
		</tr>
	`;
}

totalPrice.innerHTML =
	sumPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<span>đ</span>";

backBtn.onclick = () => {
	window.history.back();
};

deleteBtn.onclick = () => {
	let result = confirm("Xóa bỏ đơn hàng hiện tại?");
	if (result) {
		localStorage.removeItem("cart");
		window.location = "index.html";
	}
};

payBtn.onclick = () => {
	let today = new Date();
	let date =
		today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
	let time =
		today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	let newOrder = {
        item: cart,
        info: paymentInfo[0],
		date: date,
		time: time,
	};
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "http://localhost:3000/order");
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = () => {
		if (xhr.readyState !== 4) return;
	}
	xhr.send(JSON.stringify(newOrder))
	localStorage.removeItem("cart");
    window.location = "index.html"
    alert("Đặt hàng thành công")
};
