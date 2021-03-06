require("dotenv").config()
import request from "request";

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN
const IMAGE_GET_STARTED = "https://bit.ly/3xTWihv"
const IMAGE_MAIN_MENU_1 = "https://bit.ly/3Agy7N8"
const IMAGE_MAIN_MENU_2 = "https://bit.ly/3a6VFJw"
const IMAGE_MAIN_MENU_3 = "https://bit.ly/3a6VU7o"

const IMAGE_VIEW_APPETIZERS = "https://bit.ly/3OOOSD7"
const IMAGE_VIEW_FISH = "https://bit.ly/3HPYvz3"
const IMAGE_VIEW_MEAT = "https://bit.ly/3xNHCQI"

const IMAGE_BACK_MAIN_MENU = "https://bit.ly/3xPcMaA"

const IMAGE_DETAIL_APPETIZER_1 = "https://bit.ly/3nkp2eh"
const IMAGE_DETAIL_APPETIZER_2 = "https://bit.ly/3bjzXCb"
const IMAGE_DETAIL_APPETIZER_3 = "https://bit.ly/3nhK6SH"


const IMAGE_DETAIL_FISH_1 = "https://bit.ly/3nl7vTb"
const IMAGE_DETAIL_FISH_2 = "https://bit.ly/3ynZQtL"
const IMAGE_DETAIL_FISH_3 = "https://bit.ly/39SZUYW"


const IMAGE_DETAIL_MEAT_1 = "https://bit.ly/3bsPnnN"
const IMAGE_DETAIL_MEAT_2 = "https://bit.ly/3QV0ne6"
const IMAGE_DETAIL_MEAT_3 = "https://bit.ly/3OrvBI2"

const IMAGE_DETAIL_ROOMS = "https://bit.ly/3nlgCUc"

const IMAGE_GIF_WELCOME = "https://bit.ly/3nzlUex"

let callSendAPI =  (sender_psid, response) => {
    return new Promise(async(resolve, reject) => {
        try {
            // Construct the message body
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "message": response
            }

            await sendMarkReadMessage(sender_psid)
            await sendTypingOn(sender_psid)
            // Send the HTTP request to the Messenger Platform
            request({
                "uri": "https://graph.facebook.com/v14.0/me/messages",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                console.log(body)
                if (!err) {
                    resolve('message sent!')
                } else {
                    console.error("Unable to send message:" + err);
                }
            });

        }catch (e) {
            reject(e);
        }
    })

}

let sendTypingOn = (sender_psid) => {
    return new Promise((resolve, reject) => {
        try {
            // Construct the message body
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "sender_action":"typing_on"
            }
            // Send the HTTP request to the Messenger Platform
            request({
                // 101038356003024
                "uri": "https://graph.facebook.com/v14.0/me/messages",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                if (!err) {
                    resolve('sendTypingOn!')
                } else {
                    console.error("Unable to sendTypingOn:" + err);
                }
            });
        } catch (e) {
            reject(e);
        }

    })

}

let sendMarkReadMessage = (sender_psid) => {
    return new Promise((resolve, reject) => {
        try {
            // Construct the message body
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "sender_action":"mark_seen"
            }
            // Send the HTTP request to the Messenger Platform
            request({
                // 101038356003024
                "uri": "https://graph.facebook.com/v14.0/me/messages",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                if (!err) {
                    resolve('sendMarkReadMessage!')
                } else {
                    console.error("Unable to sendMarkReadMessage:" + err);
                }
            });
        }catch (e) {
            reject(e);
        }

    })
}

let getUserName =  (sender_psid) => {
    return new Promise((resolve, reject) => {
        // Send the HTTP request to the Messenger Platform
        request({
            "uri": `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic`,
            "qs": { "access_token": PAGE_ACCESS_TOKEN },
            "method": "GET",
        }, (err, res, body) => {
            console.log(body)
            if (!err) {
                body = JSON.parse(body)
                let username = `${body.last_name} ${body.first_name}`
                resolve(username)
            } else {
                console.error("Unable to send message:" + err);
                reject(err)
            }
        });
    })
}

let handleGetStarted = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let username = await getUserName(sender_psid)
            let first_response = { "text": `Ch??o m???ng b???n ${username} ?????n v???i nh?? h??ng c???a ch??ng t??i.` }
            // let second_response = getStartedTemplate(sender_psid)

            // send an image
            let second_response = getImageGetStartedTemplate()
            let third_response = getStartedQuickReplyTemplate(sender_psid)

            // send text message
            await callSendAPI(sender_psid, first_response)

            // send an image
            await callSendAPI(sender_psid, second_response)

            // send a quick reply
            await callSendAPI(sender_psid, third_response)

            resolve("done")
        } catch (e) {
            reject(e);
        }
    })
}

