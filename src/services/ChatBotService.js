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
            let first_response = { "text": `Chào mừng bạn ${username} đến với nhà hàng của chúng tôi.` }
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
                    "title": "Nhà hàng None kính chào quý khách",
                    "subtitle": "Dưới đây là các lựa chọn của nhà hàng.",
                    "image_url": IMAGE_GET_STARTED,
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "MENU CHÍNH",
                            "payload": "MAIN_MENU",
                        },
                        {
                            "type": "web_url",
                            "url": `${process.env.URL_WEB_VIEW_ORDER}/${sender_psid}`,
                            "title": "ĐẶT BÀN",
                            "webview_height_ratio": "tall",
                            "messenger_extensions": true //false: open the webview in new tab
                        },
                        {
                            "type": "postback",
                            "title": "HƯỚNG DẪN SỬ DỤNG BOT",
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
        "text": "Dưới đây là các lựa chọn của nhà hàng:",
        "quick_replies":[
            {
                "content_type":"text",
                "title": "MENU CHÍNH",
                "payload":"MAIN_MENU",
            },
            {
                "content_type":"text",
                "title": "HD SỬ DỤNG BOT",
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
                    "title": "Menu của nhà hàng",
                    "subtitle": "Chúng tôi hân hạnh mang tới cho bạn thực đơn phong phú cho bữa trưa và bữa tối.",
                    "image_url": IMAGE_MAIN_MENU_1,
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "BỮA TRƯA",
                            "payload": "LUNCH_MENU",
                        },
                        {
                            "type": "postback",
                            "title": "BỮA TỐI",
                            "payload": "DINNER_MENU",
                        }
                    ],
                    },
                    {
                        "title": "Giờ mở cửa",
                        "subtitle": "T2-T6 10h-23h | T7 17h-22h | CN 17h-21h",
                        "image_url": IMAGE_MAIN_MENU_2,
                        "buttons": [
                            {
                                "type": "web_url",
                                "url": `${process.env.URL_WEB_VIEW_ORDER}/${sender_psid}`,
                                "title": "ĐẶT BÀN",
                                "webview_height_ratio": "tall",
                                "messenger_extensions": true //false: open the webview in new tab
                            }
                        ],
                    },
                    {
                        "title": "Không gian nhà hàng",
                        "subtitle": "Nhà hàng có sức chứa lên tới 300 khách và phù hợp cho mọi thể loại bữa tiệc.",
                        "image_url": IMAGE_MAIN_MENU_3,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "CHI TIẾT",
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
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Món tráng miệng",
                        "subtitle": "Nhà hàng có nhiều món tráng miệng hấp dẫn",
                        "image_url": IMAGE_VIEW_APPETIZERS,
                        "buttons": [
                            {
                                // Appetizers
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "VIEW_APPETIZERS",
                            }
                        ],
                    },
                    {
                        "title": "Các loại cá",
                        "subtitle": "Nhiều món cá phù hợp với mọi loại khẩu vị",
                        "image_url": IMAGE_VIEW_FISH,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "VIEW_FISH",
                            }
                        ],
                    },
                    {
                        "title": "Thịt",
                        "subtitle": "Thơm ngon, hợp vệ sinh.",
                        "image_url": IMAGE_VIEW_MEAT,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "VIEW_MEAT",
                            }
                        ],
                    },

                    {
                        "title": "Quay trở lại",
                        "subtitle": "Quay trở lại menu chính",
                        "image_url": IMAGE_BACK_MAIN_MENU,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY TRỞ LẠI",
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
                        "title": "Món tráng miệng",
                        "subtitle": "Nhà hàng có nhiều món tráng miệng hấp dẫn",
                        "image_url": IMAGE_VIEW_APPETIZERS,
                        "buttons": [
                            {
                                // Appetizers
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "VIEW_APPETIZERS",
                            }
                        ],
                    },
                    {
                        "title": "Các loại cá",
                        "subtitle": "Nhiều món cá phù hợp với mọi loại khẩu vị",
                        "image_url": IMAGE_VIEW_FISH,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "VIEW_FISH",
                            }
                        ],
                    },
                    {
                        "title": "Thịt",
                        "subtitle": "Thơm ngon, hợp vệ sinh.",
                        "image_url": IMAGE_VIEW_MEAT,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "XEM CHI TIẾT",
                                "payload": "VIEW_MEAT",
                            }
                        ],
                    },

                    {
                        "title": "Quay trở lại",
                        "subtitle": "Quay trở lại menu chính",
                        "image_url": IMAGE_BACK_MAIN_MENU,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY TRỞ LẠI",
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
                        "title": "Dưa hấu",
                        "subtitle": "50.000đ/1kg",
                        "image_url": IMAGE_DETAIL_APPETIZER_1,
                    },
                    {
                        "title": "Xoài",
                        "subtitle": "20.000đ/1kg",
                        "image_url": IMAGE_DETAIL_APPETIZER_2,
                    },
                    {
                        "title": "Ổi",
                        "subtitle": "15.000đ/1kg",
                        "image_url": IMAGE_DETAIL_APPETIZER_3,

                    },
                    {
                        "title": "Quay trở lại",
                        "subtitle": "Quay trở lại menu chính",
                        "image_url": IMAGE_BACK_MAIN_MENU,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY TRỞ LẠI",
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
                        "title": "Cá hồi Châu Âu",
                        "subtitle": "350.000đ/1kg",
                        "image_url": IMAGE_DETAIL_FISH_1,

                    },
                    {
                        "title": "Cá chép om dưa",
                        "subtitle": "200.000đ/1kg",
                        "image_url": IMAGE_DETAIL_FISH_2,

                    },
                    {
                        "title": "Cá đuối nướng",
                        "subtitle": "300.000đ/1kg",
                        "image_url": IMAGE_DETAIL_FISH_3,

                    },

                    {
                        "title": "Quay trở lại",
                        "subtitle": "Quay trở lại menu chính",
                        "image_url": IMAGE_BACK_MAIN_MENU,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY TRỞ LẠI",
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
                        "title": "Thịt bò Kobe",
                        "subtitle": "500.000đ/1kg",
                        "image_url": IMAGE_DETAIL_MEAT_1,

                    },
                    {
                        "title": "Thịt bò Châu Mỹ",
                        "subtitle": "450.000đ/1kg",
                        "image_url": IMAGE_DETAIL_MEAT_2,

                    },
                    {
                        "title": "Thịt bò sốt vang",
                        "subtitle": "350.000đ/1kg",
                        "image_url": IMAGE_DETAIL_MEAT_3,

                    },
                    {
                        "title": "Quay trở lại",
                        "subtitle": "Quay trở lại menu chính",
                        "image_url": IMAGE_BACK_MAIN_MENU,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY TRỞ LẠI",
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
                "text":"Nhà hàng có thể phục vụ tối đa 300 khách",
                "buttons":[
                    {
                        "type":"postback",
                        "title":"MENU CHÍNH",
                        "payload":"MAIN_MENU"
                    },
                    {
                        "type": "web_url",
                        "url": `${process.env.URL_WEB_VIEW_ORDER}/${sender_psid}`,
                        "title": "ĐẶT BÀN",
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
            let first_response = { "text": `Chào mừng bạn ${username}, mình là chatbot của nhà hàng.
            \nBạn xem video dưới đây để biết cách sử dụng chatbot nhé.  😚 
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