const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
	const target =
		process.env.NODE_ENV === 'production'
			? 'https://your-production-url.com'
			: 'http://localhost:5555';

	app.use(
		['/api', '/auth/google', '/car'],
		createProxyMiddleware({
			target: target,
			changeOrigin: true,
		})
	);
};
