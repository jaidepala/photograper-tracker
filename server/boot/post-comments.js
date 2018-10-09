'use strict';

module.exports = function (app) {

	const Comment 	= app.models.Comment,
		  People	= app.models.People,
		  Post 		= app.models.Post;

	Comment.addComment = function(postId, theComment, cb) {

		var poster 		= theComment.poster,
			posterId	= theComment.posterId,
			published 	= theComment.published,
			comment 	= theComment.description;

		// console.log('postId', postId);

		if( !postId || postId == null ) {

			var errorMessage = new Error('Post ID doesn\'t exist.');
				errorMessage.status = 401;

			// console.log('errorMessage', errorMessage);

			cb( errorMessage );

			return false;
		};

		Post.findOne({
			where: { 
				id: postId
			}
		}, function( thisPostErr, thisPost ) {

			if( thisPostErr || !thisPost || thisPost == null ) {

				var errorMessage = thisPostErr;

				if( !errorMessage ) {

					errorMessage = new Error('Could not find poster.');
					errorMessage.status = 401;
				};

				// console.log('errorMessage', errorMessage);

				cb( errorMessage );

				return false;
			};

			if( !thisPost.comments || thisPost.comments == null )
				thisPost.comments = [];

			var allComments = thisPost.comments;
				
			allComments.push( theComment );

			// console.log('allComments', typeof allComments, '\n\n', allComments, '\n\n');

			Post.update({ 
				id: postId
			}, {

				comments: allComments

			}, function( updateErr, updateRes ) {

				if( updateErr || !updateRes ) {

					var errorMessage = updateErr;

					if( !errorMessage ) {

						errorMessage = new Error('Could not update post with id ' + postId + '.');
						errorMessage.status = 401;
					};

					// console.log('errorMessage', errorMessage);

					cb( errorMessage );

					return false;
				};

				cb( null, updateRes );
			});
		});
	};

	Comment.remoteMethod(
		'addComment', {
			description: 'Add comment to a particular post.',
			accepts: [{
				arg: 'postId',
				description: 'ID of the post.',
				type: 'string', 
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
            	path: '/post/add-comment',
                verb: 'post'
            }
		}
	);

	Post.getPost = function( cb ) {

		var allPosts = [];

		Post.find({

			order: 'published DESC'

		}, function( postListErr, postListRes ) {

			if(postListErr || !postListRes || postListRes.length == 0) {

				var errorMessage = postListErr;

				if( !errorMessage )
				{
				    errorMessage = new Error('No posts!');
				    errorMessage.status = 501;
				}

				// console.log('errorMessage', errorMessage);

				cb( errorMessage );

				return false;
			};

			postListRes.forEach(function( thisPost, thisPostIndex ) {

				// console.log('postListRes length: ', thisPostIndex, ' / ' + (postListRes.length), '\n\n');

				var thisPosterId 		= thisPost.posterId,
					thisPostId 			= thisPost.id,
					thisPostComments	= thisPost.comments;

				People.findOne({
					where: {
						id: thisPosterId
					}
				}, function( posterPersonErr, posterPersonRes ) {

					if( posterPersonErr || !posterPersonRes ) {

						var errorMessage = posterPersonErr;

						if( !errorMessage ) {

							errorMessage = new Error('Could not find poster.');
							errorMessage.status = 401;
						};

						// console.log('posterPersonErr', errorMessage);

						return false;
					};
					
					var posterReturnRes = {

						description: thisPost.description,
						posterId: thisPost.posterId,
						published: thisPost.published,
						status: thisPost.status,
						id: thisPost.id,
						// comments: thisPost.comments,
						comments: [],
						poster: {
							email: posterPersonRes.email,
							firstname: posterPersonRes.firstname,
							lastname: posterPersonRes.lastname,
							id: posterPersonRes.id
						}
					};

					if( !thisPostComments || thisPostComments.length == 0 ) {

						allPosts.push( posterReturnRes );

						if( thisPostIndex == (postListRes.length - 1)) {

							// console.log('\n\nCALLBACK...\n\n', allPosts, '\n\n');

							cb( null, allPosts );
						};

						return false;
					}
					else {

						thisPostComments.forEach(function( thisComment, thisCommentInd ) {

							// console.log('thisPostComments length: ', thisCommentInd, ' / ' + (thisPostComments.length), '\n\n');

							var thisCommentPosterId = parseInt( thisComment.posterId ),
								thisCommentPoster 	= thisComment.poster;

							People.findOne({
								where: {
									id: thisCommentPosterId
								}
							}, function( commentPersonErr, commentPersonRes ) {

								if( commentPersonErr || !commentPersonRes ) {

									var errorMessage = commentPersonErr;

									if( !errorMessage )
									{
										errorMessage = new Error('No person for comment id: ' + thisComment.id);
										errorMessage.status = 401;
									}

									// console.log('commentPersonErr', errorMessage);

									return false;
								};

								var commentReturnObj = {

									comment: thisComment.description,
									published: thisComment.published,
									poster: {
										email: commentPersonRes.email,
										firstname: commentPersonRes.firstname,
										lastname: commentPersonRes.lastname,
										id: commentPersonRes.id
									}
								};

								posterReturnRes.comments.push( commentReturnObj );

								if( thisCommentInd == (thisPostComments.length - 1) ) {

									allPosts.push( posterReturnRes );
									
									if( thisPostIndex == (postListRes.length - 1) ) {

										// console.log('\n\nCALLBACK...\n\n', allPosts, '\n\n');

										cb( null, allPosts );
									};
								};

							});
						});
					}
				});
			});
		});
	};

	Post.remoteMethod(
		'getPost', {
			description: 'Get posts.',
			// accepts: {
			// },
			returns: {
				arg: 'data',
				type: 'array'
			},
            http: {
            	path: '/get-posts',
                verb: 'get'
            }
		}
	);
};
