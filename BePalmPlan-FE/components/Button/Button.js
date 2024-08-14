import { toTitleCase } from "../../utils/format.utils";
import "./Button.css";

export const Button = (label, style, hasFullWidth = false, hasIcon = false,) => {
  const hasFullWidthStyle = hasFullWidth ? 'w-100' : '';
  return `
        <button id="${label.replace(" ", "-").toLowerCase()}" class="btn ${style} ${hasFullWidthStyle}">${label}</button>`;
};

export const ButtonLink = (label) => {
  const formattedLabel = toTitleCase(label);
  const id = label.replace(/\s+/g, "-").toLowerCase() + "-link";
  return `<span class="btn-link" id="${id}">${formattedLabel}</span>`
}