export const loadScript = (src, isAsync = true) => {
  if (document.querySelector(`script[src='${src}']`)) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");

    script.type = "text/javascript";
    script.async = isAsync;
    script.src = src;

    document.body.appendChild(script);
    script.onload = resolve;
    script.onerror = reject;
  });
};
