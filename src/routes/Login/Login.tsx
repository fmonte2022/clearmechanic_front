import { useState } from "react";
import { Avatar, Box, Button, FormControl, colors } from "@mui/material";
import { isEmpty } from "lodash";

import './styles.css';
import logo from 'src/assets/images/logo.webp'
import { LoginProps } from "src/routes/Login/intefaces";
import { useDispatch } from "react-redux";
import { setAuthState } from "src/redux/reducers/appStateSlice";
import { useLangFormatter } from "src/hooks/useLangFormatter";
import CustomTextField from "src/common/CustomTextField/CustomTextField";
import CustomSnackbar from "src/common/CustomSnackbar/CustomSnackbar";
import UserService from "src/services/UserService";

const BASE_PREFIX = "loginPage_";

const Login = ({ setIsAuth }: LoginProps) => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [openLoginMessage, setOpenLoginMessage] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const { getText } = useLangFormatter(BASE_PREFIX);

  const dispatch = useDispatch();

  const title = getText("title");
  const userNameLabel = getText("name_label");
  const userNamePlaceholder = getText("name_placeholder_label");
  const passwordLabel = getText("password_label");
  const passwordPlaceholder = getText("password_placeholder_label");
  const confirmBtnLabel = getText("btn_submit_label");
  const loginMessageError = getText("error_message");

  const handleConfirmLogin = () => {
    setIsSubmit(true);

    if (!isEmpty(userName) && !isEmpty(password)) {

      const onSuccess = (response: any) => {
         const data = response.data || [];

         if (!isEmpty(data)) {
            dispatch(setAuthState({ userName, userId: data.id, name: data.name }));
            setIsAuth(true);
         } else {
            setOpenLoginMessage(true);
         }
      };

      const onError = (response: any) => {
        setOpenLoginMessage(true);
        console.log("Login page error---->", response);
      }

      UserService.validateUser(userName, password).then(onSuccess).catch(onError);
    }
  };

  const handleMessageClose = () => {
    setOpenLoginMessage(false);
  };

  return (
    <Box className="login__root">
      <Box
        className="login__mainBox"
        sx={{ p: 3, backgroundColor: colors.grey["100"]}}
      >

        <div className="login__title"><Avatar src={logo}  /> <span className="login__formTitle">{title}</span></div>
     
        <FormControl className="login__form">
          <CustomTextField
            error={isSubmit && isEmpty(userName)}
            label={userNameLabel}
            required={true}
            value={userName}
            placeholder={userNamePlaceholder}
            handleOnChangeValue={(value: any) => setUserName(value)}
          />
          <CustomTextField
            error={isSubmit && isEmpty(password)}
            label={passwordLabel}
            required={true}
            value={password}
            placeholder={passwordPlaceholder}
            handleOnChangeValue={(value: any) => setPassword(value)}
            isPassword
          />
          <Button onClick={() => handleConfirmLogin()} color='primary' className="login__button" variant="contained">
            {confirmBtnLabel}
          </Button>
        </FormControl>
      </Box>
      <CustomSnackbar
        open={openLoginMessage}
        handleOnClose={handleMessageClose}
        severity={"error"}
        message={loginMessageError}
      />
    </Box>
  )
}

export default Login;