import React, { Component } from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.css';


class Posts extends Component {
	state = {
		posts: [],
		selectedPostId: null,
		error: false,
	};

  componentDidMount() {
    console.log(this.props)
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
        <Post
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={() => this.postSelectedHandler(post.id)}
        />
			);
		});
		
    return <section className="Posts">{posts}</section>;
	}
}

export default Posts;
