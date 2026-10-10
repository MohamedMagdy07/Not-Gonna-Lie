export function convertToMs(value, unit) {
    switch (unit.toLowerCase()) {
        case 'hours':
            return value * 60 * 60 * 1000;

        case 'minutes':
            return value * 60 * 1000;

        case 'seconds':
            return value * 1000;

        default:
            throw new Error("Invalid unit. Please use 'hours', 'minutes', or 'seconds'.");
    }
}