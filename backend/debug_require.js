try {
  const auth = require('./routes/authRoutes');
  console.log('authRoutes typeof', typeof auth);
  console.log('authRoutes keys', Object.keys(auth));
  console.log('authRoutes === module.exports?', auth === require.cache[require.resolve('./routes/authRoutes')]?.exports);
} catch (err) {
  console.error('require error', err);
}
