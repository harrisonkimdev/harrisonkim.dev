'use client';

import { useReducer, FormEvent } from 'react';
import { FiMail, FiUser, FiMessageSquare, FiSend, FiCheck } from 'react-icons/fi';

// 타입 정의
type FormState = {
  formData: {
    name: string;
    email: string;
    message: string;
  };
  isSubmitting: boolean;
  isSubmitted: boolean;
  error: string | null;
};

type FormAction =
  | { type: 'UPDATE_FIELD'; field: string; value: string }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_ERROR'; error: string }
  | { type: 'RESET_FORM' }
  | { type: 'RESET_ERROR' };

// 리듀서 함수
const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value
        }
      };
    case 'SUBMIT_START':
      return {
        ...state,
        isSubmitting: true,
        error: null
      };
    case 'SUBMIT_SUCCESS':
      return {
        ...state,
        isSubmitting: false,
        isSubmitted: true,
        formData: { name: '', email: '', message: '' }
      };
    case 'SUBMIT_ERROR':
      return {
        ...state,
        isSubmitting: false,
        error: action.error
      };
    case 'RESET_FORM':
      return {
        ...state,
        isSubmitted: false
      };
    case 'RESET_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

// 제출 성공 컴포넌트
const SuccessMessage = ({ onReset }: { onReset: () => void }) => (
  <div className="flex flex-col items-center text-center py-12">
    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
      <FiCheck className="text-primary" size={32} />
    </div>
    <h2 className="text-2xl font-semibold mb-2">Message Sent!</h2>
    <p className="text-gray-300 mb-6">
      Thanks for reaching out. I&apos;ll get back to you as soon as possible.
    </p>
    <button 
      onClick={onReset}
      className="btn btn-primary"
    >
      Send Another Message
    </button>
  </div>
);

// 에러 메시지 컴포넌트
const ErrorMessage = ({ error }: { error: string }) => (
  <div className="bg-red-900/30 border border-red-700 text-red-200 px-4 py-3 rounded">
    {error}
  </div>
);

// 입력 필드 컴포넌트
const InputField = ({ 
  id, 
  name, 
  type, 
  value, 
  onChange, 
  placeholder, 
  icon: Icon 
}: { 
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  icon: React.ElementType;
}) => (
  <div>
    <label htmlFor={id} className="block text-gray-300 mb-2">
      {name}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="text-gray-400" />
      </div>
      <input
        id={id}
        name={name.toLowerCase()}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full py-2 pl-10 pr-4 bg-accent border border-gray-800 rounded-md focus:outline-none focus:border-primary"
        placeholder={placeholder}
      />
    </div>
  </div>
);

// 텍스트 영역 컴포넌트
const TextareaField = ({ 
  value, 
  onChange 
}: { 
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => (
  <div>
    <label htmlFor="message" className="block text-gray-300 mb-2">
      Message
    </label>
    <div className="relative">
      <div className="absolute top-3 left-3 pointer-events-none">
        <FiMessageSquare className="text-gray-400" />
      </div>
      <textarea
        id="message"
        name="message"
        value={value}
        onChange={onChange}
        rows={6}
        className="w-full py-2 pl-10 pr-4 bg-accent border border-gray-800 rounded-md focus:outline-none focus:border-primary"
        placeholder="What would you like to discuss?"
      />
    </div>
  </div>
);

// 제출 버튼 컴포넌트
const SubmitButton = ({ isSubmitting }: { isSubmitting: boolean }) => (
  <button
    type="submit"
    disabled={isSubmitting}
    className="btn btn-primary w-full flex items-center justify-center gap-2"
  >
    {isSubmitting ? (
      <>
        <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
        Sending...
      </>
    ) : (
      <>
        <FiSend />
        Send Message
      </>
    )}
  </button>
);

// 컨택트 폼 컴포넌트
const ContactForm = ({ 
  formData, 
  error, 
  isSubmitting, 
  onFieldChange, 
  onSubmit 
}: { 
  formData: FormState['formData'];
  error: string | null;
  isSubmitting: boolean;
  onFieldChange: (field: string, value: string) => void;
  onSubmit: (e: FormEvent) => void;
}) => (
  <form onSubmit={onSubmit} className="space-y-6">
    {error && <ErrorMessage error={error} />}
    
    <InputField
      id="name"
      name="Name"
      type="text"
      value={formData.name}
      onChange={(e) => onFieldChange('name', e.target.value)}
      placeholder="Your name"
      icon={FiUser}
    />
    
    <InputField
      id="email"
      name="Email"
      type="email"
      value={formData.email}
      onChange={(e) => onFieldChange('email', e.target.value)}
      placeholder="your@email.com"
      icon={FiMail}
    />
    
    <TextareaField
      value={formData.message}
      onChange={(e) => onFieldChange('message', e.target.value)}
    />
    
    <SubmitButton isSubmitting={isSubmitting} />
  </form>
);

export default function ContactPage() {
  // 초기 상태
  const initialState: FormState = {
    formData: {
      name: '',
      email: '',
      message: '',
    },
    isSubmitting: false,
    isSubmitted: false,
    error: null,
  };
  
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { formData, isSubmitting, isSubmitted, error } = state;
  
  // 필드 변경 핸들러
  const handleFieldChange = (field: string, value: string) => {
    dispatch({ type: 'UPDATE_FIELD', field, value });
  };
  
  // 폼 제출 핸들러
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_START' });
    
    // 폼 유효성 검사
    if (!formData.name || !formData.email || !formData.message) {
      dispatch({ type: 'SUBMIT_ERROR', error: 'All fields are required' });
      return;
    }
    
    // 이메일 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      dispatch({ type: 'SUBMIT_ERROR', error: 'Please enter a valid email address' });
      return;
    }
    
    try {
      // 실제 앱에서는 API에 데이터를 전송
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      
      // if (!response.ok) throw new Error('Failed to send message');
      
      // 데모를 위한 성공 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      dispatch({ type: 'SUBMIT_SUCCESS' });
    } catch (err) {
      dispatch({ type: 'SUBMIT_ERROR', error: 'Failed to send message. Please try again later.' });
    }
  };
  
  return (
    <div className="flex flex-col">
      <h1 className="section-title text-3xl">Get in Touch</h1>
      
      <div className="mt-6 max-w-2xl mx-auto w-full">
        {isSubmitted ? (
          <SuccessMessage onReset={() => dispatch({ type: 'RESET_FORM' })} />
        ) : (
          <ContactForm
            formData={formData}
            error={error}
            isSubmitting={isSubmitting}
            onFieldChange={handleFieldChange}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}