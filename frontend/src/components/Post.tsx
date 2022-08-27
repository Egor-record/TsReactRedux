import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store";
import {setActivePostID} from "./postSlice";
import {useLocation} from "react-router-dom";
import {getPostByID} from "./postAPI";

export default function Post() {
    const [post, setPost] = useState({
            _id: "",
            text: "",
            time: 0,
            post: false,
    });
   const dispatch = useDispatch<AppDispatch>();
   const location = useLocation();
   const currentID =  location.pathname.split('/')[2];

   useEffect(() => {
        dispatch(setActivePostID(currentID));
        getPostByID(currentID).then(r => {
            setPost(prevState => ({
                   ...prevState,
                   _id: r._id,
                    text: r.text,
                    post: r.post
                })
            )
        });

    },[]);

    return (
        <div className="container">
            <main>
                <p>
                    {
                        post.text
                    }
                </p>
            </main>
        </div>
    )
}