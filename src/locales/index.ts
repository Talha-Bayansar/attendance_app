import LocalizedStrings from "react-localization";
import {
  common as commonTR,
  signInPage as signInPageTR,
  offline as offlineTR,
  waitingRoom as waitingRoomTR,
  mosque as mosqueTR,
} from "./tr";
import {
  common as commonNL,
  signInPage as signInPageNL,
  offline as offlineNL,
  waitingRoom as waitingRoomNL,
  mosque as mosqueNL,
} from "./nl";

export const t = new LocalizedStrings({
  tr: {
    common: commonTR,
    signIn: signInPageTR,
    offline: offlineTR,
    waitingRoom: waitingRoomTR,
    mosque: mosqueTR,
  },
  nl: {
    common: commonNL,
    signIn: signInPageNL,
    offline: offlineNL,
    waitingRoom: waitingRoomNL,
    mosque: mosqueNL,
  },
});
