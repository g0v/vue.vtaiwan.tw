![](https://travis-ci.org/g0v/vue.vtaiwan.tw.svg?branch=master)

# 關於 vTaiwan

## vTaiwan 是什麼？

這是一個討論法規該如何制定或修改的平台，透過彼此的意見交流，希望能夠產出符合各利益關係人期待，也貼近實際需求的法規內容。

## 為什麼要參與 vTaiwan ？

法律規定了社會上每個人的權利與義務，因此法規應該具備哪些內容，不只是行政機關，或是立法部門的工作，而是與每個人都切身相關。

此外，越多利益關係人加入討論，就能夠讓法規的內容越完整周延，避免出現權益受到影響、但意見又無法表達的矛盾狀況。簡單來說，參與 vTaiwan，不只能夠照顧到自己的權益，同時也是在幫助每一個可能的利益關係人。

## 在 vTaiwan 表達意見有什麼用？

首先，全部的意見都是公開閱覽，除了行政機關與法規制定機關必須閱讀以外，所有的參與者也可以從不同的意見中，增進彼此的相互理解與建立對議題更深入的思考。

其次，行政機關或法規制定機關必須彙整所有的意見，並納入決策的討論過程。針對意見中的疑問或建議，機關要在一定時間內提出回覆。當法規修改內容確定後，也要說明具體採納了哪些意見。對於未採納的意見，機關也必須回應目前無法實行的理由。

感謝 g0v vTaiwan.tw 專案參與者的共同建置、國發會法制協調中心與資策會科技法律研究所的協力支援，以及所有參與者的意見貢獻。


# 參與開發

* 在Github上
[複製本專案](https://github.com/g0v/vue.vtaiwan.tw)
* 安裝
[nodeJS 6.17.1](https://nodejs.org/en/)
* 下載相關套件
```npm install```
* 近端測試
```npm run dev```
* 要做的內容與相關討論，請見[議題區](https://github.com/g0v/vue.vtaiwan.tw/issues)
* 本專案的技術框架使用Vue，請參考[VueJS](https://vuejs.org/)或[Vue說明](https://cn.vuejs.org/)
* 開發環境使用Webpack與vue-loader，如欲設定環境或引入資源，請閱讀[Webpack](http://webpack.github.io/)與[vue-loader](https://github.com/vuejs/vue-loader)。

# 界面設計圖

* Online: https://xd.adobe.com/view/913afc4f-ee64-4872-ac54-aeda8883c4aa/
* Source: http://audreyt.org/tmp/vTaiwan%20v4.xd
* mobile: https://xd.adobe.com/view/ee22173d-47c1-43ad-8020-cd6c210b84e3/

# Deploy 方式

當 push / merge 至 master branch 時，travis 自動進行 deploy。
如需手動 deploy，方式如下：

```
npm install
node build/get-route.js
npm run build:static
./deploy
```

Deploy 後可至 http://vue.vtaiwan.tw 看到結果。

