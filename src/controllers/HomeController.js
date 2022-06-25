let getHomePage = (req, res) => {
    // because config viewEngine
    return res.render('homepage.ejs')
}

module.exports = {
    getHomePage: getHomePage,
}