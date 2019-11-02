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
