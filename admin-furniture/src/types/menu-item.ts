/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Menu {
  navlabel?: boolean;
  subheader?: string;
  menuItems: MenuItem[];
}
export interface MenuItem {
  [x: string]: any;
  id?: number;
  title?: string;
  icon?: React.JSX.Element;
  href?: any;
  items?: MenuItem[];
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
  allow?: boolean;
}

export interface MenuItemType {
  item: MenuItem;
  //   onClick: (event: React.MouseEvent<HTMLElement>) => void;
  hideMenu?: any;
  level?: number | any;
  pathDirect?: string;
}
