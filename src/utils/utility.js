export const convertNumbers = (number) => {
    if(number) {
        let digits = number.toString().length
        console.log("Number---", number,digits)
        if (digits > 7) {
            return `${number/10000000} Cr`;
        } else if (digits >= 6) {
            return `${number/100000} L`;
        } else if (digits >= 5) {
            return `${number/100000} k`;
        } else {
            return number
        }
    } else {
        return number
    }
}