const { DataTypes } = require("sequelize/types");

module.exports = (sequelize, DataTypes) => {
	const Comment = sequelize.define('Comment', { // MySQL에는 comments 테이블 생성
		// id가 기본적으로 들어있다.
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	}, {
		charset: 'utf8mb4',
		collate: 'utf8mb4_general_ci', // 이모티콘 저장
	});
	Comment.associate = (db) => {
		db.Comment.belongsTo(db.User); // Comment는 User에 속해있다
		db.Comment.belongsTo(db.Post); // Comment는 Post 속해있다
	};
	return Comment;
};