require("isomorphic-fetch")

const url = `https://www.instagram.com/graphql/query/?query_hash=003056d32c2554def87228bc3fd9668a&variables={"id":"595311224","first":5}`

const cache = {
  lastFetch: 0,
  posts: [],
}
function slimUpPosts(response) {
  return response.data.user.edge_owner_to_timeline_media.edges.map(edge => ({
    biggie: edge.node.thumbnail_src,
    thumbnail: edge.node.thumbnail_resources[2].src,
    url: `https://instagram.com/p/${edge.node.shortcode}`,
    caption:
      edge.node.edge_media_to_caption.edges.length > 0
        ? edge.node.edge_media_to_caption.edges[0].node.text
        : null,
    id: edge.node.id,
  }))
}
async function getPosts() {
  // first see if we have cache in 30mins
  const timeSinceLastFetch = Date.now() - cache.lastFetch
  if (timeSinceLastFetch <= 1800000) {
    return cache.posts
  }
  const data = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async response => {
    try {
      await response.json()
      console.log("response data?", data)
    } catch (error) {
      console.log(error)
    }
  })
  console.log(data)
  const posts = slimUpPosts(data)
  cache.lastFetch = Date.now()
  cache.posts = posts
  return posts
}
exports.handler = async function (event, context, callback) {
  const posts = await getPosts()
  callback(null, {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(posts),
  })
}
