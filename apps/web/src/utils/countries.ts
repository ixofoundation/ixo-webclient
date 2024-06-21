import availableFlags from 'constants/availableFlags.json';
import globalFlag from 'assets/images/country-flags/global.svg';

export const getFlagURL = (location?: string): string | undefined => {
    console.log({ location })
  if (!location) {
    return undefined;
  }

  // Ensure the location is available in the flags list
  if (availableFlags.availableFlags.includes(location)) {
    try {
      // Use static import instead of dynamic import
      const flag = require(`assets/images/country-flags/${location.toLowerCase()}.svg`);
      console.log({ flag })
      return flag;
    } catch (error) {
      console.error(`Flag for location ${location} not found`, error);
      return undefined;
    }
  } else if (location === 'AA') {
    return globalFlag;
  }

  console.log(`Flag for location ${location} not found`)
  return undefined;
};
