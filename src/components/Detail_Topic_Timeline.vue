<template lang="jade">

  .component

    table.ui.fixed.striped.unstackable.table
      thead
        tr.center.aligned
          th(v-for="t in timeline_title")
            h3.ui.header {{t}}
      tbody
        tr(v-for = "(ev,idx) in timeline")
          td.center.aligned.due
            div {{ev.start}}
            i.caret.down.icon(v-if="ev.end != null")
            div {{ev.end}}
          td
            .status.ui.basic.huge.label.fat-only {{ev.title}}
            .status.ui.basic.small.label.thin-only {{ev.title}}
            h4.ui.header(v-if="ev.info != null") {{ev.info}}
          td
            Plink(:urllink="ev.link")

    h3 相關外部連結*
    .ui.horizontal.relaxed.celled.list.plinklist
      .item(v-for='link in plinkList')
        i.icon(:class='link.icon')
        .content
          h5 {{ link.title }}
          | {{ link.desc }}
</template>

<script>

  import caxios from '../js/request'
  import Plink from './Detail_Topic_Timeline_ParticipationLink.vue'

  export default {
    name: 'Detial_Topic_Timeline',
    props: ['articleId'],
    components: {
      Plink
    },
    data() {
      return {
        timeline: [], // 時間軸
        timeline_title:["議題時間","議題階段","相關外部連結*"],
        plinkList: [
          {
            icon:"linkify",
            title: '相關',
            desc: '與議題相關的連結'
          },
          {
            icon:"pencil",
            title: '共筆',
            desc: '會議共同筆記'
          },
          {
            icon:"book",
            title: '記錄',
            desc: '當日共同筆記整理出的重點'
          },
          {
            icon:"youtube play",
            title: '直播',
            desc: '會議直播影片'
          },
          {
            icon:"users",
            title: '討論',
            desc: '進入討論'
          },
          {
            icon:"edit",
            title: '留言',
            desc: '進入留言'
          }
        ]
      }
    },
    methods: {
      getTimeline(id) {
        this.timeline = []
        caxios.get('https://talk.vtaiwan.tw/t/' + id + '.json?include_raw=1')
          .then((response) => {
            var detail_info = response.data;
            detail_info = detail_info['post_stream']['posts'].slice(1); // 取得議題時間軸內容

            for (var i in detail_info) {
              var regex = /(?: (?:init )?)|\n/g; // 用來分開字串
              var date_regex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/; //yyyy-mm-dd(ex:2016-10-31)
              var time_regex = /^(2[0-3]|1[0-9]|0[0-9]|[^0-9][0-9]):([0-5][0-9]|[0-9]):([0-5][0-9]|[0-9])$/; // hh:mm:ss(ex:19:00:00)
              var timeline_content = {}; // 時間軸內容
              var comment = {}; // 暫存處理回覆內容
              var links = []; // 回覆中的連結

              comment = detail_info[i]['raw'].split(regex); // 每一個議題簡介(第一篇)底下回覆內容
              timeline_content['title'] = comment[0]; // 進度
              timeline_content['start'] = comment[1]; // 開始日期

              if (date_regex.test(comment[2])) {
                timeline_content['end'] = comment[2]; // 結束日期
              } else if (time_regex.test(comment[2])) {
                timeline_content['start'] += " " + comment[2];
                timeline_content['end'] = null;
              }
              comment.slice(1).map(item => {
                if (item.indexOf('http') > -1) {
                  links.push(item)
                }
                else if (date_regex.test(item) || time_regex.test(item)) {}
                else {
                  timeline_content['info'] = item
                }
              })

              timeline_content['link'] = links;
              this.timeline.push(timeline_content);
            }
            /* sort the timeline content */
            this.timeline.sort((a,b) => new Date(b.start) - new Date(a.start))
          })
      }
    },
    watch: {
      articleId: function(val){
        this.getTimeline(val);
      }
    },
    created: function () {
      this.getTimeline(this.articleId);
    }
  }


</script>

<style lang="scss" scoped>
@import "../sass/global.scss";

.ui.status {
  color: $step_color;
  border: 1px solid $step_color;
}
.ui.fixed.table td {
  overflow: visible;
}
.due {
  font-size: 1.2rem;
  line-height: 1.5;
}
.plinklist {
  font-size: 1rem;
  // .item:first-child {
  //   margin-left: 1em;
  //   font-size: 1rem;
  // }
}
</style>
