function main() {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = "https://maimaidx-eng.com/maimai-mobile/home/ratingTargetMusic/";
    document.body.appendChild(iframe);

    iframe.onload = () => {
        try {
            const scoreBackList = [
                '.music_basic_score_back',
                '.music_advanced_score_back',
                '.music_expert_score_back',
                '.music_master_score_back',
                '.music_remaster_score_back'
            ];

            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            const allSongs = iframeDoc.querySelectorAll(scoreBackList.join(", "));
            const songsData = [];

            function decodeHTMLEntities(str) {
                const textarea = document.createElement('textarea');
                textarea.innerHTML = str;
                textarea.remove();
                return textarea.value;
            }

            allSongs.forEach(e => {
                const difficulty = e.className.split(" ")[0].split("_")[1];
                const musicName = decodeHTMLEntities(e.querySelector(".music_name_block").innerHTML);
                const achievement = parseFloat(e.querySelector(".music_score_block").innerHTML.replaceAll("%", ""));
                const type = e.querySelector(".music_kind_icon").src.split("/").at(-1).split(".")[0].replaceAll("music_", "");

                const difficulty_abbreviation = {
                    "basic": 0,
                    "advanced": 1,
                    "expert": 2,
                    "master": 3,
                    "remaster": 4
                };

                songsData.push([
                    difficulty_abbreviation[difficulty],
                    musicName,
                    achievement,
                    type == "dx" ? 1 : ""
                ]);
            });

            const userData = {
                n: document.querySelector(".name_block").innerHTML,
                r: document.querySelector(".rating_block").innerHTML,
                m: songsData.slice(0, 50)
            };

            const text = encodeURIComponent(JSON.stringify(userData).replaceAll(`,""`, ""));

            completion(`https://caloutw.github.io/?p=MRC50&rd=${text}&v=1.3`);
        } catch (err) {
            alert("Please go to Maimai DX.");
            completion(`https://maimaidx-eng.com/maimai-mobile/home/ratingTargetMusic/`);
        }
    };
}

main();
