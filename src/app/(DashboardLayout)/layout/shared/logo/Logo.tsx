import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <br></br>
      <center><Image src="/images/logos/dark-logo.png" alt="logo" height={30} width={134} priority /></center>
    </LinkStyled>
  );
};

export default Logo;
