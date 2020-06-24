const { DataTypes } = require("sequelize/types");

module.exports = (sequelize, DataTypes) => {
	const Post = sequelize.define('Post', { // MySQL에는 posts 테이블 생성
		// id가 기본적으로 들어있다.
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	}, {
		charset: 'utf8mb4',
		collate: 'utf8mb4_general_ci', // 이모티콘 저장
	});
	Post.associate = (db) => {
		db.Post.belongsTo(db.User); // Post는 User에 속해있다
		db.Post.belongsToMany(db.Hashteg) // N : N
		db.Post.hasMany(db.Comment); // Post 1 : Comment N
		db.Post.hasMany(db.Image); // Post 1 : Image N
		db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' }) // N : N
		db.Post.belongsTo(db.Post, { as: 'Retweet' }); // 리트윗 
	};
	return Post;
};