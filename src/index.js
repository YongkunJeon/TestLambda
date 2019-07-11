import React from "react";
import { render } from "react-dom";
import firebase from "firebase";
import store from "./store";

// CHANGE HERE
var config = {
  apiKey: "AIzaSyDvjxLdxKoKBG037-9JRXogerBCWMnATvQ",
  authDomain: "aws-lambda-44b05.firebaseapp.com",
  databaseURL: "https://aws-lambda-44b05.firebaseio.com",
  projectId: "aws-lambda-44b05",
  storageBucket: "aws-lambda-44b05.appspot.com",
  messagingSenderId: "168155389633"
};

try {
  firebase.initializeApp(config);
} catch (error) {}

var db = firebase.database();
db.ref("/currentMessage").on("value", data => {
  if (data.val()) {
    store.dispatch({ type: "SET_VAL", payload: data.val() });
    console.log("dispatched & displaying getstate:");
    console.log(store.getState());
  }
});

let set_time = function() {
  let date = new Date();
  let time = date.toLocaleTimeString();
  store.dispatch({ type: "SET_TIME", payload: time });
};
// Update the local time every seconds.
setInterval(set_time, 1000);

class MessageApp extends React.Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    store.dispatch({ type: "SET_CUSTOM", payload: e.target.value });
  }

  handleClick(message) {
    console.log("Click happened");
    // Change this as well.
    let yourUrl =
      "https://b246qmc417.execute-api.us-east-2.amazonaws.com/0/update?message=" +
      message;

    fetch(yourUrl, { mode: "no-cors" }).then(function(response) {
      console.log("Fetched ", yourUrl);
    });
  }

  render() {
    const props = this.props;
    const state = store.getState();
    let localMessage = "yo";
    return (
      <div>
        <b>{state.currentMessage.message}</b>. <br />
        This is <b> Desmond</b>
        <br />
        The last saved lambda time was <b>{state.currentMessage.datetime}</b>
        <br />
        The firebase currentMessage node was updated at
        <b> {state.currentMessage.updated}</b> <br />
        And the local browswer time is <b>{state.time}</b>. <br />
        <button onClick={() => this.handleClick("nei hou")}>
          Send hello message
        </button>
        <br />
        <button onClick={() => this.handleClick("baibai")}>
          Send goodbye message
        </button>
        <br />
        <input value={state.custom} onChange={this.handleChange} />
        <button onClick={() => this.handleClick(state.custom)}>
          Send custom message
        </button>
        <br />
      </div>
    );
  }
}
render(<MessageApp store={store} />, document.getElementById("root"));
