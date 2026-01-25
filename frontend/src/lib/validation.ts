export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  min?: number;
  max?: number;
  email?: boolean;
  phone?: boolean;
  url?: boolean;
  gstin?: boolean;
  pan?: boolean;
  pincode?: boolean;
  custom?: (value: string) => string | null;
}

export interface ValidationErrors {
  [key: string]: string | null;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationErrors;
}

export class ValidationUtils {
  static validate(value: string, rules: ValidationRule): string | null {
    if (rules.required && (!value || value.trim() === '')) {
      return 'This field is required';
    }

    if (!value || value.trim() === '') {
      return null;
    }

    return this.validateValue(value, rules);
  }

  private static validateValue(value: string, rules: ValidationRule): string | null {
    if (rules.minLength && value.length < rules.minLength) {
      return `Must be at least ${rules.minLength} characters`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `Must be no more than ${rules.maxLength} characters`;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return 'Invalid format';
    }

    if (rules.email && !this.isValidEmail(value)) {
      return 'Please enter a valid email address';
    }

    if (rules.phone && !this.isValidPhone(value)) {
      return 'Please enter a valid phone number';
    }

    if (rules.url && !this.isValidUrl(value)) {
      return 'Please enter a valid URL';
    }

    if (rules.gstin && !this.isValidGSTIN(value)) {
      return 'Please enter a valid GSTIN number';
    }

    if (rules.pan && !this.isValidPAN(value)) {
      return 'Please enter a valid PAN number';
    }

    if (rules.pincode && !this.isValidPincode(value)) {
      return 'Please enter a valid pincode';
    }

    if (rules.custom) {
      return rules.custom(value);
    }

    return null;
  }

  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidPhone(phone: string): boolean {
    const phoneRegex = /^[\d\s\-\+()]+$/;
    return phoneRegex.test(phone) && phone.replaceAll(/\D/g, '').length >= 10;
  }

  static isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  static isValidGSTIN(gstin: string): boolean {
    const gstinRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z\d[A-Z]$/;
    return gstinRegex.test(gstin.toUpperCase());
  }

  static isValidPAN(pan: string): boolean {
    const panRegex = /^[A-Z]{5}\d{4}[A-Z]$/;
    return panRegex.test(pan.toUpperCase());
  }

  static isValidPincode(pincode: string): boolean {
    const pincodeRegex = /^[1-9]\d{5}$/;
    return pincodeRegex.test(pincode);
  }

  static validateForm(data: Record<string, string>, rules: Record<string, ValidationRule>): ValidationResult {
    const errors: ValidationErrors = {};
    let isValid = true;

    for (const [field, value] of Object.entries(data)) {
      const fieldRules = rules[field];
      if (fieldRules) {
        const error = this.validate(value, fieldRules);
        errors[field] = error;
        if (error) {
          isValid = false;
        }
      }
    }

    return { isValid, errors };
  }
}

export const commonValidationRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z\s]+$/,
    custom: (value: string) => {
      if (!/^[a-zA-Z\s]+$/.test(value)) {
        return 'Name can only contain letters and spaces';
      }
      return null;
    }
  },
  email: {
    required: true,
    email: true
  },
  phone: {
    required: true,
    phone: true
  },
  subject: {
    required: true,
    minLength: 3,
    maxLength: 200
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 1000
  },
  businessName: {
    required: false,
    minLength: 2,
    maxLength: 200
  },
  website: {
    required: false,
    url: true
  },
  gstin: {
    required: false,
    gstin: true
  },
  pan: {
    required: false,
    pan: true
  },
  pincode: {
    required: false,
    pincode: true
  }
};
