import {
  ADMIN_ROUTE,
  FEEDBACK,
  GRADEBOOK,
  IPR,
  LOGIN_ROUTE,
  MAIN,
  MATERIALS,
  PRACTIC,
  PROFILE,
  TIMETABLE,
  ZERO,
} from "./utils/consts";

import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Feedback from "./pages/Feedback";
import Gradebook from "./pages/Gradebook";
import Ipr from "./pages/Ipr";
import Main from "./pages/Main";
import Materials from "./pages/Materials";
import Practic from "./pages/Practic";
import Profile from "./pages/Profile";
import Timetable from "./pages/Timetable";
import Zero from "./pages/Zero";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: FEEDBACK,
    Component: Feedback,
  },
  {
    path: GRADEBOOK,
    Component: Gradebook,
  },
  {
    path: IPR,
    Component: Ipr,
  },
  {
    path: MAIN,
    Component: Main,
  },
  {
    path: MATERIALS,
    Component: Materials,
  },
  {
    path: PRACTIC,
    Component: Practic,
  },
  {
    path: PROFILE,
    Component: Profile,
  },
  {
    path: TIMETABLE,
    Component: Timetable,
  },
  {
    path: ZERO,
    Component: Zero,
  }
];

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: ZERO,
    Component: Zero,
  },
];
