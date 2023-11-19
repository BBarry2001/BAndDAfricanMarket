
export const findKeyByPath = (menuItems, path) => {
  const menuItem = menuItems.find((item) => item.to === path);
  return menuItem ? menuItem.key : '1';
};
