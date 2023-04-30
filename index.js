const week = ["日", "月", "火", "水", "木", "金", "土"];
const today = new Date();
// 月末だとずれる可能性があるため、1日固定で取得
const showDate = new Date(today.getFullYear(), today.getMonth(), 1);

const prev = document.querySelector("#prev");
const next = document.querySelector("#next");

window.addEventListener("load", () => {
    showProcess(today, calendar);
});

prev.addEventListener("click", () => {
    showDate.setMonth(showDate.getMonth() - 1);
    showProcess(showDate);
});

next.addEventListener("click", () => {
    showDate.setMonth(showDate.getMonth() + 1);
    showProcess(showDate);
});

// カレンダー表示
const showProcess = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    document.querySelector("#header").innerHTML =
        year + "年 " + (month + 1) + "月";

    const calendar = createProcess(year, month);
    document.querySelector("#calendar").innerHTML = calendar;
};

// カレンダー作成
const createProcess = (year, month) => {
    // 曜日
    let calendar = "<table><tr class='dayOfWeek'>";
    for (let i = 0; i < week.length; i++) {
        calendar += "<th>" + week[i] + "</th>";
    }
    calendar += "</tr>";

    let count = 0;
    // 月の初日の曜日（1:月, 2:火, 3:水, 4:木, 5:金, 6:土, 7:日）
    const startDayOfWeek = new Date(year, month, 1).getDay();
    // 月の最終日
    const endDate = new Date(year, month + 1, 0).getDate();
    // 先月の最終日
    const lastMonthEndDate = new Date(year, month, 0).getDate();
    // 何行構成のカレンダーか
    const row = Math.ceil((startDayOfWeek + endDate) / week.length);

    // 1行ずつ設定
    for (let i = 0; i < row; i++) {
        calendar += "<tr>";
        // j: 1colum単位で設定（0〜6）
        for (let j = 0; j < week.length; j++) {
            // i == 0: 「1行目」, startDayOfWeek: 「最初の曜日よりも前の曜日」のとき
            if (i == 0 && j < startDayOfWeek) {
                /**
                 * 先月の最終日 - 当月の初日の曜日
                 * 例：2021/01
                 * lastMonthEndDate = 31
                 * startDayOfWeek = 5 （金曜日）
                 * 日曜日：31 – 5 + 0 + 1 = 27
                 * 月曜日：31 – 5 + 1 + 1 = 28
                 */
                calendar +=
                    "<td class='disabled'>" +
                    (lastMonthEndDate - startDayOfWeek + j + 1) +
                    "</td>";
            } else if (count >= endDate) {
                /**
                 * 最終行で最終日以降、翌月の日付を設定（灰色の箇所）
                 * （例）count（36）- endDate（30）= 6 を表示
                 */
                count++;
                calendar +=
                    "<td class='disabled'>" + (count - endDate) + "</td>";
            } else {
                // 当月の日付を曜日に照らし合わせて設定
                count++;
                // 日付が今日のとき
                if (
                    year == today.getFullYear() &&
                    month == today.getMonth() &&
                    count == today.getDate()
                ) {
                    calendar += "<td class='today'>" + count + "</td>";
                } else {
                    // 日付が今日以外のとき
                    calendar += "<td>" + count + "</td>";
                }
            }
        }
        calendar += "</tr>";
    }
    return calendar;
};
