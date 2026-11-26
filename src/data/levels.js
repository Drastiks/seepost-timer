import { LEVELS_CH1 } from './levels-ch1.js';
import { LEVELS_CH2 } from './levels-ch2.js';
import { LEVELS_CH3 } from './levels-ch3.js';
import { LEVELS_CH4 } from './levels-ch4.js';
import { LEVELS_CH5 } from './levels-ch5.js';

export const LEVELS = [
  ...LEVELS_CH1,
  ...LEVELS_CH2,
  ...LEVELS_CH3,
  ...LEVELS_CH4,
  ...LEVELS_CH5
];

export function getLevelById(id) {
  return LEVELS.find((lvl) => lvl.id === id) || LEVELS[0];
}
