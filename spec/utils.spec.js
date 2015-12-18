import {
    fromString,
    mergeConfiguration,
} from '../app/utils/config';

describe('merge configuration suite', () => {
    it('should merge configuration properly', () => {
        const defaultConf = {
            INT_DEFAULT: 1,
            INT_OVERRIDE: 1,
            STR_DEFAULT: 'one',
            STR_OVERRIDE: 'one',
            BOOL_DEFAULT: true,
            BOOL_OVERRIDE: true,
        };

        const overrideConf = {
            INT_OVERRIDE: '2',
            STR_OVERRIDE: 'two',
            BOOL_OVERRIDE: 'false',
        };

        const expected = {
            INT_DEFAULT: 1,
            INT_OVERRIDE: 2,
            STR_DEFAULT: 'one',
            STR_OVERRIDE: 'two',
            BOOL_DEFAULT: true,
            BOOL_OVERRIDE: false,
        };

        expect(mergeConfiguration(overrideConf, defaultConf)).toEqual(expected);
    });
});

describe('from string suite', () => {
    it('should convert from a string to boolean', () => {
//      falsy values
        expect(fromString('false', 'boolean')).toBe(false);
        expect(fromString('no', 'boolean')).toBe(false);
        expect(fromString('off', 'boolean')).toBe(false);
//      truey values
        expect(fromString('true', 'boolean')).toBe(true);
        expect(fromString('on', 'boolean')).toBe(true);
        expect(fromString('yes', 'boolean')).toBe(true);
    });

    it('should return strings when asked', () => {
        expect(fromString('a', 'string')).toBe('a');
        expect(fromString('', 'string')).toBe('');
    });

    it('should convert from a string to a number', () => {
        expect(fromString('1000', 'number')).toBe(1000);
        expect(fromString('-1000', 'number')).toBe(-1000);
    });
});
