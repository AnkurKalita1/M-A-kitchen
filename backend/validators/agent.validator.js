import Joi from 'joi';

export const validateAgentRegistration = (data) => {
  const schema = Joi.object({
    // Organization Information
    organizationName: Joi.string().required().trim(),
    headquarter: Joi.string().required().trim(),
    hqAddress: Joi.string().required().trim(),
    contactPersonnel: Joi.string().required().trim(),
    linkedinProfile: Joi.string().uri().optional().allow(''),
    organizationLogoUrl: Joi.string().uri().optional().allow(''),
    
    // Contact Information (Arrays)
    phones: Joi.array().items(
      Joi.string().pattern(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/)
    ).min(1).required(),
    emails: Joi.array().items(
      Joi.string().email().trim().lowercase()
    ).min(1).required(),
    
    // Agent & Business Details (Optional for initial registration)
    agentType: Joi.string().optional().trim().allow(''),
    businessSpeciality: Joi.array().items(Joi.string()).optional(),
    entityType: Joi.string().optional().trim().allow(''),
    industrySector: Joi.string().optional().trim().allow(''),
    servicesOffered: Joi.string().optional().trim().allow(''),
    yearEstablished: Joi.string().optional().trim().allow(''),
    
    // Financials & Scale (Optional for initial registration)
    annualTurnover: Joi.string().optional().trim().allow(''),
    employeesOnPayroll: Joi.string().optional().trim().allow(''),
    employeesOnContract: Joi.string().optional().trim().allow(''),
    geographicalPresence: Joi.string().optional().trim().allow(''),
    offices: Joi.string().optional().trim().allow(''),
    subsidiariesParent: Joi.string().optional().trim().allow(''),
    totalTransactions: Joi.string().optional().trim().allow(''),
    topCustomersGeography: Joi.string().optional().trim().allow(''),
    topCustomersRevenue: Joi.string().optional().trim().allow(''),
    
    // Metrics & Documents (Optional for initial registration)
    averageFeePerAssignment: Joi.string().optional().trim().allow(''),
    finraLicenses: Joi.string().optional().trim().allow(''),
    secRegistration: Joi.string().optional().trim().allow(''),
    sellSideTransactions: Joi.string().optional().trim().allow(''),
    buySideTransactions: Joi.string().optional().trim().allow(''),
    advisoryFeeAccrued: Joi.string().optional().trim().allow(''),
    crossBorderTransactions: Joi.string().optional().trim().allow(''),
    iposConducted: Joi.string().optional().trim().allow(''),
    listedEntitiesEngaged: Joi.string().optional().trim().allow(''),
    corporateOverviewUrl: Joi.string().uri().optional().allow(''),
    ndaUrl: Joi.string().uri().optional().allow(''),
    
    // Legal (Optional for initial registration)
    acceptedTerms: Joi.boolean().optional(),
    acceptedNDA: Joi.boolean().optional()
  });

  return schema.validate(data, { abortEarly: false });
};

export const validateDocumentUpload = (data) => {
  const schema = Joi.object({
    documentType: Joi.string()
      .valid('identity_proof', 'professional_certification', 'license_proof', 'organization_logo', 'corporate_overview', 'nda', 'other')
      .required(),
    file: Joi.object({
      mimetype: Joi.string()
        .valid(
          'application/pdf',
          'application/vnd.ms-powerpoint',
          'application/vnd.openxmlformats-officedocument.presentationml.presentation',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'image/jpeg',
          'image/jpg',
          'image/png',
          'image/gif',
          'image/webp',
          'image/svg+xml'
        )
        .required(),
      size: Joi.number().max(20 * 1024 * 1024).required() // 20MB max
    }).required().unknown(true) // Allow other fields from multer like fieldname, originalname, etc.
  });

  return schema.validate(data, { abortEarly: false });
};



