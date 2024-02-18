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

export const bidCalculation = (currentBal, minBid, playersToBeBought) => {
    console.log("currentBalfff", currentBal, minBid, playersToBeBought)
    let canBuy = currentBal - ((playersToBeBought-1)*minBid); //dropdown
    return canBuy;
}