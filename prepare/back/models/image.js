module.exports = (sequelize, DataTypes) => {
	const Image = sequelize.define('Image', { // MySQL에는 images 테이블 생성
		// id가 기본적으로 들어있다.
		src: {
			type: DataTypes.STRING(200),
			allowNull: false,
		},
	}, {
		charset: 'utf8',
		collate: 'utf8_general_ci',
	});
	Image.associate = (db) => {
		db.Image.belongsTo(db.Post); // Image는 Post에 속해있다
	};
	return Image;
};