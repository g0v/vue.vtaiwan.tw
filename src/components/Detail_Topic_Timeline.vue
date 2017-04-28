<template lang="jade">

  .component 
    
    table.ui.fixed.striped.unstackable.table
      thead
        tr.center.aligned
          th(v-for="t in timeline_title")
            h3.ui.header {{t}}
      tbody
        tr(v-for = "(ev,idx) in timeline.time")
          td.center.aligned
            div {{ev.start}} 
            i.arrow.down.icon(v-if="ev.end != null")
            div {{ev.end}}
          td
            .status.ui.basic.huge.label.fat-only {{ev.title}}
            .status.ui.basic.small.label.thin-only {{ev.title}}
            h4.ui.header(v-if="ev.info != null") {{ev.info}} 
          td 
            Plink(:urllink="ev.link")

</template>

<script>

  import caxios from '../js/request'
  import Plink from './Detail_Topic_Timeline_ParticipationLink.vue'

  export default {

    props: ['article'],
    components: {
      Plink
    },
    data() {
      return {
        timeline:{}, // 時間軸
        timeline_title:["議題時間","議題階段","相關連結"]
      }
    },
    methods: {
      getTimeline(val) {
        let id = val.id
        this.timeline = { // initialize dType
         'time': []
        } 
        let line = this.timeline // just for alias
        caxios.get('https://talk.vtaiwan.tw/t/' + id + '.json?include_raw=1')
          .then((response) => {
            var detail_info = response.data;
            detail_info = detail_info['post_stream']['posts'].slice(1); // 取得議題時間軸內容
            
            for (var i in detail_info) {
              var regex = /(?: (?:init )?)|\n/g; // 用來分開字串
              var date_regex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/g; //yyyy-mm-dd(ex:2016-10-31)
              var time_regex = /^(2[0-3]|1[0-9]|0[0-9]|[^0-9][0-9]):([0-5][0-9]|[0-9]):([0-5][0-9]|[0-9])$/g; // hh:mm:ss(ex:19:00:00)
              var timeline_content = {}; // 時間軸內容
              var comment = {}; // 暫存處理回覆內容
              var links = []; // 回覆中的連結
              timeline_content['title'] = detail_info[i]['raw'].split(regex)[0]; // 進度
              timeline_content['start'] = detail_info[i]['raw'].split(regex)[1]; // 開始日期

              comment = detail_info[i]['raw'].split(regex); // 每一個議題簡介(第一篇)底下回覆內容

              if (timeline_content['start'].length > detail_info[i]['raw'].split(regex)[2].length) { // 若為"寫草案" 則無結束日期 僅開始日期
                timeline_content['start'] = timeline_content['start'] + " " + detail_info[i]['raw'].split(regex)[2];
                timeline_content['end'] = null;
              }
              else { // 有結束日期
                timeline_content['end'] = detail_info[i]['raw'].split(regex)[2]; // 結束日期
              }
              if (detail_info[i]['raw'].split(regex)[2].length > 10) { // 無結束日期
                timeline_content['end'] = null;
              }
              for (var j = 1; j < comment.length; j++) { // 回覆中的連結處理
                if (comment[j].indexOf("http") > -1) { // 字串含有"http" -> 連結
                  links.push(detail_info[i]['raw'].split(regex)[j]);
                }
                if (comment[j].indexOf("http") == -1 && comment[j].match(date_regex) == null && comment[j].match(time_regex) == null) { // 字串不符合網址、日期、時間等格式 ->  簡介
                  timeline_content['info'] = comment[j];
                }
              }
              timeline_content['link'] = links;

              line.time.push(timeline_content);
              line.time.sort(function(a,b){
               return new Date(b.start).getTime() - new Date(a.start).getTime();
              })
            }
             return line.time;
          })
      }
    },
    watch: {
      article: function(val){
        this.getTimeline(val);
      }
    },
    created: function () {
      this.getTimeline(this.article);
    }
  }


</script>

<style lang="scss" scoped>
@import "../sass/global.scss";

.ui.status {
  color: $step_color;
  border: 1px solid $step_color;
}

</style>
