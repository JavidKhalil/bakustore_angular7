const express = require('express');
const router = express.Router();
const axios = require('axios');
const requestedUrl = 'https://jsonplaceholder.typicode.com';

// router.get('/', (req, res) => {
//   res.send('it works');
// });

router.get('/posts', (req, res)=>{

axios.get(`${requestedUrl}/posts`).then(posts =>
  res.status(200).json(posts.data)).catch(error => res.status(500).send(error));
});

module.exports = router;
