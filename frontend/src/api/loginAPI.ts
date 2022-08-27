import {loginResponse, userState} from "../store/types";

export function fetchLoginData(login : userState, method : string) {
    return new Promise<loginResponse>(async (resolve, reject) => {
            let response = await fetch('/user/' + method, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(login)
            });

            let result = await response.json();
            if (response.status === 200) {
                resolve({
                    token : result.token,
                    user: { name: result.name, password: "" }
                });
            } else {
                checkIfTokenExpired(response.status, result.statusCode)
                reject()
            }
        }
    );
}

export function checkIfTokenExpired(headerStatus : number, bodyStatusCode : number) {
    if ( headerStatus === 401 && bodyStatusCode === 100 ) {
        document.cookie = "lenyablog=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
}
