import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateSurvey = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([
    {
      id: 1,
      questionText: '',
      questionType: 'short-answer',
      options: [''],
      required: false,
      scaleMin: 1,
      scaleMax: 5,
      rows: [''],
      columns: [''],
    },
  ]);

  const handleQuestionChange = (id, field, value) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === id ? { ...q, [field]: value } : q
      )
    );
  };

  const handleOptionChange = (questionId, index, value) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => {
        if (q.id === questionId) {
          const newOptions = [...q.options];
          newOptions[index] = value;
          return { ...q, options: newOptions };
        }
        return q;
      })
    );
  };

  const addOption = (questionId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === questionId ? { ...q, options: [...q.options, ''] } : q
      )
    );
  };

  const removeOption = (questionId, index) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => {
        if (q.id === questionId) {
          const newOptions = q.options.filter((_, i) => i !== index);
          return { ...q, options: newOptions };
        }
        return q;
      })
    );
  };

  const addQuestion = () => {
    const newId = questions.length > 0 ? questions.length + 1 : 1;
    setQuestions([
      ...questions,
      {
        id: newId,
        questionText: '',
        questionType: 'short-answer',
        options: [''],
        required: false,
        scaleMin: 1,
        scaleMax: 5,
        rows: [''],
        columns: [''],
      },
    ]);
  };

  const removeQuestion = (id) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get event data from localStorage or sessionStorage (assuming it's stored there from CreateEvent)
    const eventData = JSON.parse(localStorage.getItem('createdEvent') || '{}');
    const surveyData = questions;
    
    const combinedData = {
      event: eventData,
      survey: surveyData,
      publishedAt: new Date().toISOString()
    };
    
    console.log('Event and Survey published:', combinedData);
    alert('Event and Survey published successfully! Check console for data.');
    
    // Clear stored data after publishing
    localStorage.removeItem('createdEvent');
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

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-4">
            <button
              onClick={() => navigate('/create-event')}
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
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          {questions.map((question, qIndex) => (
            <div 
              key={question.id} 
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
                  
                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuestion(question.id)}
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
                    value={question.questionText}
                    onChange={(e) => handleQuestionChange(question.id, 'questionText', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 text-base transition-all duration-200 placeholder-slate-400"
                  />
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
                        onClick={() => handleQuestionChange(question.id, 'questionType', type)}
                        className={`p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                          question.questionType === type
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
                {(question.questionType === 'multiple-choice' || question.questionType === 'checkbox' || question.questionType === 'dropdown') && (
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">
                      Options
                    </label>
                    <div className="space-y-2">
                      {question.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="flex-1">
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => handleOptionChange(question.id, index, e.target.value)}
                              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 text-base transition-all duration-200 placeholder-slate-400"
                              placeholder={`Option ${index + 1}`}
                            />
                          </div>
                          {question.options.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeOption(question.id, index)}
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
                      onClick={() => addOption(question.id)}
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
                {(question.questionType === 'linear-scale' || question.questionType === 'star-rating') && (
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
                          value={question.scaleMin || 1}
                          onChange={(e) => handleQuestionChange(question.id, 'scaleMin', parseInt(e.target.value))}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 text-base transition-all duration-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-600">Maximum Value</label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={question.scaleMax || 5}
                          onChange={(e) => handleQuestionChange(question.id, 'scaleMax', parseInt(e.target.value))}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 text-base transition-all duration-200"
                        />
                      </div>
                    </div>
                    {question.questionType === 'linear-scale' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-slate-600">Lowest Label</label>
                          <input
                            type="text"
                            value={question.lowestLabel || ''}
                            onChange={(e) => handleQuestionChange(question.id, 'lowestLabel', e.target.value)}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 text-base transition-all duration-200 placeholder-slate-400"
                            placeholder="e.g., Very dissatisfied"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-slate-600">Highest Label</label>
                          <input
                            type="text"
                            value={question.highestLabel || ''}
                            onChange={(e) => handleQuestionChange(question.id, 'highestLabel', e.target.value)}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 text-base transition-all duration-200 placeholder-slate-400"
                            placeholder="e.g., Very satisfied"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Grid settings for multiple choice grid and checkbox grid */}
                {(question.questionType === 'multiple-choice-grid' || question.questionType === 'checkbox-grid') && (
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">
                      Grid Configuration
                    </label>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-slate-600">Row Labels</label>
                        <div className="space-y-2">
                          {question.rows?.map((row, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={row}
                                onChange={(e) => {
                                  const newRows = [...(question.rows || [])];
                                  newRows[index] = e.target.value;
                                  handleQuestionChange(question.id, 'rows', newRows);
                                }}
                                className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 text-base transition-all duration-200 placeholder-slate-400"
                                placeholder={`Row ${index + 1}`}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const newRows = question.rows?.filter((_, i) => i !== index) || [];
                                  handleQuestionChange(question.id, 'rows', newRows);
                                }}
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
                          onClick={() => {
                            const newRows = [...(question.rows || []), ''];
                            handleQuestionChange(question.id, 'rows', newRows);
                          }}
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
                          {question.columns?.map((column, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={column}
                                onChange={(e) => {
                                  const newColumns = [...(question.columns || [])];
                                  newColumns[index] = e.target.value;
                                  handleQuestionChange(question.id, 'columns', newColumns);
                                }}
                                className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 text-base transition-all duration-200 placeholder-slate-400"
                                placeholder={`Column ${index + 1}`}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const newColumns = question.columns?.filter((_, i) => i !== index) || [];
                                  handleQuestionChange(question.id, 'columns', newColumns);
                                }}
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
                          onClick={() => {
                            const newColumns = [...(question.columns || []), ''];
                            handleQuestionChange(question.id, 'columns', newColumns);
                          }}
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
                      checked={question.required}
                      onChange={(e) => handleQuestionChange(question.id, 'required', e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-11 h-6 rounded-full transition-all duration-200 ${
                      question.required ? 'bg-blue-600' : 'bg-slate-200'
                    }`}>
                      <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                        question.required ? 'translate-x-5' : 'translate-x-0'
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
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 px-8 rounded-xl hover:from-blue-700 hover:to-blue-900 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Publish Event & Survey</span>
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateSurvey;
