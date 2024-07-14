const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
	const target =
		process.env.NODE_ENV === 'production'
			? 'https://https://yu-mern-rtk-query-car-3.vercel.app/'
			: 'http://localhost:5000';

	app.use(
		['/api', '/auth/google', '/car'],
		createProxyMiddleware({
			target: target,
		})
	);
};
