import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function MentorshipForm() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    whatsapp: "",
    city: "",
    
    // Application Details
    applicationType: "",
    professionalStatus: "",
    institution: "",
    
    // Background
    backgroundInfo: [] as string[],
    
    // Accessibility
    hasAccessibilityNeeds: false,
    communicationPreference: "",
    sessionTiming: "",
    accessibilityRequirements: "",
    
    // Agreement
    agreeToTerms: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBackgroundChange = (value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      backgroundInfo: checked 
        ? [...prev.backgroundInfo, value]
        : prev.backgroundInfo.filter(item => item !== value)
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles: File[] = [];
    
    files.forEach(file => {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload only PDF, DOC, or DOCX files.",
          variant: "destructive",
        });
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
          description: "File size must be less than 10MB.",
        variant: "destructive",
      });
      return;
    }
      
      validFiles.push(file);
    });
    
    setSelectedFiles(validFiles);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.applicationType || !formData.professionalStatus) {
        toast({
          title: "Missing Required Fields",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }

      if (!formData.agreeToTerms) {
        toast({
          title: "Agreement Required",
          description: "Please agree to participate actively in the mentorship program.",
          variant: "destructive",
        });
        return;
      }

      // Save to database
      const { error } = await supabase
        .from('mentorship_submissions')
        .insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone || null,
          whatsapp: formData.whatsapp || null,
          city: formData.city || null,
          application_type: formData.applicationType,
          professional_status: formData.professionalStatus,
          institution: formData.institution || null,
          background_info: formData.backgroundInfo.length > 0 ? formData.backgroundInfo : null,
          has_accessibility_needs: formData.hasAccessibilityNeeds,
          communication_preference: formData.communicationPreference || null,
          session_timing: formData.sessionTiming || null,
          accessibility_requirements: formData.accessibilityRequirements || null,
          agree_to_terms: formData.agreeToTerms,
          files_uploaded: selectedFiles.length > 0 ? selectedFiles.map(f => f.name) : null,
        });

      if (error) {
        console.error('Error submitting form:', error);
        throw error;
      }
      
      toast({
        title: "Application Submitted!",
        description: "Thank you! I'll get back to you within 48 hours.",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        city: "",
        applicationType: "",
        professionalStatus: "",
        institution: "",
        backgroundInfo: [],
        hasAccessibilityNeeds: false,
        communicationPreference: "",
        sessionTiming: "",
        accessibilityRequirements: "",
        agreeToTerms: false,
      });
      setSelectedFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white border border-gray-200 shadow-sm rounded-lg">
        <div style={{ padding: '24px' }}>
          <form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Personal Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-gray-600 transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-gray-600 transition-colors"
                      />
                    </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-gray-600 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-gray-600 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                    placeholder="Include country code"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-gray-600 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Current City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-gray-600 transition-colors"
                  />
                </div>
              </div>
                  </div>

            {/* Application Details */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Application Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    What are you applying for? <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.applicationType}
                    onChange={(e) => handleInputChange('applicationType', e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-gray-600 transition-colors"
                  >
                    <option value="">Select application type</option>
                    <optgroup label="Degree Programs">
                      <option value="mba">MBA</option>
                      <option value="masters">Master's Program</option>
                      <option value="phd">PhD</option>
                    </optgroup>
                    <optgroup label="Prestigious Scholarships">
                      <option value="rhodes-scholarship">Rhodes Scholarship</option>
                      <option value="fulbright-scholarship">Fulbright Scholarship</option>
                      <option value="chevening-scholarship">Chevening Scholarship</option>
                      <option value="gates-cambridge">Gates Cambridge Scholarship</option>
                      <option value="marshall-scholarship">Marshall Scholarship</option>
                      <option value="commonwealth-scholarship">Commonwealth Scholarship</option>
                      <option value="erasmus-mundus">Erasmus Mundus</option>
                      <option value="daad-scholarship">DAAD Scholarship</option>
                    </optgroup>
                    <optgroup label="Fellowships & Awards">
                      <option value="fellowship">Fellowship</option>
                      <option value="research-award">Research Award</option>
                      <option value="government-scholarship">Government Scholarship</option>
                      <option value="university-scholarship">University Scholarship</option>
                    </optgroup>
                    <optgroup label="Other">
                      <option value="other-scholarship">Other Scholarship</option>
                      <option value="other">Other</option>
                    </optgroup>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Current Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.professionalStatus}
                    onChange={(e) => handleInputChange('professionalStatus', e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-gray-600 transition-colors"
                  >
                    <option value="">Select current status</option>
                    <option value="undergraduate">Undergraduate Student</option>
                    <option value="graduate">Graduate Student</option>
                    <option value="working-professional">Working Professional</option>
                    <option value="recent-graduate">Recent Graduate</option>
                    <option value="career-transition">Career Change</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Current/Recent Institution
                  </label>
                  <input
                    type="text"
                    value={formData.institution}
                    onChange={(e) => handleInputChange('institution', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-gray-600 transition-colors"
                    placeholder="University or Company"
                  />
                </div>
              </div>
                </div>

            {/* Professional Documents */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Professional Documents
              </h2>
              
                    <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Resume/CV Upload
                </label>
                <div className="mt-2">
                  <label className="inline-block px-4 py-2 bg-gray-100 border border-gray-300 text-gray-700 text-sm cursor-pointer hover:bg-gray-200 transition-colors rounded-md relative">
                    Choose File
                        <input
                      ref={fileInputRef}
                          type="file"
                      multiple
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                        </label>
                  <div className="text-xs text-gray-500 mt-2">
                    PDF, DOC, DOCX files up to 10MB each
                      </div>
                  {selectedFiles.length > 0 && (
                    <div className="mt-2 text-sm text-gray-600">
                      {selectedFiles.map(file => `${file.name} (${formatFileSize(file.size)})`).join(', ')}
                    </div>
                  )}
                    </div>
                  </div>
                </div>

            {/* Background and Identity */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Background and Identity
              </h2>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Background Information (Optional)
                </label>
                <div className="text-xs text-gray-500 mb-3">
                  This information helps create inclusive mentorship matches. All responses are confidential.
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { value: "first-generation", label: "First-generation college student/professional" },
                    { value: "underrepresented", label: "Underrepresented minority in field" },
                    { value: "rural", label: "Rural or small-town background" },
                    { value: "refugee", label: "Refugee or immigrant background" },
                    { value: "military", label: "Military veteran or service member" },
                    { value: "low-income", label: "Low-income or economically disadvantaged" },
                    { value: "none", label: "Prefer not to specify" }
                  ].map((option) => (
                    <div
                      key={option.value}
                      className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors ${
                        formData.backgroundInfo.includes(option.value) 
                          ? 'bg-gray-50 border-gray-300' 
                          : 'bg-white border-gray-200 hover:bg-gray-50'
                      }`}
                      onClick={() => handleBackgroundChange(option.value, !formData.backgroundInfo.includes(option.value))}
                    >
                      <input
                        type="checkbox"
                        checked={formData.backgroundInfo.includes(option.value)}
                        onChange={(e) => handleBackgroundChange(option.value, e.target.checked)}
                        className="mr-3 w-4 h-4"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <label className="text-sm text-gray-700 cursor-pointer">
                        {option.label}
                      </label>
                    </div>
                  ))}
                      </div>
                    </div>

              {/* Accessibility Section */}
              <div className="bg-gray-50 border border-gray-200 p-4 mt-4 rounded-md">
                <div className="text-sm font-medium text-gray-700 mb-3">
                  Accessibility and Support Needs
                </div>
                
                <div className="mb-3">
                  <div className="flex items-center p-3 border border-gray-200 bg-white rounded-md">
                    <input
                      type="checkbox"
                      checked={formData.hasAccessibilityNeeds}
                      onChange={(e) => handleInputChange('hasAccessibilityNeeds', e.target.checked)}
                      className="mr-3 w-4 h-4"
                    />
                    <label className="text-sm text-gray-700 cursor-pointer">
                      I have accessibility needs or require accommodations
                    </label>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">
                      Communication Format Preference
                    </label>
                    <select
                      value={formData.communicationPreference}
                      onChange={(e) => handleInputChange('communicationPreference', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-gray-600 transition-colors bg-white"
                    >
                      <option value="">Standard video/voice calls</option>
                      <option value="text-based">Text-based communication preferred</option>
                      <option value="audio-only">Audio-only sessions</option>
                      <option value="in-person">In-person with accessibility features</option>
                      <option value="sign-language">Sign language interpretation needed</option>
                      <option value="other">Other accommodation needed</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">
                      Session Timing Preferences
                    </label>
                    <select
                      value={formData.sessionTiming}
                      onChange={(e) => handleInputChange('sessionTiming', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-gray-600 transition-colors bg-white"
                    >
                      <option value="">Standard business hours</option>
                      <option value="flexible">Flexible scheduling needed</option>
                      <option value="shorter">Shorter, more frequent sessions</option>
                      <option value="extended">Extended time for sessions</option>
                      <option value="weekend">Weekend availability preferred</option>
                    </select>
                        </div>
                      </div>

                <div className="space-y-1 col-span-full">
                  <label className="text-sm font-medium text-gray-700">
                    Additional Accessibility Requirements
                  </label>
                  <textarea
                    value={formData.accessibilityRequirements}
                    onChange={(e) => handleInputChange('accessibilityRequirements', e.target.value)}
                    placeholder="Please describe any specific accommodations or support requirements"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-gray-600 transition-colors resize-vertical"
                    rows={3}
                  />
                </div>
                      </div>
                    </div>

            {/* Agreement and Submission */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-start space-x-3 p-4 bg-gray-50 border border-gray-200 rounded-md mb-6">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                  required
                  className="mt-1 w-4 h-4"
                />
                <div className="text-sm text-gray-700">
                  <strong>I agree to participate actively in the mentorship program</strong> and understand this represents a mutual commitment requiring regular engagement and professional conduct.
                </div>
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gray-800 text-white text-base font-medium rounded-md hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </div>
              </form>
        </div>
      </div>
    </div>
  );
}