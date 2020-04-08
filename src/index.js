import React from "react";
import ReactDOM from "react-dom";

import LoadFile from "./LoadFile"
import { Provider } from 'react-redux'
import store from './initializers/store'


ReactDOM.render( <Provider store={store}><LoadFile /></Provider>, document.getElementById("root"));