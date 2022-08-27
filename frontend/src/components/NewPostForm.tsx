import React, { useState} from 'react';
import {DebounceInput} from 'react-debounce-input';
import getUnixTime from 'date-fns/getUnixTime'
import {useDispatch} from "react-redux";
import {createNewPost} from '../slices/newPostSlice';
import {parse} from "date-fns";
import {Post} from "../store/types";


export default function NewPostForm() {

    const [textInput, setTextInput] = useState<string>('');
    const [time, setTime] = useState({
        hours: "",
        minutes: "",
    })
    const dispatch = useDispatch();

    const submitForm = (type : string, e : React.MouseEvent): void => {
        e.preventDefault();
        if (textInput !== "") {
            const formData : Post = {
                _id: "",
                text:  textInput,
                time: type === "timer" ? getUnixTime(parseDate(time.hours + ":" + time.minutes))  : getUnixTime(new Date()),
                post: type !== "addDB"
            }
            dispatch(createNewPost(formData));
            setTextInput("");
        }
    }

    const updateTime = ( e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTime({
                ...time,
                [name]: value,
            });
    }

    const options = (size : Number) => [...Array(size)].map((i, index) => {
        return (
            <option key={index} value={index}>{index}</option>
        )
    });

    const parseDate = (date : string) => parse(date, 'HH:mm', new Date())

    return (
        <div className='container'>
            <h1 className="mt-2">Новый пост</h1>
            <form>
                <DebounceInput
                    minLength={2}
                    placeholder="Начните вводить текст..."
                    element="textarea"
                    rows={10}
                    cols={45}
                    className="w-100"
                    value={textInput}
                    debounceTimeout={1000}
                    onChange={e => setTextInput(e.target.value)} /><hr/>

                <div className="mt-3 mb-3">Время публикации:<br/> сегодня в
                    <select name="hours"
                            className=" form-select form-select-sm"
                            onChange={updateTime}>{options(24)}</select>:
                    <select name="minutes"
                            className={"form-select form-select-sm"}
                            onChange={updateTime}
                    >{options(60)}</select></div>
                <div className="d-grid gap-2 text-center d-md-flex">
                    <button className="btn btn-success"
                            onClick={event => submitForm("submitNow", event)}>Опубликовать сейчас и добавить в базу</button>
                    <button className="btn btn-outline-success"
                            value="timer"
                            onClick={event => submitForm("timer", event)}>Опубликовать с таймером</button>
                    <button className="btn btn-primary"
                            value="db"
                            onClick={event => submitForm("addDB", event)}>Только добавить в базу</button>
                </div>
                <br/>
            </form>
        </div>
    )
}