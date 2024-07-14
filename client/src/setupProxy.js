const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	const target =
		process.env.NODE_ENV === 'production'
			? // ? 'https://your-production-url.com'
			  'https://yu-mern-rtk-query-car-3-hs084kb0p-jisooyus-projects.vercel.app/'
			: 'http://localhost:5000';

	app.use(
		['/api', '/auth/google', '/car'],
		createProxyMiddleware({
			target: target,
			changeOrigin: true,
		})
	);
};
