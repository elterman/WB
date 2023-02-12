import dayjs from 'dayjs';

export const NBSP = '\u00A0';
export const BULLET = `${NBSP}•${NBSP}`;
export const BLACK_CIRCLE = '\u25CF';
export const NA = 'N/A';
export const X = '✖';

export const APP_BACKGROUND = '#2F2929';
export const OFF_BACKGROUND = '#2F292980';
export const WHITE = '#FFF';
export const OFF_WHITE = '#FFFA';
export const BLUE = '#24ADF4';
export const DARK_BLUE = '#1C8AC3';
export const YELLOW = '#F8E47B';
export const DARK_YELLOW = '#C6B662';
export const GOLD = '#FFE4AD';
export const DARK_GOLD = '#B8AF8F';
export const GREEN = '#56BF8B';
export const DARK_GREEN = '#3C8561';
export const ROSE = '#F77486';
export const RED = '#F4425A';
export const DARK_RED = '#AA2E3E';
export const TANGERINE = '#FC9C6C';
export const DARK_TANGERINE = '#E28C61';
export const LAVENDER = '#FFB0FF';
export const DIMGRAY = '#676971';
export const MAGENTA = '#AA1979';
export const BUTTON_BACKGROUND = '#0009';
export const PINK = '#F88F9E';
export const BROWN = '#863C3C';

export const PALETTE = 'PALETTE';
export const PALETTES = {
    'traffic': { levels: ['#6C282B', '#6C5530', '#3A5A44', '#5A5757', '#4E6268', '#625C50'] },
    'mono-gold': { levels: ['#FFFFFF18', '#FFE4AD28', '#FFE4AD10', '#FFE4AD40', '#FFE4AD70', '#FFE4AD58'] },
    'mono-gray': { levels: ['#FFFFFF10', '#FFFFFF30', '#FFFFFF20', '#FFFFFF40', '#FFFFFF60', '#FFFFFF50'] },
    'traffic-lite': { levels: ['#F5C8FB', '#FAF3BB', '#B7E1AB', '#FFFFFFB8', '#C8FBF5', '#E1DDD3'] },
    'mono-gold-lite': { levels: ['#FFE4AD80', '#FFE4ADA0', '#FFE4AD90', '#FFE4ADB0', '#FFE4ADD0', '#FFE4ADC8'] },
    'mono-lite': { levels: ['#FFFFFF80', '#FFFFFFA0', '#FFFFFF90', '#FFFFFFB0', '#FFFFFFD0', '#FFFFFFC0'] },
};

export const ALERT_SHADES = { lite: '#FFA07A', dark: '#B63715' };

export const ARROW_STYLE = { padding: '0 5px', background: 'transparent' };
export const ATTENTION_BORDER = `1px solid ${ROSE}`;

export const TODAY = dayjs();

export const TARGETS = 'Targets';
export const COMPARE = 'Compare';
export const BENCHMARKS = 'Benchmarks';
export const METRICS = 'Metrics';
export const TABS = [TARGETS, COMPARE, BENCHMARKS, METRICS];

export const LEFT = 'ArrowLeft';
export const RIGHT = 'ArrowRight';
export const UP = 'ArrowUp';
export const DOWN = 'ArrowDown';
export const GOTO_PARENT = 'GO TO PARENT';