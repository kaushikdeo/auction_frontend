export const setItem = (item, name) => {
    localStorage.setItem(name, JSON.stringify(item));
}

export const getItem = (name) => {
    try {
        const fetchedItem = JSON.parse(localStorage.getItem(name));
        return fetchedItem
    } catch (error) {
        throw new Error("Unable to fetch item from local storage with name as", name)
    }
}

export const clearItem = (name) => {
    try {
        localStorage.removeItem(name);   
    } catch (error) {
        throw new Error("Unable to clear item from local storage with name as", name)
    }
}