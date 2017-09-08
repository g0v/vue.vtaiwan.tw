// 找出在 vTaiwan 議題 (category) 中，發表過意見 (topics and posts) 的人以及他們的 emails
//
// Usage:
//   node get-emails-from-vtaiwan-topic <topic-slug>
// Example:
//   API_USERNAME=foo API_KEY=bar node get-emails-from-vtaiwan-topic social-enterprise
//
// Node: Discourse admin key is required for fetching emails

const axios = require('axios')
const api_username = process.env.API_USERNAME
const api_key = process.env.API_KEY

async function getUsers(key) {
  // Fetch all topics in the category
  let resp = await axios.get('https://talk.vtaiwan.tw/search.json?q=category:' + key)
  let topicsInCategory = resp.data.topics

  if (topicsInCategory === undefined) {
    throw new Error('Category not found: ' + key)
  }

  return Promise.all(
    // Read each topics
    topicsInCategory.map(
      (topic) => axios.get(`https://talk.vtaiwan.tw/t/topic/${topic.id}.json`)
    )).then(resps => {
      // Retrieve unique usernames from post_stream
      let uniqueUsernames = new Set(
        resps
          .map(resp => resp.data.post_stream.posts.map(post => post.username))
          .reduce((accumulator, currentValue) => accumulator.concat(currentValue), [])
      )
      // Fetch these user-profiles
      return Promise.all([...uniqueUsernames].map(username => axios.get(`https://talk.vtaiwan.tw/users/${username}.json`)))
    }).then(async resps => {
      // Retrieve only user-profiles data from responses
      let users = resps.map(resp => resp.data.user)

      // Fetch emails
      let emailsResps = await Promise.all(
        users.map(user => axios.get(`https://talk.vtaiwan.tw/u/${user.username}/emails.json?api_key=${api_key}&api_username=${api_username}`))
      )
      let emails = emailsResps.map(resps => resps.data.email)
      for (let [index, user] of users.entries()) {
        user.email = emails[index]
      }
      return users
    })
}


let args = process.argv.slice(2);
let category = args[0]

if (category === undefined) {
  console.error('ERROR: Missing a category argument')
  process.exit(1)
}

getUsers(category).then(users => {
  console.log(users)
}).catch(e => {
  console.error(e)
})
