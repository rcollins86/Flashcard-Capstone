import React from "react";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../screens/Home";
import Study from "../screens/Study";
import CreateDeck from "../screens/CreateDeck"
import Deck from "../screens/Deck"
import EditDeck from "../screens/EditDeck"
import AddCard from "../screens/AddCard"
import EditCard from "../screens/EditCard"

function Layout() {

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact={true} path='/'>
            <Home />
          </Route>
          <Route exact={true} path='/decks/:deckId/study'>
            <Study />
          </Route>
          <Route exact={true} path='/decks/new'>
            <CreateDeck />
          </Route>
          <Route exact={true} path='/decks/:deckId'>
            <Deck />
          </Route>
          <Route exact={true} path='/decks/:deckId/edit'>
            <EditDeck />
          </Route>
          <Route exact={true} path='/decks/:deckId/cards/new'>
            <AddCard />
          </Route>
          <Route exact={true} path='/decks/:deckId/cards/:cardId/edit'>
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
