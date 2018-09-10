var generateMessage = (from, text) => {
    return {
        from,
        text,
        createAt: new Date().getTime(),
    }

};

var generateLocationMessage = (from, lat, lng) =>{
    return {
        from,
        message: `https://www.google.com/maps?q=${lat},${lng}`,
        createdAt: new Date().getTime(),
    }
}

module.exports = { generateMessage, generateLocationMessage };