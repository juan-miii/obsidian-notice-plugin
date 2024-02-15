
/**
 * Interface representing an object with dynamic keys and values.
 *
 * @interface
 * @since 1.0.0
 */
export interface ObjectKeys {

  /**
   * Dynamic keys with corresponding values of unknown type.
   *
   * @type {unknown}
   * @since 1.0.0
   */
  [key: string]: unknown;
}
