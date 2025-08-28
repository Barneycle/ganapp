import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { EventService, SurveyService } from '@ganapp/shared';
import { useAuth } from '../../contexts/AuthContext';

// Zod validation schema for survey questions
const questionSchema = z.object({
  questionText: z.string().min(1, 'Question text is required'),
  questionType: z.enum([
    'short-answer', 'paragraph', 'multiple-choice', 'checkbox', 
    'dropdown', 'linear-scale', 'star-rating', 'multiple-choice-grid', 
    'checkbox-grid', 'date', 'time'
  ]),
  options: z.array(z.string()).optional(),
  required: z.boolean().default(false),
  scaleMin: z.number().min(1).max(10).optional(),
  scaleMax: z.number().min(1).max(10).optional(),
  lowestLabel: z.string().optional(),
  highestLabel: z.string().optional(),
  rows: z.array(z.string()).optional(),
  columns: z.array(z.string()).optional(),
});

const createSurveySchema = z.object({
  questions: z.array(questionSchema).min(1, 'At least one question is required'),
});

export const CreateSurvey = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [pendingEventData, setPendingEventData] = useState(null);
  const [pendingEventFiles, setPendingEventFiles] = useState(null);

  // Get saved form data from session storage
  const getSavedFormData = () => {
    try {
      const saved = sessionStorage.getItem('create-survey-draft');
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Error parsing saved form data:', error);
      return null;
    }
  };

  // Save form data to session storage
  const saveFormData = (data) => {
    if (!autoSaveEnabled) return; // Don't save if auto-save is disabled
    
    try {
      // Only save non-file fields to session storage
      const dataToSave = {
        questions: data.questions || []
      };
      sessionStorage.setItem('create-survey-draft', JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  };

  // Clear saved form data
  const clearSavedFormData = () => {
    try {
      sessionStorage.removeItem('create-survey-draft');
    } catch (error) {
      console.error('Error clearing saved form data:', error);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue
  } = useForm({
    resolver: zodResolver(createSurveySchema),
    mode: 'onChange',
    defaultValues: {
      questions: [
        {
          questionText: '',
          questionType: 'short-answer',
          options: [''],
          required: false,
          scaleMin: 1,
          scaleMax: 5,
          lowestLabel: '',
          highestLabel: '',
          rows: [''],
          columns: [''],
        },
      ],
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions"
  });

  const watchedQuestions = watch("questions");

  // Check for pending event data on component mount
  useEffect(() => {
    const eventData = sessionStorage.getItem('pending-event-data');
    const eventFiles = sessionStorage.getItem('pending-event-files');
    
    if (!eventData) {
      // No pending event data, redirect back to event creation
      alert('Please create an event first before creating a survey.');
      navigate('/create-event');
      return;
    }

    try {
      setPendingEventData(JSON.parse(eventData));
      if (eventFiles) {
        setPendingEventFiles(JSON.parse(eventFiles));
      }
      console.log('✅ Pending event data loaded for survey creation');
    } catch (error) {
      console.error('Error parsing pending event data:', error);
      alert('Error loading event data. Please try again.');
      navigate('/create-event');
    }
  }, [navigate]);

  // Restore saved form data on component mount
  useEffect(() => {
    const savedData = getSavedFormData();
    if (savedData && savedData.questions && savedData.questions.length > 0) {
      // Set the saved questions directly using setValue
      setValue('questions', savedData.questions);
      console.log('✅ Survey form data restored from session storage');
    }
  }, [setValue]); // Only depend on setValue

  // Watch form changes and save to session storage
  useEffect(() => {
    const subscription = watch((data) => {
      saveFormData(data);
    });
    
    return () => subscription.unsubscribe();
  }, [watch, autoSaveEnabled]);

  // Toggle auto-save functionality
  const toggleAutoSave = () => {
    setAutoSaveEnabled(!autoSaveEnabled);
    if (!autoSaveEnabled) {
      // If enabling auto-save, save current form data
      const currentData = watch();
      saveFormData(currentData);
    }
  };

  // Add a function to manually clear saved data (useful for testing)
  const handleClearDraft = () => {
    clearSavedFormData();
    // Reset form to default values using setValue
    setValue('questions', [{
      questionText: '',
      questionType: 'short-answer',
      options: [''],
      required: false,
      scaleMin: 1,
      scaleMax: 5,
      lowestLabel: '',
      highestLabel: '',
      rows: [''],
      columns: [''],
    }]);
    console.log('✅ Survey draft cleared');
  };

  const handleQuestionTypeChange = (questionIndex, newType) => {
    setValue(`questions.${questionIndex}.questionType`, newType);
    
    // Reset type-specific fields when changing question type
    if (newType === 'multiple-choice' || newType === 'checkbox' || newType === 'dropdown') {
      setValue(`questions.${questionIndex}.options`, ['']);
    } else if (newType === 'linear-scale' || newType === 'star-rating') {
      setValue(`questions.${questionIndex}.scaleMin`, 1);
      setValue(`questions.${questionIndex}.scaleMax`, 5);
      setValue(`questions.${questionIndex}.lowestLabel`, '');
      setValue(`questions.${questionIndex}.highestLabel`, '');
    } else if (newType === 'multiple-choice-grid' || newType === 'checkbox-grid') {
      setValue(`questions.${questionIndex}.rows`, ['']);
      setValue(`questions.${questionIndex}.columns`, ['']);
    }
  };

  const addOption = (questionIndex) => {
    const currentOptions = watchedQuestions[questionIndex]?.options || [''];
    setValue(`questions.${questionIndex}.options`, [...currentOptions, '']);
  };

  const removeOption = (questionIndex, optionIndex) => {
    const currentOptions = watchedQuestions[questionIndex]?.options || [''];
    if (currentOptions.length > 1) {
      const newOptions = currentOptions.filter((_, i) => i !== optionIndex);
      setValue(`questions.${questionIndex}.options`, newOptions);
    }
  };

  const addRow = (questionIndex) => {
    const currentRows = watchedQuestions[questionIndex]?.rows || [''];
    setValue(`questions.${questionIndex}.rows`, [...currentRows, '']);
  };

  const removeRow = (questionIndex, rowIndex) => {
    const currentRows = watchedQuestions[questionIndex]?.rows || [''];
    if (currentRows.length > 1) {
      const newRows = currentRows.filter((_, i) => i !== rowIndex);
      setValue(`questions.${questionIndex}.rows`, newRows);
    }
  };

  const addColumn = (questionIndex) => {
    const currentColumns = watchedQuestions[questionIndex]?.columns || [''];
    setValue(`questions.${questionIndex}.columns`, [...currentColumns, '']);
  };

  const removeColumn = (questionIndex, columnIndex) => {
    const currentColumns = watchedQuestions[questionIndex]?.columns || [''];
    if (currentColumns.length > 1) {
      const newColumns = currentColumns.filter((_, i) => i !== columnIndex);
      setValue(`questions.${questionIndex}.columns`, newColumns);
    }
  };

  const addQuestion = () => {
    append({
      questionText: '',
      questionType: 'short-answer',
      options: [''],
      required: false,
      scaleMin: 1,
      scaleMax: 5,
      lowestLabel: '',
      highestLabel: '',
      rows: [''],
      columns: [''],
    });
  };

  const removeQuestion = (questionIndex) => {
    if (fields.length > 1) {
      remove(questionIndex);
    }
  };

  const getQuestionTypeIcon = (type) => {
    const icons = {
      'short-answer': '✏️',
      'paragraph': '📝',
      'multiple-choice': '🔘',
      'checkbox': '☑️',
      'dropdown': '📋',
      'linear-scale': '📊',
      'star-rating': '⭐',
      'multiple-choice-grid': '📊',
      'checkbox-grid': '☑️',
      'date': '📅',
      'time': '⏰'
    };
    return icons[type] || '❓';
  };

  const onSubmit = async (data) => {
    if (!pendingEventData) {
      alert('No event data found. Please create an event first.');
      navigate('/create-event');
      return;
    }

    setLoading(true);
    console.log('🚀 Starting event and survey creation...');
    console.log('📊 Survey data:', data);
    console.log('📝 Event data to be created:', pendingEventData);

    try {
      // Step 1: Create the event in the database
      console.log('📝 Creating event with data:', pendingEventData);
      console.log('🔍 Data type check:', typeof pendingEventData);
      console.log('🔍 Data keys:', Object.keys(pendingEventData));
      console.log('🔍 Required fields check:', {
        title: !!pendingEventData.title,
        rationale: !!pendingEventData.rationale,
        start_date: !!pendingEventData.start_date,
        end_date: !!pendingEventData.end_date,
        start_time: !!pendingEventData.start_time,
        end_time: !!pendingEventData.end_time,
        venue: !!pendingEventData.venue,
        created_by: !!pendingEventData.created_by
      });
      
      // Create the event (EventService handles its own timeouts)
      console.log('🚀 Starting event creation...');
      console.log('🔍 User authentication status:', { userId: user?.id, userRole: user?.role });
      
      console.log('⏱️ Waiting for event creation...');
      const eventId = await EventService.createEvent(pendingEventData);
      console.log('✅ Event created successfully with ID:', eventId);

      // Step 2: Create the survey in the database
      console.log('📊 Survey data to be created:', data);
      
      console.log('🔍 Creating survey for event:', eventId);
      
      // Transform questions to match the Survey interface
      const transformedQuestions = data.questions.map((q, index) => ({
        id: `q_${index + 1}`,
        type: q.questionType === 'multiple-choice' || q.questionType === 'checkbox' ? 'multiple_choice' : 
               q.questionType === 'linear-scale' || q.questionType === 'star-rating' ? 'rating' : 
               q.questionType === 'yes-no' ? 'yes_no' : 'text',
        question: q.questionText,
        required: q.required,
        options: q.options && q.options.length > 0 ? q.options.filter(opt => opt.trim()) : undefined,
        min_rating: q.scaleMin,
        max_rating: q.scaleMax
      }));
      
      const surveyData = {
        event_id: eventId,
        title: `Survey for ${pendingEventData.title}`,
        description: `Survey for event: ${pendingEventData.title}`,
        questions: transformedQuestions,
        created_by: user.id
      };
      
      const surveyId = await SurveyService.createSurvey(surveyData);
      console.log('✅ Survey created successfully with ID:', surveyId);

      // Clear all saved data
      clearSavedFormData();
      sessionStorage.removeItem('pending-event-data');
      sessionStorage.removeItem('pending-event-files');
      
      // Show success message
      alert(`Event and Survey created successfully!\nEvent ID: ${eventId}\nSurvey ID: ${surveyId}\nQuestions: ${data.questions.length}`);
      
      // Navigate to organizer dashboard
      navigate('/organizer');
      
    } catch (err) {
      console.error('❌ Event/Survey creation failed:', err);
      alert(`Failed to create event/survey: ${err.message}`);
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
              onClick={() => {
                // Navigate back to event creation WITHOUT clearing data
                navigate('/create-event');
              }}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 mr-4 group"
              aria-label="Back to create event"
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
              Create Survey
            </h1>
          </div>
          <p className="text-slate-600 text-lg sm:text-xl max-w-2xl mx-auto">
            Design engaging questions to gather valuable feedback from your event participants
          </p>
          
          {/* Event Preview */}
          {pendingEventData && (
            <div className="mt-6 bg-white rounded-xl shadow-lg border border-slate-200 p-4 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Event Details</h3>
              <div className="text-sm text-slate-600 space-y-1">
                <p><strong>Title:</strong> {pendingEventData.title}</p>
                <p><strong>Date:</strong> {pendingEventData.start_date} - {pendingEventData.end_date}</p>
                <p><strong>Time:</strong> {pendingEventData.start_time} - {pendingEventData.end_time}</p>
                {pendingEventData.rationale && (
                  <p><strong>Description:</strong> {pendingEventData.rationale}</p>
                )}
              </div>
            </div>
          )}
          
          {/* Draft Management Info */}
          <div className="mt-6 flex items-center justify-center space-x-6">
            {/* Auto-save Toggle */}
            <div className="flex items-center space-x-3">
              <span className="text-base font-medium text-slate-600">Auto-save</span>
              <button
                onClick={toggleAutoSave}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  autoSaveEnabled ? 'bg-green-500' : 'bg-gray-400'
                }`}
              >
                <div className={`inline-flex h-5 w-5 transform items-center justify-center rounded-full bg-white transition-transform ${
                  autoSaveEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}>
                  {autoSaveEnabled && (
                    <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
              </button>
              <span className={`text-base font-medium ${autoSaveEnabled ? 'text-green-600' : 'text-gray-500'}`}>
                {autoSaveEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            

            
            {/* Clear Draft Button */}
            <button
              onClick={handleClearDraft}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-lg border border-red-200 hover:border-red-300 transition-all duration-200 font-medium text-base shadow-sm hover:shadow-md"
              title="Clear saved draft"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Clear Draft</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
          {fields.map((field, qIndex) => (
            <div 
              key={field.id} 
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden"
            >
              {/* Question Header */}
              <div className="bg-gradient-to-r from-blue-50 to-slate-50 px-6 py-4 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                      {qIndex + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">Question {qIndex + 1}</h3>
                      <p className="text-sm text-slate-600">Configure your question settings</p>
                    </div>
                  </div>
                  
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuestion(qIndex)}
                      className="p-2 rounded-full hover:bg-red-50 text-red-500 hover:text-red-700 transition-all duration-200"
                      aria-label="Remove question"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Question Content */}
              <div className="p-6 space-y-6">
                {/* Question Text */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">
                    Question Text
                  </label>
                  <input
                    type="text"
                    placeholder="What would you like to ask?"
                    {...control.register(`questions.${qIndex}.questionText`)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 text-base transition-all duration-200 placeholder-slate-400"
                  />
                  {errors.questions?.[qIndex]?.questionText && (
                    <p className="text-red-500 text-xs mt-1">{errors.questions[qIndex].questionText.message}</p>
                  )}
                </div>

                {/* Question Type */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">
                    Question Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {[
                      'short-answer', 'paragraph', 'multiple-choice', 'checkbox', 
                      'dropdown', 'linear-scale', 'star-rating', 'multiple-choice-grid', 
                      'checkbox-grid', 'date', 'time'
                    ].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleQuestionTypeChange(qIndex, type)}
                        className={`p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                          watch(`questions.${qIndex}.questionType`) === type
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-800'
                        }`}
                      >
                        <div className="text-lg mb-1">{getQuestionTypeIcon(type)}</div>
                        <div className="text-xs font-medium capitalize">
                          {type.replace('-', ' ')}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Options for multiple choice, checkbox, and dropdown */}
                {(watch(`questions.${qIndex}.questionType`) === 'multiple-choice' || watch(`questions.${qIndex}.questionType`) === 'checkbox' || watch(`questions.${qIndex}.questionType`) === 'dropdown') && (
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">
                      Options
                    </label>
                    <div className="space-y-2">
                      {watch(`questions.${qIndex}.options`).map((option, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="flex-1">
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...watch(`questions.${qIndex}.options`)];
                                newOptions[index] = e.target.value;
                                setValue(`questions.${qIndex}.options`, newOptions);
                              }}
                              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 text-base transition-all duration-200 placeholder-slate-400"
                              placeholder={`Option ${index + 1}`}
                            />
                          </div>
                          {watch(`questions.${qIndex}.options`).length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeOption(qIndex, index)}
                              className="p-2 rounded-lg hover:bg-red-50 text-red-500 hover:text-red-700 transition-all duration-200"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => addOption(qIndex)}
                      className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>Add Option</span>
                    </button>
                  </div>
                )}

                {/* Scale settings for linear scale and star rating */}
                {(watch(`questions.${qIndex}.questionType`) === 'linear-scale' || watch(`questions.${qIndex}.questionType`) === 'star-rating') && (
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">
                      Scale Configuration
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-600">Minimum Value</label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          {...control.register(`questions.${qIndex}.scaleMin`)}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 text-base transition-all duration-200"
                        />
                        {errors.questions?.[qIndex]?.scaleMin && (
                          <p className="text-red-500 text-xs mt-1">{errors.questions[qIndex].scaleMin.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-600">Maximum Value</label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          {...control.register(`questions.${qIndex}.scaleMax`)}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 text-base transition-all duration-200"
                        />
                        {errors.questions?.[qIndex]?.scaleMax && (
                          <p className="text-red-500 text-xs mt-1">{errors.questions[qIndex].scaleMax.message}</p>
                        )}
                      </div>
                    </div>
                    {watch(`questions.${qIndex}.questionType`) === 'linear-scale' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-slate-600">Lowest Label</label>
                          <input
                            type="text"
                            value={watch(`questions.${qIndex}.lowestLabel`) || ''}
                            onChange={(e) => {
                              const newLowestLabel = e.target.value;
                              setValue(`questions.${qIndex}.lowestLabel`, newLowestLabel);
                            }}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 text-base transition-all duration-200 placeholder-slate-400"
                            placeholder="e.g., Very dissatisfied"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-slate-600">Highest Label</label>
                          <input
                            type="text"
                            value={watch(`questions.${qIndex}.highestLabel`) || ''}
                            onChange={(e) => {
                              const newHighestLabel = e.target.value;
                              setValue(`questions.${qIndex}.highestLabel`, newHighestLabel);
                            }}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 text-base transition-all duration-200 placeholder-slate-400"
                            placeholder="e.g., Very satisfied"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Grid settings for multiple choice grid and checkbox grid */}
                {(watch(`questions.${qIndex}.questionType`) === 'multiple-choice-grid' || watch(`questions.${qIndex}.questionType`) === 'checkbox-grid') && (
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">
                      Grid Configuration
                    </label>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-slate-600">Row Labels</label>
                        <div className="space-y-2">
                          {watch(`questions.${qIndex}.rows`)?.map((row, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={row}
                                onChange={(e) => {
                                  const newRows = [...watch(`questions.${qIndex}.rows`)];
                                  newRows[index] = e.target.value;
                                  setValue(`questions.${qIndex}.rows`, newRows);
                                }}
                                className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 text-base transition-all duration-200 placeholder-slate-400"
                                placeholder={`Row ${index + 1}`}
                              />
                              <button
                                type="button"
                                onClick={() => removeRow(qIndex, index)}
                                className="p-2 rounded-lg hover:bg-red-50 text-red-500 hover:text-red-700 transition-all duration-200"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => addRow(qIndex)}
                          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          <span>Add Row</span>
                        </button>
                      </div>
                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-slate-600">Column Labels</label>
                        <div className="space-y-2">
                          {watch(`questions.${qIndex}.columns`)?.map((column, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={column}
                                onChange={(e) => {
                                  const newColumns = [...watch(`questions.${qIndex}.columns`)];
                                  newColumns[index] = e.target.value;
                                  setValue(`questions.${qIndex}.columns`, newColumns);
                                }}
                                className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 text-base transition-all duration-200 placeholder-slate-400"
                                placeholder={`Column ${index + 1}`}
                              />
                              <button
                                type="button"
                                onClick={() => removeColumn(qIndex, index)}
                                className="p-2 rounded-lg hover:bg-red-50 text-red-500 hover:text-red-700 transition-all duration-200"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => addColumn(qIndex)}
                          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          <span>Add Column</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Required Toggle */}
                <div className="flex items-center space-x-3 pt-4 border-t border-slate-100">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      {...control.register(`questions.${qIndex}.required`)}
                      className="sr-only"
                    />
                    <div className={`w-11 h-6 rounded-full transition-all duration-200 ${
                      watch(`questions.${qIndex}.required`) ? 'bg-blue-600' : 'bg-slate-200'
                    }`}>
                      <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                        watch(`questions.${qIndex}.required`) ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </div>
                  </label>
                  <span className="text-sm font-medium text-slate-700">Required Question</span>
                </div>
              </div>
            </div>
          ))}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-8">
            <button
              type="button"
              onClick={addQuestion}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 px-8 rounded-xl hover:from-blue-700 hover:to-blue-900 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add New Question</span>
              </span>
            </button>
            
            <button
              type="submit"
              disabled={loading || !isValid}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 px-8 rounded-xl hover:from-blue-700 hover:to-blue-900 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span className="flex items-center justify-center space-x-2">
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Creating Event & Survey...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Create Event & Survey</span>
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

export default CreateSurvey;
