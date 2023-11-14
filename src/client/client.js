// register SW, Register Push, Send Push
const publicVapidKey =
  "BF2o40Aq3xt1wUv6WnaPHOSvvrx34sQpjoufFQo67jaTwHeFpuQW7j2LsVYrY3qdPQqzrsgNdMVGKH03dROdZ-I";

const send = async () => {
  // register Service Worker
  const register = await navigator.serviceWorker.register("./worker.js", {
    scope: "/",
  });
  console.log("Service worker registed");
  // register Push
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: publicVapidKey,
  });

  console.log("Push registed");

  // send Push Notification
  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json",
    },
  });
  console.log("Notification sent...");
};

// check for Service Worker
if ("serviceWorker" in navigator) {
  send().catch((err) => console.error("err: ", err));
}
