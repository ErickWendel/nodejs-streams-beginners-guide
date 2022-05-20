import {
  Transform,
  Writable
} from 'stream'
import {
  pipeline
} from 'stream/promises'
import {
  createWriteStream
} from 'fs'
import {
  get
} from 'http'
const url = 'http://localhost:3000'

const getHttpStream = () => new Promise((resolve) => get(url, response => resolve(response)))

const stream = await getHttpStream()

{
  stream
    .pipe(
      // it could be .map
      new Transform({
        // will handle the stream as string instead of a buffer
        objectMode: true,
        encoding: 'utf-8',
        transform(chunk, enc, cb) {
          const item = JSON.parse(chunk)
          // console.log({
          //   item
          // })
          const myNumber = /\d+/.exec(item.name)[0]
          let name = item.name

          const isEven = myNumber % 2 === 0
          item.name = name.concat(isEven ? ' is even' : ' is odd')

          cb(null, JSON.stringify(item))
        }
      })
    )
    .filter(chunk => chunk.includes('even'))
    .map(chunk => chunk.toUpperCase() + '\n')
    // .pipe(
    //   new Writable({
    //     objectMode: true,
    //     write(chunk, enc, cb) {
    //       console.log('uhuuuuuu', chunk)
    //       cb()
    //     }
    //   })
    // )
    .pipe(
      createWriteStream('responses.log', {
        flags: 'a'
      })
    )
}