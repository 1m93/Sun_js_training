let paymentInfo = JSON.parse(localStorage.getItem("paymentInfo")) || [];

const firstNameVal = document.getElementsByName("Tên")[0];
const lastNameVal = document.getElementsByName("Họ & tên đệm")[0];
const cityVal = document.getElementsByName("Thành phố")[0];
const addressVal = document.getElementsByName("Địa chỉ nhận hàng")[0];
const phoneVal = document.getElementsByName("Số điện thoại")[0];
const emailVal = document.getElementsByName("Email")[0];
const nextBtn = document.getElementsByClassName(
	"address__edit-form-submit-edit"
)[0];
const backBtn = document.getElementsByClassName(
	"address__edit-form-submit-back"
)[0];

if (paymentInfo.length > 0) {
	firstNameVal.value = paymentInfo[0].firstName
	lastNameVal.value = paymentInfo[0].lastName
	cityVal.value = paymentInfo[0].city
	addressVal.value = paymentInfo[0].address
	phoneVal.value = paymentInfo[0].phone
	emailVal.value = paymentInfo[0].email
}

nextBtn.onclick = () => {
	let info = {
		firstName: firstNameVal.value,
		lastName: lastNameVal.value,
		city: cityVal.value,
		address: addressVal.value,
		phone: phoneVal.value,
		email: emailVal.value,
	};
	let checkInfo = Object.values(info).every((o) => o !== "");
	if (checkInfo) {
		paymentInfo.pop();
		paymentInfo.push(info);
        localStorage.setItem("paymentInfo", JSON.stringify(paymentInfo));
        window.location = "payment.html"
	} else {
		alert("Vui lòng điền đầy đủ thông tin thanh toán");
	}
};

backBtn.onclick = () => {
	window.history.back();
};
