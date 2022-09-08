import React from "react";
import styled from "styled-components";
import Header from "./Header";


const Layout = ({children}) => {
    return <>
        <Header/>
        <StLayout>
            {children}
        </StLayout>
    </>

}

export default Layout;

const StLayout = styled.div`
  max-width: 1200px;
  min-width: 800px;
  margin: 0 auto;
`;