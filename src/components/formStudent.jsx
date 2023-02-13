import React, { useEffect, useState } from "react";
import TextField from "./textField";
import { validator } from "../utils/validator";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

const FormStudent = () => {
  const [data, setData] = useState({
    name: "",
    surname: "",
    patronymic: "",
    age: "",
    link: "",
  });
  const [errors, setErrors] = useState({});
  const [isLocalStorageEmpty, setIsLocalStoregeEmpty] = useState(true);
  const [showModal, setShowModal] = useState(false);

  let history = useHistory();

  useEffect(() => {
    const form = localStorage.getItem("form");
    setIsLocalStoregeEmpty(!form);
    form && setData(JSON.parse(form));
  }, []);

  const handleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const validatorConfig = {
    name: {
      isRequired: {
        message: "Поле 'Имя' обязательно для заполнения",
      },
    },
    surname: {
      isRequired: {
        message: "Поле 'Фамилия' обязательно для заполнения",
      },
    },
    patronymic: {
      isRequired: {
        message: "Поле 'Отчество'  обязателено для заполнения",
      },
    },
    age: {
      isRequired: {
        message: "Поле 'Год рождения'  обязательно для заполнения",
      },
      isAge: {
        message: "Поле 'Год рождения' некоректно",
      },
    },
    link: {
      isRequired: {
        message: "Поле 'Портфолио'  обязательно для заполнения",
      },
      isLink: {
        message: "Поле 'Портфолио' должно быть ссылкой",
      },
    },
  };
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    validate();
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    localStorage.setItem("form", JSON.stringify(data));
    setShowModal(true);
  };
  const handleClickBack = () => {
    history.goBack();
  };
  const handleClose = () => {
    setShowModal(false);
    history.push("/");
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h1 className="mb-4">
            {isLocalStorageEmpty ? "Создать" : "Редактировать"}
          </h1>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Имя"
              name="name"
              value={data.name}
              onChange={handleChange}
              error={errors.name}
            />
            <TextField
              label="Фамилия"
              name="surname"
              value={data.surname}
              onChange={handleChange}
              error={errors.surname}
            />
            <TextField
              label="Отчество"
              name="patronymic"
              value={data.patronymic}
              onChange={handleChange}
              error={errors.patronymic}
            />
            <TextField
              type="number"
              label="Год рождения"
              name="age"
              value={data.age}
              onChange={handleChange}
              error={errors.age}
            />
            <TextField
              label="Портфолио"
              name="link"
              value={data.link}
              onChange={handleChange}
              error={errors.link}
            />
            {!isLocalStorageEmpty && (
              <button
                onClick={handleClickBack}
                className="btn btn-secondary me-2 mx-auto"
                type="button"
              >
                Назад
              </button>
            )}
            <button
              className="btn btn-primary mx-auto"
              type="submit"
              disabled={!isValid}
            >
              {isLocalStorageEmpty ? "Создать" : "Обновить"}
            </button>
            <Modal show={showModal} onHide={handleClose}>
              <Modal.Body>Обновлено!</Modal.Body>
              <Modal.Footer>
                <button
                  className="text-primary btn btn-light"
                  onClick={handleClose}
                >
                  Close
                </button>
              </Modal.Footer>
            </Modal>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormStudent;
