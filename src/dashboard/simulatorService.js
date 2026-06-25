const limiterStore = require("../limiterStore");

async function simulateRequests(requests, user) {

    let allowed = 0;
    let blocked = 0;

    for (let i = 0; i < requests; i++) {

        const result = await limiterStore.checkLimit(user);

        if (result.allowed) {
            allowed++;
        }
        else {
            blocked++;
        }
    }

    return {
        user,
        total: requests,
        allowed,
        blocked
    };

}

module.exports = {
    simulateRequests
};