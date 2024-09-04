import { useCallback } from "react";
import { Outlet } from "react-router-dom";
import { Box, Link, Toolbar, colors } from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DehazeOutlinedIcon from '@mui/icons-material/DehazeOutlined';
import classNames from 'classnames';

import './styles.css';
import { useDispatch, useSelector } from "src/redux/store";
import { cleanState } from "src/redux/reducers/appStateSlice";
import { useLangFormatter } from "src/hooks/useLangFormatter";
import AvatarUser from "src/common/AvatarUser/AvatarUser";
import CustomSidebar from "src/common/CustomSidebar/CustomSidebar";
import CustomListDivider from "src/common/CustomListDivider/CustomListDivider";

const BASE_PREFIX = "mainLayout_";

const MainLayout = () => {
  const { name: userLoginName } = useSelector((state) => state?.appState?.auth) || {};

  const { getText } = useLangFormatter(BASE_PREFIX);

  const dispatch = useDispatch();

  const titleLabel = getText("title");
  const authorLabel = getText("footer_title");
  const closeSesionLabel = getText("close_session_label");

  const handleCloseSesion = useCallback(() => {
    dispatch(cleanState());
  }, [dispatch]);

  return (
    <Box className="mainLayout__root">
      <Box
        component="nav"
        className="mainLayout__container"
      >
        <CustomSidebar />
      </Box>
      <Box
        component="main"
        className="mainLayout__mainBox"
        sx={{ p: 3, backgroundColor: colors.grey["100"]}}>
        <Toolbar className="mainLayout__toolbar">
          <header className="mainLayout__header">
            <h1><DehazeOutlinedIcon /> {titleLabel}</h1>
            <div className="mainLayout__avatar">
              <CustomListDivider options={
                [
                  <AvatarUser name={userLoginName} key={"avatar"} />,
                  <Link href="#" key={"close-sesion-list"} underline="always" className="mainLayout__link" onClick={handleCloseSesion}>
                    <div className="mainLayout__linkContent"><ExitToAppIcon /> {closeSesionLabel}</div>
                  </Link>
                ]}
              />
            </div>
          </header>
        </Toolbar>
        
        <Toolbar className={classNames("mainLayout__toolbar", "mainLayout__toolbar_footer")}>
          <footer className="mainLayout__footer">  <h1>{authorLabel}: Montenegro, Francisco</h1> </footer>
        </Toolbar>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;