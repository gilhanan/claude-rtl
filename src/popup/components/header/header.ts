import {
  createHeading,
  createDiv,
  createAnchor,
  createHeader,
} from "../../../shared/dom";

export function createHeaderLandmark(): HTMLElement {
  const title = createHeading({
    tagName: "h2",
    className: "text-xl font-medium",
    textContent: chrome.i18n.getMessage("headerTitle"),
  });

  const description = createDiv({
    className: "mt-2 text-sm text-gray-500",
  });

  const descriptionLink = createAnchor({
    className: "underline text-blue-600 hover:text-blue-800",
    href: "https://claude.ai/",
    textContent: "Claude",
    ariaLabel: chrome.i18n.getMessage("claudeLinkAriaLabel"),
  });

  description.append(
    chrome.i18n.getMessage("headerDescription"),
    descriptionLink,
    ".",
  );

  const container = createHeader({
    className: "p-3 border-b border-black/10",
  });

  container.append(title, description);

  return container;
}
