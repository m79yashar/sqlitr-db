// public/app/sw.js

self.addEventListener("install", (event) => {
  console.log("SW installed");
});

self.addEventListener("activate", (event) => {
  console.log("SW activated");
});

self.addEventListener("fetch", (event) => {
  console.log("SW fetching:", event.request.url);
});
