const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/GME", {
      target: "http://172.25.12.91:8080",
      changeOrigin: true,
    })
  );
};
