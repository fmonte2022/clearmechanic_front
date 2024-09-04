
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';

import { RouteType } from "src/routes/interfaces";
import MovieListPage from "src/pages/manager/MovieListPage/MovieListPage";

const appRoutes: RouteType[] = [
  {
    path: "/",
    index: true,
    element: <MovieListPage />,
    state: "movies",
    sidebarProps: {
      displayText: "Películas",
      icon: <FormatListBulletedOutlinedIcon />
    }
  },
];

export default appRoutes;