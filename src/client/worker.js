self.addEventListener("push", (e) => {
  const data = e.data.json();
  console.log("Notification Received...");
  self.registration.showNotification(data.title, {
    body: "Notification from Lamsson",
    icon: "https://th.bing.com/th/id/OIP.d3Tz97CVeO3_ORS5FRJu5AHaHa?pid=ImgDet&rs=1",
  });
});
