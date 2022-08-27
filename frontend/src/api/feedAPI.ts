import { Post } from "../store/types";
import {checkIfTokenExpired} from "./loginAPI";

export function getPosts() {

    return new Promise<Post[]>(async (resolve, reject) => {
            let response = await fetch('/posts');
            let result = await response.json();
            if (response.status === 200) {
                resolve(result);
            } else {
                checkIfTokenExpired(response.status, result.statusCode)
                reject()
            }
        }
    );
}