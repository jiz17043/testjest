const fs = require('fs');
const path = require('path');

function maskSensitive(obj) {
  if (!obj) return obj;
  const clone = { ...obj };
  if (clone.password) clone.password = '***MASKED***';
  return clone;
}

function traceApi(req, res, next) {
  const trace = {
    time: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    body: maskSensitive(req.body),
    user: req.user || null
  };
  const logPath = path.join(__dirname, '../../api-trace.log');
  fs.appendFile(logPath, JSON.stringify(trace) + '\n', err => {
    if (err) console.error('Trace log error:', err);
  });
  next();
}

module.exports = { traceApi };
