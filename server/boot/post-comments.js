'use strict';

module.exports = function (app) {

	const Comment 	= app.models.Comment,
		  People	= app.models.People,
		  Post 		= app.models.Post;

	Comment.addComment = function(postId, theComment, cb) {

		var poster 		= theComment.poster,
			posterId	= theComment.posterId,
			published 	= theComment.published,
			comment 	= theComment.comment;

		Post.findOne({
			where: { 
				id: postId
			}
		})
		.then(function( thisPost ) {

			if( !thisPost || thisPost == null ) {

				console.log('no result found...');
				return false;
			}

			console.log('thisPost', thisPost);

			if( !thisPost.comments || thisPost.comments == null )
				thisPost.comments = [];

			var allComments = thisPost.comments;
				
			allComments.push( theComment );

			Post.update({ 
				id: postId
			}, {
				comments: allComments
			})
			.then(function( updateRes ) {

				cb( null, updateRes );
			})
			.catch(function( updateErr ) {
				
				cb( updateErr );
			});
		})
		.catch(function( err ) {

			console.log(err);

			cb( err )
		});
		// process.nextTick(function() {
		// 	msg = msg || 'hello';
		// 	cb(null, 'Angular and Loopback is now Configured For ' + msg);
		// });
	};

	Comment.remoteMethod(
		'addComment', {
			description: 'Add comment to a particular post.',
			accepts: [{
				arg: 'postId',
				description: 'ID of the post.',
				type: 'number', 
				required: true
			},
			{
				arg: 'comment',
				in: 'body',
				type: 'object',
				description: 'Comment object.',
				required: true
			}],
			returns: {
				arg: 'data',
				type: 'object'
			},
            http: {
            	path: '/post/:postId/add-comment',
                verb: 'post'
            }
		}
	);

	Post.getPost = function(posterId, cb) {

		Post.find({
			where: { 
				posterId: posterId
			}
		})
		.then(function( postRes ) {

			if( !postRes || postRes == null ) {

				console.log('no result found...');
				
				cb('No post found.');
				return false;
			};

			postRes.forEach(function(thisPost, ind) {

				var thisPosterId 	= thisPost.posterId,
					thisPostId 		= thisPost.id;

				People.findOne({
					where: {
						id: thisPosterId
					}
				})
				.then(function( userRes ) {

					if( !userRes || userRes == null ) {

						console.log('no user res found...');

						cb('No user found!');

						return false;
					};

					Comment.find({
						where: {
							id: thisPostId
						}
					})
					.then(function( commentRes ) {

						console.log('commentRes', commentRes);

						People.findOne({
							where: {
								id: commentRes.posterId
							}
						})
						.then(function( commentUserRes ) {
							
							// var returnRes = {

							// 	description: thisPost.description,
							// 	published: thisPost.published,
							// 	status: thisPost.status,
							// 	comments: thisPost.comments,
							// 	poster: {
							// 		email: thisPost.poster,
							// 		posterId: thisPost.posterId,
							// 		firstName: commentUserRes.firstname,
							// 		lastName: commentUserRes.lastname,
							// 		fullName: commentUserRes.firstname + ' ' + commentUserRes.lastname
							// 	}
							// };

							cb(null, commentUserRes);
						})
						.catch(function(  commentUserErr ) {
							
						});

						
					})
					.catch(function( commentErr ) {
						
					});
				})
				.catch(function( userErr ) {
					
					cb( userErr );
				});
			});

		})
		.catch(function( err ) {

			console.log(err);

			cb( err )
		});
	};

	Post.remoteMethod(
		'getPost', {
			description: 'Get posts.',
			accepts: [{
				arg: 'posterid',
				description: 'ID of the poster.',
				type: 'number', 
				required: true
			}],
			returns: {
				arg: 'data',
				type: 'object'
			},
            http: {
            	path: '/:posterid/get-posts',
                verb: 'get'
            }
		}
	);
};
