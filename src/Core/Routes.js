//routing files
import React, { lazy, Suspense } from "react";
import { RENDER_URL } from "../Utils/Urls";
import "../Assets/scss/main.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const DashBoardContainer = lazy(() =>
  import("../Modules/Dashboard/DashBoardContainer")
);
const EventContainer = lazy(() => import("../Modules/Events/EventContainer"));
const WrapperComponent = lazy(() =>
  import("../Modules/General/WrapperComponent")
);
const AccountOverviewContainer = lazy(() =>
  import("../Modules/UserAccount/AccountOverviewContainer")
);
const EditAccountComponent = lazy(() =>
  import("../Modules/UserAccount/EditAccountComponent")
);

const Routes = () => {
  React.useEffect(() => {}, []);

  return (
    <Router basename="/">
      <Suspense fallback={<div className="displayNone"> </div>}>
        <WrapperComponent>
          <Switch>
            <Route
              exact
              path={RENDER_URL.HOME_URL}
              component={DashBoardContainer}
            />
            <Route
              exact
              path={RENDER_URL.EVENT_LIST_URL}
              component={EventContainer}
            />
            <Route
              exact
              path={RENDER_URL.ACCOUNT_OVERVIEW_URL}
              component={AccountOverviewContainer}
            />
            <Route
              exact
              path={RENDER_URL.ACCOUNT_EDIT_URL}
              component={EditAccountComponent}
            />
            <Route
              path={"*"}
              render={(props) => <Redirect to="/" {...props} />}
            />

            {/* Add URLs above this line */}
          </Switch>
        </WrapperComponent>
      </Suspense>
    </Router>
  );
};
export default Routes;
