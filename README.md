# onmatch

Feed strings in incrementally and get callbacks as a pattern is matched.

IO uses streams, which is where this would happen.  Not buffers.

Streams are EventEmitters, so we could emit an event and be a little nicer.

```js
import onMatch from 'onmatch'

const pattern = /start.*end/
const handleMatch = (match) => console.log(match)

const stream = onMatch(pattern)
stream.on('match', handleMatch)

stream.write('foo')
stream.write('bar', 'ascii')
stream.write(Buffer.from('start'))
stream.write('boop')
stream.write('end') // handleMatch('startboopend')
```
