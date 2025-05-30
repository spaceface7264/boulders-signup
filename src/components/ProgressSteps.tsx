'use client';
import { useGoogleFont } from '../utils/fonts'
import { useForm } from '../utils/FormContext'
import React from "react"

export default function ProgressSteps({ 
  steps = ['Personal Info', 'Access', 'Primary Gym', 'Payment']
}: {
  steps?: string[]
}) {
  const fontFamily = useGoogleFont('Inter')
  const { currentStep, setCurrentStep, validateStep } = useForm()
  
  const handleStepClick = (index: number) => {
    if (index < currentStep) {
      // Allow going back to previous steps
      setCurrentStep(index + 1)
    } else if (index === currentStep) {
      // Validate current step before proceeding
      if (validateStep(currentStep)) {
        setCurrentStep(currentStep + 1)
      }
    }
  }
  
  return (
    <div className="flex justify-center mt-2 mb-2" style={{ fontFamily }}>
      <div className="flex items-center max-w-3xl mx-auto justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep - 1
          const isCurrent = index === currentStep - 1
          const isLast = index === steps.length - 1
          
          return (
            <div key={index} className="flex items-center">
              <div 
                className="flex flex-col items-center"
              >
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-medium transition-colors ${
                    isCompleted 
                      ? 'bg-green-500 text-white' 
                      : isCurrent 
                        ? 'bg-[#ff00ff] text-white' 
                        : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  {isCompleted ? (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    ) : (
                      <span>{index + 1}</span>
                  )}
                </div>
                <span 
                  className={`text-xs font-medium mt-2 transition-colors ${
                    isCompleted 
                      ? 'text-green-500' 
                      : isCurrent 
                        ? 'text-[#ff00ff]' 
                        : 'text-gray-400'
                  }`}
                >
                  {step}
                </span>
              </div>
              
              {!isLast && (
                <div className={`flex-1 h-1 mx-2 transition-colors ${
                  isCompleted ? 'bg-green-500' : isCurrent ? 'bg-[#ff00ff]' : 'bg-gray-700'
                }`}>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}