let getStartedTemplate = (sender_psid) => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Nh?? h??ng None k??nh ch??o qu?? kh??ch",
                    "subtitle": "D?????i ????y l?? c??c l???a ch???n c???a nh?? h??ng.",
                    "image_url": IMAGE_GET_STARTED,
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "MENU CH??NH",
                            "payload": "MAIN_MENU",
                        },
                        {
                            "type": "web_url",
                            "url": `${process.env.URL_WEB_VIEW_ORDER}/${sender_psid}`,
                            "title": "?????T B??N",
                            "webview_height_ratio": "tall",
                            "messenger_extensions": true //false: open the webview in new tab
                        },
                        {
                            "type": "postback",
                            "title": "H?????NG D???N S??? D???NG BOT",
                            "payload": "GUIDE_TO_USE",
                        }
                    ],
                }]
            }
        }
    }


    return response
}

let getImageGetStartedTemplate = () => {
    let response = {
        "attachment":{
            "type":"image",
            "payload":{
                "url": IMAGE_GIF_WELCOME,
                "is_reusable":true
            }
        }
    }

    return response
}

let getStartedQuickReplyTemplate = (sender_psid) => {
    let response = {
        "text": "D?????i ????y l?? c??c l???a ch???n c???a nh?? h??ng:",
        "quick_replies":[
            {
                "content_type":"text",
                "title": "MENU CH??NH",
                "payload":"MAIN_MENU",
            },
            {
                "content_type":"text",
                "title": "HD S??? D???NG BOT",
                "payload":"GUIDE_TO_USE",
            }
        ]
    }

    return response
}

let handleSendMainMenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let first_response = getMainMenuTemplate(sender_psid)
            await callSendAPI(sender_psid, first_response)

            resolve("done")
        } catch (e) {
            reject(e);
        }
    })
}

let getMainMenuTemplate = (sender_psid) => {

    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                    "title": "Menu c???a nh?? h??ng",
                    "subtitle": "Ch??ng t??i h??n h???nh mang t???i cho b???n th???c ????n phong ph?? cho b???a tr??a v?? b???a t???i.",
                    "image_url": IMAGE_MAIN_MENU_1,
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "B???A TR??A",
                            "payload": "LUNCH_MENU",
                        },
                        {
                            "type": "postback",
                            "title": "B???A T???I",
                            "payload": "DINNER_MENU",
                        }
                    ],
                    },
                    {
                        "title": "Gi??? m??? c???a",
                        "subtitle": "T2-T6 10h-23h | T7 17h-22h | CN 17h-21h",
                        "image_url": IMAGE_MAIN_MENU_2,
                        "buttons": [
                            {
                                "type": "web_url",
                                "url": `${process.env.URL_WEB_VIEW_ORDER}/${sender_psid}`,
                                "title": "?????T B??N",
                                "webview_height_ratio": "tall",
                                "messenger_extensions": true //false: open the webview in new tab
                            }
                        ],
                    },
                    {
                        "title": "Kh??ng gian nh?? h??ng",
                        "subtitle": "Nh?? h??ng c?? s???c ch???a l??n t???i 300 kh??ch v?? ph?? h???p cho m???i th??? lo???i b???a ti???c.",
                        "image_url": IMAGE_MAIN_MENU_3,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "CHI TI???T",
                                "payload": "SHOW_ROOMS",
                            }
                        ],
                    }
                ]
            }
        }
    }


    return response
}

let handleSendLunchMenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let first_response = getLunchMenuTemplate()
            await callSendAPI(sender_psid, first_response)

            resolve("done")
        } catch (e) {
            reject(e);
        }
    })
}

