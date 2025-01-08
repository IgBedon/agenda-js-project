const validator = require('validator');

export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if(!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e)
        })
    }

    validate(e) {
        const element = e.target;
        this.clearErrors();
        const emailInput = element.querySelector('input[name="email"]');
        const passwordInput = element.querySelector('input[name="password"]');
        let error = false;

        if(!validator.isEmail(emailInput.value)) {
            this.showErrors(element, '.cadastro-email', "E-mail inválido");
            error = true;
        }

        if(passwordInput.value.length < 3 || passwordInput.value.length > 50) {
            this.showErrors(element, '.cadastro-password', "Senha deve ter entre 3 e 50 caracteres");
            error = true;
        }

        if(!error) element.submit();
    }

    clearErrors() {
        const errors = document.querySelectorAll('.errors');
        if(errors.length > 0) errors.forEach(error => error.remove());
    }

    showErrors(element, selector, text) {
        const message = document.createElement('p');
        message.classList.add('errors');
        message.innerHTML = text;
        message.style.color = 'red';
        element.querySelector(selector).appendChild(message);
    }
}