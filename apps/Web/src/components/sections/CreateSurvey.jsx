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
    const newId = questions.length > 0 ? questions[questions.length - 1].id + 1 : 1;
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
    setQuestions(questions.filter((q) => q.id !== id));
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

  return (
    <section className="min-h-screen bg-white/95 p-0 flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mt-12 space-y-4 sm:space-y-6 w-full">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 relative">
            {/* Arrow icon in top left corner */}
            <div className="absolute top-2 left-2 sm:top-4 sm:left-4">
              <svg 
                className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 cursor-pointer hover:text-blue-800 transition-colors touch-target-sm"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                onClick={() => navigate('/create-event')}
                aria-label="Back to create event"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black text-center mb-6 sm:mb-8">Create Survey</h2>

            {questions.map((question, qIndex) => (
              <div 
                key={question.id} 
                className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 space-y-3 sm:space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                  <div className="flex-1">
                    <label className="block text-base sm:text-lg font-semibold text-black mb-1 sm:mb-2">
                      Question {qIndex + 1}
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your question"
                      value={question.questionText}
                      onChange={(e) => handleQuestionChange(question.id, 'questionText', e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-black text-sm sm:text-base"
                      required
                    />
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => removeQuestion(question.id)}
                    className="self-start sm:self-auto text-red-600 hover:text-red-800 font-bold text-lg sm:text-xl touch-target-sm"
                    aria-label="Remove question"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="block text-base sm:text-lg font-semibold text-black">Type:</label>
                  <select
                    value={question.questionType}
                    onChange={(e) => handleQuestionChange(question.id, 'questionType', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-black text-sm sm:text-base"
                  >
                    <option value="short-answer">Short Answer</option>
                    <option value="paragraph">Paragraph</option>
                    <option value="multiple-choice">Multiple Choice</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="dropdown">Dropdown</option>
                    <option value="linear-scale">Linear Scale</option>
                    <option value="star-rating">Star Rating</option>
                    <option value="multiple-choice-grid">Multiple Choice Grid</option>
                    <option value="checkbox-grid">Checkbox Grid</option>
                    <option value="date">Date</option>
                    <option value="time">Time</option>
                  </select>
                </div>

                {/* Render options for multiple choice, checkbox, and dropdown */}
                {(question.questionType === 'multiple-choice' || question.questionType === 'checkbox' || question.questionType === 'dropdown') && (
                  <div className="space-y-2">
                    <label className="block text-base sm:text-lg font-semibold text-black">Options:</label>
                    {question.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => handleOptionChange(question.id, index, e.target.value)}
                          className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-black text-sm sm:text-base"
                          placeholder={`Option ${index + 1}`}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => removeOption(question.id, index)}
                          className="text-red-600 hover:text-red-800 font-bold touch-target-sm"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addOption(question.id)}
                      className="text-blue-600 hover:text-blue-800 font-semibold text-sm sm:text-base"
                    >
                      + Add option
                    </button>
                  </div>
                )}

                {/* Render scale settings for linear scale and star rating */}
                {(question.questionType === 'linear-scale' || question.questionType === 'star-rating') && (
                  <div className="space-y-2">
                    <label className="block text-base sm:text-lg font-semibold text-black">Scale Range:</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-sm font-medium text-black">Minimum</label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={question.scaleMin || 1}
                          onChange={(e) => handleQuestionChange(question.id, 'scaleMin', parseInt(e.target.value))}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-black text-sm sm:text-base"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black">Maximum</label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={question.scaleMax || 5}
                          onChange={(e) => handleQuestionChange(question.id, 'scaleMax', parseInt(e.target.value))}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-black text-sm sm:text-base"
                        />
                      </div>
                    </div>
                    {question.questionType === 'linear-scale' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label className="block text-sm font-medium text-black">Lowest label</label>
                          <input
                            type="text"
                            value={question.lowestLabel || ''}
                            onChange={(e) => handleQuestionChange(question.id, 'lowestLabel', e.target.value)}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-black text-sm sm:text-base"
                            placeholder="e.g., Very dissatisfied"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-black">Highest label</label>
                          <input
                            type="text"
                            value={question.highestLabel || ''}
                            onChange={(e) => handleQuestionChange(question.id, 'highestLabel', e.target.value)}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-black text-sm sm:text-base"
                            placeholder="e.g., Very satisfied"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Render grid settings for multiple choice grid and checkbox grid */}
                {(question.questionType === 'multiple-choice-grid' || question.questionType === 'checkbox-grid') && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-lg font-semibold text-black">Rows:</label>
                        {question.rows?.map((row, index) => (
                          <div key={index} className="flex items-center space-x-2 mb-2">
                            <input
                              type="text"
                              value={row}
                              onChange={(e) => {
                                const newRows = [...(question.rows || [])];
                                newRows[index] = e.target.value;
                                handleQuestionChange(question.id, 'rows', newRows);
                              }}
                              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-black"
                              placeholder={`Row ${index + 1}`}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newRows = question.rows?.filter((_, i) => i !== index) || [];
                                handleQuestionChange(question.id, 'rows', newRows);
                              }}
                              className="text-red-600 hover:text-red-800 font-bold"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            const newRows = [...(question.rows || []), ''];
                            handleQuestionChange(question.id, 'rows', newRows);
                          }}
                          className="text-blue-600 hover:text-blue-800 font-semibold"
                        >
                          + Add row
                        </button>
                      </div>
                      <div>
                        <label className="block text-lg font-semibold text-black">Columns:</label>
                        {question.columns?.map((column, index) => (
                          <div key={index} className="flex items-center space-x-2 mb-2">
                            <input
                              type="text"
                              value={column}
                              onChange={(e) => {
                                const newColumns = [...(question.columns || [])];
                                newColumns[index] = e.target.value;
                                handleQuestionChange(question.id, 'columns', newColumns);
                              }}
                              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-black"
                              placeholder={`Column ${index + 1}`}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newColumns = question.columns?.filter((_, i) => i !== index) || [];
                                handleQuestionChange(question.id, 'columns', newColumns);
                              }}
                              className="text-red-600 hover:text-red-800 font-bold"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            const newColumns = [...(question.columns || []), ''];
                            handleQuestionChange(question.id, 'columns', newColumns);
                          }}
                          className="text-blue-600 hover:text-blue-800 font-semibold"
                        >
                          + Add column
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={question.required}
                      onChange={(e) => handleQuestionChange(question.id, 'required', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-black">Required</span>
                  </label>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-6">
              <button
                type="button"
                onClick={addQuestion}
                className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
              >
                + Add Question
              </button>
              
              <button
                type="submit"
                className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-200 font-semibold"
              >
                Publish Event and Survey
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateSurvey;
