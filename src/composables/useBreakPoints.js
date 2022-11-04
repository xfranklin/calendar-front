import { ref, onUnmounted } from "vue";

const breakpoints = new Map([
  ["tablet", "(min-width: 769px)"],
  ["desktop", "(min-width: 1024px)"]
]);

const updatesSignals = {};

const breakpointsValue = (() => {
  const _breakpointsValue = {};
  for (let [key, value] of breakpoints) {
    const mediaQuery = window.matchMedia(value);
    _breakpointsValue[key] = mediaQuery.matches;
    mediaQuery.addEventListener("change", ({ matches }) => {
      breakpointsValue[key] = matches;
      Object.keys(updatesSignals).forEach((key) => updatesSignals[key]());
    });
  }
  return _breakpointsValue;
})();

export const useBreakPoints = () => {
  const matchesList = ref(breakpointsValue);

  const updateSignal = () => {
    matchesList.value = Object.assign({}, breakpointsValue);
  };

  const signalPosition = Object.keys(updatesSignals).length;
  updatesSignals[signalPosition] = updateSignal;

  onUnmounted(() => {
    delete updatesSignals[signalPosition];
  });

  return matchesList;
};
