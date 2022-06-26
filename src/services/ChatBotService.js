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

let getUserName = async (sender_psid) => {
    let username = ""
    // Send the HTTP request to the Messenger Platform
    await request({
        "uri": `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic`,
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "GET",
    }, (err, res, body) => {
        console.log(body)
        if (!err) {
            let response = JSON.parse(res)
            username = `${response.last_name} ${response.first_name}`
        } else {
            console.error("Unable to send message:" + err);
        }
    });
    return username;
}

let handleGetStarted = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let username = await getUserName(sender_psid)
            let response = { "text": `Chào mừng bạn ${username} đến với nhà hàng của chúng tôi.` }
            await callSendAPI(sender_psid, response)
            resolve("done")
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleGetStarted: handleGetStarted,
}