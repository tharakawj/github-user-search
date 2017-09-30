import React from "react";
import styled from "styled-components";

const FooterContrainer = styled.footer`
  padding: 10px;
  font-size: 10px;
  border-top: 1px solid #999;
  margin-top: 40px;
`;

const Footer = () => (
  <FooterContrainer>© 2017 Tharaka Wijebandara</FooterContrainer>
);

export default Footer;
