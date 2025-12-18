import Joi from 'joi';

export const validateSellerRegistration = (data) => {
  const schema = Joi.object({
    // Step 1: Organisation & Contact Details
    organizationName: Joi.string().required().trim(),
    headquarter: Joi.string().required().trim(),
    hqAddress: Joi.string().optional().trim().allow(''),
    contactPersonnel: Joi.string().required().trim(),
    phones: Joi.array().items(Joi.string().pattern(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/)).min(1).required(),
    emails: Joi.array().items(Joi.string().email()).min(1).required(),
    linkedinProfile: Joi.string().uri().optional().allow(''),
    organizationLogoUrl: Joi.string().uri().optional().allow(''),
    
    // Step 2: Business & Financial Overview
    industrySector: Joi.string().optional().trim().allow(''),
    offeringCategory: Joi.string().optional().trim().allow(''),
    annualTurnover: Joi.string().optional().trim().allow(''),
    ebitda: Joi.string().optional().trim().allow(''),
    netProfit: Joi.string().optional().trim().allow(''),
    entityType: Joi.string().optional().trim().allow(''),
    yearEstablished: Joi.string().optional().trim().allow(''),
    mrr: Joi.string().optional().trim().allow(''),
    ebitdaMargin: Joi.string().optional().trim().allow(''),
    productServicesSplit: Joi.string().optional().trim().allow(''),
    
    // Step 3: Operations & Ownership
    employeesOnPayroll: Joi.string().optional().trim().allow(''),
    employeesOnContract: Joi.string().optional().trim().allow(''),
    geographicalPresence: Joi.string().optional().trim().allow(''),
    offices: Joi.string().optional().trim().allow(''),
    businessGeographySplit: Joi.string().optional().trim().allow(''),
    geographySplit: Joi.alternatives().try(
      Joi.array().items(Joi.string()),
      Joi.string().allow('')
    ).optional(),
    subsidiaries: Joi.string().optional().trim().allow(''),
    investmentsAcquisitions: Joi.string().optional().trim().allow(''),
    capTableShareholding: Joi.string().optional().trim().allow(''),
    coreBusinessModel: Joi.string().optional().trim().allow(''),
    keyDifferentiators: Joi.string().optional().trim().allow(''),
    investorHistory: Joi.string().optional().trim().allow(''),
    
    // Step 4: Customers & Commercial Metrics
    totalClientsUsers: Joi.string().optional().trim().allow(''),
    totalActiveClientsUsers: Joi.string().optional().trim().allow(''),
    avgDealSize: Joi.string().optional().trim().allow(''),
    repeatCustomersPercent: Joi.string().optional().trim().allow(''),
    biggestDealSize: Joi.string().optional().trim().allow(''),
    productPricingPerItem: Joi.string().optional().trim().allow(''),
    typicalPricePerItem: Joi.string().optional().trim().allow(''),
    aum: Joi.string().optional().trim().allow(''),
    assetsUnderManagement: Joi.string().optional().trim().allow(''),
    topCustomers: Joi.string().optional().trim().allow(''),
    partnershipAlliancesChannels: Joi.string().optional().trim().allow(''),
    iprs: Joi.string().optional().trim().allow(''),
    founderProfiles: Joi.string().optional().trim().allow(''),
    cac: Joi.string().optional().trim().allow(''),
    customerAcquisitionCost: Joi.string().optional().trim().allow(''),
    clv: Joi.string().optional().trim().allow(''),
    customerLifetimeValue: Joi.string().optional().trim().allow(''),
    npv: Joi.string().optional().trim().allow(''),
    netPresentValue: Joi.string().optional().trim().allow(''),
    pendingLegalIssues: Joi.string().optional().trim().allow(''),
    legalIssuesDetails: Joi.string().optional().trim().allow(''),
    shortLongTermBorrowings: Joi.string().optional().trim().allow(''),
    
    // Step 5: Attachments & Investment Details
    investmentSought: Joi.string().optional().trim().allow(''),
    investmentType: Joi.string().optional().trim().allow(''),
    resourceSkillsetUrl: Joi.string().uri().optional().allow(''),
    forwardProjectionsUrl: Joi.string().uri().optional().allow(''),
    incomeStatementUrl: Joi.string().uri().optional().allow(''),
    balanceSheetUrl: Joi.string().uri().optional().allow(''),
    cashFlowUrl: Joi.string().uri().optional().allow(''),
    pitchDeckUrl: Joi.string().uri().optional().allow(''),
    businessCollateralsUrl: Joi.string().uri().optional().allow(''),
    valuationUrl: Joi.string().uri().optional().allow(''),
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
      .valid(
        'organization_logo',
        'resource_skillset',
        'forward_projections',
        'income_statement',
        'balance_sheet',
        'cash_flow_statement',
        'pitch_deck',
        'business_collaterals',
        'valuation',
        'nda',
        'business_overview',
        'financial_statements',
        'company_registration',
        'other_documents'
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

