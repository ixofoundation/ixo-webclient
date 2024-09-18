import React, { useState, ReactNode, Children, isValidElement } from 'react';
import { Combobox, InputBase, useCombobox } from '@mantine/core';

interface SelectWithOptionsProps {
  value: number | null;
  onChange: (value: number | null) => void;
  children: ReactNode;
}

export function SelectWithOptions({ value, onChange, children }: SelectWithOptionsProps) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [search, setSearch] = useState('');
  const filteredOptions = Children.toArray(children).filter((child) => {
    if (isValidElement(child) && typeof child.props.children === 'string') {
      return child.props.children.toLowerCase().includes(search.toLowerCase().trim());
    }
    return false;
  });

  const handleOptionSubmit = (val: string) => {
    const selectedItem = filteredOptions.find((child) =>
      isValidElement(child) ? child.props.value === Number(val) : false
    );
    if (isValidElement(selectedItem)) {
      onChange(selectedItem.props.value);
      setSearch(selectedItem.props.children);
    }

    combobox.closeDropdown();
  };

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={handleOptionSubmit}
    >
      <Combobox.Target>
        <InputBase
          rightSection={<Combobox.Chevron />}
          value={search}
          onChange={(event) => {
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            const selectedItem = filteredOptions.find((child) =>
              isValidElement(child) ? child.props.value === value : false
            );
            setSearch(isValidElement(selectedItem) ? selectedItem.props.children : '');
          }}
          placeholder="Search value"
          rightSectionPointerEvents="none"
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{filteredOptions}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}