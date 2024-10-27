import "./PageHeader.css";

import { Button } from "../Button/Button";
import { Link } from "../Link/Link";

import { navigate } from "../../utils/functions/navigate";

import { Events } from "../../pages/Events/Events";

export const PageHeader = ({ titleLabel, buttons = [] }) => {
  const headerContainer = document.createElement("div");
  headerContainer.classList.add("header-container");

  const ctaTitleContainer = document.createElement("div");
  ctaTitleContainer.classList.add("cta-title");

  headerContainer.append(ctaTitleContainer);

  const ctaContainer = document.createElement("div");
  ctaContainer.classList.add("cta");
  ctaTitleContainer.append(ctaContainer);

  const returnToEventsButton = Link({
    label: "return to events",
    className: "primary",
    fcn: (e) => navigate(e, { path: "/events", page: Events }),
    hasIcon: true,
    fcnIcon: (e) => navigate(e, { path: "/events", page: Events }),
  });

  ctaContainer.append(returnToEventsButton);

  const title = document.createElement("h1");
  title.textContent = titleLabel;

  ctaTitleContainer.append(title);

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("btn-container");
  headerContainer.append(btnContainer);

  buttons.forEach(
    ({ isButtonVisible, btnLabel, btnFnc, btnId, btnStyle = "filled" }) => {
      if (isButtonVisible) {
        btnContainer.append(
          Button({
            label: btnLabel,
            className: btnStyle,
            id: btnId,
            fnc: btnFnc,
          })
        );
      }
    }
  );

  return headerContainer;
};
