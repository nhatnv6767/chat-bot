require("dotenv").config()
import request from "request";

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN

let callSendAPI = (sender_psid, response) => {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }
    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v14.0/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
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
            await callSendAPI(sender_psid, first_response)

            resolve("done")
        } catch (e) {
            reject(e);
        }
    })
}

let sendGetStartedTemplate = () => {

    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Is this the right picture?",
                    "subtitle": "Tap a button to answer.",
                    "image_url": attachment_url,
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "Yes!",
                            "payload": "yes",
                        },
                        {
                            "type": "postback",
                            "title": "No!",
                            "payload": "no",
                        }
                    ],
                }]
            }
        }
    }


    return response
}

module.exports = {
    handleGetStarted: handleGetStarted,
}