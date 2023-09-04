import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Sidebar } from "./Sidebar";
import { menuData } from "@/lib/navigationMenuData";

describe("Sidebar Component", () => {
  it("should render all navigation menu data items", () => {
    render(<Sidebar />);

    for (const item of menuData) {
      const renderedItem = screen.queryByText(item.name);

      expect(renderedItem).toBeInTheDocument();
    }
  });

  it("should render all navigation menu data subitems", () => {
    render(<Sidebar />);

    for (const item of menuData) {
      for (const subItem of item.subitems) {
        const renderedSubitem = screen.queryByText(subItem.name);

        expect(renderedSubitem).toBeInTheDocument();
      }
    }
  });
});
