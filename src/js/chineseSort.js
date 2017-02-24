module.exports = function(a, b) {

    var naturalSort = require("string-natural-compare")

    var c2n = { "一": "1", "二": "2", "三": "3", "四": "4", "五": "5", "六": "6", "七": "7", "八": "8", "九": "9", "十": "10" }

    function ChineseToNumber(str) {
        str = str.replace(/一|二|三|四|五|六|七|八|九|十/gi, function(matched) {
            return c2n[matched];
        });
        return str;
    }

    return naturalSort(ChineseToNumber(a), ChineseToNumber(b));

}