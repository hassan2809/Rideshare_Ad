export interface FormOnChange {
  name: string;
  value: string | number | any;
}

export interface DropDownOptionProps {
  text: string;
  value: string | number;
  disabled?: boolean;
  picture?: string;
}

export interface PageDetailsField {
  key: string;
  text: string;
  customComponent?: (props: any) => any;
  type?: "date";
}

export type UserRoleType =
  | "Admin"
  | "Brand"
  | "Driver"
  | "Ad"
  | "Post"
  | "Influencer"
  | "Spot";

export type PrivateAccessRoles = "admin" | "brand" | "influencer";

export type GameType = "trivia" | "sudoku" | "facts" | "celebrity";
