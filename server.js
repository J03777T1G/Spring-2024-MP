const http = require('http');
const github = require('@octokit/rest')();

// Set up GitHub authentication (replace placeholders with your GitHub credentials)
github.authenticate({
  type: 'basic',
  username: 'J03777T1G',
  password: '!Bannaking77'
});

// Define a function to fetch repository information
function fetchRepositoryInfo(owner, repo) {
  return github.repos.get({ owner, repo });
}

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Fetch repository information
  fetchRepositoryInfo('J03777T1G', 'Spring-2024-MP')
    .then(response => {
      // Send the repository information as JSON
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(response.data));
    })
    .catch(error => {
      // Handle errors
      console.error('Error fetching repository info:', error);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
