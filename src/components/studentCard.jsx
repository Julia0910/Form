import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { renderAgePhrase } from "../utils/date";

const StudentCard = () => {
  const [cardContent, setCardContent] = useState("Нет данных");

  let history = useHistory();

  const handleStudentCard = () => {
    history.push("/formStudent");
  };

  useEffect(() => {
    const form = localStorage.getItem("form");
    form && setCardContent(JSON.parse(form));
  }, []);

  const formUser = (
    <div>
      <h6>{`Имя: ${cardContent.name}`}</h6>
      <h6>{`Фамилия: ${cardContent.surname}`}</h6>
      <h6>{`Отчество: ${cardContent.patronymic}`}</h6>
      <h6>{`Год рождения: ${cardContent.age} (${renderAgePhrase(
        new Date().getFullYear() - cardContent.age
      )})`}</h6>
      <h6>{`Портфолио: ${cardContent.link}`}</h6>
    </div>
  );

  return (
    <div className="ms-4">
      <h1>Карточка студента</h1>
      <div>{typeof cardContent === "string" ? cardContent : formUser} </div>
      <button className="btn btn-primary" onClick={handleStudentCard}>
        {typeof cardContent === "string" ? "Добавить" : "Редактировать"}
      </button>
    </div>
  );
};

export default StudentCard;
