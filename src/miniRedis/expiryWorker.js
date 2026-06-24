function startExpiryWorker(store) {

    setInterval(() => {

        for (
            const [key, expiry]
            of store.expiry
        ) {

            if (
                Date.now() > expiry
            ) {

                store.del(key);

                console.log(
                    "Expired:",
                    key
                );

            }

        }

    }, 1000);

}

module.exports =
    startExpiryWorker;