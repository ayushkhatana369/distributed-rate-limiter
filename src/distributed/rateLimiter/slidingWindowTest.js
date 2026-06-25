const SlidingWindow =
    require("./slidingWindow");

const limiter =
    new SlidingWindow(
        3,
        5
    );

for (
    let i = 1;
    i <= 5;
    i++
) {

    console.log(
        "Request",
        i,
        limiter.allowRequest()
    );
}