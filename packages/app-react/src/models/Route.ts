export interface Route {
  id: number;
  type: string;
  matching: string;
  route: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export const RouteTypeSelections: Array<SelectOption> = [
  {
    label: "Product",
    value: "product"
  },
  {
    label: "Brand",
    value: "brand"
  },
  {
    label: "Category",
    value: "category"
  },
  {
    label: "Blog",
    value: "blog"
  },
  {
    label: "Home",
    value: "home"
  },
  {
    label: "Cart",
    value: "cart"
  },
  {
    label: "Checkout",
    value: "checkout"
  },
  {
    label: "Search",
    value: "search"
  },
  {
    label: "Account",
    value: "account"
  },
  {
    label: "Login",
    value: "login"
  },
  {
    label: "Returns",
    value: "returns"
  },
  {
    label: "Static",
    value: "static"
  }
];
