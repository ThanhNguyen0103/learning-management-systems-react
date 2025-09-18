import { Outlet, useNavigate } from "react-router";
import {
  callGetAccount,
  callGetAssignment,
  callLogin,
  callRefreshToken,
} from "../service/service-api";
import { message } from "antd";
import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    handleGetAcount();
  }, []);

  const handleLogin = async ({ username, password }) => {
    try {
      const res = await callLogin({ username, password });
      if (res.data) {
        localStorage.setItem("accessToken", res.data.accessToken);
        setUser(res.data.user);
        message.success("Đăng nhập thành công");
        navigate("/");
      }
    } catch (error) {
      message.error(error.error);
    }
  };

  const handleGetAcount = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const res = await callGetAccount();
      setUser(res.data);
    } catch (error) {
      message.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
