/**
 * This module is a wrapper around the bcrypt package to promisify its methods.
 */

import bcryptNode from "bcrypt";

/**
 * Compares a plain text password with a hashed password.
 *
 * @param {string} plainPassword - The plain text password to compare.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @returns {Promise<boolean>} A Promise that resolves to a boolean indicating whether the plain text password matches the hashed password.
 */
const verify = (plainPassword: string, hashedPassword: string) => {
  return new Promise((resolve) => {
    bcryptNode.compare(plainPassword, hashedPassword, (_, res) => {
      resolve(res);
    });
  });
};

/**
 * Hashes a plain text password using bcrypt.
 *
 * @param {string} plainPassword - The plain text password to hash.
 * @returns {Promise<string>} A Promise that resolves to the hashed password.
 */
const hash = (plainPassword: string): Promise<string> => {
  return new Promise((res, rej) => {
    bcryptNode.hash(plainPassword, 10, (err, hash) => {
      if (err) {
        rej(err);
      } else {
        res(hash);
      }
    });
  });
};

export const bcrypt = {
  verify,
  hash,
};
