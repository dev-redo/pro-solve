interface SelectProps {
  isOpen: boolean;
  trigger: React.ReactNode;
  options: Array<string>;
  onChangeDropdown: (selected: string) => void;
  filterState: object;
}

interface TriggerProps {
  as: React.ReactNode;
}

interface MenuProps {
  isOpen: boolean;
  children: JSX.Element[];
}

interface ItemProps {
  onChangeDropdown: (selected: string) => void;
  filterState: Array<string>;
  children: string;
}

interface SolutionType {
  [key: string]: string;
  ALL: string;
  SUCCESS: string;
  FAILED: string;
}

interface SortType {
  [key: string]: string;
  ASC: string;
  DESC: string;
}

export { SelectProps, TriggerProps, MenuProps, ItemProps, SolutionType, SortType };
