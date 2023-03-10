import LocalizedStrings from "react-localization";
import {
  common as commonTR,
  signInPage as signInPageTR,
  offline as offlineTR,
  waitingRoom as waitingRoomTR,
  mosque as mosqueTR,
  organisation as organisationTR,
} from "./tr";
import {
  common as commonNL,
  signInPage as signInPageNL,
  offline as offlineNL,
  waitingRoom as waitingRoomNL,
  mosque as mosqueNL,
  organisation as organisationNL,
} from "./nl";

export const t = new LocalizedStrings({
  tr: {
    common: commonTR,
    signIn: signInPageTR,
    offline: offlineTR,
    waitingRoom: waitingRoomTR,
    mosque: mosqueTR,
    organisation: organisationTR,
  },
  nl: {
    common: commonNL,
    signIn: signInPageNL,
    offline: offlineNL,
    waitingRoom: waitingRoomNL,
    mosque: mosqueNL,
    organisation: organisationNL,
  },
});
