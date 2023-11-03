import "./content.scss";
import { isToggleRTLGlobalMessage } from "../shared/toggle-rtl-message";
import { getRTLEnabledValue } from "../shared/rtl-enabled-storage";
import { toggleRTLGlobal, applyRTLToMutations } from "./rtl-utils";
import { observeChanges } from "./observers";

async function initRTLEnabled(): Promise<void> {
  const enabled = await getRTLEnabledValue();
  toggleRTLGlobal({ enabled });
}

const observeChangesCallback: MutationCallback = (mutations) => {
  applyRTLToMutations(mutations);
};

chrome.runtime.onMessage.addListener((message) => {
  if (isToggleRTLGlobalMessage(message)) {
    const { enabled } = message;
    toggleRTLGlobal({ enabled });
  }
});

void initRTLEnabled();

observeChanges({
  target: document.body,
  options: {
    childList: true,
    subtree: true,
    characterData: true,
  },
  callback: observeChangesCallback,
});
