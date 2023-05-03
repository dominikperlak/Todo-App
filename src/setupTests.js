import matchMediaMock from 'match-media-mock';
setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect']


window.matchMedia = window.matchMedia || matchMediaMock.create();
