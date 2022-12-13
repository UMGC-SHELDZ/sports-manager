import * as _ from 'lodash';

/**
 * Validates a password for length of 12 or greater, one number and one special character.
 * @param {string} password the password to be validated.
 * @returns {boolean} if no validation errors detected, returns true, else returns false.
 */
const validatePassword = (password: string): boolean => {
    const validationParams: { [key: string]: boolean } = {
        validLength: _.size(password) > 12,
        hasNumber: /\d/.test(password),
        hasCharacter: /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)
    };

    // Check for invalid values
    const invalid: Array<boolean> = _.filter(validationParams, (value, key) => value === false);

    // If the invalid is an empty array, no validation errors.
    return _.isEmpty(invalid);
};

/**
 * Validates a name for length between 2 and 20, and for letters only.
 * @param {string} name the name to be validated.
 * @returns {boolean} if no validation errors detected, returns true, else returns false.
 */
const validateName = (name: string): boolean => {
    const validationParams: { [key: string]: boolean } = {
        validLength: _.size(name) > 2 && _.size(name) < 20,
        lettersOnly: /^[A-Za-z\s]+$/.test(name)
    }

    // Check for invalid values
    const invalid: Array<boolean> = _.filter(validationParams, (value, key) => value === false);

    // If the invalid is an empty array, no validation errors.
    return _.isEmpty(invalid);
};

/**
 * Validates a username for length between 6 and 20.
 * @param {string} username the username to be validated.
 * @returns {boolean} if no validation errors detected, returns true, else returns false.
 */
const validateUsername = (username: string): boolean => {
    const validationParams: { [key: string]: boolean } = {
        validLength: _.size(username) > 6 && _.size(username) < 20,
        noSpaces: username.indexOf(' ') < 0
    }
    
    // Check for invalid values
    const invalid: Array<boolean> = _.filter(validationParams, (value, key) => value === false);

    // If the invalid is an empty array, no validation errors.
    return _.isEmpty(invalid);
};

/**
 * Validates a position for letters, numbers and spaces on, as well as the proper length.
 * @param {string} position the position to be validated
 * @returns {boolean} if no validation errors detected, returns true, else returns false.
 */
const validatePosition = (position: string): boolean => {
    const validationParams: { [key: string]: boolean } = {
        validLength: _.size(position) > 1 && _.size(position) <20,
        lettersNumbersSpacesOny: /^[A-Za-z0-9][A-Za-z0-9\s]*$/.test(position)
    }

    // Check for invalid values
    const invalid: Array<boolean> = _.filter(validationParams, (value, key) => value === false);

    // If the invalid is an empty array, no validation errors.
    return _.isEmpty(invalid);
}

/**
 * Validates a salary for numeric.
 * @param {string} salary the salary to be validated.
 * @returns {boolean} if no validation errors detected, returns true, else returns false.
 */
 const validateSalary = (salary: string): boolean => {
    // Try/catch for casting errors.
    try {
        const validationParams: { [key: string]: boolean } = {
            validNumber: !_.isNaN(salary) && parseInt(salary) > 0,
            noWhitespae: !_.isNaN(parseInt(salary))
        }

        // Check for invalid values
        const invalid: Array<boolean> = _.filter(validationParams, (value, key) => value === false);

        // If the invalid is an empty array, no validation errors.
        return _.isEmpty(invalid);
    } catch (e: any) {
        return false;
    }
};

/**
 * Validates a player number for numeric and if it is greater than 0 and less than.
 * @param {string} playerNumber the player number to be validated.
 * @returns {boolean} if no validation errors detected, returns true, else returns false.
 */
 const validatePlayerNumber = (playerNumber: string): boolean => {
    // Try/catch for casting errors.
    try {
        const validationParams: { [key: string]: boolean } = {
            validNumber: !_.isNaN(playerNumber),
            validRange: parseInt(playerNumber) > 0 && parseInt(playerNumber) < 100
        }
    
        // Check for invalid values
        const invalid: Array<boolean> = _.filter(validationParams, (value, key) => value === false);
    
        // If the invalid is an empty array, no validation errors.
        return _.isEmpty(invalid);
    } catch (e: any) {
        return false;
    }
    
};

export {
    validateName,
    validatePassword,
    validatePlayerNumber,
    validatePosition,
    validateSalary,
    validateUsername
}