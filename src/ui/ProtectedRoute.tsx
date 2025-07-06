import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGetCurrentUserQuery } from "../services/apiAuth";
import { useEffect } from "react";


const FullPage = styled.div`
  height: 100dvh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({children}) {
  const navigate = useNavigate();
  const {data:user , isLoading} = useGetCurrentUserQuery()
  const isAuthenticated = user?.role === "authenticated"
  console.log(isAuthenticated)
  
//если не прошел аунтификацию, то обратно его на страницу "/login"
  useEffect(()=> {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );
  
  if (isLoading)
    return (
      <FullPage>
        <div>Loading...</div>
      </FullPage>
    );

  if (isAuthenticated) return children;

  

}

export default ProtectedRoute;