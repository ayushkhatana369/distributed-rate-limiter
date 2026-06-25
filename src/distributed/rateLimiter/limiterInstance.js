let limiter = null;

function setLimiter(instance) {

    limiter = instance;

}

function getLimiter() {

    return limiter;

}

module.exports = {

    setLimiter,

    getLimiter

};