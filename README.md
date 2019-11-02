# onmatch

Watch streams for patterns.

```js
import onMatch from 'onmatch'

const pattern = /start.*end/
const handleMatch = (match) => {}

const stream = onMatch(pattern)
stream.on('match', handleMatch)

stream.write('foo')
stream.write('bar', 'ascii')
stream.write(Buffer.from('start')) // assumed to be utf8
stream.write('boop')
stream.write('end') // handleMatch('startboopend')
```

You'd probably want to pipe the incoming stream in practice.

```js
const stream = onMatch(pattern)
stream.on('match', handleMatch)
readable.pipe(stream)
```
