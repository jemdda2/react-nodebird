const passport = require('passport');
const local = require('./local');
const { User } = require('../models');

module.exports = () => {
	// 처음 로그인 할때는 ID만 보관 이유는 너무 많은 데이터를 가지고 있으면 서버에 부담이 생김
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	// 로그 성공후 요청 ID로 사용자 정보를 복구
	passport.deserializeUser(async (id, done) => {
		try {
			const user = await User.findOne({ where: { id }});
			done(null, user); // req.user
		} catch (error) {
			console.error(error);
			done(error);
		}
	});

	local();
};