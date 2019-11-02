import { Writable } from 'stream'

const appendData = (data, chunk, encoding) => {
  return data + ((encoding === 'buffer')
    ? chunk.toString('utf8')
    : chunk)
}

export default (pattern) => {
  let data = ''
  return new Writable({
    decodeStrings: false,

    write(chunk, encoding, callback) {
      data = appendData(data, chunk, encoding)
      let matches
      while (matches = pattern.exec(data)) {
        // Toss any junk between matches.
        const endIndex = matches.index + matches[0].length
        data = data.substr(endIndex)
        // Since we're altering the data after each match, we need to move the
        // global pointer back to 0.  noop for non-global patterns.
        pattern.lastIndex = 0
        this.emit('match', matches[0])
      }
      callback()
    }
  })
}
