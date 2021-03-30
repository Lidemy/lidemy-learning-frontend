const schedules = [
  {
    title: "第一週（04/12 ~ 04/18）：暖身週",
    description: "掌握 Git 與 Command line 操作",
    date: "2021-04-12",
  },
  {
    title: "第二週（04/19 ~ 04/25）：程式基礎（上）",
    description: "掌握 JavaScript 基礎",
    date: "2021-04-19",
  },
  {
    title: "第三週（04/26 ~ 05/02）：程式基礎（下）",
    description: "熟悉 JavaScript 程式基礎",
    date: "2021-04-26",
  },
  {
    title: "第四週（05/03 ~ 05/09）：網路基礎",
    description: "熟悉網路概念與 API",
    date: "2021-05-03",
  },
  {
    title: "第五週（05/10 ~ 05/16）：複習週",
    description: "複習前幾週所學",
    date: "2021-05-10",
  },
  {
    title: "第六週（05/17 ~ 05/23）：前端基礎（一）",
    description: "掌握基本 HTML 與 CSS",
    date: "2021-05-17",
  },
  {
    title: "第七週（05/24 ~ 05/30）：前端基礎（二）",
    description: "在網頁上使用 JavaScript 與事件處理",
    date: "2021-05-24",
  },
  {
    title: "第八週（05/31 ~ 06/06）：前端基礎（三）",
    description: "用 JavaScript 與後端溝通",
    date: "2021-05-31",
  },
  {
    title: "第九週（06/07 ~ 06/13）：後端基礎（一）",
    description: "掌握 PHP 與 SQL 基礎用法",
    date: "2021-06-07",
  },
  {
    title: "第十週（06/14 ~ 06/20）：複習週",
    description: "複習前幾週所學",
    date: "2021-06-14",
  },
  {
    title: "第十一週（06/21 ~ 06/27）：資訊安全",
    description: "認識資訊安全以及防範方法",
    date: "2021-06-21",
  },
  {
    title: "第十二週（06/28 ~ 07/04）：前後端整合",
    description: "前後端整合",
    date: "2021-06-28",
  },
  {
    title: "第十三週（07/05 ~ 07/11）：現代前端工具",
    description: "熟悉現代前端工具",
    date: "2021-07-05",
  },
  {
    title: "第十四週（07/12 ~ 07/18）：伺服器與網站部署",
    description: "知道如何部署自己的程式",
    date: "2021-07-12",
  },
  {
    title: "第十五週（07/19 ~ 07/25）：複習週",
    description: "複習前幾週所學",
    date: "2021-07-19",
  },
  {
    title: "第十六週（07/26 ~ 08/01）：JavaScript 核心與物件導向",
    description: "理解 Event Loop 與 JS 觀念",
    date: "2021-07-26",
  },
  {
    title: "第十七週（08/02 ~ 08/08）：現代後端開發（上）",
    description: "熟悉 Express",
    date: "2021-08-02",
  },
  {
    title: "第十八週(08/09 ~ 08/15）：現代後端開發（下）",
    description: "熟悉 ORM 與部署",
    date: "2021-08-09",
  },
  {
    title: "第十九週（08/16 ~ 08/22）：產品開發流程",
    description: "熟悉產品開發流程",
    date: "2021-08-16",
  },
  {
    title: "第二十週（08/23 ~ 08/29）：複習週",
    description: "複習前幾週所學",
    date: "2021-08-23",
  },
  {
    title: "第二十一週（08/30 ~ 09/05）：前端框架（一）",
    description: "前端框架",
    date: "2021-08-30",
  },
  {
    title: "第二十二週（09/06 ~ 09/12）：前端框架（二）",
    description: "前端框架",
    date: "2021-09-06",
  },
  {
    title: "第二十三週（09/13 ~ 09/19）：前端框架（三）",
    description: "前端框架",
    date: "2021-09-13",
  },
  {
    title: "第二十四週（09/20 ~ 09/26）：前端框架（四）",
    description: "前端框架",
    date: "2021-09-20",
  },
  {
    title: "第二十五週（09/27 ~ 10/03）：Final Project",
    description: "Final Project",
    date: "2021-09-27",
  },
  {
    title: "第二十六週（10/04 ~ 10/10）：Final Project",
    description: "Final Project",
    date: "2021-10-04",
  },
];

const syllabusList = [
  {
    text: `
大致介紹整個計畫以及帶學生看過一次課程大綱，接著說明整體架構，介紹各種不同工程師職位所負責的工作內容並著重在網頁工程師的介紹，並說明課程進行方式。
    `,
    title: "課程內容敘述",
    status: 0,
  },
  {
    text: `
先看 [CMD101] Command Line 超新手入門的全部課程來熟悉 command line 的使用。熟悉以後觀看 [GIT101] Git 超新手入門 的全部課程，學習如何使用 Git。

如果 CMD101 看不太懂，也可以看 [CS101] 初心者的計概與 coding 火球術的 2-1 ~ 2-4，一樣是與 command line 相關的課程。

接著可以看 [CS101] 初心者的計概與 coding 火球術的 1-1 跟 1-2 還有單元 11，理解程式基礎概念。

最後觀看 CS101 的 4-1 與 4-2，學習網路相關基礎概念。

然後記得看交作業的示範，這週就差不多了。
    `,
    title: "教材",
    status: 0,
  },
  {
    text: `
[討論區連結](#)
    `,
    title: "討論區連結",
    status: 0,
  },
  {
    text: `
- [ ] P1 你說得出程式如何執行
- [ ] P1 你理解寫程式的本質只是一行行的指令
- [ ] P1 你了解前端與後端的區別
- [ ] P1 你能說出從發出一個 request 到接收 response 中間發生的事
- [ ] P1 你了解不同載具的差異在哪（Desktop、Mobile、Web）
- [ ] P1 你了解基本的 command line 指令
- [ ] P1 你知道 Git 在做什麼，以及為何我們需要 Git
- [ ] P1 你知道 add、commit、push、pull 等基本 Git 指令
- [ ] P1 你知道怎麼使用 branch 並送出 Pull Request
- [ ] P2 你熟悉 Git Workflow（其實就是交作業的流程）
    `,
    title: "Checklist",
    status: 0,
  },
  {
    text: `
測試
    `,
    title: "挑戰題",
    status: 1,
  },
  {
    text: `
測試
    `,
    title: "作業檢討",
    status: 1,
  },
  {
    text: `
[作業列表連結](#)
    `,
    title: "作業列表",
    status: 1,
  },
  {
    text: `
[作業列表連結](#)
    `,
    title: "補充教材",
    status: 1,
  },
];

const courses = [...Array(26).keys()].map((week) => ({
  week: week + 1,
  syllabusList: syllabusList,
}));

export { courses, schedules };
