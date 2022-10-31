export function isEmpty(value: any): boolean {
    return value === undefined || value === null || value === '';
}

export function isEmail(value: any): boolean {
    return value && value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
}

export function isPhone(value: any): boolean {
    return value && value.match(/^[0-9]{10}$/);
}

export function isStrongPassword(value: any): boolean {
    return value && value.length >= 10 && value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
}
export function isPassword(value: any): boolean {
    return value && value.length >= 10;
}
