function capitaliseTopic(topic) {
  if (topic) return topic[0].toUpperCase() + topic.slice(1)
}

function formatDate(date) {
  if (date) return date.slice(0,10).split("-").reverse().join("-")
}

export {capitaliseTopic, formatDate}
