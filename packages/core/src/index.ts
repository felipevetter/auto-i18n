import { scanFilesAndRun } from "./scanner.js";
import { createConfig } from "./config.js";

export const run = () => {
    scanFilesAndRun();
};

export const init = () => {
    createConfig();
}