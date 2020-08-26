"use strict";
var form = document.getElementById('form');
var userId = document.getElementById('userId');
var email = document.getElementById('email');
var password = document.getElementById('password');
var password2 = document.getElementById('password2');
var modal = document.getElementById('modal');
var successBtn = document.getElementById('success');
var Field;
(function (Field) {
    Field["USERID"] = "UserId";
    Field["EMAIL"] = "Email";
    Field["PASSWORD"] = "Password";
    Field["PASSWORD2"] = "Password2";
})(Field || (Field = {}));
// check  password validation
function checkPassword(password, password2) {
    var value = password.value.trim();
    var value2 = password2.value.trim();
    var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!checkRequired(password)) {
        showError(password, getFieldName(password) + " \uC785\uB825\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.");
    }
    else if (!re.test(value)) {
        showError(password, '8자 이상 영문 대/소문자, 숫자, 특수문자를 사용하세요.');
    }
    else if (value !== value2) {
        showSuccess(password);
        showError(password2, '비밀번호가 일치하지 않습니다.');
    }
    else {
        showSuccess(password);
        showSuccess(password2);
        return true;
    }
    return false;
}
// Check email validation
function checkEmail(email) {
    var value = email.value.trim();
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!checkRequired(email)) {
        showError(email, getFieldName(email) + " \uC785\uB825\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.");
    }
    else if (!re.test(value)) {
        showError(email, '유효한 이메일 형식이 아닙니다.');
    }
    else {
        showSuccess(email);
        return true;
    }
    return false;
}
// Check user id validation
function checkUserId(userId) {
    var value = userId.value.trim();
    var re = /^[a-z0-9]{5,12}$/;
    if (!checkRequired(userId)) {
        showError(userId, getFieldName(userId) + " \uC785\uB825\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.");
    }
    else if (!re.test(value)) {
        showError(userId, '5~12자의 영문 소문자, 숫자만 사용 가능합니다.');
    }
    else {
        showSuccess(userId);
        return true;
    }
    return false;
}
// Translate English to Korean
function getKrFieldName(enTitle) {
    if (enTitle === Field.USERID) {
        return '아이디';
    }
    else if (enTitle === Field.EMAIL) {
        return '이메일';
    }
    else if (enTitle === Field.PASSWORD) {
        return '비밀번호';
    }
    else if (enTitle === Field.PASSWORD2) {
        return '비밀번호 확인';
    }
}
// Get Korean field name from English field name
function getFieldName(input) {
    return getKrFieldName(input.id.charAt(0).toUpperCase() + input.id.slice(1));
}
// Check field required
function checkRequired(input) {
    if (input.value.trim() === '') {
        return false;
    }
    return true;
}
// Show error or success
function showError(input, message) {
    var formControl = input.parentElement;
    formControl.className = 'form-control error';
    var small = formControl.querySelector('small');
    small.innerText = message;
}
function showSuccess(input) {
    var formControl = input.parentElement;
    formControl.className = 'form-control success';
}
// Submit event
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (checkUserId(userId) &&
        checkEmail(email) &&
        checkPassword(password, password2)) {
        modal.classList.add('show');
    }
});
// Input each field event
userId.addEventListener('input', function () {
    checkUserId(userId);
});
email.addEventListener('input', function () {
    checkEmail(email);
});
password.addEventListener('input', function () {
    checkPassword(password, password2);
});
password2.addEventListener('input', function () {
    checkPassword(password, password2);
});
// Click modal button event
successBtn.addEventListener('click', function () {
    window.location.reload();
});
