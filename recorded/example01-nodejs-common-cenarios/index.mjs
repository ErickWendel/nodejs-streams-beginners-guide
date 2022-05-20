// 1 - terminal inputs

// const stdin = process.stdin
//   .on('data', msg => console.log('terminal input was', msg))


// const stdout = process.stdout
//   .on('data', msg => console.log(msg.toString().toUpperCase()))

// stdin.pipe(stdout)

// 2 
// node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file
import http from 'http'
import { readFileSync, createReadStream } from 'fs'
http.createServer((request, response) => {
    // const file = readFileSync('big.file') //.toString()
    // response.write(file)
    // response.end()
    createReadStream('big.file')
    .pipe(response)
})
.listen(3000)
.on('listening', () => console.log('server is listening at 3000'))
