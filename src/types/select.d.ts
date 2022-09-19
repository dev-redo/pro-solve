interface SelectProps {
  trigger: React.ReactNode;
  isOpen: boolean;
  onChangeOption: (event: React.MouseEvent) => void;
  options: Array<string>;
}

interface TriggerProps {
  as: React.ReactNode;
}

interface MenuProps {
  isOpen: boolean;
  children: JSX.Element[];
}

interface ItemProps {
  onChangeOption: (event: React.MouseEvent) => void;
  children: string;
}

export { SelectProps, TriggerProps, MenuProps, ItemProps };
