import { createHeading, createDiv } from "../../../shared/dom";

export function createHeader(): HTMLDivElement {
  const title = createHeading({
    tagName: "h2",
    className: "text-xl font-medium",
    textContent: "ChatGPT RTL",
  });

  const description = createDiv({
    className: "mt-2 text-sm text-gray-500",
    textContent:
      "Automatically detects and switches to right-to-left text direction in chat inputs.",
  });

  const container = createDiv({
    className: "p-3 border-b border-black/10",
  });

  container.append(title, description);

  return container;
}
