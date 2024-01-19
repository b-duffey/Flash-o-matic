import React from "react";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home";
import CreateDeck from "../CreateDeck";
import Deck from "../Deck";
import EditDeck from "../EditDeck";
import AddCard from "../AddCard";
import EditCard from "../EditCard";
import Study from "../Study";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId">
            <Deck />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
