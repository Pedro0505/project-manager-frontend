import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Drag'n'drop matcher.
       * @param source source card/column name regex;
       * @param target target card/column name regex.
       */
      dragAndDrop(source: RegExp, target: RegExp): void;
    }
  }
}

export {};
