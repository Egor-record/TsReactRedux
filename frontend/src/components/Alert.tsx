import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/types";
import DeletePost from "./DeletePost";
import {AppDispatch} from "../../store/store";
import {fetchAlert} from "./alertSlice";
import {deleteOnePost, setActivePostID} from "../post/postSlice";
import {getAllPosts} from "../feed/feedSlice";

export default function AlertBox() {

    const alertState = useSelector((state: RootState) => state.alert.opened);
    const postState = useSelector((state: RootState) => state.post);
    const dispatch = useDispatch<AppDispatch>();

    const deletePost = () => {
        dispatch(deleteOnePost(postState.activePostId))
        dispatch(getAllPosts());
        closeAlert();

    }
    const closeAlert = () => {
        dispatch(fetchAlert("none"));
        dispatch(setActivePostID(""));
    }

   if (alertState === "delete") {
       return (
           <div className="overlay" onClick={closeAlert}>
               <DeletePost handleCloseAlert={closeAlert} handleDeletePost={deletePost} />
           </div>
       )
   }
   return (
       <div/>
   )
}

