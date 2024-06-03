import React from "react";
import "./posts.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; 

const SavedPosts = () => {
    const navigate = useNavigate();
    const posts = useSelector(state => state.posts.posts); 
    console.log(posts,"possssssss")
    return (
        <div className="container">
            <div className="head">
                <div>
                <span onClick={()=>navigate('/')}><i className="fa fa-angle-left"></i> Back</span>
                <h2>Saved Posts</h2>
                </div>
                <div></div>
            </div>
            <div>
                {posts && Object.values(posts).map((post, index) => (
                    <div key={post.id || index} className="postLists">
                        <h4>{post.title}</h4>
                        <p>{post.body}</p>
                        <div className="icons">
                            <div>
                                <span>
                                    <i className="fas fa-heart" style={{ color: "red" }}></i>
                                    <p>25</p>
                                </span>
                                <span>
                                    <i className="fa fa-thumbs-down"></i>
                                    <p>10</p>
                                </span>
                            </div>
                            <span>
                                <i className="fa fa-eye"></i>
                                <p>145</p>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SavedPosts;
