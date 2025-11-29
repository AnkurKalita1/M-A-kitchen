import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';

function PersonalInfoStep({ data, onSubmit, loading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
        <p className="text-gray-600 mt-2">Let's start with your basic details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="label">First Name *</label>
          <input
            type="text"
            className="input-field"
            placeholder="John"
            {...register('firstName', { required: 'First name is required' })}
          />
          {errors.firstName && <p className="error-text">{errors.firstName.message}</p>}
        </div>

        <div>
          <label className="label">Last Name *</label>
          <input
            type="text"
            className="input-field"
            placeholder="Doe"
            {...register('lastName', { required: 'Last name is required' })}
          />
          {errors.lastName && <p className="error-text">{errors.lastName.message}</p>}
        </div>
      </div>

      <div>
        <label className="label">Email Address *</label>
        <input
          type="email"
          className="input-field"
          placeholder="john.doe@company.com"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && <p className="error-text">{errors.email.message}</p>}
      </div>

      <div>
        <label className="label">Phone Number *</label>
        <input
          type="tel"
          className="input-field"
          placeholder="+1234567890"
          {...register('phone', {
            required: 'Phone number is required',
            pattern: {
              value: /^[0-9]{10,15}$/,
              message: 'Invalid phone number (10-15 digits)',
            },
          })}
        />
        {errors.phone && <p className="error-text">{errors.phone.message}</p>}
      </div>

      <div className="flex justify-end pt-6">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            'Continue'
          )}
        </button>
      </div>
    </form>
  );
}

export default PersonalInfoStep;

