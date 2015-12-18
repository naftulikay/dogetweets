import _ from 'lodash';

export const fromString = (value, destType) => {
    switch (destType) {
    case 'string':
        return value;

    case 'boolean':
        let result = null;

        if (value === null || value === undefined) {
            result = false;
        } else if (typeof value === 'string') {
            result = value.match(/(true|on|yes)/i) !== null;
        } else {
            result = value === true;
        }

        return result;

    case 'number':
        return +value;

    default:
        throw new Error(`Could not convert to type ${destType}.`);
    }
};

export const mergeConfiguration = (actual, base) => {
    const overrideKeys = _.intersection(_.keys(base), _.keys(actual));
    const overrideValues = _.mapValues(_.pick(actual, overrideKeys), (value, key) => fromString(value, typeof base[key]));

    return _.assign({}, base, overrideValues);
};