let getLunchMenuTemplate = () => {
    // get data from database


    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "M??n tr??ng mi???ng",
                        "subtitle": "Nh?? h??ng c?? nhi???u m??n tr??ng mi???ng h???p d???n",
                        "image_url": IMAGE_VIEW_APPETIZERS,
                        "buttons": [
                            {
                                // Appetizers
                                "type": "postback",
                                "title": "XEM CHI TI???T",
                                "payload": "VIEW_APPETIZERS",
                            }
                        ],
                    },
                    {
                        "title": "C??c lo???i c??",
                        "subtitle": "Nhi???u m??n c?? ph?? h???p v???i m???i lo???i kh???u v???",
                        "image_url": IMAGE_VIEW_FISH,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TI???T",
                                "payload": "VIEW_FISH",
                            }
                        ],
                    },
                    {
                        "title": "Th???t",
                        "subtitle": "Th??m ngon, h???p v??? sinh.",
                        "image_url": IMAGE_VIEW_MEAT,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TI???T",
                                "payload": "VIEW_MEAT",
                            }
                        ],
                    },

                    {
                        "title": "Quay tr??? l???i",
                        "subtitle": "Quay tr??? l???i menu ch??nh",
                        "image_url": IMAGE_BACK_MAIN_MENU,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY TR??? L???I",
                                "payload": "BACK_TO_MAIN_MENU",
                            }
                        ],
                    }
                ]
            }
        }
    }


    return response
}

let handleSendDinnerMenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let first_response = getDinnerMenuTemplate()
            await callSendAPI(sender_psid, first_response)

            resolve("done")
        } catch (e) {
            reject(e);
        }
    })
}

let getDinnerMenuTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "M??n tr??ng mi???ng",
                        "subtitle": "Nh?? h??ng c?? nhi???u m??n tr??ng mi???ng h???p d???n",
                        "image_url": IMAGE_VIEW_APPETIZERS,
                        "buttons": [
                            {
                                // Appetizers
                                "type": "postback",
                                "title": "XEM CHI TI???T",
                                "payload": "VIEW_APPETIZERS",
                            }
                        ],
                    },
                    {
                        "title": "C??c lo???i c??",
                        "subtitle": "Nhi???u m??n c?? ph?? h???p v???i m???i lo???i kh???u v???",
                        "image_url": IMAGE_VIEW_FISH,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TI???T",
                                "payload": "VIEW_FISH",
                            }
                        ],
                    },
                    {
                        "title": "Th???t",
                        "subtitle": "Th??m ngon, h???p v??? sinh.",
                        "image_url": IMAGE_VIEW_MEAT,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TI???T",
                                "payload": "VIEW_MEAT",
                            }
                        ],
                    },

                    {
                        "title": "Quay tr??? l???i",
                        "subtitle": "Quay tr??? l???i menu ch??nh",
                        "image_url": IMAGE_BACK_MAIN_MENU,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY TR??? L???I",
                                "payload": "BACK_TO_MAIN_MENU",
                            }
                        ],
                    }
                ]
            }
        }
    }


    return response
}

let handleBackToMainMenu = async (sender_psid) => {
    await handleSendMainMenu(sender_psid)
}

let handleDetailViewAppetizer = async (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = getDetailViewApppetizerTemplate()
            await callSendAPI(sender_psid, response)

            resolve("done")
        } catch (e) {
            reject(e);
        }
    })
}

let getDetailViewApppetizerTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "D??a h???u",
                        "subtitle": "50.000??/1kg",
                        "image_url": IMAGE_DETAIL_APPETIZER_1,
                    },
                    {
                        "title": "Xo??i",
                        "subtitle": "20.000??/1kg",
                        "image_url": IMAGE_DETAIL_APPETIZER_2,
                    },
                    {
                        "title": "???i",
                        "subtitle": "15.000??/1kg",
                        "image_url": IMAGE_DETAIL_APPETIZER_3,

                    },
                    {
                        "title": "Quay tr??? l???i",
                        "subtitle": "Quay tr??? l???i menu ch??nh",
                        "image_url": IMAGE_BACK_MAIN_MENU,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY TR??? L???I",
                                "payload": "BACK_TO_MAIN_MENU",
                            }
                        ],
                    }
                ]
            }
        }
    }


    return response
}

let handleDetailViewFish = async (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = getDetailViewFishTemplate()
            await callSendAPI(sender_psid, response)

            resolve("done")
        } catch (e) {
            reject(e);
        }
    })
}

let getDetailViewFishTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "C?? h???i Ch??u ??u",
                        "subtitle": "350.000??/1kg",
                        "image_url": IMAGE_DETAIL_FISH_1,

                    },
                    {
                        "title": "C?? ch??p om d??a",
                        "subtitle": "200.000??/1kg",
                        "image_url": IMAGE_DETAIL_FISH_2,

                    },
                    {
                        "title": "C?? ??u???i n?????ng",
                        "subtitle": "300.000??/1kg",
                        "image_url": IMAGE_DETAIL_FISH_3,

                    },

                    {
                        "title": "Quay tr??? l???i",
                        "subtitle": "Quay tr??? l???i menu ch??nh",
                        "image_url": IMAGE_BACK_MAIN_MENU,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY TR??? L???I",
                                "payload": "BACK_TO_MAIN_MENU",
                            }
                        ],
                    }
                ]
            }
        }
    }


    return response
}

