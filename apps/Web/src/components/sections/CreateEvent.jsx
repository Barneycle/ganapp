import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const FileDropzone = ({ label, name, multiple = false, accept, onFileChange, onUpload, uploadType, maxSizeMB = 5 }) => {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileNames, setFileNames] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFiles = async (files) => {
    const fileArray = Array.from(files);
    setFileNames(fileArray.map(f => f.name));
    
    if (onUpload && uploadType) {
      setUploading(true);
      setUploadProgress(0);
      
      try {
        // Mock file validation
        for (const file of fileArray) {
          if (file.size > maxSizeMB * 1024 * 1024) {
            alert(`File ${file.name} is too large. Max size: ${maxSizeMB}MB`);
            setUploading(false);
            return;
          }
        }

        // Mock file upload
        const uploadPromises = fileArray.map(async (file, index) => {
          // Simulate upload delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          const mockResult = {
            success: true,
            url: URL.createObjectURL(file),
            filename: file.name
          };
          
          setUploadProgress(((index + 1) / fileArray.length) * 100);
          return mockResult;
        });

        const results = await Promise.all(uploadPromises);
        onUpload(results);
      } catch (error) {
        console.error('Upload failed:', error);
        alert(`Upload failed: ${error.message}`);
      } finally {
        setUploading(false);
        setUploadProgress(0);
      }
    } else {
      onFileChange({ target: { name, files } });
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  return (
    <div className="mb-6 sm:mb-8">
      <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">
        {label}
      </label>
      <div
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl cursor-pointer p-6 sm:p-8 transition-all duration-300 min-h-[160px] sm:min-h-[180px] md:min-h-[200px] ${
          dragActive 
            ? 'border-blue-500 bg-blue-50 shadow-lg' 
            : 'border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50 hover:shadow-md'
        }`}
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          name={name}
          multiple={multiple}
          accept={accept}
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
        
        {uploading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-3"></div>
            <p className="text-blue-600 font-medium text-base sm:text-lg">Uploading... {Math.round(uploadProgress)}%</p>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4 text-blue-500">
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
            </div>
            <p className="text-blue-600 font-medium text-sm sm:text-base text-center px-4 mb-2">
              {multiple ? 'Drag & drop files here or click to select' : 'Drag & drop file here or click to select'}
            </p>
            <p className="text-slate-500 text-xs sm:text-sm text-center">
              Max size: {maxSizeMB}MB
            </p>
          </>
        )}
        
        {fileNames.length > 0 && !uploading && (
          <ul className="mt-4 text-xs sm:text-sm text-blue-700 max-h-20 overflow-y-auto w-full space-y-1">
            {fileNames.map((name, idx) => (
              <li key={idx} className="truncate max-w-[200px] sm:max-w-[250px] md:max-w-[300px] mx-auto bg-blue-50 px-3 py-1 rounded-lg">
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export const CreateEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bannerFile: null,
    title: '',
    rationale: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    sponsors: [],
    guestSpeakers: [],
    eventKitsFile: null,
    eventProgrammeFile: null,
    sponsorImages: [],
    speakerImages: [],
    certificatesFile: null
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    banner: null,
    materials: null,
    sponsorLogos: [],
    speakerPhotos: []
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      if (name === 'sponsorImages' || name === 'speakerImages') {
        setFormData(prev => ({
          ...prev,
          [name]: Array.from(files)
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: files[0]
        }));
      }
    }
  };

  const handleArrayChange = (e, arrayName) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      [arrayName]: value.split(',').map(item => item.trim()).filter(item => item)
    }));
  };

  const handleFileUpload = (uploadType, results) => {
    if (uploadType === 'banner') {
      setUploadedFiles(prev => ({ ...prev, banner: results[0] }));
    } else if (uploadType === 'materials') {
      setUploadedFiles(prev => ({ ...prev, materials: results[0] }));
    } else if (uploadType === 'logo') {
      setUploadedFiles(prev => ({ ...prev, sponsorLogos: results }));
    } else if (uploadType === 'photo') {
      setUploadedFiles(prev => ({ ...prev, speakerPhotos: results }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Mock event creation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Event created successfully (mock)');
      console.log('Event data:', {
        title: formData.title,
        rationale: formData.rationale,
        startDate: formData.startDate,
        endDate: formData.endDate,
        startTime: formData.startTime,
        endTime: formData.endTime,
        sponsors: formData.sponsors,
        guestSpeakers: formData.guestSpeakers,
        uploadedFiles
      });
      
      navigate('/create-survey');
      
    } catch (err) {
      setError('Event creation failed. Please try again.');
      console.error('Event creation failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-4">
            <button
              onClick={() => navigate('/organizer')}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 mr-4 group"
              aria-label="Back to organizer"
            >
              <svg 
                className="w-6 h-6 text-slate-600 group-hover:text-blue-600 transition-colors" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
              Create Event
            </h1>
          </div>
          <p className="text-slate-600 text-lg sm:text-xl max-w-2xl mx-auto">
            Set up your event details and upload necessary materials to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          {/* Banner Upload Section */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-slate-50 px-6 py-4 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Event Banner</h3>
                  <p className="text-sm text-slate-600">Upload a banner image for your event</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <FileDropzone
                label="Event Banner"
                name="bannerFile"
                accept="image/*"
                onFileChange={handleFileChange}
                onUpload={(results) => handleFileUpload('banner', results)}
                uploadType="banner"
                maxSizeMB={5}
              />
            </div>
          </div>

          {/* Basic Information Section */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-slate-50 px-6 py-4 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Basic Information</h3>
                  <p className="text-sm text-slate-600">Essential details about your event</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Event Title */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  Event Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 text-base transition-all duration-200 placeholder-slate-400"
                  placeholder="Enter your event title"
                />
              </div>

              {/* Rationale */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  Event Description
                </label>
                <textarea
                  name="rationale"
                  value={formData.rationale}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 text-base transition-all duration-200 placeholder-slate-400"
                  placeholder="Describe your event and its purpose"
                />
              </div>
            </div>
          </div>

          {/* Event Schedule Section */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-slate-50 px-6 py-4 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Event Schedule</h3>
                  <p className="text-sm text-slate-600">Set the date and time for your event</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Date inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 text-base transition-all duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 text-base transition-all duration-200"
                  />
                </div>
              </div>
              
              {/* Time inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">
                    Start Time
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 text-base transition-all duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">
                    End Time
                  </label>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 text-base transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sponsors Section */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-slate-50 px-6 py-4 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Sponsors & Partners</h3>
                  <p className="text-sm text-slate-600">Add sponsor information and logos</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  Sponsor Names
                </label>
                <input
                  type="text"
                  name="sponsors"
                  value={formData.sponsors.join(', ')}
                  onChange={(e) => handleArrayChange(e, 'sponsors')}
                  placeholder="Sponsor1, Sponsor2, Sponsor3"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 text-base transition-all duration-200 placeholder-slate-400"
                />
              </div>

              <FileDropzone
                label="Sponsor Logos"
                name="sponsorImages"
                multiple
                accept="image/*"
                onFileChange={handleFileChange}
                onUpload={(results) => handleFileUpload('logo', results)}
                uploadType="logo"
                maxSizeMB={2}
              />
            </div>
          </div>

          {/* Guest Speakers Section */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-slate-50 px-6 py-4 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Guest Speakers</h3>
                  <p className="text-sm text-slate-600">Add speaker information and photos</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  Speaker Names
                </label>
                <input
                  type="text"
                  name="guestSpeakers"
                  value={formData.guestSpeakers.join(', ')}
                  onChange={(e) => handleArrayChange(e, 'guestSpeakers')}
                  placeholder="Speaker1, Speaker2, Speaker3"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 text-base transition-all duration-200 placeholder-slate-400"
                />
              </div>

              <FileDropzone
                label="Speaker Photos"
                name="speakerImages"
                multiple
                accept="image/*"
                onFileChange={handleFileChange}
                onUpload={(results) => handleFileUpload('photo', results)}
                uploadType="photo"
                maxSizeMB={2}
              />
            </div>
          </div>

          {/* Event Materials Section */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-slate-50 px-6 py-4 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Event Materials</h3>
                  <p className="text-sm text-slate-600">Upload event kits, programmes, and certificates</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <FileDropzone
                label="Event Kits"
                name="eventKitsFile"
                accept="*/*"
                onFileChange={handleFileChange}
                onUpload={(results) => handleFileUpload('materials', results)}
                uploadType="materials"
                maxSizeMB={10}
              />

              <FileDropzone
                label="Event Programme"
                name="eventProgrammeFile"
                accept=".pdf,.doc,.docx"
                onFileChange={handleFileChange}
                onUpload={(results) => handleFileUpload('materials', results)}
                uploadType="materials"
                maxSizeMB={10}
              />

              <FileDropzone
                label="Certificate Template"
                name="certificatesFile"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onFileChange={handleFileChange}
                onUpload={(results) => handleFileUpload('materials', results)}
                uploadType="materials"
                maxSizeMB={5}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-red-700 text-sm sm:text-base">{error}</span>
              </div>
            </div>
          )}
          
          {/* Action Button */}
          <div className="flex justify-center pt-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 px-12 rounded-xl hover:from-blue-700 hover:to-blue-900 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span className="flex items-center justify-center space-x-2">
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Creating Event...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span>Next</span>
                  </>
                )}
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
