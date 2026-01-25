"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { User, Camera, Save, Upload, Building, Phone, Mail, Globe, MapPin, CreditCard, FileText, Settings, ShoppingBag, Cog } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { apiFetch, apiUrl } from "@/lib/apiClient";
import { showToast } from "@/lib/toast";
import { useFileValidation, useFormValidation, commonValidationRules } from "@/lib/hooks";

interface UserProfile {
  id: string;
  mobile: string;
  countryCode: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
  isBlocked: boolean;
  referralCode: string;
  
  // Business Settings
  businessName?: string;
  companyPhone?: string;
  companyEmail?: string;
  website?: string;
  billingAddress?: string;
  state?: string;
  pincode?: string;
  city?: string;
  language?: string;
  businessType?: string;
  industryType?: string;
  businessDescription?: string;
  gstin?: string;
  panNumber?: string;
  isGSTRegistered?: boolean;
  enableEInvoicing?: boolean;
  enableTDS?: boolean;
  enableTCS?: boolean;
  businessLogo?: string;
  signature?: string;
  currencyCode?: string;
  currencySymbol?: string;
  
  createdAt?: string;
  updatedAt?: string;
}

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState("basic");
  const [successMessage, setSuccessMessage] = useState("");
  const [imagePreview, setImagePreview] = useState<string>("");

  // File validation for profile image
  const {
    file: profileImage,
    error: imageError,
    isValid: isImageValid,
    setFile: setProfileImage,
    setError: setImageError,
    reset: resetImageValidation
  } = useFileValidation({
    maxSize: 2 * 1024 * 1024, // 2MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    validateOnChange: true
  });

  // Form states for different sections
  const [basicInfo, setBasicInfo] = useState({
    name: "",
    email: "",
  });

  const [companyInfo, setCompanyInfo] = useState({
    businessName: "",
    companyPhone: "",
    companyEmail: "",
    website: "",
    businessDescription: "",
  });

  const [addressInfo, setAddressInfo] = useState({
    billingAddress: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [businessSettings, setBusinessSettings] = useState({
    businessType: "",
    industryType: "",
    language: "",
    currencyCode: "INR",
    currencySymbol: "₹",
  });

  const [taxSettings, setTaxSettings] = useState({
    gstin: "",
    panNumber: "",
    isGSTRegistered: false,
    enableEInvoicing: false,
    enableTDS: false,
    enableTCS: false,
  });

  // Form validation for company info
  const companyValidationRules = {
    businessName: commonValidationRules.businessName,
    companyEmail: commonValidationRules.email,
    website: commonValidationRules.website,
  };

  const {
    data: companyFormData,
    errors: companyErrors,
    touched: companyTouched,
    isValid: isCompanyValid,
    handleChange: handleCompanyChange,
    handleBlur: handleCompanyBlur,
    validateForm: validateCompanyForm,
    setError: setCompanyError
  } = useFormValidation(companyValidationRules, {
    validateOnChange: true,
    validateOnBlur: true,
    initialData: companyInfo
  });

  // Update companyInfo when form data changes
  useEffect(() => {
    setCompanyInfo(companyFormData as any);
  }, [companyFormData]);

  useEffect(() => {
    loadProfile();
  }, []);

  const handleAuthError = (error: unknown, defaultMessage: string) => {
    const errorMessage = error instanceof Error ? error.message : defaultMessage;
    
    // Show specific error for authentication issues
    if (errorMessage.includes('signature') || errorMessage.includes('token')) {
      showToast.error("Authentication failed. Please log in again.");
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
      return;
    }
    
    showToast.error(errorMessage);
  };

  const loadProfile = async () => {
    try {
      const res = await apiFetch("/api/profile");
      const data = await res.json();
      
      // Check if user data exists in response
      const userData = data.user || data;
      
      if (!userData) {
        console.error("No user data found in response:", data);
        return;
      }
      
      setProfile(userData);
      
      // Initialize form states
      setBasicInfo({
        name: userData.name || "",
        email: userData.email || "",
      });
      
      setCompanyInfo({
        businessName: userData.businessName || "",
        companyPhone: userData.companyPhone || "",
        companyEmail: userData.companyEmail || "",
        website: userData.website || "",
        businessDescription: userData.businessDescription || "",
      });
      
      setAddressInfo({
        billingAddress: userData.billingAddress || "",
        city: userData.city || "",
        state: userData.state || "",
        pincode: userData.pincode || "",
      });
      
      setBusinessSettings({
        businessType: userData.businessType || "",
        industryType: userData.industryType || "",
        language: userData.language || "",
        currencyCode: userData.currencyCode || "INR",
        currencySymbol: userData.currencySymbol || "₹",
      });
      
      setTaxSettings({
        gstin: userData.gstin || "",
        panNumber: userData.panNumber || "",
        isGSTRegistered: userData.isGSTRegistered || false,
        enableEInvoicing: userData.enableEInvoicing || false,
        enableTDS: userData.enableTDS || false,
        enableTCS: userData.enableTCS || false,
      });
      
      if (userData.profileImage) {
        setImagePreview(userData.profileImage);
      }
    } catch (error) {
      console.error("Failed to load profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadProfileImage = async () => {
    if (!profileImage) {
      showToast.warning('Please select an image first');
      return;
    }

    if (!isImageValid) {
      showToast.error(imageError || 'Invalid image file');
      return;
    }
    
    const formData = new FormData();
    formData.append("image", profileImage);
    
    try {
      console.log('Uploading image:', profileImage.name, 'Size:', profileImage.size);
      
      // Use fetch directly for FormData uploads (apiFetch may interfere with multipart/form-data)
      const res = await fetch("/api/upload/profile-image", {
        method: "POST",
        body: formData,
        credentials: "include",
        headers: {
          "accept": "application/json"
        }
        // Don't set Content-Type - let the browser set it with boundary for multipart/form-data
      });
      
      const body = await res.json();
      console.log('Upload response:', body, 'Status:', res.status);
      
      if (!res.ok) {
        throw new Error(body.error || "Upload failed");
      }
      
      setSuccessMessage("Profile image uploaded successfully!");
      resetImageValidation();
      setImagePreview("");
      setTimeout(() => setSuccessMessage(""), 3000);
      
      showToast.success("Profile image uploaded successfully!");
      // Reload profile to get updated image
      await loadProfile();
      
      // Trigger profile update event to refresh navbar
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('profileUpdated'));
      }
    } catch (error) {
      console.error("Failed to upload image:", error);
      showToast.error(`Failed to upload profile image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const saveBasicInfo = async () => {
    setSaving(true);
    try {
      const res = await apiFetch("/api/profile/basic", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(basicInfo),
      });
      const data = await res.json();
      
      if (res.ok) {
        setSuccessMessage(data.message);
        showToast.success("Basic information updated successfully!");
        await loadProfile();
        
        // Trigger profile update event to refresh navbar
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('profileUpdated'));
        }
      } else {
        // Handle specific authentication errors
        if (res.status === 401 || data.error?.includes('signature') || data.error?.includes('token')) {
          showToast.error("Session expired. Please log in again.");
          // Redirect to login after a short delay
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000);
          return;
        }
        
        throw new Error(data.error || "Update failed");
      }
    } catch (error) {
      console.error("Failed to update basic info:", error);
      handleAuthError(error, "Failed to update basic information");
    } finally {
      setSaving(false);
    }
  };

  const saveCompanyInfo = async () => {
    // Validate form before saving
    const validationResult = validateCompanyForm();
    if (!validationResult.isValid) {
      showToast.error("Please fix the errors in the form");
      return;
    }

    setSaving(true);
    try {
      const res = await apiFetch("/api/profile/business", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(companyInfo),
      });
      const data = await res.json();
      
      if (res.ok) {
        setSuccessMessage(data.message);
        await loadProfile();
      } else {
        throw new Error(data.error || "Update failed");
      }
    } catch (error) {
      console.error("Failed to update company info:", error);
      showToast.error("Failed to update company information");
    } finally {
      setSaving(false);
    }
  };

  const saveAddressInfo = async () => {
    setSaving(true);
    try {
      const res = await apiFetch("/api/profile/business", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addressInfo),
      });
      const data = await res.json();
      
      if (res.ok) {
        setSuccessMessage(data.message);
        await loadProfile();
      } else {
        throw new Error(data.error || "Update failed");
      }
    } catch (error) {
      console.error("Failed to update address info:", error);
      showToast.error("Failed to update address information");
    } finally {
      setSaving(false);
    }
  };

  const saveBusinessSettings = async () => {
    setSaving(true);
    try {
      const res = await apiFetch("/api/profile/business", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(businessSettings),
      });
      const data = await res.json();
      
      if (res.ok) {
        setSuccessMessage(data.message);
        showToast.success("Business settings updated successfully!");
        await loadProfile();
      } else {
        throw new Error(data.error || "Update failed");
      }
    } catch (error) {
      console.error("Failed to update business settings:", error);
      showToast.error("Failed to update business settings");
    } finally {
      setSaving(false);
    }
  };

  const saveTaxSettings = async () => {
    setSaving(true);
    try {
      const res = await apiFetch("/api/profile/business", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taxSettings),
      });
      const data = await res.json();
      
      if (res.ok) {
        setSuccessMessage(data.message);
        await loadProfile();
      } else {
        throw new Error(data.error || "Update failed");
      }
    } catch (error) {
      console.error("Failed to update tax settings:", error);
      showToast.error("Failed to update tax settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                  {imagePreview ? (
                    <img 
                      src={
                        imagePreview.startsWith('http') 
                          ? imagePreview 
                          : imagePreview.startsWith('/uploads')
                          ? apiUrl(imagePreview)
                          : imagePreview // base64 data URL
                      }
                      alt="Profile" 
                      className="w-20 h-20 rounded-full object-cover"
                      onError={(e) => {
                        console.error('Failed to load image:', imagePreview);
                        // Hide the broken image and show fallback
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.innerHTML = '<div class="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center"><svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div>';
                        }
                      }}
                    />
                  ) : (
                    <User className="w-10 h-10 text-blue-600" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-1 cursor-pointer hover:bg-blue-700">
                  <Camera className="w-4 h-4 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{profile?.name}</h1>
                <p className="text-gray-600">{profile?.email}</p>
                <p className="text-sm text-gray-500">{profile?.mobile}</p>
              </div>
            </div>
            {profileImage && (
              <div className="flex flex-col gap-2">
                {imageError && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
                    {imageError}
                  </div>
                )}
                <button
                  onClick={uploadProfileImage}
                  disabled={!isImageValid}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                    isImageValid 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  Upload Image
                </button>
              </div>
            )}
            <div className="flex gap-3">
              <Link
                href="/orders"
                className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center gap-2 font-medium"
              >
                <ShoppingBag className="w-4 h-4" />
                Orders
              </Link>
              <Link
                href="/settings"
                className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center gap-2 font-medium"
              >
                <Cog className="w-4 h-4" />
                Settings
              </Link>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {successMessage}
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "basic", label: "Basic Info", icon: User },
                { id: "company", label: "Company Info", icon: Building },
                { id: "address", label: "Address", icon: MapPin },
                { id: "business", label: "Business Settings", icon: Settings },
                { id: "tax", label: "Tax & Compliance", icon: CreditCard },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeSection === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <tab.icon className="w-4 h-4 inline mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Sections */}
        <div className="bg-white shadow rounded-lg p-6">
          {/* Basic Info Section */}
          {activeSection === "basic" && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={basicInfo.name}
                    onChange={(e) => setBasicInfo({ ...basicInfo, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={basicInfo.email}
                    onChange={(e) => setBasicInfo({ ...basicInfo, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={saveBasicInfo}
                  disabled={saving}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          )}

          {/* Company Info Section */}
          {activeSection === "company" && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Company Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                  <input
                    type="text"
                    value={companyInfo.businessName}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, businessName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Phone</label>
                  <input
                    type="tel"
                    value={companyInfo.companyPhone}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, companyPhone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Email</label>
                  <input
                    type="email"
                    value={companyInfo.companyEmail}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, companyEmail: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                  <input
                    type="text"
                    value={companyInfo.website}
                    onChange={(e) => handleCompanyChange('website', e.target.value)}
                    onBlur={() => handleCompanyBlur('website')}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      companyTouched.website && companyErrors.website 
                        ? 'border-red-500' 
                        : 'border-gray-300'
                    }`}
                    placeholder="www.example.com"
                  />
                  {companyTouched.website && companyErrors.website && (
                    <div className="mt-1 text-sm text-red-600">
                      {companyErrors.website}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Description</label>
                <textarea
                  value={companyInfo.businessDescription}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, businessDescription: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="mt-6">
                <button
                  onClick={saveCompanyInfo}
                  disabled={saving}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          )}

          {/* Address Section */}
          {activeSection === "address" && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Address Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Billing Address</label>
                  <textarea
                    value={addressInfo.billingAddress}
                    onChange={(e) => setAddressInfo({ ...addressInfo, billingAddress: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    value={addressInfo.city}
                    onChange={(e) => setAddressInfo({ ...addressInfo, city: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <input
                    type="text"
                    value={addressInfo.state}
                    onChange={(e) => setAddressInfo({ ...addressInfo, state: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                  <input
                    type="text"
                    value={addressInfo.pincode}
                    onChange={(e) => setAddressInfo({ ...addressInfo, pincode: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={saveAddressInfo}
                  disabled={saving}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          )}

          {/* Business Settings Section */}
          {activeSection === "business" && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Business Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
                  <input
                    type="text"
                    value={businessSettings.businessType}
                    onChange={(e) => setBusinessSettings({ ...businessSettings, businessType: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry Type</label>
                  <input
                    type="text"
                    value={businessSettings.industryType}
                    onChange={(e) => setBusinessSettings({ ...businessSettings, industryType: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <input
                    type="text"
                    value={businessSettings.language}
                    onChange={(e) => setBusinessSettings({ ...businessSettings, language: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currency Code</label>
                  <select
                    value={businessSettings.currencyCode}
                    onChange={(e) => setBusinessSettings({ ...businessSettings, currencyCode: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={saveBusinessSettings}
                  disabled={saving}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          )}

          {/* Tax Settings Section */}
          {activeSection === "tax" && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Tax & Compliance</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GSTIN</label>
                  <input
                    type="text"
                    value={taxSettings.gstin}
                    onChange={(e) => setTaxSettings({ ...taxSettings, gstin: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">PAN Number</label>
                  <input
                    type="text"
                    value={taxSettings.panNumber}
                    onChange={(e) => setTaxSettings({ ...taxSettings, panNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={taxSettings.isGSTRegistered}
                    onChange={(e) => setTaxSettings({ ...taxSettings, isGSTRegistered: e.target.checked })}
                    className="mr-2"
                  />
                  GST Registered
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={taxSettings.enableEInvoicing}
                    onChange={(e) => setTaxSettings({ ...taxSettings, enableEInvoicing: e.target.checked })}
                    className="mr-2"
                  />
                  Enable E-Invoicing
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={taxSettings.enableTDS}
                    onChange={(e) => setTaxSettings({ ...taxSettings, enableTDS: e.target.checked })}
                    className="mr-2"
                  />
                  Enable TDS
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={taxSettings.enableTCS}
                    onChange={(e) => setTaxSettings({ ...taxSettings, enableTCS: e.target.checked })}
                    className="mr-2"
                  />
                  Enable TCS
                </label>
              </div>
              <div className="mt-6">
                <button
                  onClick={saveTaxSettings}
                  disabled={saving}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
