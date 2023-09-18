export const allRequirements = [
    { regex: /.{8,}/, text: 'At least 8 characters length' },
    { regex: /[0-9]/, text: 'At least 1 number (0...9)'},
    { regex: /[a-z]/, text: 'At least 1 lowercase letter (a...z)'},
    { regex: /[^A-Za-z0-9]/, text: 'At least 1 special symbol (!...$)'},
    { regex: /[A-Z]/, text: 'At least 1 uppercase letter (A-Z)'},
]