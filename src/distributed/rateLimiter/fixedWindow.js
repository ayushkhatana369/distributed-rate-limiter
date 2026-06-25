class FixedWindow {

    constructor(
        limit,
        windowSize
    ) {

        this.limit =
            limit;

        this.windowSize =
            windowSize;

        this.count = 0;

        this.windowStart =
            Date.now();
    }

    allowRequest() {

        const now =
            Date.now();

        if (

            now - this.windowStart >=

            this.windowSize * 1000

        ) {

            this.count = 0;

            this.windowStart = now;
        }

        if (

            this.count < this.limit

        ) {

            this.count++;

            return true;
        }

        return false;
    }

    getInfo() {

        return {

            limit:
                this.limit,

            count:
                this.count,

            windowSize:
                this.windowSize

        };
    }
}

module.exports =
    FixedWindow;