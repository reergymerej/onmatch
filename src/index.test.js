import { Readable } from 'stream'
import onMatch from '.'

describe('once a match is found', () => {
  it('should execute callback with match', () => {
    const pattern = /start.*end/
    const handleMatch = jest.fn()
    const stream = onMatch(pattern)
    stream.on('match', handleMatch)
    stream.write(Buffer.from('asdf🌻', 'ascii'), 'ascii')
    stream.write('foo')
    stream.write('bar🤔', 'ascii')
    stream.write(Buffer.from('start'))
    stream.write('boop')
    stream.write('end') // handleMatch('startboopend')
    expect(handleMatch).toHaveBeenCalledWith('startboopend')
  })
})

describe('a piped stream', () => {
  it('should execute callback with match', (done) => {
    const pattern = /start.*end/
    const handleMatch = jest.fn()
    const stream = onMatch(pattern)
    stream.on('match', handleMatch)
    const readable = new Readable({
      read() {},
    })
    readable.pipe(stream)
    readable.push(Buffer.from('asdf🌻', 'ascii'), 'ascii')
    readable.push('foo')
    readable.push('bar🤔', 'ascii')
    readable.push(Buffer.from('start'))
    readable.push('boop')
    readable.push('end') // handleMatch('startboopend')
    setTimeout(() => {
      expect(handleMatch).toHaveBeenCalledWith('startboopend')
      done()
    }, 0)
  })

  it('should handle multiples', (done) => {
    const pattern = /start.*?end/g
    const handleMatch = jest.fn()
    const stream = onMatch(pattern)
    stream.on('match', handleMatch)
    const readable = new Readable({
      read() {},
    })
    readable.pipe(stream)
    readable.push('startboop')
    readable.push('end')
    readable.push('startbeependstart')
    readable.push('hello')
    readable.push('end')
    readable.push('stuck')
    readable.push('start-endstart-endstart-endstart-end')
    setTimeout(() => {
      expect(handleMatch).toHaveBeenCalledTimes(7)
      done()
    }, 0)
  })
})
