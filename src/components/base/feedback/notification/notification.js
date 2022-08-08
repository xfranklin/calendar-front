import { render, h } from "vue";
import BaseNotification from "@/components/base/feedback/notification/BaseNotification.vue";

export const $notification = ({ message, type = "default", duration = 3500 }) => {
  let parent = document.getElementById("notifications-container");

  if (!parent) {
    parent = document.createElement("div");
    parent.setAttribute("id", "notifications-container");
    document.body.appendChild(parent);
  }

  const container = document.createElement("div");
  const vNode = h(BaseNotification, { message, type, duration });

  render(vNode, container);
  parent.appendChild(container.firstChild);
};
