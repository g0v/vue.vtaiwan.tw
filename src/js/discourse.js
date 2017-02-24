import caxios from './request'

export default {
    getAllTopics: function(categoryUri) {

        var allTopics = []

        function getTopics(categoryUri, page) {
            return caxios.get(categoryUri + "?include_raw=1&page=" + page)
                .then(result => {
                    var topics = result['data']['topic_list']['topics']
                    allTopics = allTopics.concat(topics)
                    if (topics.length > 0) {
                        page += 1;
                        return getTopics(categoryUri, page);
                    } else {
                        return allTopics;
                    }
                })
        }

        return getTopics(categoryUri, 0)

    },

    getAllPosts: function(categoryUri) {

        var allPosts = []

        function getPosts(categoryUri, page) {
            return caxios.get(categoryUri + "?include_raw=1&page=" + page)
                .then(result => {
                    var posts = result['data']['post_stream']['posts']
                    allPosts = allPosts.concat(posts)
                    if (posts.length > 0) {
                        page += 1;
                        return getPosts(categoryUri, page);
                    } else {
                        return allPosts;
                    }
                })
        }

        return getPosts(categoryUri, 0)

    }
}