import { reactive } from "vue";

const breakpoints = new Map([
  ["tablet", "(min-width: 769px)"],
  ["desktop", "(min-width: 1024px)"]
]);

const matchesList = reactive(
  (() => {
    const _matchesList = {};
    for (let [key, value] of breakpoints) {
      const mediaQuery = window.matchMedia(value);
      _matchesList[key] = mediaQuery.matches;
      mediaQuery.addEventListener("change", ({ matches }) => {
        matchesList[key] = matches;
      });
    }
    return _matchesList;
  })()
);

export const useBreakPoints = () => {
  return matchesList;
};
