import LocalizedStrings from "react-localization";
import { common as commonTR, signInPage as signInPageTR } from "./tr";
import { common as commonNL, signInPage as signInPageNL } from "./nl";

export const t = new LocalizedStrings({
  tr: {
    common: commonTR,
    signIn: signInPageTR,
  },
  nl: {
    common: commonNL,
    signIn: signInPageNL,
  },
});
