import React from "react";
import {InputProps} from "../../store/types";

export default function LoginInput(props : InputProps) {
    return (
        <div className="form-floating">
            <input type={props.type}
                   required={true}
                   className="form-control"
                   id="floatingInput"
                   name={props.name}
                   onChange={props.handleInputChange}
                   autoComplete={props.name}
                   placeholder={props.placeholder} />
            <label htmlFor="floatingInput">{props.label}</label>
        </div>
    )
}