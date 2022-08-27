import {AlertBoxProps} from "../store/types";

export default function DeletePost(props : AlertBoxProps) {
    return (
        <div className="alert alert-danger d-flex align-items-center" role="alert" onClick={(e)=>e.stopPropagation()}>
            <div className="container">
                <strong>Удалить пост?</strong>
                <button className="btn-outline-danger btn ms-5" onClick={props.handleDeletePost}>Удалить</button>
                <button className="btn-outline-success btn ms-2" onClick={props.handleCloseAlert}>Отмена</button>
            </div>
        </div>
    )
}