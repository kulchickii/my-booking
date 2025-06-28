import type React from "react";
import styled from "styled-components";

export interface Option {
  value: string;
  label: string;
}
type typeProp = "white" | "default" 

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  type: typeProp }

const StyledSelect = styled.select<Record<'type' ,typeProp>>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

export const Select: React.FC<SelectProps> = ({ options, value, onChange, ...props }) => {
  return (
    <StyledSelect 
      value={value} 
      onChange={onChange} 
      {...props}
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

