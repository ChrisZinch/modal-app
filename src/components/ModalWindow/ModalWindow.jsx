import React, { useEffect, useState } from 'react';
import { getImage } from '../../api/images';
import { addComment, getComments } from '../../api/images';
import "./ModalWindow.css";


export const ModalWindow = ({setOpen, currentId, currentImg}) => {
  const [name, setName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [commentsList, setCommentsList] = useState([]);
 
  useEffect(() => {
    getImage(currentId);
    getComments(currentId)
      .then((data) => {
        console.log(data)
        setCommentsList(data)
      })
  }, []);

  const handleCommentAdd = (name, description, currentId) => {
    addComment(name, description, currentId)
      .then(() => {
        getComments(currentId)
          .then((data) => {
            console.log(data);
            setCommentsList(data);
          })
      });
    setName('');
    setNewComment('');
  };

  return (
    <div className="modal-window">
      <div className="left">
        <img
          alt="nature"
          src={currentImg}
          className="modal-window__img"
        />
        <form
          className="comment-form"
          onSubmit={(event) => {
            event.preventDefault();
            handleCommentAdd(name, newComment, currentId);
          }}
        >
          <div className="form-field">
            <input
              type="text"
              value={name}
              name="name"
              placeholder="Ваше имя"
              className="comment-form__input"
              onChange={event => setName(event.target.value.trimLeft())}
              required
              autoComplete="off"
            />
          </div>
          <div className="form-field">
            <textarea
              name="comment"
              value={newComment}
              placeholder="Ваш комментарий"
              className="comment-form__input"
              onChange={event => setNewComment(event.target.value.trimLeft())}
              required
            />
          </div>
          <button
            type="submit"
            className="comment-form__submit-button"
          >
            Оставить комментарий
          </button>
        </form>
      </div>
      <div className="right">
          <ul className="comments__list">
            {commentsList.map(item => (
              <li key={item.image_id} className="comments__item">
                {item.description}
              </li>
            ))}
          </ul>
      </div>
      <button
        type="button"
        onClick={() => {
          setOpen(false);
        }}
        className="cross-button"
      />
    </div>
  )
}