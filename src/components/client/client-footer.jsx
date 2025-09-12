import { Footer } from "antd/es/layout/layout";

const FooterClient = () => {
  return (
    <Footer style={{ textAlign: "center" }}>
      Ant Design ©{new Date().getFullYear()} Created by Ant UED
    </Footer>
  );
};
export default FooterClient;
