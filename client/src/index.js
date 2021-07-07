import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import DepartmentStore from "./store/DepartmentStore";
import RequestStore from "./store/RequestStore";
import GlobalStore from "./store/GlobalStore";
import WorkersStore from "./store/WorkersStore";

export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        departments: new DepartmentStore(),
        request: new RequestStore(),
        globalStore: new GlobalStore(),
        workers: new WorkersStore()
    }}>
        <App />
    </Context.Provider>,
  document.getElementById('root')
);