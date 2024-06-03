// Posts.js
import React, { useEffect, useState } from "react";
import "./posts.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SavedPosts from "./savedPosts";
import { addPost } from "./postSlice";
import { useDispatch } from "react-redux";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [postsSearch, setPostSearch] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState(null);
    const [searchVal, setSearchVal] = useState("");
    const [newPost, setNewPost] = useState([{ title: "", body: "" }]); 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                setPosts(response.data);
                setPostSearch(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    useEffect(()=>{
        if(searchVal !== ""){
        const filtered = posts.filter((item)=>item.title.includes(searchVal))
        setPostSearch(filtered)
        }
        else{
            setPostSearch(posts)
        }
    },[searchVal])


    if (error) {
        return <div>Error: {error}</div>;
    }

    const createPostHandler = ()=>{
        setOpenModal(true);
    }

    const savedHandler = ()=>{
        navigate('/savedPosts')
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPost(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        dispatch(addPost(newPost));
        setOpenModal(false);
    }

    console.log(searchVal,postsSearch,posts)

    return (
        <div className="container">
            {loading ?
            <div className="load">
                <div>Loading...</div>
            </div>
            :
            <>
            <div className="head">
                <h2>All Posts</h2>
                <div>
                    <input type="text" onChange={(e)=>{setSearchVal(e.target.value);}} />
                    <button onClick={createPostHandler}>Create Post</button>
                    <button onClick={savedHandler}>Saved Posts</button>
                </div>
            </div>
            {/* <h2>Posts</h2> */}
            <div>
                {postsSearch.map((post,index) => {
                    return(
                        <div key={post.id} className="postLists">
                            <h4>{post.title}</h4>
                            <p>{post.body}</p>
                            <div className="icons">
                            <div>
                                <span>
                                <i class="fas fa-heart" style={{color:"red"}}></i>
                                <p>25</p>
                                </span>
                                <span>
                                <i class="fa fa-thumbs-down"></i>
                                <p>10</p>
                                </span>
                            </div>
                            <span>
                            <i class="fa fa-eye"></i>
                            <p>145</p>
                            </span>
                            </div>
                        </div>
                )})}
            </div>
            </>
            }
            {openModal &&
            <div id="myModal" class="modal">
            <div class="modal-content">
            <div>
                <h3>Create Post</h3>
                <span class="close" onClick={()=>setOpenModal(false)}>&times;</span>
            </div>
            <div>
                <label>Title</label>
                <input type="text" name="title" onChange={handleInputChange} />
                <label>Body</label>
                <textarea name="body" rows="4" cols="50" onChange={handleInputChange} />           
                </div>
                <div>
                <button type="submit" value="Submit" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
            </div>
            }
            <SavedPosts/>
        </div>
    )
}

export default Posts;
