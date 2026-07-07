export default (req, res, next) => {
  const startTimeNano = process.hrtime.bigint();
  const startTimeMilli = Number(startTimeNano / 1000000n); // Convert nanoseconds to milliseconds

  console.log(`${req.method} ${req.url} - ${new Date(startTimeMilli).toISOString()}`);
  res.on('finish', () => {
    const endTimeNano = process.hrtime.bigint();
    const elapsedTimeNano = endTimeNano - startTimeNano;

    const elapsedTimeMilli = Number(elapsedTimeNano / 1000000n); // Convert nanoseconds to milliseconds
    console.log(`${req.method} ${req.url} - ${new Date(startTimeMilli).toISOString()} Response time: ${elapsedTimeMilli} ms`);
  });
  next();
};