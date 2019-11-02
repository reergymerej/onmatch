import { Readable, Writable } from 'stream'

export default (pattern) => {
  let data = ''

  const stream = new Writable({
    decodeStrings: false,

    write(chunk, encoding, callback) {
      if (encoding === 'buffer') {
        data += chunk.toString('utf8')
      } else {
        data += chunk
      }
      const matches = data.match(pattern)
      if (matches) {
        data = ''
        this.emit('match', matches[0])
      }
      callback()
    }
  })
  return stream
}
