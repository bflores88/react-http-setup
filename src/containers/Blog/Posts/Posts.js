import React, { Component } from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.css';
import { Link } from 'react-router-dom';

class Posts extends Component {
	state = {
		posts: [],
	};

	componentDidMount() {
		console.log(this.props);
		axios
			.get('/posts')
			.then((response) => {
				// console.log(response);
				const posts = response.data.splice(0, 4);
				const updatedPosts = posts.map((post) => {
					return {
						...post,
						author: 'Brenda',
					};
				});
				this.setState({
					posts: updatedPosts,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	postSelectedHandler = (id) => {
		this.setState({
			selectedPostId: id,
		});
	};

	render() {
		const posts = this.state.posts.map((post) => {
			return (
				<Link to={'/' + post.id} key={post.id}>
					<Post
						
						title={post.title}
						author={post.author}
						clicked={() => this.postSelectedHandler(post.id)}
					/>
				</Link>
			);
		});

		return <section className="Posts">{posts}</section>;
	}
}

export default Posts;
