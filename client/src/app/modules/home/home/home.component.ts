import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PeopleApi } from './../../../shared/sdk/index';
import { PostApi } from './../../../shared/sdk/index';
import { CommentApi } from './../../../shared/sdk/index';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	public home = {

		user: { 

			details: {
				
				id: this.cookieService.get( environment.COOKIES.LOGIN.ID ),
				firstName: '',
				lastName: '',
				gender: '',
				phone: '',
				email: ''
			}
		},
		post: {

			list: [],

			details: {

				description: '',
				location: 'Kandivali',
				assignedTo: [],
				status: 0
			}
		}
	};

	public toast = Swal.mixin({
		toast: true,
		position: 'center-start',
		showConfirmButton: false,
		timer: 3000
	});

	constructor(
		private people 	: PeopleApi,
		private post 	: PostApi,
		private comment : CommentApi,
		private cookieService: CookieService,
		private router 	: Router
	) {
	};

	ngOnInit() {

		if( !this.home.user.details.id || this.home.user.details.id == null ) {

			this.router.navigate(['/login']);
			return false;
		};

		this.people.findOne(
		{
			"where": {
				id: this.home.user.details.id
			}
		})
		.subscribe(( result ) => {

			if( !result || result == null ) {

				var msg = 'Failed to get details.';

				this.toast({
					type: 'error',
					title: msg
				});

				return false;
			}

			this.home.user.details.firstName 	= result['firstname'];
			this.home.user.details.lastName 	= result['lastname'];
			this.home.user.details.gender 		= result['gender'];
			this.home.user.details.phone 		= result['phone'];
			this.home.user.details.email 		= result['email'];

			this.getPosts();

		}, err => {

			var msg = err.message;

			this.toast({
				type: 'error',
				title: msg
			});

			this.router.navigate(['/login']);
		});
	};

	showCommentBox( thisPost ) {

		thisPost.showCommentBox = !thisPost.showCommentBox;
	};

	getPosts() {

		this.post.getPost()
		.subscribe(( result ) => {

			var listOfPosts = result.data;

			if( !listOfPosts || listOfPosts == null ) {

				var msg = 'No posts found.';

				this.toast({
					type: 'error',
					title: msg
				});

				return false;
			};

			for(var i = 0, len = listOfPosts.length; i < len; i++) {
				var thisPost = listOfPosts[i];

				thisPost['showCommentBox'] = false;
				thisPost['commentText'] = '';
			};

			this.home.post.list = listOfPosts;

		}, err => {

			var msg = err.message;

			this.toast({
				type: 'error',
				title: msg
			});
		});
	};

	addComments( thisPost ) {

		var thisPostId 			= thisPost.id,
			thisPostPoster 		= thisPost.poster,
			thisPostPosterId 	= thisPost.posterId,
			thisPostComment 	= thisPost.commentText;

		this.comment.addComment(thisPostId, {
			comment: {
				poster: this.home.user.details.email,
				posterId: this.home.user.details.id,
				published: new Date().getTime(),
				description: thisPostComment
			}
		})
		.subscribe(( result ) => {

			if( !result || result == null ) {

				var msg = 'Failed to add comment.';

				this.toast({
					type: 'error',
					title: msg
				});

				return false;
			};

			thisPost.commentText = '';

			this.getPosts();

		}, err => {

			var msg = err.message;

			this.toast({
				type: 'error',
				title: msg
			});
		});
	};

	createPost() {

		this.post.create({

			poster: this.home.user.details.email,
			posterId: this.home.user.details.id,
			description: this.home.post.details.description,
			location: this.home.post.details.location,
			assignedTo: this.home.post.details.assignedTo,
			status: this.home.post.details.status,
			published: new Date().getTime()
		})
		.subscribe(( result ) => {

			if( !result || result == null ) {

				var msg = 'Failed to create post.';

				this.toast({
					type: 'error',
					title: msg
				});

				return false;
			};

			this.home.post.details.description = '';

			this.getPosts();

		}, err => {

			var msg = err.message;

			this.toast({
				type: 'error',
				title: msg
			});
		});
	};

}
