import { Layout } from "antd";
import HeaderClient from "./client/client-header";
import { Outlet } from "react-router";
import FooterClient from "./client/client-footer";
import "../App.css";
const LayoutClient = () => {
  return (
    <Layout>
      <HeaderClient />
      <Outlet />
      <FooterClient />
    </Layout>
  );
};
export default LayoutClient;
