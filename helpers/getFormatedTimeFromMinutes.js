module.exports = (minutes = 0) => {
  return `${Math.floor(minutes / 60)}h${minutes % 60 === 0 ? '' : minutes % 60}`
}