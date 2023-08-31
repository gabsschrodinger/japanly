export type MenuSubitem = {
  name: string;
  url: string;
};

type NavigationMenuItem = {
  name: string;
  subitems: MenuSubitem[];
};

export const menuData: NavigationMenuItem[] = [
  {
    name: "Hiragana",
    subitems: [
      { name: "Hiragana - Part 1", url: "/lessons/lesson-1" },
      { name: "Hiragana Flashcards 1", url: "/lessons/lesson-2" },
    ],
  },
];
