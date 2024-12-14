(function () {
  const o = document.createElement("link").relList;
  if (o && o.supports && o.supports("modulepreload")) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) c(e);
  new MutationObserver((e) => {
    for (const t of e)
      if (t.type === "childList")
        for (const s of t.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && c(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(e) {
    const t = {};
    return (
      e.integrity && (t.integrity = e.integrity),
      e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === "use-credentials"
        ? (t.credentials = "include")
        : e.crossOrigin === "anonymous"
          ? (t.credentials = "omit")
          : (t.credentials = "same-origin"),
      t
    );
  }
  function c(e) {
    if (e.ep) return;
    e.ep = !0;
    const t = n(e);
    fetch(e.href, t);
  }
})();
const i = (r) => {
  console.log("HTMX Event:", r),
    console.log("Event type:", r.type),
    console.log("Event target:", r.target),
    console.log("Event detail:", r.detail);
  const o = document.getElementById("fact-display");
  if (o)
    try {
      console.log("Raw innerHTML:", o.innerHTML);
      const n = JSON.parse(o.innerHTML);
      console.log("Parsed response:", n),
        (o.innerHTML = `From the API: ${n.fact}`);
    } catch (n) {
      console.error("Error processing cat fact:", n),
        console.log("Failed innerHTML content:", o.innerHTML);
    }
};
window.handleCatFact = i;
document.addEventListener("DOMContentLoaded", () => {
  const r = document.querySelector("button");
  r && r.addEventListener("htmx:afterRequest", i);
});
