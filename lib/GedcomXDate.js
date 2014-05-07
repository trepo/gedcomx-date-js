var Single = require('./single.js');

/**
 * If no arguments are supplied, return a single simple
 * If a type is supplied, return a new simple of that type
 */
module.exports = function() {

  if(arguments.length == 0) {
    // the extra set of parents are for scoping
    // Equivelent to new SingleSimple();
    return new (Single('simple'))();
  } else if(arguments.length == 1) {

    switch(arguments[0]) {
      case 'single':
        return new (Single('simple'))();
        break;
      case 'range':
        return new (Range('simple', 'simple'))();
        break;
      case 'recurring':
        return new (Recurring('simple', 'simple'))();
        break;
      default:
        throw new Error('fix me');
    }

  } else {
    throw new Error('Invalid Date');
  }

  // If no arguments return a new single of subtype simple
  // The extra parents are for scoping
  return new (Single('simple'))();
}