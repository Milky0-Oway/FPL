const fetchData = (error: string) => {};

function withCreateError() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            let isToSend = confirm(`Do you want to save this error?
            ${args[1]}`);
            if (isToSend) {
                let prevErrors = localStorage.getItem('errors');
                if (prevErrors) {
                    prevErrors += ' ' + args[1];
                }
                else {
                    prevErrors = args[1];
                }
                prevErrors ? localStorage.setItem('error', prevErrors) : localStorage.setItem('error', '');
                prevErrors ? fetchData(prevErrors) : fetchData('');
            }
            return originalMethod.apply(this, args);
        };

        return descriptor;
    };
}

function withShowError() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            const error = `Error from decorator: ${args[0]}`;
            const inputElement = args[1];

            return originalMethod.apply(this, [error, inputElement]);
        };

        return descriptor;
    };
}

export class Validator {
    private errors: { [key: string]: string } = {};

    @withCreateError()
    createError(fieldName: string, message: string) {
        this.errors[fieldName] = message;
    }

    getErrors(): { [key: string]: string } {
        return this.errors;
    }

    @withShowError()
    showError(error: string, inputElement: HTMLElement | null) {
        if (inputElement instanceof HTMLElement) {
            inputElement.classList.add('error');
            let errorElement = inputElement.parentElement?.querySelector('.error-message') as HTMLElement;

            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                inputElement.parentElement?.appendChild(errorElement);
            }

            console.log(error);
            errorElement.textContent = error;
        } else {
            console.error('Invalid inputElement:', inputElement);
        }
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
            if (inputElement && !(inputElement instanceof HTMLElement)) {
                console.error('Invalid inputElement:', inputElement);
                continue;
            }

            if (inputElement && !(inputElement as HTMLInputElement).value) {
                this.createError(fieldName, `${fieldName} is required`);
            }
        }

        for (const [fieldName, inputElement] of Object.entries(inputs)) {
            if (inputElement && inputElement instanceof HTMLElement) {
                if (this.errors[fieldName]) {
                    this.showError(this.errors[fieldName], inputElement);
                } else {
                    this.hideError(inputElement);
                }
            }
        }

        return Object.keys(this.errors).length === 0;
    }
}