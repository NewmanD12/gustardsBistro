import { useState, useEffect, createContext, useContext, useMemo } from "react";
const AuthContext = createContext()
const userEndpoint = process.env.REACT_APP_USER_ENDPOINT

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [userName, setUserName] = useState("")
    const [isAuthLoading, setIsAuthLoading] = useState(false);
    const [userID, setUserID] = useState('')

    useEffect(() => {
      
      const userData = getLSUserData()

      if (userData && userData.token) {
        setUserToken(userData.token);
      }
      if (userData && userData.userName) {
        setUserName(userData.userName);
      }
      if(userData && userData.userID){
        setUserID(userData.userID)
      }
    }, [isAuthLoading])

    const register = async (firstName, lastName, userName, password) => {
      setIsAuthLoading(true);
      const registerResult = await registerUser(firstName, lastName, userName, password);
      if(registerResult.success){
        const loginResult = await loginUser(userName, password)
        if(loginResult.success){
          setLSUserData(loginResult.token, loginResult.userFirstName, loginResult.userLastName, loginResult.userName)
        }
      }
      setIsAuthLoading(false);
      return registerResult;
  };

    const registerUser = async (firstName, lastName, userName, password) => {
      const url = `${userEndpoint}/create-user`
      const response = await fetch(url, {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          firstName,
          lastName,
          userName,
          password
        })
      });
      const responseJSON = await response.json()
      return responseJSON
    }

    const login = async (userName, password) => {
        setIsAuthLoading(true);
        const loginResult = await loginUser(userName, password);
        if (loginResult.success) {
            setLSUserData(loginResult.token, loginResult.userName, loginResult.userID);
        }
        setIsAuthLoading(false);
        return loginResult
    };

    const loginUser = async (userName, password) => {
        const url = `${userEndpoint}/login`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            userName,
            password,
            }),
        });
        const responseJSON = await response.json();
        return responseJSON;
    };

    const logout = async () => {
        setIsAuthLoading(true);
        await removeLSUserData(); // This has to be awaited for the useEffect to work
        setUserToken(null);
        setUserName("");
        setIsAuthLoading(false);
    };

    const value = useMemo(
        () => ({
            userToken,
            userName,
            userID,
            login,
            logout,
            register
        }),
        [userToken]);
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const setLSUserData = (token, userName, userID = {}) => {
  localStorage.setItem(
    process.env.REACT_APP_TOKEN_HEADER_KEY,
    JSON.stringify({token, userName, userID})
  );
};

const removeLSUserData = () => {
  localStorage.removeItem(process.env.REACT_APP_TOKEN_HEADER_KEY);
  return true;
};

const getLSUserData = () => {
  return JSON.parse(
    localStorage.getItem(process.env.REACT_APP_TOKEN_HEADER_KEY)
  );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

