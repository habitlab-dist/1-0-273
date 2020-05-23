
  /**
   * Singleton IronMeta instance.
   */
  Polymer.IronValidatableBehaviorMeta = null;

  /**
   * `Use Polymer.IronValidatableBehavior` to implement an element that validates user input.
   * Use the related `Polymer.IronValidatorBehavior` to add custom validation logic to an iron-input.
   *
   * By default, an `<iron-form>` element validates its fields when the user presses the submit button.
   * To validate a form imperatively, call the form's `validate()` method, which in turn will
   * call `validate()` on all its children. By using `Polymer.IronValidatableBehavior`, your
   * custom element will get a public `validate()`, which
   * will return the validity of the element, and a corresponding `invalid` attribute,
   * which can be used for styling.
   *
   * To implement the custom validation logic of your element, you must override
   * the protected `_getValidity()` method of this behaviour, rather than `validate()`.
   * See [this](https://github.com/PolymerElements/iron-form/blob/master/demo/simple-element.html)
   * for an example.
   *
   * ### Accessibility
   *
   * Changing the `invalid` property, either manually or by calling `validate()` will update the
   * `aria-invalid` attribute.
   *
   * @demo demo/index.html
   * @polymerBehavior
   */
  Polymer.IronValidatableBehavior = {

    properties: {

      /**
       * Name of the validator to use.
       */
      validator: {
        type: String
      },

      /**
       * True if the last call to `validate` is invalid.
       */
      invalid: {
        notify: true,
        reflectToAttribute: true,
        type: Boolean,
        value: false
      },

      /**
       * This property is deprecated and should not be used. Use the global
       * validator meta singleton, `Polymer.IronValidatableBehaviorMeta` instead.
       */
      _validatorMeta: {
        type: Object
      },

      /**
       * Namespace for this validator. This property is deprecated and should
       * not be used. For all intents and purposes, please consider it a
       * read-only, config-time property.
       */
      validatorType: {
        type: String,
        value: 'validator'
      },

      _validator: {
        type: Object,
        computed: '__computeValidator(validator)'
      }
    },

    observers: [
      '_invalidChanged(invalid)'
    ],

    registered: function() {
      Polymer.IronValidatableBehaviorMeta = new Polymer.IronMeta({type: 'validator'});
    },

    _invalidChanged: function() {
      if (this.invalid) {
        this.setAttribute('aria-invalid', 'true');
      } else {
        this.removeAttribute('aria-invalid');
      }
    },

    /**
     * @return {boolean} True if the validator `validator` exists.
     */
    hasValidator: function() {
      return this._validator != null;
    },

    /**
     * Returns true if the `value` is valid, and updates `invalid`. If you want
     * your element to have custom validation logic, do not override this method;
     * override `_getValidity(value)` instead.

     * @param {Object} value The value to be validated. By default, it is passed
     * to the validator's `validate()` function, if a validator is set.
     * @return {boolean} True if `value` is valid.
     */
    validate: function(value) {
      this.invalid = !this._getValidity(value);
      return !this.invalid;
    },

    /**
     * Returns true if `value` is valid.  By default, it is passed
     * to the validator's `validate()` function, if a validator is set. You
     * should override this method if you want to implement custom validity
     * logic for your element.
     *
     * @param {Object} value The value to be validated.
     * @return {boolean} True if `value` is valid.
     */

    _getValidity: function(value) {
      if (this.hasValidator()) {
        return this._validator.validate(value);
      }
      return true;
    },

    __computeValidator: function() {
      return Polymer.IronValidatableBehaviorMeta &&
          Polymer.IronValidatableBehaviorMeta.byKey(this.validator);
    }
  };

