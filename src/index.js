import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { Link, Route, Switch } from "react-router-dom";
import PDF from "./PDF";
import Presentation from "./Presentation";
import SFComment from "./SFComment";
import SendMailValidator from "./sendMailValidator";
import Login from "./login"
import Validate from "./userValidation"
import { Grid, Row, Col, Button } from "react-bootstrap";

/* import BrowserRouter from 'react-router-dom' */
import { BrowserRouter } from "react-router-dom";
const client = new ApolloClient({
    link: createHttpLink({
        uri:
            "https://3hancpulkvhufbakfjgotxz3ta.appsync-api.us-east-2.amazonaws.com/graphql",
        headers: {
            "x-api-key": "da2-ucdvmjxntbct3c6bky3zzeesym"
        }
    }),
    cache: new InMemoryCache()
});

ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <Route exact path="/home" component={App} />
            <Route exact path="/" component={Login} />
            <Route path="/validate" component={Validate} />
            <Route
                path={"/presentation/:itemName/:itemID/:itemEvent/:itemSF"}
                component={Presentation}
            />
            <Route path={"/pdf/:itemID"} component={PDF} />
            <Route path={"/sfcomment/:itemID"} component={SFComment} />
            <Route
                path={"/sendMailValidator/:itemID"}
                component={SendMailValidator}
            />
        </ApolloProvider>
    </BrowserRouter>,
    document.getElementById("root")
);
registerServiceWorker();
