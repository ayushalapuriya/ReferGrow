"use client";

import { useState } from "react";
import { Mail, Phone, Clock, AlertCircle } from "lucide-react";
import { apiFetch } from "@/lib/apiClient";
import { showToast } from "@/lib/toast";
import { useFormValidation, commonValidationRules } from "@/lib/hooks";

interface ContactFormData extends Record<string, string> {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const validationRules = {
    name: commonValidationRules.name,
    email: commonValidationRules.email,
    subject: commonValidationRules.subject,
    message: commonValidationRules.message
  };

  const {
    data: formData,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    validateForm,
    resetForm
  } = useFormValidation<ContactFormData>(validationRules, {
    validateOnChange: true,
    validateOnBlur: true,
    initialData: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const validationResult = validateForm();
    if (!validationResult.isValid) {
      showToast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await apiFetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        showToast.success("Thank you for your message! We'll get back to you soon.");
        resetForm();
      } else {
        const errorData = await response.json();
        showToast.error(errorData?.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      showToast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    handleChange(name as keyof ContactFormData, value);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    handleBlur(name as keyof ContactFormData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h1>
          
          <div className="grid gap-30 lg:grid-cols-2">
            {/* Contact Form - Left Side */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Send us a message</h2>
                <p className="text-gray-700 mb-6">
                  Have questions about our services? Need support? Fill out the form and we&apos;ll get back to you as soon as possible.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className={`w-full px-4 py-3 rounded-lg border bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      touched.name && errors.name 
                        ? 'border-red-500' 
                        : 'border-gray-300'
                    }`}
                    placeholder="John Doe"
                    aria-invalid={touched.name && !!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {touched.name && errors.name && (
                    <div id="name-error" className="mt-1 flex items-center text-sm text-red-600">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.name}
                    </div>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className={`w-full px-4 py-3 rounded-lg border bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      touched.email && errors.email 
                        ? 'border-red-500' 
                        : 'border-gray-300'
                    }`}
                    placeholder="john@example.com"
                    aria-invalid={touched.email && !!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {touched.email && errors.email && (
                    <div id="email-error" className="mt-1 flex items-center text-sm text-red-600">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.email}
                    </div>
                  )}
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-800 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className={`w-full px-4 py-3 rounded-lg border bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      touched.subject && errors.subject 
                        ? 'border-red-500' 
                        : 'border-gray-300'
                    }`}
                    placeholder="How can we help you?"
                    aria-invalid={touched.subject && !!errors.subject}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                  />
                  {touched.subject && errors.subject && (
                    <div id="subject-error" className="mt-1 flex items-center text-sm text-red-600">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.subject}
                    </div>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-800 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg border bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      touched.message && errors.message 
                        ? 'border-red-500' 
                        : 'border-gray-300'
                    }`}
                    placeholder="Tell us more about how we can assist you..."
                    aria-invalid={touched.message && !!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {touched.message && errors.message && (
                    <div id="message-error" className="mt-1 flex items-center text-sm text-red-600">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.message}
                    </div>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
            
            {/* Contact Information - Right Side */}
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
                <p className="text-gray-700 mb-6">
                  Reach out to us through any of these channels. We&apos;re here to help and answer your questions.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Mail className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-700">
                      refergrow.official@gmail.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Business Hours</h3>
                    <p className="text-gray-700">
                      Monday – Saturday: 10:00 AM – 6:00 PM IST
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
