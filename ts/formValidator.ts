const form = document.getElementById('form') as HTMLFormElement;
const userId = document.getElementById('userId') as HTMLInputElement;
const email = document.getElementById('email') as HTMLInputElement;
const password = document.getElementById('password') as HTMLInputElement;
const password2 = document.getElementById('password2') as HTMLInputElement;

const modal = document.getElementById('modal') as HTMLDivElement;
const successBtn = document.getElementById('success') as HTMLButtonElement;

enum Field {
  USERID = 'UserId',
  EMAIL = 'Email',
  PASSWORD = 'Password',
  PASSWORD2 = 'Password2',
}

// check  password validation
function checkPassword(
  password: HTMLInputElement,
  password2: HTMLInputElement
) {
  const value = password.value.trim();
  const value2 = password2.value.trim();
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!checkRequired(password)) {
    showError(password, `${getFieldName(password)} 입력이 필요합니다.`);
  } else if (!re.test(value)) {
    showError(
      password,
      '8자 이상 영문 대/소문자, 숫자, 특수문자를 사용하세요.'
    );
  } else if (value !== value2) {
    showSuccess(password);
    showError(password2, '비밀번호가 일치하지 않습니다.');
  } else {
    showSuccess(password);
    showSuccess(password2);
    return true;
  }
  return false;
}

// Check email validation
function checkEmail(email: HTMLInputElement) {
  const value = email.value.trim();
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!checkRequired(email)) {
    showError(email, `${getFieldName(email)} 입력이 필요합니다.`);
  } else if (!re.test(value)) {
    showError(email, '유효한 이메일 형식이 아닙니다.');
  } else {
    showSuccess(email);
    return true;
  }
  return false;
}

// Check user id validation
function checkUserId(userId: HTMLInputElement) {
  const value = userId.value.trim();
  const re = /^[a-z0-9]{5,12}$/;

  if (!checkRequired(userId)) {
    showError(userId, `${getFieldName(userId)} 입력이 필요합니다.`);
  } else if (!re.test(value)) {
    showError(userId, '5~12자의 영문 소문자, 숫자만 사용 가능합니다.');
  } else {
    showSuccess(userId);
    return true;
  }
  return false;
}

// Translate English to Korean
function getKrFieldName(enTitle: string) {
  if (enTitle === Field.USERID) {
    return '아이디';
  } else if (enTitle === Field.EMAIL) {
    return '이메일';
  } else if (enTitle === Field.PASSWORD) {
    return '비밀번호';
  } else if (enTitle === Field.PASSWORD2) {
    return '비밀번호 확인';
  }
}

// Get Korean field name from English field name
function getFieldName(input: HTMLInputElement) {
  return getKrFieldName(input.id.charAt(0).toUpperCase() + input.id.slice(1));
}

// Check field required
function checkRequired(input: HTMLInputElement) {
  if (input.value.trim() === '') {
    return false;
  }
  return true;
}

// Show error or success
function showError(input: HTMLInputElement, message: string) {
  const formControl = input.parentElement as HTMLDivElement;
  formControl.className = 'form-control error';

  const small = formControl.querySelector('small') as HTMLElement;
  small.innerText = message;
}

function showSuccess(input: HTMLInputElement) {
  const formControl = input.parentElement as HTMLDivElement;
  formControl.className = 'form-control success';
}

// Submit event
form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (
    checkUserId(userId) &&
    checkEmail(email) &&
    checkPassword(password, password2)
  ) {
    modal.classList.add('show');
  }
});

// Input each field event
userId.addEventListener('input', () => {
  checkUserId(userId);
});

email.addEventListener('input', () => {
  checkEmail(email);
});

password.addEventListener('input', () => {
  checkPassword(password, password2);
});

password2.addEventListener('input', () => {
  checkPassword(password, password2);
});

// Click modal button event
successBtn.addEventListener('click', () => {
  window.location.reload();
});
