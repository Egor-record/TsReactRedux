import {Post, PostResponse} from "../store/types";
import {checkIfTokenExpired} from "./loginAPI";

export function sendNewPostData(post : Post) {
    return new Promise<PostResponse>(async (resolve, reject) => {
            let response = await fetch('/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(post)
            });

            let result = await response.json();
            if (response.status === 201) {
                resolve({
                    status : response.status,
                    id : result.id
                });
            } else {
                checkIfTokenExpired(response.status, result.statusCode)
                reject()
            }
        }
    );
}
