import React from "react";
import { Route, Switch } from "react-router-dom";

import FormStudent from "./components/formStudent";
import StudentCard from "./components/studentCard";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" component={StudentCard} exact />
        <Route path="/formStudent" component={FormStudent} />
      </Switch>
    </div>
  );
}

export default App;
