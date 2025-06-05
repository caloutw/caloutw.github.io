const server = "https://caloutw.github.io";
const version = "1.4";

function main() {
    const DX_Rating_iframe = document.createElement("iframe");
    DX_Rating_iframe.src = "https://maimaidx-eng.com/maimai-mobile/home/ratingTargetMusic/";
    DX_Rating_iframe.style = "display:none;"
    document.body.appendChild(DX_Rating_iframe);

    function decodeHTMLEntities(str) {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = str;
        textarea.remove();
        return textarea.value;
    }

    DX_Rating_iframe.addEventListener("load", () => {
        let result = false;
        try {
            const DX_Rating_Document = DX_Rating_iframe.contentDocument || DX_Rating_iframe.contentWindow.document;
            let playerData = {
                n: DX_Rating_Document?.querySelector(".name_block")?.innerHTML,
                r: DX_Rating_Document?.querySelector(".rating_block")?.innerHTML,
                m: []
            };

            //獲取所有節點
            let main_Node = [];
            const main_o_Node = DX_Rating_Document.querySelectorAll(".main_wrapper > *");

            //將所有節點的className全部列出來
            for (const x of main_o_Node) {
                main_Node.push(x.className);
            }

            //定位三個標題的位置，好取得50首開頭結尾
            let title_pos_list = [];
            for (const i in main_Node) {
                if (main_Node[i].indexOf("screw_block") == 0)
                    title_pos_list.push(parseInt(i));

                if (title_pos_list.length >= 3)
                    break;
            }

            //將訊息50首擷取
            const mrcSongs = (() => {
                let songs = [];

                const difficulty_abbreviation = {
                    "basic": 0,
                    "advanced": 1,
                    "expert": 2,
                    "master": 3,
                    "remaster": 4
                };

                for (let flags = 0; flags < 2; flags++) {
                    for (let i = title_pos_list[flags] + 1; i < title_pos_list[flags + 1]; i++) {
                        const difficulty = main_o_Node[i].className.split(" ")[0].split("_")[1];
                        const musicName = decodeHTMLEntities(main_o_Node[i].querySelector(".music_name_block").innerHTML);
                        const achievement = parseFloat(main_o_Node[i].querySelector(".music_score_block").innerHTML.replaceAll("%", ""));
                        const type = main_o_Node[i].querySelector(".music_kind_icon").src.split("/").at(-1).split(".")[0].replaceAll("music_", "");

                        songs.push([
                            difficulty_abbreviation[difficulty],
                            musicName,
                            achievement
                        ]);

                        if (type == "dx") songs[songs.length - 1].push(1);
                        if (flags == 0) songs[songs.length - 1].push(1);
                    }
                }

                return songs;
            })();

            playerData.m = mrcSongs;

            result = playerData;
        } catch {
            result = false;
        }

        if (result) {
            const playerData_encode = encodeURIComponent(JSON.stringify(result));
            
            completion(`${server}/?p=MRC50&rd=${playerData_encode}&v=${version}`);
        } else {
            alert("Please go to MaimaiDX.NET and try again.");

            completion(`https://maimaidx-eng.com/maimai-mobile/home/ratingTargetMusic/`);
        }
    });
}

main();
