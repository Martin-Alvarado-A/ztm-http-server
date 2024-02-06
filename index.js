const http = require('http');

const PORT = 3000;

const friends = [
  {
    id: 0,
    name: 'Nikola Tesla',
  },
  {
    id: 1,
    name: 'Sir Isaac Newton',
  },
  {
    id: 2,
    name: 'Albert Einstein',
  },
];

const server = http.createServer((req, res) => {
  const items = req.url.split('/');

  if (req.method === 'POST' && items[1] === 'friends') {
    console.log('Friends POST request');
    req.on('data', (data) => {
      const friend = JSON.parse(data.toString());
      console.log('Request: ', friend);
      friends.push(friend);
    });
    req.pipe(res);
  } else if (req.method === 'GET' && items[1] === 'friends') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    if (items.length === 3) {
      const friendIndex = +items[2];
      res.end(JSON.stringify(friends[friendIndex]));
    } else {
      res.end(JSON.stringify(friends));
    }
  } else if (req.method === 'GET' && items[1] === 'messages') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<body>');
    res.write('<ul>');
    res.write('<li>Hello Isaac!</li>');
    res.write('<li>What are your thougts on astronomy?</li>');
    res.write('</ul>');
    res.write('</body>');
    res.write('</html>');
    res.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});

// Execute a POST request on the browser's console
/* 
fetch("http://localhost:3000/friends", {
  method: "POST",
  body: JSON.stringify({id: 3, name: "Ryan Dahl"})
});
*/

// Execute a POST request on the browser's console and echo the function
/* 
fetch("http://localhost:3000/friends", {
  method: "POST",
  body: JSON.stringify({id: 3, name: "Grace Hopper"})
})
.then((response) => response.json())
.then((friend) => console.log(friend));
 */
