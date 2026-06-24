class VectorClock {

    constructor() {

        this.clock = {};
    }

    increment(nodeId) {

        if (
            !this.clock[nodeId]
        ) {

            this.clock[nodeId] = 0;
        }

        this.clock[nodeId]++;
    }

    getClock() {

        return {
            ...this.clock
        };
    }

    compare(otherClock) {

        let greater = false;
        let less = false;

        const nodes =
            new Set([
                ...Object.keys(this.clock),
                ...Object.keys(otherClock)
            ]);

        for (
            const node
            of nodes
        ) {

            const a =
                this.clock[node] || 0;

            const b =
                otherClock[node] || 0;

            if (a > b) {
                greater = true;
            }

            if (a < b) {
                less = true;
            }
        }

        if (
            greater &&
            !less
        ) {

            return 1;
        }

        if (
            less &&
            !greater
        ) {

            return -1;
        }

        if (
            !greater &&
            !less
        ) {

            return 0;
        }

        return null;
    }
}

module.exports =
    VectorClock;