let handleDetailViewMeat = async (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = getDetailViewMeatTemplate()
            await callSendAPI(sender_psid, response)

            resolve("done")
        } catch (e) {
            reject(e);
        }
    })
}

let getDetailViewMeatTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Th???t b?? Kobe",
                        "subtitle": "500.000??/1kg",
                        "image_url": IMAGE_DETAIL_MEAT_1,

                    },
                    {
                        "title": "Th???t b?? Ch??u M???",
                        "subtitle": "450.000??/1kg",
                        "image_url": IMAGE_DETAIL_MEAT_2,

                    },
                    {
                        "title": "Th???t b?? s???t vang",
                        "subtitle": "350.000??/1kg",
                        "image_url": IMAGE_DETAIL_MEAT_3,

                    },
                    {
                        "title": "Quay tr??? l???i",
                        "subtitle": "Quay tr??? l???i menu ch??nh",
                        "image_url": IMAGE_BACK_MAIN_MENU,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY TR??? L???I",
                                "payload": "BACK_TO_MAIN_MENU",
                            }
                        ],
                    }
                ]
            }
        }
    }


    return response
}

let handleShowDetailRooms = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            // send an image
            let first_response = getImageRoomsTemplates()
            // send a button template: text, buttons
            let second_response = getButtonRoomsTemplate(sender_psid)
            await callSendAPI(sender_psid, first_response)
            await callSendAPI(sender_psid, second_response)
            resolve("done")
        } catch (e) {
            reject(e);
        }
    })
}

let getImageRoomsTemplates = () => {
    let response = {
        "attachment":{
            "type":"image",
            "payload":{
                "url": IMAGE_DETAIL_ROOMS,
                "is_reusable":true
            }
        }
    }

    return response
}

let getButtonRoomsTemplate = (sender_psid) => {

    let response = {
        "attachment":{
            "type":"template",
            "payload":{
                "template_type":"button",
                "text":"Nh?? h??ng c?? th??? ph???c v??? t???i ??a 300 kh??ch",
                "buttons":[
                    {
                        "type":"postback",
                        "title":"MENU CH??NH",
                        "payload":"MAIN_MENU"
                    },
                    {
                        "type": "web_url",
                        "url": `${process.env.URL_WEB_VIEW_ORDER}/${sender_psid}`,
                        "title": "?????T B??N",
                        "webview_height_ratio": "tall",
                        "messenger_extensions": true //false: open the webview in new tab
                    }

                ]
            }
        }
    }

    return response
}

let handleGuideToUseBot = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let username = await getUserName(sender_psid)
            let first_response = { "text": `Ch??o m???ng b???n ${username}, m??nh l?? chatbot c???a nh?? h??ng.
            \nB???n xem video d?????i ????y ????? bi???t c??ch s??? d???ng chatbot nh??.  ???? 
            ` }
            let second_response = getBotMediaTemplate(sender_psid)
            await callSendAPI(sender_psid, first_response)
            await callSendAPI(sender_psid, second_response)
            resolve("done")
        } catch (e) {
            reject(e);
        }
    })
}

let getBotMediaTemplate = (sender_psid) => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "media",
                "elements": [
                    {
                        "media_type": "video",
                        "url": "https://business.facebook.com/nhahangnone66/videos/579079407078360",

                        "buttons": [
                            {
                                "type": "postback",
                                "title": "MENU CH??NH",
                                "payload": "MAIN_MENU"
                            },
                            {
                                "type": "web_url",
                                "title": "Channel Youtube",
                                "url": "https://www.youtube.com/user/ANNnewsCH",
                                "webview_height_ratio": "full"
                            }
                        ]
                    }
                ]
            }
        }
    }

    return response
}

module.exports = {
    handleGetStarted: handleGetStarted,
    handleSendMainMenu: handleSendMainMenu,
    handleSendLunchMenu: handleSendLunchMenu,
    handleSendDinnerMenu: handleSendDinnerMenu,
    handleBackToMainMenu: handleBackToMainMenu,
    handleDetailViewAppetizer: handleDetailViewAppetizer,
    handleDetailViewFish: handleDetailViewFish,
    handleDetailViewMeat: handleDetailViewMeat,
    handleShowDetailRooms: handleShowDetailRooms,
    callSendAPI: callSendAPI,
    getUserName: getUserName,
    handleGuideToUseBot: handleGuideToUseBot,
}