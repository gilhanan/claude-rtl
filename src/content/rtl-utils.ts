import { setRTLEnabledValue } from "../shared/rtl-enabled-storage";
import { containsRTL } from "../shared/utils";
import {
  isHTMLDivElement,
  isHTMLElement,
  isHTMLParagraphElement,
  queryHTMLElements,
  toggleClass,
} from "../shared/dom";

function isRTLApplicable(text: string | null): boolean {
  return !!(text && containsRTL(text));
}

function toggleRTLElement({
  element,
  enabled,
}: {
  element: HTMLElement;
  enabled: boolean;
}): void {
  toggleClass({ element, className: "claude-rtl", enabled });
}

function enableRTLElement(element: HTMLElement): void {
  toggleRTLElement({ element, enabled: true });
}

function applyRTLToChildrens(element: HTMLElement): void {
  queryHTMLElements({
    element,
    selector: "p, ol, ul, dl, button > div",
  })
    .filter(({ textContent }) => isRTLApplicable(textContent))
    .forEach(enableRTLElement);
}

function getInputTextParent(element: HTMLElement): HTMLElement | null {
  return element.closest('[contenteditable="true"]');
}

export function applyRTLToMutations(mutations: MutationRecord[]): void {
  mutations.forEach(({ type, target }) => {
    const { nodeType, parentElement } = target;

    const grandparentElement = parentElement?.parentElement;

    if (
      type === "characterData" &&
      nodeType === Node.TEXT_NODE &&
      isHTMLParagraphElement(parentElement) &&
      grandparentElement?.getAttribute("contenteditable") === "true"
    ) {
      if (isHTMLDivElement(grandparentElement)) {
        toggleRTLElement({
          element: grandparentElement,
          enabled: isRTLApplicable(target.textContent),
        });
      }
    }

    if (
      type === "childList" &&
      isHTMLElement(target) &&
      !getInputTextParent(target) &&
      isRTLApplicable(target.textContent)
    ) {
      applyRTLToChildrens(target);
    }
  });
}

export function toggleRTLGlobal({ enabled }: { enabled: boolean }): void {
  toggleClass({
    element: document.body,
    className: "claude-rtl-enabled",
    enabled,
  });
  void setRTLEnabledValue(enabled);
}
