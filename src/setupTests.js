import matchMediaMock from "match-media-mock";
import MutationObserver from "@sheerun/mutationobserver-shim";
global.MutationObserver = MutationObserver;
window.matchMedia = window.matchMedia || matchMediaMock.create();
