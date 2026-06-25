class SlidingWindow {

    constructor(
        limit,
        windowSize
    ) {

        this.limit = limit;
        this.windowSize = windowSize;

        this.timestamps = [];
    }

    allowRequest() {

        const now =
            Date.now();

        this.timestamps =
            this.timestamps.filter(
                time =>
                    now - time <
                    this.windowSize * 1000
            );

        if (
            this.timestamps.length >=
            this.limit
        ) {

            return false;
        }

        this.timestamps.push(
            now
        );

        return true;
    }

    getInfo() {

        return {

            limit:
                this.limit,

            windowSize:
                this.windowSize,

            requests:
                this.timestamps.length

        };
    }
}

module.exports =
    SlidingWindow;