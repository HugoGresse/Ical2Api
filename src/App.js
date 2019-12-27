import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import MeetupList from "./ical/MeetupList";
import { StateProvider } from "./state/state";
import UpcomingEvents from "./event/UpcomingEvents";
import DataLoading from "./DataLoading";

const App = () => {
  const initialState = {
    meetups: [],
    events: []
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "meetupsLoaded":
        return {
          ...state,
          meetups: action.payload
        };
      case "eventsLoaded":
        return {
          ...state,
          events: action.payload
        };
      default:
        return state;
    }
  };

  return (
    <BrowserRouter>
      <AppLayout>
        <StateProvider initialState={initialState} reducer={reducer}>
          <DataLoading>
            <Switch>
              <Route path="/icals">
                <MeetupList />
              </Route>
              <Route path="/">
                <UpcomingEvents />
              </Route>
            </Switch>
          </DataLoading>
        </StateProvider>
      </AppLayout>
    </BrowserRouter>
  );
};

export default App;
