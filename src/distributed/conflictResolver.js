class ConflictResolver {

    static resolve(
        versionA,
        versionB,
        compareResult
    ) {

        if (compareResult === 1) {
            return versionA;
        }

        if (compareResult === -1) {
            return versionB;
        }

        return [
            versionA,
            versionB
        ];
    }
}

module.exports =
    ConflictResolver;