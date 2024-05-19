import React from "react";
import Header from "./Header";
import { Helmet } from "react-helmet";

const Layout = ({ children, description, keyword, author, title }) => {
  return (
    <>
      <Helmet>
        <meta name="description" content={description} />
        <meta name="keywords" content={keyword} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main>{children}</main>
    </>
  );
}
Layout.defaultProps = {
  title: "User Authentication System",
  description:
    "Ensure your account's safety with our trusted authentication service. Create an account to get started, or log in if you already have one.",
  keyword: "account, secure, user management, profile management",
  author: "UAS",
};

export default Layout;
