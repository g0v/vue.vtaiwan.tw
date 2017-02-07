export function uppercase (str) {
  return str.toUpperCase()
}

export function host (url) {
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  const parts = host.split('.').slice(-3)
  if (parts[0] === 'www') parts.shift()
  return parts.join('.')
}

export function timeAgo (time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

// module.exports = {
//     getiframe: function(article){
//       var parser = new DOMParser ();
//       var xmlDoc = parser.parseFromString (article, "text/html");
//       var slide = xmlDoc.getElementsByTagName("iframe")[0];
//       return slide;
//     }
// };

/* http://www.2ality.com/2014/09/es6-modules-final.html */
/* http://www.2ality.com/2015/07/es6-module-exports.html */

