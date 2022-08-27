import {Post, PostResponse} from "../store/types";
import {checkIfTokenExpired} from "./loginAPI";

export function getPostByID(postID : String) {
    return new Promise<Post>(async (resolve, reject) => {
            if (postID) {
                let response = await fetch('/post?id=' + postID);
                let result = await response.json();
                if (response.status === 200) {
                    resolve(result);
                } else {
                    console.log("Here");
                    checkIfTokenExpired(response.status, result.statusCode)
                    reject()
                }
            } else {
                reject()
            }

        }
    );
}

export function deletePost(postID : String) {
    return new Promise<PostResponse>(async (resolve, reject)=> {
        if (postID) {
            let response = await fetch('/post?id=' + postID, {
                method: 'DELETE'
            });
            let result = await response.json();
            if (response.status === 200) {
                resolve(result);
            } else {
                checkIfTokenExpired(response.status, result.statusCode)
                reject()
            }
        }
    })
}