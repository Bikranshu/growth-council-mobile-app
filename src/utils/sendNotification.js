export const sendNotification =  (to, title, body, data) => new Promise(async (resolve , reject) => {
    const dataToSend  = {
        notification: {
            id: title,
            title: title,
            body: body,
          },
          data,
          to: to
    }

    try {
        const res = await fetch("https://fcm.googleapis.com/fcm/send", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'key=AAAAV_37kt8:APA91bENznXC165-D_pek-tXvCi3s-1eLLtG123jZopwqi-jdEvwW8agaGY1crttUeQttMAYjFJh2G4G6UO_zbs74hxCWfHMfqfA1D5asH4hvuQqaNONJsutYetixPmJRSpKhxbRZ-og',
            },
            body: JSON.stringify(dataToSend)
        })

        resolve(res);

    } catch(error){
        reject(error);
    }
}) 