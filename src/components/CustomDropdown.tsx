import { useState } from "react";
import styled from "styled-components";

// Styled components for the dropdown
const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 0 20px;
`;

const Label = styled.label`
  font-weight: 500;
  color: #000;
  margin-bottom: 5px;
  display: block;
`;

const DropdownButton = styled.div`
  width: 100%;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
  color: #000;
  box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;

  &:hover {
    border-color: #888;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  width: 100%;
  color : black;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-top: 5px;
  padding: 0;
  list-style: none;
  max-height: 150px;
  overflow-y: auto;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const CustomDropdown = () => {
  const [selected, setSelected] = useState("Select Profession");
  const [isOpen, setIsOpen] = useState(false);
  const options = ["Barber", "Other"];

  const handleSelect = (option:any) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <DropdownContainer>
      <Label htmlFor="profession">Your Profession</Label>
      <DropdownButton onClick={() => setIsOpen(!isOpen)}>
        {selected}
      </DropdownButton>
      {isOpen && (
        <DropdownMenu>
          {options.map((option, index) => (
            <DropdownItem key={index} onClick={() => handleSelect(option)}>
              {option}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

export default CustomDropdown;
