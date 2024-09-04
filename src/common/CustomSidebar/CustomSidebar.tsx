
import { Avatar, Drawer, List, Stack, Toolbar } from "@mui/material";

import { useLangFormatter } from "src/hooks/useLangFormatter";
import appRoutes from "src/routes/appRoutes";
import SidebarItem from "./SidebarItem";
import logo from 'src/assets/images/logo.webp'
import CountryFlag from "src/common/CountryFlag/CountryFlag";

const CustomSidebar = () => {
  const { getGlobalText } = useLangFormatter();
  const versionLabel = getGlobalText("version");
  const appName = getGlobalText("app_name");

  return (
    <Drawer
      variant="permanent"
      className="customSidebar__root"
      sx={{
        "& .MuiDrawer-paper": {
          width: 230,
          boxSizing: "border-box",
          borderRight: "0px",
          backgroundColor: "rgb(35, 48, 68, 0.8)",
          color: "#eeeeee"
        }
      }}
    >
      <List disablePadding>
        <Toolbar className="customSidebar__toolbar">
          <Stack
            className="customSidebar__stack"
            direction="row"
            justifyContent="center"
          >
            <div className="customSidebar__avatar"><Avatar src={logo}  /> <span>{appName}</span></div>
          </Stack>
        </Toolbar>
        {appRoutes.map((route, index) => (
          route.sidebarProps ? (
            <SidebarItem item={route} key={index} />
          ) : null
        ))}
      </List>
      
      <footer className="customSidebar__footer">
        <div className="customSidebar__version"><span>{versionLabel}:</span> <span>{process.env.REACT_APP_VERSION}</span></div>
        <CountryFlag esEnabled />
      </footer>
    </Drawer>
  );
};

export default CustomSidebar;