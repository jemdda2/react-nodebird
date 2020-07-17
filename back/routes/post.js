const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Image, Comment, User, Hashtag } = require('../models');
const { isLoggedIn  } = require('./middlewares');

const router = express.Router();

try {
	fs.accessSync('uploads');
} catch (error) {
	console.log('uploadsが存在しないので、作成します。');
	fs.mkdirSync('uploads');
}

const upload = multer({
	storage: multer.diskStorage({  // 保存場所
		destination(req, file, done) {
			done(null, 'uploads');
		},
		filename(req, file, done) { // text.png
			const ext = path.extname(file.originalname); // 拡張子(.png)
			const basename = path.basename(file.originalname, ext); // text
			done(null, basename + '_' + new Date().getTime() + ext);
		}
	}),
	limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
	try{
		const hashtags = req.body.content.match(/#[^\s#]+/g);
		const post = await Post.create({
			content: req.body.content,
			UserId: req.user.id,
		});
		if (hashtags) {
			const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({
				where: { name: tag.slice(1).toLowerCase() },
			})));
			await post.addHashtags(result.map((v) => v[0]));
		}
		if (req.body.image) {
			if (Array.isArray(req.body.image)) { // イメージを複数UPLOADをする場合　image: [text1.png, text2.png]
				const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image })));
				await post.addImages(images);
			} else { // イメージが一つの場合　text1.png
				const image = await Image.create({ src: req.body.image });
				await post.addImages(image);
			}
		}
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [{
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User, // 댓글 작성자
          attributes: ['id', 'nickname'],
        }],
      }, {
        model: User, // 게시글 작성자
        attributes: ['id', 'nickname'],
      }, {
        model: User, // 좋아요 누른 사람
        as: 'Likers',
        attributes: ['id'],
      }, {
				model: Post,
				as: 'Retweet',
				include: [{
					model: User,
					attributes: ['id', 'nickname'],
				}, {
					model: Image,
				}]
			}]
    })
		res.status(200).json(fullPost);
	} catch(error) {
		console.error(error);
		next(error);
	}
});

router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => { // POST /post/images
  console.log(req.files);
  res.json(req.files.map((v) => v.filename));
})

router.post('/:postId/comment', isLoggedIn, async (req, res, next) => { // POST /post/1/comment
	try{
		const post = await Post.findOne({
			where: { id: req.params.postId }
		});
		if (!post) {
			return res.status(403).send('존재하지 않는 게시글입니다.');
		}
		const comment = await Comment.create({
			content: req.body.content,
			PostId: parseInt(req.params.postId, 10),
			UserId: req.user.id,
		});
		const fullComment = await Comment.findOne({
			where: { id: comment.id },
			include: [{
				model: User,
				attributes: ['id', 'nickname'],
			}],
		})
		res.status(200).json(fullComment);
	} catch(error) {
		console.error(error);
		next(error);
	}
});

router.patch('/:postId/like', isLoggedIn, async (req, res, next) => { // PATCH /post/1/like
	try {
		const post = await Post.findOne({ where: { id: req.params.postId }});
		if (!post) {
			return res.status(403).send('게시글이 존재하지 않습니다.');
		}
		await post.addLikers(req.user.id);
		res.json({ PostId: post.id, UserId: req.user.id });
	} catch (error) {
		console.error(error);
		next(error);
	}
});

router.delete('/:postId/unlike', isLoggedIn, async (req, res, next) => { // DELETE /post/1/like
	try {
		const post = await Post.findOne({ where: { id: req.params.postId }});
		if (!post) {
			return res.status(403).send('게시글이 존재하지 않습니다.');
		}
		await post.removeLikers(req.user.id);
		res.json({ PostId: post.id, UserId: req.user.id });
	} catch (error) {
		console.error(error);
		next(error);
	}
});

router.delete('/:postId', isLoggedIn, async (req, res, next) => { // DELETE /post/1
	try {
		await Post.destroy({
			where: { 
				id: req.params.postId,
				UserId: req.user.id,
			},
		});
		res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
	} catch (error) {
		console.error(error);
		next(error);
	}
});

router.get('/:postId', async (req, res, next) => { // GET /post/1
	try{
		const post = await Post.findOne({
			where: { id: req.params.postId },
		});
		if (!post) {
			return res.status(404).send('存在しない投稿です。');
		}
		const fullPost = await Post.findOne({
			where: { id: post.id },
			include: [{
				model: Post,
				as: 'Retweet',
				include: [{
					model: User,
					attributes: ['id', 'nickname'],
				}, {
					model: Image,
				}]
			}, {
				model: User,
				attributes: ['id', 'nickname'],
			}, {
				model: User,
				as: 'Likers',
				attributes: ['id', 'nickname'],
			}, {
				model: Image,
			}, {
				model: Comment,
				include: [{
					model: User,
					attributes: ['id', 'nickname'],
				}],
			}],
		})
		res.status(200).json(fullPost);
	} catch(error) {
		console.error(error);
		next(error);
	}
});

router.post('/:postId/retweet', isLoggedIn, async (req, res, next) => { // POST /post/1/retweet
	try{
		const post = await Post.findOne({
			where: { id: req.params.postId },
			include: [{
				model: Post,
				as: 'Retweet',
			}],
		});
		if (!post) {
			return res.status(403).send('存在しない投稿です。');
		}
		if (req.user.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.user.id)) {
			return res.status(403).send('自分の投稿にはリツイート出来ません。')
		}
		const retweetTargetId = post.RetweetId || post.id;
		const exPost = await Post.findOne({
			where: {
				UserId: req.user.id,
				RetweetId: retweetTargetId,
			},
		});
		if (exPost) {
			return res.status(403).send('既にリツイートされています。')
		}
		const retweet = await Post.create({
			UserId: req.user.id,
			RetweetId: retweetTargetId,
			content: 'retweet',
		});
		const retweetWithPrevPost = await Post.findOne({ // どんな投稿をRetweetしたのか。。
			where: { id: retweet.id },
			include: [{
				model: Post,
				as: 'Retweet',
				include: [{
					model: User,
					attributes: ['id', 'nickname'],
				}, {
					model: Image,
				}]
			}, {
				model: User,
				attributes: ['id', 'nickname'],
			}, {
				model: Image,
			}, {
				model: Comment,
				include: [{
					model: User,
					attributes: ['id', 'nickname'],
				}]
			}]
		})
		res.status(200).json(retweetWithPrevPost);
	} catch(error) {
		console.error(error);
		next(error);
	}
});

module.exports = router;