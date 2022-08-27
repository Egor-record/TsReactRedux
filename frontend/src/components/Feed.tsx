import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Post, RootState} from "../store/types";
import {getAllPosts} from "../slices/feedSlice";
import {setActivePostID} from "../slices/postSlice";
import {AppDispatch} from "../store/store";
import {Link} from "react-router-dom";
import AlertBox from "./Alert";
import {fetchAlert} from "../slices/alertSlice";


export default function Feed() {

    const postList = useSelector((state: RootState) => state.feed.value);
    const dispatch = useDispatch<AppDispatch>();


    const deletePost = (id : String) => {
        dispatch(setActivePostID(id));
        dispatch(fetchAlert("delete"));
    }

    useEffect(() => {
        dispatch(getAllPosts());
    },[])

    return (
        <div className="container">
            <AlertBox  />
            <h1>Все посты</h1>
            {postList.map((post : Post, index) => {
              return (
                  <div key={index}>
                      <p>
                          {post.text.slice(0, 500)}{post.text.length > 500 ?  <span>...</span> : ""}
                      </p>
                      <div className="d-flex">
                          {post.text.length > 500 ?  <Link to={"/post/" + post._id} className="btn btn-outline-success mb-3 me-2">Открыть пост</Link> : ""}
                          <button className="btn btn-danger mb-3" onClick={()=>deletePost(post._id)}>Удалить пост</button>
                      </div>
                      <hr/>
                  </div>
              )
            })}
        </div>
    )
}