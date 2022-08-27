import { Post } from "../../store/types";

export function getPosts() {

    return new Promise<Post[]>(async (resolve, reject) => {
            let response = await fetch('/posts');
            let result = await response.json();
            if (response.status === 200) {
                resolve(result);
            } else {
                reject()
            }
        }
    );
}