document.addEventListener("DOMContentLoaded", () => {
	const buttonDecreaseElems = document.querySelectorAll(".sc-button-minus");
	const buttonIncreaseElems = document.querySelectorAll(".sc-button-plus");
	const productAmountCounterElem = document.getElementById("amount-counter");
	const productButtonDecreaseElem = document.getElementById("button-minus");
	const productButtonIncreaseElem = document.getElementById("button-plus");

	buttonDecreaseElems.forEach((btn) => btn.addEventListener("click", updateAmount));
	buttonIncreaseElems.forEach((btn) => btn.addEventListener("click", updateAmount));

	productButtonDecreaseElem?.addEventListener("click", updateProductAmount);
	productButtonIncreaseElem?.addEventListener("click", updateProductAmount);

	function updateAmount(event) {
		event.preventDefault(); // Prevent default button behavior

		// Find the closest form and its corresponding counter
		const form = this.closest("form");
		const amountCounter = form.querySelector(".sc-amount-counter");

		if (!amountCounter) return; // Ensure there's a counter to update

		const isIncrease = this.classList.contains("sc-button-plus");
		let value = parseInt(amountCounter.textContent, 10) || 0;

		value = isIncrease ? value + 1 : value - 1;
		if (value < 1) return;

		amountCounter.textContent = value;
	}

	function updateProductAmount(event) {
		event.preventDefault(); // Prevent default button behavior

		const isIncrease = this.classList.contains("sc-button-plus");
		let value = parseInt(productAmountCounterElem.textContent, 10) || 0;

		value = isIncrease ? value + 1 : value - 1;
		if (value < 1) return;

		productAmountCounterElem.textContent = value;
	}
});
