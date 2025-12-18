import { Check } from 'lucide-react';

function ProgressBar({ steps, currentStep, stepInfo }) {
  const progressPercentage = (currentStep / steps.length) * 100;

  // Use step names from the steps prop if available, otherwise use default labels
  const getStepLabel = (step, index) => {
    return (
      step.name ||
      [
        'Organisation & Contact',
        'Agent & Business Details',
        'Financials & Scale',
        'Metrics & Documents',
        'Terms & Conditions',
      ][index]
    );
  };

  return (
    <div className="w-full mb-6 sm:mb-8">
      {/* Unified responsive layout with connectors */}
      <div className="w-full flex items-start justify-between px-2 sm:px-0">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const lineShouldBeGreen = step.id < currentStep;

          return (
            <div key={step.id} className="flex items-start" style={{ flex: index < steps.length - 1 ? '1 1 0%' : '0 0 auto' }}>
              <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                <div
                  className={`
                    w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all flex-shrink-0
                    ${isCompleted ? 'bg-green-500' : isCurrent ? 'bg-blue-600' : 'bg-gray-300'}
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white" />
                  ) : (
                    <span className={`text-sm sm:text-base font-bold ${isCurrent ? 'text-white' : 'text-gray-600'}`}>
                      {step.id}
                    </span>
                  )}
                </div>
                <span
                  className={`
                    text-[9px] sm:text-[10px] md:text-xs font-medium text-center leading-tight
                    ${isCurrent ? 'text-white font-semibold' : isCompleted ? 'text-white' : 'text-white/80'}
                    max-w-[65px] sm:max-w-[75px] md:max-w-[90px]
                  `}
                  style={{ wordWrap: 'break-word', hyphens: 'auto' }}
                >
                  {getStepLabel(step, index)}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div className="flex items-center px-1 sm:px-2 md:px-3 flex-1" style={{ marginTop: '16px' }}>
                  <div
                    className={`
                      h-0.5 transition-all rounded-full w-full
                      ${lineShouldBeGreen ? 'bg-green-500' : 'bg-gray-300'}
                    `}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      
      {/* Step Info Banner */}
      {stepInfo && (
        <div className="mt-5 sm:mt-6 mb-4 text-center px-4">
          <div className="inline-block bg-purple-50/50 rounded-lg p-3 sm:p-4 max-w-full">
            <p className="text-white text-xs sm:text-sm break-words">{stepInfo}</p>
          </div>
        </div>
      )}
      
      {/* Progress Text */}
      <div className="text-center mt-4 sm:mt-5 px-4">
        <p className="text-white/90 text-xs sm:text-sm font-medium">
          Step {currentStep} of {steps.length} • {Math.round(progressPercentage)}% Complete
        </p>
      </div>
    </div>
  );
}

export default ProgressBar;

