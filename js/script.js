"use strict"

document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form);

		let formData = new FormData(form);

		if (error === 0) {
			form.classList.add('_sending');

			let response = await fetch('sendmail.php', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				formPreview.innerHTML = '';
				form.reset();
				form.classList.remove('_sending');
			}
		} 
		else {
			alert('Заполните обязательные поля');
		}


		function formValidate(form) {
			let error = 0;
			let formReq = document.querySelectorAll('.req');

			for (let index = 0; index < formReq.length; index++) {
				const input = formReq[index];
				formRemoveError(input);

				if (input.classList.contains('email')) {
					if (emailTest(input)) {
						formAddError(input);
						error++;
					}
				} else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
					formAddError(input);
					error++;
				} else {
					if (input.value === '') {
						formAddError(input);
						error++;
					}
				}
			}
			return error;
		}
	}

	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}

	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}
	//Функция текста email
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	};
});


const addMore = document.querySelector('.form__link');
const formBtn = document.querySelector('.form__button');
const form2 = document.querySelector('.form2');
const form1 = document.querySelector('.form1');
if (addMore) {
	addMore.addEventListener("click", function (e) {
		form2.classList.remove('active-none');
		form2.classList.add('active-item');
		form1.classList.toggle('active-none');
	});
};

const addMoreTwo = document.querySelector('.next2');
if (addMoreTwo) {
	addMoreTwo.addEventListener("click", function (e) {
		form1.classList.remove('active-none');
		form1.classList.add('active-item');
		form2.classList.add('active-none');
	});
};

const btnBack = document.querySelector('.form__back');
if (btnBack) {
	btnBack.addEventListener("click", function (e) {
		form1.classList.add('active-item');
	});
};

// Radio buttons 
$.each($('.options__item'), function (index, val) {
	if ($(this).find('input').prop('checked') == true) {
		$(this).addClass('active');
	}
});
$(document).on('click', '.options__item', function (event) {
	$(this).parents('.options').find('.options__item').removeClass('active');
	$(this).parents('.options').find('.options__item input').prop('checked', false);
	$(this).toggleClass('active');
	$(this).find('input').prop('checked', true);
	return false;
});
//




