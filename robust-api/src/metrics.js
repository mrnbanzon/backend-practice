import client from 'prom-client';
const register = client.register;

export const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code']
});

export function metricsMiddleware() {
  return (req, res, next) => {
    const end = httpRequestDuration.startTimer();
    res.on('finish', () => {
      end({
        method: req.method,
        route: req.route ? req.route.path : req.path,
        status_code: res.statusCode
      });
    });

    next();
  };
};

export function metricsEndpoint() {
  return async (req, res) => {
    res.setHeader('Content-Type', register.contentType);
    res.end(await register.metrics());
  };
};