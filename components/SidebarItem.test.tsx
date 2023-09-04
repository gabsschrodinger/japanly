import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { SidebarItem } from "./SidebarItem";
import { menuData } from "@/lib/navigationMenuData";

describe("Sidebar Component", () => {
  it("should set subitems container to have display none when item is not active", () => {
    render(
      <SidebarItem name={menuData[0].name} subitems={menuData[0].subitems} />
    );

    const subitemsContainer = screen.getByTestId("subitems-container");

    expect(subitemsContainer).toHaveClass("hidden");
  });

  it("should not set subitems container to have display none when item is not active", async () => {
    render(
      <SidebarItem name={menuData[0].name} subitems={menuData[0].subitems} />
    );

    const button = screen.getByTestId("subitems-container-button");
    button.click();

    const subitemsContainer = screen.getByTestId("subitems-container");

    await waitFor(() => {
      expect(subitemsContainer).not.toHaveClass("hidden");
    });
  });
});
