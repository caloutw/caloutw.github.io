
# mimi xd bot 詳細分析報告
這篇文章會詳細解釋 mimi xd bot 與 Aime NET 的運作流程<br>
拆解不易，認同請給星

## 介紹一個登入的完整流程
| 步驟 | 動作 | 伺服器內部動作 | 說明 | 方法 |
|--|--|--|--|--|
| 1 | 進入 Aime | 生成 JSESSIONID | 建立一個裝置當前憑證，用於判斷是否同裝置跑完整體流程 | GET |
| 2 | 登入 Aime | 生成一組 clal 金鑰 | 具有時效性的 Aime 臨時通行證，只能作用於 aime 的認證頁 | POST |
| 3 | 進入 Maimai DX NET | 帶入 clal | 伺服器會認證 clal，並且提供具有SSID導向後的 maimai 網址 | POST |
| 4 | 登入 Maimai DX NET | 生成 _t & userId | Maimai DX NET 的臨時憑證，是基於 clal 的第二組通行證 | GET |

## mimi xd bot 從何開始擷取？
答案是 3，從 3 開始後繼續往下執行

## clal 與 登入之間的關係
| clal 狀態 | 行為 | 說明 |
|--|--|--|
| ✅ 可用 | 身為最後一次登入 | 因為最後一次登入的 clal 才具有通行效果 |
| ❎ 不可用 | 其中一個裝置登出 | 會導致整個 clal 在伺服器內部被摧毀 |
| ❎ 不可用 | 其中一個裝置登入 | 因為每次建立一個新登入都會讓 clal 重置 |

## clal 失效會導致什麼？
目前看到的有

1. 10001
2. 20002
3. 20004

三者皆會要求重新登入

## 我可以利用 X、Facebook 和 LINE 登入嗎？
可以，但這就必須從 clal (第3步) 下手

## 後續 Waimai XD 會如何執行？
從 1 開始，因此無法使用 X、Facebook 和 LINE 登入

## 一組 clal 可以維持多久
不確定，但最後一次看到是500多天，我也懶得回去看了，有緣人可以幫忙提一下

## issue修正
DC : caloutw<br>
Gmail : chou.addison@gmail.com (不常用)
