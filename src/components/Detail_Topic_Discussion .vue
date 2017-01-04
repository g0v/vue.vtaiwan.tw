// <template lang="jade">  
//  span
//   h1 {{urllink}}
//   .urllink(v-if = "ulinkall.length > 0")
//     span.urllink(v-for="(item, index) in ulinkall")
//     span(v-html = "ulinkall[index]")
    
// </template>

// <script>
// import axios from 'axios'
// var main = require('./../filters/index.js')
   
// export default {
//   props:['urllink'],
//   data () {
//     return {
//           tt:'89bzf78kbn',
//           youtubeicon: 'https://upload.wikimedia.org/wikipedia/commons/3/37/Youtube.svg',
//           hackpadicon: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Writing_Circle.svg',
//           sayiticon: 'https://talk.pdis.nat.gov.tw/uploads/default/original/1X/0702e94b7c83e63a7c33826c4552e1d2a540d860.png',
//           polisicon: 'https://talk.pdis.nat.gov.tw/uploads/default/original/1X/c56e47b659f9f1298de3f43abb3777b5f21aad2f.PNG',
//           discourseicon: 'http://www.discourse.org/images/logo.png',
//           slidoicon:' https://talk.pdis.nat.gov.tw/uploads/default/original/1X/3d16d62bc946033dfefb4029a5149d3f3420aebc.png',
//           // urllink:['https://hackpad.com/20161110--KEmoTM5HU85','http://sayit.archive.tw/2015-08-27-uberx-%E8%87%AA%E7%94%A8%E8%BB%8A%E8%BC%89%E5%AE%A2%E6%84%8F%E8%A6%8B%E5%BE%B5%E9%9B%86%E8%AB%AE%E8%A9%A2%E6%9C%83%E8%AD%B0'],
          
//           ulinkall:[],

//           // icon:[
//           // [youtube, 'https://upload.wikimedia.org/wikipedia/commons/3/37/Youtube.svg'],
//           //   {  hackpad: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Writing_Circle.svg'},
//           //    { sayit: 'https://talk.pdis.nat.gov.tw/uploads/default/original/1X/0702e94b7c83e63a7c33826c4552e1d2a540d860.png'},
//           //    { 'pol.is': 'https://talk.pdis.nat.gov.tw/uploads/default/original/1X/c56e47b659f9f1298de3f43abb3777b5f21aad2f.PNG'},
//           //    { 'talk.vtaiwan.tw': 'http://www.discourse.org/images/logo.png'},
//           //   {  'app.sli.do':' https://talk.pdis.nat.gov.tw/uploads/default/original/1X/3d16d62bc946033dfefb4029a5149d3f3420aebc.png'},
//           // ]
  
//     }
//   },
  
//   created:function(a,b){
//    // console.log(this.urllink[0].polis);
//     var title='youtube';
//     //console.log(this.urllink)
//     //console.log(this.urllink[0].polis)
//     var uu=[];
//     uu=this.urllink;
//     if(uu!=undefined){
//         console.log(uu)
//         console.log(uu)
//         console.log(typeof(uu))
//         console.log(uu)

//       }
//     for(var i=0;i<this.urllink.length;i++){
//       var urllinktext=[{}];
//       var ttt;
//       // if(this.urllink!=undefined){
//       //   console.log("12434564844321658")
//       // }
//       //console.log(this.urllink)
//      // console.log(this.urllink[0].polis)
//       // if(this.urllink[i].indexOf('hackpad')>-1){
//       //    ttt="<a href= "+this.urllink[i]+" target='_blank'><img src="+this.hackpadicon+" width='50'' height='50'></a>"
//       //    this.ulinkall.push(ttt);
//       // }
//       // if(this.urllink[i].indexOf('sayit')>-1){
//       //    ttt="<a href= "+this.urllink[i]+" target='_blank'><img src="+this.sayiticon+" width='50'' height='50'></a>"
//       //    this.ulinkall.push(ttt);
//       // }
//       // if(this.urllink[i].indexOf('youtube')>-1){
//       //    ttt="<a href= "+this.urllink[i]+" target='_blank'><img src="+this.youtubeicon+" width='50'' height='50'></a>"
//       //    this.ulinkall.push(ttt);
//       // }
//       // if(this.urllink[i].indexOf('pol.is')>-1){
//       //    ttt="<a href= "+this.urllink[i]+" target='_blank'><img src="+this.polisicon+" width='100'' height='50'></a>"
//       //    this.ulinkall.push(ttt);
//       // }
//       // if(this.urllink[i].indexOf('talk.vtaiwan.tw')>-1){
//       //    ttt="<a href= "+this.urllink[i]+" target='_blank'><img src="+this.discourseicon+" width='150'' height='50'></a>"
//       //    this.ulinkall.push(ttt);
//       // }
//       // if(this.urllink[i].indexOf('app.sli.do')>-1){
//       //    ttt="<a href= "+this.urllink[i]+" target='_blank'><img src="+this.slidoicon+" width='150'' height='50'></a>"
//       //    this.ulinkall.push(ttt);
//       // }
      
//       //else 
//       //console.log(this.urllink)
//     }
//   // console.log(this.ulinkall);
   
//     // axios.get('https://talk.vtaiwan.tw/t/eliquor/917.json')
//     // .then((response)=>{
//     //   var topics = response.data.post_stream.posts;
//     //   var topic={};
//     //   for(var i in topics){
//     //   topic[i]=topics[i].cooked;
//     //   this.youtubelink= main.huha(topic[i]);
//     //   console.log(this.youtubelink);
//     //   }
     
//         // a(:href= "youtubelink" , target='_blank')
//   //  img(:src="youtubeicon" width="200" height="200")
//   // a(:href= "hackpadlink" , target='_blank') 
//   //  img(:src="hackpadicon" width="200" height="200")
//   // a(:href= "sayitlink" , target='_blank') 
//   //  img(:src="sayiticon" width="200" height="200")
//   // br
    
//   // h1 123123
//   //  .polis(:data-conversation_id="tt")
//   //  script(async='true', src='https://pol.is/embed.js')
//     // })



    
//   },
//   watch: { // 確認資訊是否已經傳進來
//     urllink:function (val, oldVal) {
     
//         console.log(oldVal);
        
//         console.log(val);

//     }
//   }

// }
// </script>


// <style lang="scss" scoped>
  
// </style>