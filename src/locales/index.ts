import LocalizedStrings from "react-localization";
import {
  common as commonTR,
  signInPage as signInPageTR,
  offline as offlineTR,
} from "./tr";
import {
  common as commonNL,
  signInPage as signInPageNL,
  offline as offlineNL,
} from "./nl";

export const t = new LocalizedStrings({
  tr: {
    common: commonTR,
    signIn: signInPageTR,
    offline: offlineTR,
  },
  nl: {
    common: commonNL,
    signIn: signInPageNL,
    offline: offlineNL,
  },
});
