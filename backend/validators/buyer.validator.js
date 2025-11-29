import Joi from 'joi';

export const validateBuyerRegistration = (data) => {
  const schema = Joi.object({
    // Personal Information (Required)
    firstName: Joi.string().required().trim(),
    lastName: Joi.string().required().trim(),
    email: Joi.string().email().required().trim().lowercase(),
    phone: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
    
    // Company Information (Optional for initial registration)
    companyName: Joi.string().optional().trim().allow(''),
    companyWebsite: Joi.string().uri().optional().allow(''),
    industry: Joi.string().optional().allow(''),
    companySize: Joi.string().valid('1-10', '11-50', '51-200', '201-500', '501-1000', '1000+').optional().allow(''),
    
    // Professional Background (Optional for initial registration)
    jobTitle: Joi.string().optional().trim().allow(''),
    yearsOfExperience: Joi.number().min(0).max(70).optional(),
    linkedinProfile: Joi.string().uri().optional().allow(''),
    
    // Investment Preferences (Optional for initial registration)
    investmentRange: Joi.object({
      min: Joi.number().min(0).required(),
      max: Joi.number().min(Joi.ref('min')).required()
    }).optional(),
    sectorsOfInterest: Joi.array().items(Joi.string()).optional(),
    geographicPreference: Joi.array().items(Joi.string()).optional(),
    
    // Legal (Optional for initial registration)
    acceptedTerms: Joi.boolean().optional(),
    acceptedNDA: Joi.boolean().optional()
  });

  return schema.validate(data, { abortEarly: false });
};

export const validateDocumentUpload = (data) => {
  const schema = Joi.object({
    documentType: Joi.string()
      .valid('proof_of_funds', 'company_registration', 'identity_proof', 'other')
      .required(),
    file: Joi.object({
      mimetype: Joi.string()
        .valid(
          'application/pdf',
          'application/vnd.ms-powerpoint',
          'application/vnd.openxmlformats-officedocument.presentationml.presentation',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
        .required(),
      size: Joi.number().max(10 * 1024 * 1024).required() // 10MB max
    }).required().unknown(true) // Allow other fields from multer like fieldname, originalname, etc.
  });

  return schema.validate(data, { abortEarly: false });
};

