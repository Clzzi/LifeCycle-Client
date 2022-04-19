/// <reference types="cypress" />
/**
 * @type {Cypress.PluginConfig}
 */

// eslint-disable-next-line no-unused-vars
module.exports = (on: any, config: any) => {
  require('@cypress/code-coverage/task')(on, config);
  return config;
};

export {};
