import { createContext, useContext, type ReactNode } from "react";
import styled from "styled-components";
import type { Room } from "../types";

interface CommonRowProps {
  columns: string;
}

interface Props {
  children: ReactNode;
}

interface TableProps extends Props {
  columns: string;
}

interface BodyProps {
  data: Room []
  render: (item: Room) => ReactNode
}

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div<CommonRowProps>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const TableContext = createContext({columns: ''});

export const Table: React.FC<TableProps> & {
  Header: typeof Header;
  Row: typeof Row;
  Body: typeof Body;
} = ({ columns, children }) => {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable>{children}</StyledTable>
    </TableContext.Provider>
  );
}

const  Header: React.FC<Props> = ({ children }) =>  {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader columns={columns} as="header">
      {children}
    </StyledHeader>
  );
}

const Row: React.FC<Props> = ({ children })=> {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow columns={columns}>
      {children}
    </StyledRow>
  );
}

const Body: React.FC<BodyProps> = ({ data, render }) => {
  if (data.length === 0) return <Empty>Нет данных для отображения.</Empty>
  return <StyledBody>{data.map(render)}</StyledBody>
}

Table.Header = Header
Table.Row = Row
Table.Body = Body


