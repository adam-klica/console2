const http = require('http');
const firebase = require('firebase')
var firebaseConfig = {
  apiKey: "AIzaSyAZWG86rlyAT0t6VmpFw9cZkft53DL6JjQ",
  authDomain: "lemaa12.firebaseapp.com",
  projectId: "lemaa12",
  storageBucket: "lemaa12.appspot.com",
  messagingSenderId: "132259430682",
  appId: "1:132259430682:web:3911c6a5e6c26f0869aca3"
};

const server = http.createServer(function(request, response) {
  console.dir(request.param)
  if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
  }else {
  firebase.app(); // if already initialized, use that one
}
  let database = firebase.database()
  if (request.method == 'POST') {
    console.log('POST')

    var body = ''
    
    request.on('data', function(data) {
      body += data
      console.log('Partial body: ' + body)
      var ID = Math.floor(Math.random() * 10000);
      database.ref(`${ID}`).set(body, function(error) {
        if (error) {
          // The write failed...
          console.log("Failed with error: " + error)
        } else {
          // The write was successful...
          console.log("success")
        }
    })
    })
    request.on('end', function() {
      console.log('Body: ' + body)
      response.writeHead(200, {'Content-Type': 'text/html'})
      response.end(body)
    })

  } else {
    console.log('GET')
    var html = `
            <html>
                <body>
                    <form method="post" action="http://localhost:3000">Name: 
                        <input type="text" name="name" />
                        <input type="submit" value="Submit" />
                    </form>
                </body>
            </html>`
    response.writeHead(200, {'Content-Type': 'text/html'})
    response.end(body)
  }
})

const port = 3000
const host = '127.0.0.1'
server.listen(port, host)
console.log(`Listening at http://${host}:${port}`)