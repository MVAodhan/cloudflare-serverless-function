const redis = require('redis');
require('dotenv').config();
exports.handler = async function (event, context) {
  var client = redis.createClient({
    host: `${process.env.UPSTASH_ENDPOINT}`,
    port: `${process.env.UPSTASH_PORT}`,
    password: `${process.env.UPSTASH_PASSWORD}`,
  });

  let url = event.body;
  const splitArray = url.split('=');
  url = splitArray[1];

  let longUrl = url
    .replace('%3A', ':')
    .replace('%2F%2F', '//')
    .replace('%2F', '/');

  if (!longUrl || longUrl.length <= 0) {
    res.status(400).json({ message: 'Error, url is invalif' });
    return;
  }
  let shortEnd = longUrl.split('/');
  let slug = shortEnd[shortEnd.length - 1];
  let slugSubstrings = slug.split('-');
  let letters = [];
  for (let string of slugSubstrings) {
    letters = [...letters, ...string];
  }
  let newSlug = [];
  for (let i = 0; i <= 11; i++) {
    let letter = letters[Math.floor(Math.random() * letters.length)];
    if (i % 2 == 0) {
      letter = letter.toUpperCase();
    }
    newSlug = [...newSlug, letter];
  }
  let newSlugJoin = newSlug.join('');
  let shortUrl = newSlugJoin;

  let data = await client.hset('links', { [shortUrl]: longUrl });

  return {
    statusCode: 200,
    body: JSON.stringify({
      data,
    }),
  };
};
