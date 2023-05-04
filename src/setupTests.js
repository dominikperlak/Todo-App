import matchMediaMock from 'match-media-mock';
setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect']
import MutationObserver from '@sheerun/mutationobserver-shim';
global.MutationObserver = MutationObserver;

window.matchMedia = window.matchMedia || matchMediaMock.create();
