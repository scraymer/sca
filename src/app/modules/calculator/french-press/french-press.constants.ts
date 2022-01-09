import { FrenchPressInput } from "./french-press";

export class FrenchPressConstants {

  /**
   * Key for previous session's French Press form input values in storage service.
   */
  static readonly DEFAULT_INPUT_STORAGE_KEY = 'app.calculator.french-press.options';

  /**
   * Default French Press form input values.
   */
  static readonly DEFAULT_INPUT: FrenchPressInput = { amount: 12, strength: 4 };
}
