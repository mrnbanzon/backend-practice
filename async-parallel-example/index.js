async function fetchSequential(urls) {
  const results = [];

  for (const url of urls) {
    const r = await fetch(url);
    results.push(await r.text());
  }

  return results;
}

async function fetchParallel(urls) {
  const promises = urls.map(u => fetch(u).then(r => r.text()));
  return Promise.all(promises);
}

const urls = [
  "https://example.com",
  "https://example.org",
];

(async () => {
  console.time('sequential');
  await fetchSequential(urls);
  console.timeEnd('sequential');

  console.time('parallel');
  await fetchParallel(urls);
  console.timeEnd('parallel');
})();