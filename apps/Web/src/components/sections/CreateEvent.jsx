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
    <div className="mb-3 sm:mb-4 md:mb-6">
      <label className="block text-sm sm:text-base md:text-lg font-semibold text-black mb-1 sm:mb-2">
        {label}
      </label>
      <div
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer p-4 sm:p-6 md:p-8 transition-colors duration-300 min-h-[120px] sm:min-h-[150px] md:min-h-[180px] ${
          dragActive ? 'border-blue-600 bg-blue-50' : 'border-blue-400 bg-white hover:border-blue-500'
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
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-blue-600 font-medium">Uploading... {Math.round(uploadProgress)}%</p>
          </div>
        ) : (
          <>
            <svg
              className="w-10 h-10 mb-2 text-blue-600 sm:w-12 sm:h-12 md:w-14 md:h-14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <p className="text-blue-600 font-medium text-xs sm:text-sm md:text-base text-center px-2">
              {multiple ? 'Drag & drop files here or click to select' : 'Drag & drop file here or click to select'}
            </p>
            <p className="text-gray-500 text-xs text-center mt-1">
              Max size: {maxSizeMB}MB
            </p>
          </>
        )}
        
        {fileNames.length > 0 && !uploading && (
          <ul className="mt-2 text-xs sm:text-sm text-blue-700 max-h-20 overflow-y-auto">
            {fileNames.map((name, idx) => (
              <li key={idx} className="truncate max-w-[200px] sm:max-w-[250px] md:max-w-[300px]">
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
      
      navigate('/organizer');
      
    } catch (err) {
      setError('Event creation failed. Please try again.');
      console.error('Event creation failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-white/95 p-2 sm:p-4 md:p-6 lg:p-8 flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-3 md:px-4 lg:px-6">
        <div className="mt-4 sm:mt-8 md:mt-12 space-y-3 sm:space-y-4 md:space-y-6 w-full">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 space-y-3 sm:space-y-4 md:space-y-6 relative">
            {/* Arrow icon in top left corner */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6">
              <button
                type="button"
                onClick={() => navigate('/organizer')}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors touch-target"
                aria-label="Back to organizer"
              >
                <svg 
                  className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-blue-600"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
          
            {/* Banner Upload */}
            <div className="mt-8">
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

            {/* Event Title */}
            <div className="space-y-2">
              <label className="block text-lg font-semibold text-black">Event Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-black text-sm sm:text-base"
                placeholder="Enter event title"
                required
              />
            </div>

            {/* Rationale */}
            <div className="space-y-2">
              <label className="block text-lg font-semibold text-black">Rationale *</label>
              <textarea
                name="rationale"
                value={formData.rationale}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-black text-sm sm:text-base"
                placeholder="Describe your event"
                required
              />
            </div>

            {/* Date and Time Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-lg font-semibold text-black">Start Date *</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-black text-sm sm:text-base"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-lg font-semibold text-black">End Date *</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-black text-sm sm:text-base"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-lg font-semibold text-black">Start Time *</label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-black text-sm sm:text-base"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-lg font-semibold text-black">End Time *</label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-black text-sm sm:text-base"
                  required
                />
              </div>
            </div>

            {/* Sponsors */}
            <div className="space-y-2">
              <label className="block text-lg font-semibold text-black">Sponsors</label>
              <input
                type="text"
                name="sponsors"
                value={formData.sponsors.join(', ')}
                onChange={(e) => handleArrayChange(e, 'sponsors')}
                placeholder="Sponsor1, Sponsor2, Sponsor3"
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-black text-sm sm:text-base"
              />
            </div>

            {/* Sponsor Images Upload */}
            <FileDropzone
              label="Sponsor Images"
              name="sponsorImages"
              multiple
              accept="image/*"
              onFileChange={handleFileChange}
              onUpload={(results) => handleFileUpload('logo', results)}
              uploadType="logo"
              maxSizeMB={2}
            />

            {/* Guest Speakers */}
            <div className="space-y-2">
              <label className="block text-lg font-semibold text-black">Guest Speakers</label>
              <input
                type="text"
                name="guestSpeakers"
                value={formData.guestSpeakers.join(', ')}
                onChange={(e) => handleArrayChange(e, 'guestSpeakers')}
                placeholder="Speaker1, Speaker2, Speaker3"
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-black text-sm sm:text-base"
              />
            </div>

            {/* Guest Speaker Images Upload */}
            <FileDropzone
              label="Guest Speaker Images"
              name="speakerImages"
              multiple
              accept="image/*"
              onFileChange={handleFileChange}
              onUpload={(results) => handleFileUpload('photo', results)}
              uploadType="photo"
              maxSizeMB={2}
            />

            {/* Event Kits Upload */}
            <FileDropzone
              label="Event Kits"
              name="eventKitsFile"
              accept="*/*"
              onFileChange={handleFileChange}
              onUpload={(results) => handleFileUpload('materials', results)}
              uploadType="materials"
              maxSizeMB={10}
            />

            {/* Event Programme Upload */}
            <FileDropzone
              label="Event Programme"
              name="eventProgrammeFile"
              accept=".pdf,.doc,.docx"
              onFileChange={handleFileChange}
              onUpload={(results) => handleFileUpload('materials', results)}
              uploadType="materials"
              maxSizeMB={10}
            />

            {/* Certificate Template Upload */}
            <FileDropzone
              label="Certificate Template"
              name="certificatesFile"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onFileChange={handleFileChange}
              onUpload={(results) => handleFileUpload('materials', results)}
              uploadType="materials"
              maxSizeMB={5}
            />

            {error && <div className="text-red-500 mt-4">{error}</div>}
            
            <div className="flex justify-end mt-8">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white py-2 px-4 sm:py-3 sm:px-6 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50 font-semibold text-sm sm:text-base"
              >
                {loading ? 'Creating Event...' : 'Create Event'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
