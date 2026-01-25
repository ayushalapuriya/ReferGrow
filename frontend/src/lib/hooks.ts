import { useState, useCallback, useEffect } from 'react';
import { ValidationRule, ValidationErrors, ValidationResult, ValidationUtils } from './validation';

export interface UseFormValidationOptions {
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  initialData?: Record<string, string>;
}

export interface UseFormValidationReturn<T extends Record<string, string>> {
  data: T;
  errors: ValidationErrors;
  touched: Record<keyof T, boolean>;
  isValid: boolean;
  isDirty: boolean;
  setData: (data: Partial<T> | ((prev: T) => Partial<T>)) => void;
  setError: (field: keyof T, error: string | null) => void;
  setTouched: (field: keyof T, touched: boolean) => void;
  handleChange: (field: keyof T, value: string) => void;
  handleBlur: (field: keyof T) => void;
  validateField: (field: keyof T) => string | null;
  validateForm: () => ValidationResult;
  resetForm: () => void;
  resetErrors: () => void;
}

export function useFormValidation<T extends Record<string, string>>(
  validationRules: Record<keyof T, ValidationRule>,
  options: UseFormValidationOptions = {}
): UseFormValidationReturn<T> {
  const { validateOnChange = true, validateOnBlur = true, initialData } = options;

  const [data, setDataState] = useState<T>(initialData as T);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouchedState] = useState<Record<keyof T, boolean>>({} as Record<keyof T, boolean>);
  const [isDirty, setIsDirty] = useState(false);

  const setData = useCallback((newData: Partial<T> | ((prev: T) => Partial<T>)) => {
    setDataState(prev => ({ ...prev, ...(typeof newData === 'function' ? newData(prev) : newData) }));
  }, []);

  const validateField = useCallback((field: keyof T): string | null => {
    const rules = validationRules[field];
    if (!rules) return null;
    
    const error = ValidationUtils.validate(data[field] || '', rules);
    setErrors(prev => ({ ...prev, [field]: error }));
    return error;
  }, [data, validationRules]);

  const validateForm = useCallback((): ValidationResult => {
    return ValidationUtils.validateForm(data as Record<string, string>, validationRules as Record<string, ValidationRule>);
  }, [data, validationRules]);

  const handleChange = useCallback((field: keyof T, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
    
    if (validateOnChange && touched[field]) {
      validateField(field);
    }
  }, [validateOnChange, touched, validateField, setData]);

  const handleBlur = useCallback((field: keyof T) => {
    setTouchedState(prev => ({ ...prev, [field]: true }));
    
    if (validateOnBlur) {
      validateField(field);
    }
  }, [validateOnBlur, validateField]);

  const setError = useCallback((field: keyof T, error: string | null) => {
    setErrors(prev => ({ ...prev, [field]: error }));
  }, []);

  const setTouched = useCallback((field: keyof T, isTouched: boolean) => {
    setTouchedState(prev => ({ ...prev, [field]: isTouched }));
  }, []);

  const resetForm = useCallback(() => {
    if (initialData) {
      setDataState(initialData as T);
    }
    setErrors({});
    setTouchedState({} as Record<keyof T, boolean>);
    setIsDirty(false);
  }, [initialData]);

  const resetErrors = useCallback(() => {
    setErrors({});
  }, []);

  const isValid = Object.values(errors).every(error => !error);

  return {
    data,
    errors,
    touched,
    isValid,
    isDirty,
    setData,
    setError,
    setTouched,
    handleChange,
    handleBlur,
    validateField,
    validateForm,
    resetForm,
    resetErrors
  };
}

export interface UseFileValidationOptions {
  maxSize?: number; // in bytes
  allowedTypes?: string[];
  validateOnChange?: boolean;
}

export interface UseFileValidationReturn {
  file: File | null;
  error: string | null;
  isValid: boolean;
  setFile: (file: File | null) => void;
  setError: (error: string | null) => void;
  validateFile: (file: File) => string | null;
  reset: () => void;
}

export function useFileValidation(options: UseFileValidationOptions = {}): UseFileValidationReturn {
  const { maxSize = 5 * 1024 * 1024, allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'], validateOnChange = true } = options;

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateFile = useCallback((fileToValidate: File): string | null => {
    if (fileToValidate.size > maxSize) {
      return `File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`;
    }

    if (!allowedTypes.includes(fileToValidate.type)) {
      const allowedExtensions = allowedTypes.map(type => type.split('/')[1]).join(', ');
      return `Only ${allowedExtensions} files are allowed`;
    }

    return null;
  }, [maxSize, allowedTypes]);

  const setFileWithValidation = useCallback((newFile: File | null) => {
    setFile(newFile);
    
    if (newFile && validateOnChange) {
      const validationError = validateFile(newFile);
      setError(validationError);
    } else if (!newFile) {
      setError(null);
    }
  }, [validateOnChange, validateFile]);

  const reset = useCallback(() => {
    setFile(null);
    setError(null);
  }, []);

  const isValid = !!file && !error;

  return {
    file,
    error,
    isValid,
    setFile: setFileWithValidation,
    setError,
    validateFile,
    reset
  };
}

export interface UseDebounceValidationOptions {
  delay?: number;
}

export function useDebounceValidation<T>(
  value: T,
  validator: (value: T) => string | null,
  options: UseDebounceValidationOptions = {}
): { error: string | null; isValid: boolean } {
  const { delay = 300 } = options;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const validationError = validator(value);
      setError(validationError);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, validator, delay]);

  return { error, isValid: !error };
}

export { ValidationUtils, commonValidationRules } from './validation';
