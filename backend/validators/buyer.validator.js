import Joi from 'joi';

export const validateBuyerRegistration = (data) => {
  const schema = Joi.object({
    // Personal Information (Required)
    firstName: Joi.string().required().trim(),
    lastName: Joi.string().required().trim(),
    email: Joi.string().email().required().trim().lowercase(),
    phone: Joi.string().pattern(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/).required().trim(),
    
    // Organization Information (Step 1)
    organizationName: Joi.string().required().trim(),
    parentOrganization: Joi.string().optional().trim().allow(''),
    hqAddress: Joi.string().optional().trim().allow(''),
    hqLocation: Joi.string().optional().trim().allow(''),
    contactPerson: Joi.string().optional().trim().allow(''),
    contactDetails: Joi.string().optional().trim().allow(''),
    linkedinProfile: Joi.string().uri().optional().allow(''),
    organizationLogoUrl: Joi.string().uri().optional().allow(''),
    
    // Investor Type & Entity Details (Step 2)
    investorType: Joi.string().valid('Strategic', 'Financial', 'Institutional', 'Government').optional().allow(''),
    entityType: Joi.string().optional().trim().allow(''),
    buyerSize: Joi.string().optional().trim().allow(''),
    strategicInvestorSector: Joi.string().optional().trim().allow(''),
    geographicalPresence: Joi.string().optional().trim().allow(''),
    offices: Joi.string().optional().trim().allow(''),
    headcount: Joi.string().optional().trim().allow(''),
    geographyPreferences: Joi.alternatives().try(
      Joi.array().items(Joi.string()),
      Joi.string().allow('')
    ).optional(),
    
    // Investment Metrics (Step 3)
    averageInvestmentTicketSize: Joi.string().optional().trim().allow(''),
    annualTurnover: Joi.string().optional().trim().allow(''),
    ebitda: Joi.string().optional().trim().allow(''),
    ebitdaMargin: Joi.string().optional().trim().allow(''),
    netProfit: Joi.string().optional().trim().allow(''),
    aum: Joi.string().optional().trim().allow(''),
    fundSize: Joi.string().optional().trim().allow(''),
    investmentTillDate: Joi.string().optional().trim().allow(''),
    investmentHistory: Joi.string().optional().trim().allow(''),
    
    // Legal (Optional for initial registration)
    acceptedTerms: Joi.boolean().optional(),
    acceptedNDA: Joi.boolean().optional()
  });

  return schema.validate(data, { abortEarly: false });
};

export const validateDocumentUpload = (data) => {
  const schema = Joi.object({
    documentType: Joi.string()
      .valid(
        'proof_of_funds', 
        'company_registration', 
        'corporate_deck', 
        'income_statement', 
        'balance_sheet', 
        'cash_flow_statement', 
        'nda',
        'other_collaterals',
        'organization_logo'
      )
      .required(),
    file: Joi.object({
      mimetype: Joi.string()
        .valid(
          'application/pdf',
          'application/vnd.ms-powerpoint',
          'application/vnd.openxmlformats-officedocument.presentationml.presentation',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
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











