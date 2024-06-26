export class Validator {
    private errors: { [key: string]: string } = {};

    createError(fieldName: string, message: string) {
        this.errors[fieldName] = message;
    }

    getErrors(): { [key: string]: string } {
        return this.errors;
    }

    showError(fieldName: string, inputElement: HTMLElement) {
        inputElement.classList.add('error');
        let errorElement = inputElement.parentElement?.querySelector('.error-message') as HTMLElement;

        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            inputElement.parentElement?.appendChild(errorElement);
        }

        errorElement.innerText = this.errors[fieldName];
    }

    hideError(inputElement: HTMLElement) {
        inputElement.classList.remove('error');
        const errorElement = inputElement.parentElement?.querySelector('.error-message');
        if (errorElement && errorElement.parentElement === inputElement.parentElement) {
            inputElement.parentElement?.removeChild(errorElement);
        }
    }

    validate(inputs: { [key: string]: HTMLElement | null }) {
        this.errors = {};
        for (const [fieldName, inputElement] of Object.entries(inputs)) {
            if (inputElement && !(inputElement as HTMLInputElement).value) {
                this.createError(fieldName, `${fieldName} is required`);
            }
        }

        for (const [fieldName, inputElement] of Object.entries(inputs)) {
            if (inputElement) {
                if (this.errors[fieldName]) {
                    this.showError(fieldName, inputElement);
                } else {
                    this.hideError(inputElement);
                }
            }
        }

        return Object.keys(this.errors).length === 0;
    }
}