interface SelectProps {
  isOpen: boolean;
  trigger: React.ReactNode;
  options: Array<string>;
  onChangeDropdown: Function;
  filterState: Object<any>;
}

interface TriggerProps {
  as: React.ReactNode;
}

interface MenuProps {
  isOpen: boolean;
  children: JSX.Element[];
}

interface ItemProps {
  onChangeDropdown: Function;
  filterState: Object<any>;
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
