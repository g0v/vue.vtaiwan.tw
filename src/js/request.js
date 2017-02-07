import axios from 'axios'

const results = {}

// export const get = (uri) => {
//   if (!results[uri]) {
//     results[uri] = axios.get(uri)
//   }
//   return results[uri]
// }

// export const forget = (uri) => {
//   results[uri] = undefined
//   delete results[uri]
// }

export default {
  get: (uri) => {
    if (!results[uri]) {
      results[uri] = axios.get(uri)
    }
    return results[uri]
  },

  forget: (uri) => {
    results[uri] = undefined
    delete results[uri]
  }
}