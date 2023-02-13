export function validator(data, config) {
  const errors = {};

  function validate(valedateMethod, data, config) {
    let statusValidate;
    switch (valedateMethod) {
      case "isRequired":
        statusValidate = data.trim() !== "";
        break;
      case "isAge": {
        const today = new Date();
        const year = today.getFullYear();
        statusValidate = data.length === 4 && parseInt(data) < year;
        break;
      }
      case "isLink": {
        const linkRegExp = /(https?|ftp):\/\/[\w/\-?=%.]+\.[\w/\-&?=%.]+/g;
        statusValidate = linkRegExp.test(data);
        break;
      }
      default:
        break;
    }
    if (!statusValidate) return config.message;
  }
  for (const fieldName in data) { // name, surname, patronymic, age, link
    for (const valedateMethod in config[fieldName]) { // name -> isRequired, age -> isRequired,isAge 
      const error = validate( //"случилась ужасная ошибка"
        valedateMethod,
        data[fieldName], // Vasya
        config[fieldName][valedateMethod] // {message: "Erroror"}
      );
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }
  return errors;
}
