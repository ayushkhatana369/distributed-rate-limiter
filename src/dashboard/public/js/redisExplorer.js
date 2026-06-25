
function updateRedisExplorer(data) {

    const panel =
        document.getElementById(
            "redisPanel"
        );

    if (
        !data.miniRedis ||
        data.miniRedis.keys.length === 0
    ) {

        panel.innerHTML = `

            <p>

                No keys found.

            </p>

        `;

        return;
    }

    let html = "";

    data.miniRedis.keys.forEach(entry => {

        html += `

            <div class="redisKey">

                <div>

                    <strong>

                        ${entry.key}

                    </strong>

                </div>

                <div>

                    ${entry.value}

                </div>

            </div>

        `;

    });

    panel.innerHTML = html;

}