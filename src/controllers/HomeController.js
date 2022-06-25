let getHomePage = (req, res) => {
    // because config viewEngine
    return res.render('homepage.ejs')
}

let postWebhook = (req, res) => {

}

let getWebhook = (req, res) => {

}

module.exports = {
    getHomePage: getHomePage,
    postWebhook: postWebhook,
    getWebhook: getWebhook,
}