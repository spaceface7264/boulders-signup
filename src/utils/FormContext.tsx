import React, { createContext, useContext, useState } from 'react';

interface FormData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dob: string;
    address: string;
    city: string;
    zipCode: string;
    student: boolean;
    password?: string;
    emailNotifications?: boolean;
    pushNotifications?: boolean;
    acceptTnC?: boolean;
    rawPhone?: string;
    countryCode?: string;
    gender?: string;
  };
  membership: {
    plan: string;
    duration: string;
  };
  location: {
    gymId: string;
    address: string;
  };
  payment: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };
  recipient?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    dob?: string;
  };
  guardian?: {
    name?: string;
    email?: string;
    phone?: string;
    relationship?: string;
  };
  access?: {
    type: 'membership' | 'punchcard';
    cardType?: string;
    punches?: number;
    price?: number;
  };
}

interface FormContextType {
  formData: FormData;
  updateFormData: (section: keyof FormData, data: Partial<FormData[keyof FormData]>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  errors: Record<string, string>;
  setErrors: (errors: Record<string, string>) => void;
  validateStep: (step: number) => boolean;
}

const initialFormData: FormData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    city: '',
    zipCode: '',
    student: false,
    password: '',
    emailNotifications: false,
    pushNotifications: false,
    acceptTnC: false,
    rawPhone: '',
    countryCode: '+45',
    gender: '',
  },
  membership: {
    plan: '',
    duration: '',
  },
  location: {
    gymId: '',
    address: '',
  },
  payment: {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  },
  recipient: {
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
  },
  guardian: {
    name: '',
    email: '',
    phone: '',
    relationship: '',
  },
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync currentStep with URL
  React.useEffect(() => {
    const screenToStep: Record<string, number> = {
      PersonalInformation: 1,
      MembershipSelection: 2,
      LocationSelection: 3,
      PaymentScreen: 4,
      ConfirmationScreen: 5,
    };
    function updateStepFromUrl() {
      const params = new URLSearchParams(window.location.search);
      const screen = params.get('screen') || 'PersonalInformation';
      setCurrentStep(screenToStep[screen] || 1);
    }
    updateStepFromUrl();
    window.addEventListener('popstate', updateStepFromUrl);
    return () => window.removeEventListener('popstate', updateStepFromUrl);
  }, []);

  const updateFormData = (section: keyof FormData, data: Partial<FormData[keyof FormData]>) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1: // Personal Information
        if (!formData.personalInfo.firstName) newErrors.firstName = 'First name is required';
        if (!formData.personalInfo.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.personalInfo.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.personalInfo.email)) newErrors.email = 'Invalid email format';
        if (!formData.personalInfo.phone) newErrors.phone = 'Phone number is required';
        if (!formData.personalInfo.dob) newErrors.dob = 'Date of birth is required';
        if (!formData.personalInfo.address) newErrors.address = 'Address is required';
        if (!formData.personalInfo.city) newErrors.city = 'City is required';
        if (!formData.personalInfo.zipCode) newErrors.zipCode = 'ZIP/Postal code is required';
        break;
      case 2: // Membership
        if (!formData.membership.plan) newErrors.plan = 'Please select a plan';
        if (!formData.membership.duration) newErrors.duration = 'Please select a duration';
        break;
      case 3: // Location
        if (!formData.location.gymId) newErrors.gymId = 'Please select a gym location';
        break;
      case 4: // Payment
        if (!formData.payment.cardNumber) newErrors.cardNumber = 'Card number is required';
        if (!formData.payment.expiryDate) newErrors.expiryDate = 'Expiry date is required';
        if (!formData.payment.cvv) newErrors.cvv = 'CVV is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <FormContext.Provider value={{
      formData,
      updateFormData,
      currentStep,
      setCurrentStep,
      errors,
      setErrors,
      validateStep,
    }}>
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
} 