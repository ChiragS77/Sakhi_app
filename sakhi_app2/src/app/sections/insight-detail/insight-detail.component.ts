import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface InsightDetail {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;

  introduction: string;

  sections: {
    heading: string;
    paragraphs: string[];
    points?: string[];
  }[];

  relatedService: string;
  relatedServiceLink: string;
}

@Component({
  selector: 'app-insight-detail',
  templateUrl: './insight-detail.component.html',
  styleUrls: ['./insight-detail.component.css']
})
export class InsightDetailComponent {

   insight?: InsightDetail;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  insights: InsightDetail[] = [

    // =====================================================
    // GST REGISTRATION
    // =====================================================

    {
      slug: 'gst-registration-guide',
      category: 'GST & Tax',
      title: 'GST Registration: A Simple Guide for Businesses',
      excerpt:
        'Understand when GST registration is required, what documents are needed and how the registration process works for your business.',
      date: 'September 28, 2026',
      readTime: '6 min read',
      image: 'assets/gst_returning.png',

      introduction:
        'GST registration is an important compliance step for eligible businesses operating in India. Understanding the registration process, documentation and ongoing responsibilities can help businesses stay organized and avoid unnecessary compliance issues.',

      sections: [
        {
          heading: 'What is GST Registration?',
          paragraphs: [
            'GST registration is the process through which an eligible business becomes registered under the Goods and Services Tax system.',
            'Once registered, the business receives a GSTIN that is used for GST-related transactions, invoicing and compliance.'
          ]
        },

        {
          heading: 'Who Should Consider GST Registration?',
          paragraphs: [
            'GST registration requirements depend on factors such as the nature of the business, turnover, location and type of supplies.',
            'Certain businesses may also require registration based on specific activities even when their circumstances differ from ordinary threshold-based registration.'
          ]
        },

        {
          heading: 'Documents Generally Required',
          paragraphs: [
            'The exact documentation can vary depending on the business structure and registration circumstances.'
          ],
          points: [
            'PAN details',
            'Identity and address proof',
            'Business address proof',
            'Bank account details',
            'Business constitution documents',
            'Photographs and other supporting information where applicable'
          ]
        },

        {
          heading: 'Why Proper Registration Matters',
          paragraphs: [
            'Accurate registration information helps create a proper compliance foundation for the business.',
            'Incorrect information or incomplete documentation can lead to delays or additional compliance requirements.'
          ]
        },

        {
          heading: 'How Sakhi Can Help',
          paragraphs: [
            'Sakhi Business Consulting can help businesses understand the registration requirements, organize the required information and navigate the GST registration process.',
            'Our goal is to make the process clear and easier to manage so that business owners can focus on running their business.'
          ]
        }
      ],

      relatedService: 'GST Services',
      relatedServiceLink: '/services'
    },


    // =====================================================
    // UDYAM
    // =====================================================

    {
      slug: 'udyam-msme-registration',
      category: 'Business Registration',
      title: 'Udyam Registration: What Small Businesses Should Know',
      excerpt:
        'Learn how Udyam registration can help eligible small businesses establish their MSME identity and access relevant business benefits.',
      date: 'September 24, 2026',
      readTime: '5 min read',
      image: 'assets/udyam.png',

      introduction:
        'Udyam Registration provides eligible micro, small and medium enterprises with an official MSME registration identity. Understanding the process and keeping business information accurate can help businesses maintain proper records.',

      sections: [
        {
          heading: 'What is Udyam Registration?',
          paragraphs: [
            'Udyam Registration is the registration system used for eligible Micro, Small and Medium Enterprises.',
            'It provides a registration identity for an eligible business and helps establish its MSME status.'
          ]
        },

        {
          heading: 'Why Do Businesses Register?',
          paragraphs: [
            'Businesses may register to formally establish their MSME identity and explore benefits and support available to eligible enterprises.'
          ]
        },

        {
          heading: 'What Information Is Needed?',
          paragraphs: [
            'Registration requires business and applicant information. The exact requirements depend on the business and the information being registered.'
          ],
          points: [
            'Business details',
            'PAN information',
            'Aadhaar-related information where applicable',
            'Business activity details',
            'Bank and other business information where required'
          ]
        },

        {
          heading: 'How Sakhi Can Help',
          paragraphs: [
            'Sakhi can assist eligible businesses with Udyam registration, certificate-related support and updates to registration information.'
          ]
        }
      ],

      relatedService: 'Udyam / MSME',
      relatedServiceLink: '/services'
    },


    // =====================================================
    // FSSAI
    // =====================================================

    {
      slug: 'fssai-license-guide',
      category: 'Business Registration',
      title: 'FSSAI License: Which Registration Does Your Food Business Need?',
      excerpt:
        'Understand the basic, state and central FSSAI license categories and what food businesses should consider before applying.',
      date: 'September 20, 2026',
      readTime: '6 min read',
      image: 'assets/fssai.png',

      introduction:
        'Food businesses need to understand the applicable food safety registration or licensing requirements before starting or continuing operations. The appropriate category depends on the nature and scale of the food business.',

      sections: [
        {
          heading: 'What is FSSAI Registration?',
          paragraphs: [
            'FSSAI registration and licensing provide a regulatory framework for food businesses in India.',
            'The applicable registration or license depends on factors such as the nature and scale of the food business.'
          ]
        },

        {
          heading: 'Common FSSAI Categories',
          paragraphs: [
            'Food businesses may fall under different FSSAI categories depending on their circumstances.'
          ],
          points: [
            'Basic Registration',
            'State License',
            'Central License'
          ]
        },

        {
          heading: 'Why Timely Renewal Matters',
          paragraphs: [
            'Businesses should keep track of their license validity and applicable compliance requirements to avoid unnecessary interruptions.'
          ]
        },

        {
          heading: 'How Sakhi Can Help',
          paragraphs: [
            'Sakhi provides assistance with FSSAI registration, licensing, renewal and related documentation for eligible food businesses.'
          ]
        }
      ],

      relatedService: 'FSSAI License',
      relatedServiceLink: '/services'
    },


    // =====================================================
    // IEC
    // =====================================================

    {
      slug: 'iec-registration-guide',
      category: 'Business Registration',
      title: 'IEC Registration: A Guide for Importers and Exporters',
      excerpt:
        'Planning to import or export goods? Understand IEC registration, basic requirements and the role of DGFT in international trade.',
      date: 'September 16, 2026',
      readTime: '5 min read',
      image: 'assets/iec.png',

      introduction:
        'Businesses involved in international trade may need an Importer Exporter Code. Understanding the registration process and keeping related information updated is an important part of managing import and export activities.',

      sections: [
        {
          heading: 'What is an IEC?',
          paragraphs: [
            'An Importer Exporter Code is an identification number used in connection with import and export activities in India.'
          ]
        },

        {
          heading: 'When Is IEC Relevant?',
          paragraphs: [
            'Businesses involved in applicable import or export activities should understand whether IEC registration is required for their transactions.'
          ]
        },

        {
          heading: 'What Support May Be Required?',
          paragraphs: [
            'Businesses may need assistance with registration, updates and related trade documentation.'
          ],
          points: [
            'Fresh IEC registration',
            'Annual IEC updates',
            'DGFT-related support',
            'ICEGATE registration support'
          ]
        },

        {
          heading: 'How Sakhi Can Help',
          paragraphs: [
            'Sakhi can assist businesses with IEC registration and related documentation requirements for international trade.'
          ]
        }
      ],

      relatedService: 'Import Export Certificate',
      relatedServiceLink: '/services'
    },


    // =====================================================
    // GST RETURN
    // =====================================================

    {
      slug: 'gst-return-filing-guide',
      category: 'GST & Tax',
      title: 'GST Return Filing: What Businesses Need to Know',
      excerpt:
        'Understand the basics of GST return filing, why timely filing matters and what businesses should keep ready for compliance.',
      date: 'September 12, 2026',
      readTime: '6 min read',
      image: 'assets/gst_returning.png',

      introduction:
        'GST return filing is an important part of ongoing GST compliance. Businesses need to maintain accurate transaction records and understand which returns apply to their situation.',

      sections: [
        {
          heading: 'What is GST Return Filing?',
          paragraphs: [
            'GST-registered businesses may need to periodically report relevant transaction and tax information through applicable GST returns.'
          ]
        },

        {
          heading: 'Why Accurate Records Matter',
          paragraphs: [
            'Accurate sales, purchase and tax records can make the return filing process more organized and help identify discrepancies.'
          ]
        },

        {
          heading: 'Common GST Support Areas',
          paragraphs: [
            'Depending on the business, GST compliance support may include several activities.'
          ],
          points: [
            'GST return filing',
            'GST amendments',
            'GST LUT',
            'GST revocation support',
            'GST notice resolution',
            'Annual return support'
          ]
        },

        {
          heading: 'How Sakhi Can Help',
          paragraphs: [
            'Sakhi can support businesses with GST filing and ongoing compliance requirements based on their business circumstances.'
          ]
        }
      ],

      relatedService: 'GST Services',
      relatedServiceLink: '/services'
    },


    // =====================================================
    // GST LUT
    // =====================================================

    {
      slug: 'gst-lut-guide',
      category: 'GST & Tax',
      title: 'GST LUT: What Is It and When Does a Business Need It?',
      excerpt:
        'A simple explanation of Letter of Undertaking under GST and how it can be relevant for eligible exporters.',
      date: 'September 08, 2026',
      readTime: '5 min read',
      image: 'assets/gst_lut.png',

      introduction:
        'A Letter of Undertaking, commonly referred to as LUT, can be relevant to eligible businesses involved in exports under GST. Understanding the purpose and applicable requirements can help businesses manage their export-related compliance.',

      sections: [
        {
          heading: 'What is GST LUT?',
          paragraphs: [
            'An LUT is a declaration used in the context of eligible exports under GST, subject to the applicable rules and conditions.'
          ]
        },

        {
          heading: 'Why Is It Important for Exporters?',
          paragraphs: [
            'Eligible exporters may use an LUT for applicable export transactions without payment of integrated tax, subject to the relevant GST requirements.'
          ]
        },

        {
          heading: 'What Should Businesses Keep Ready?',
          paragraphs: [
            'Businesses should maintain accurate registration and export-related information and understand the conditions applicable to their transactions.'
          ]
        },

        {
          heading: 'How Sakhi Can Help',
          paragraphs: [
            'Sakhi can assist eligible businesses with GST LUT-related documentation and compliance support.'
          ]
        }
      ],

      relatedService: 'GST Services',
      relatedServiceLink: '/services'
    },


    // =====================================================
    // ITR
    // =====================================================

    {
      slug: 'itr-filing-business-guide',
      category: 'GST & Tax',
      title: 'ITR Filing for Businesses: Understanding the Basics',
      excerpt:
        'Learn about income tax return filing, common ITR forms and the importance of maintaining accurate financial records.',
      date: 'September 04, 2026',
      readTime: '6 min read',
      image: 'assets/itr.png',

      introduction:
        'Income tax return filing is an important annual responsibility for eligible taxpayers and businesses. Proper records and appropriate return selection can make the process more organized.',

      sections: [
        {
          heading: 'Why ITR Filing Matters',
          paragraphs: [
            'Income tax return filing helps eligible taxpayers report their income and applicable tax information to the income tax authorities.'
          ]
        },

        {
          heading: 'Common Areas of Support',
          paragraphs: [
            'The appropriate filing requirements depend on the taxpayer and their income and financial circumstances.'
          ],
          points: [
            'ITR-1 to ITR-4 filing',
            'Capital gains tax advisory',
            'NRI income tax returns',
            'Tax audit support'
          ]
        },

        {
          heading: 'Keep Your Records Organized',
          paragraphs: [
            'Maintaining accurate income, expense, investment and other relevant records can help make tax filing more efficient.'
          ]
        },

        {
          heading: 'How Sakhi Can Help',
          paragraphs: [
            'Sakhi can provide support for applicable income tax return preparation and filing requirements.'
          ]
        }
      ],

      relatedService: 'ITR Filing & Return',
      relatedServiceLink: '/services'
    },


    // =====================================================
    // TAX COMPLIANCE
    // =====================================================

    {
      slug: 'business-tax-compliance',
      category: 'Compliance',
      title: 'Business Tax Compliance: What Should You Keep Track Of?',
      excerpt:
        'From TDS and TCS to advance tax and statutory requirements, understand the common compliance areas businesses need to monitor.',
      date: 'August 30, 2026',
      readTime: '7 min read',
      image: 'assets/tax_compliance.png',

      introduction:
        'Tax compliance involves more than filing one return each year. Depending on the business, there can be several recurring tax and statutory responsibilities to manage.',

      sections: [
        {
          heading: 'Common Compliance Areas',
          paragraphs: [
            'The exact compliance requirements depend on the nature and structure of the business.'
          ],
          points: [
            'TDS / TCS filing',
            'Advance tax calculation',
            'Corporate tax compliance',
            'Statutory audit assistance'
          ]
        },

        {
          heading: 'Why Regular Compliance Matters',
          paragraphs: [
            'Keeping compliance activities organized can help businesses avoid missed deadlines and maintain better financial records.'
          ]
        },

        {
          heading: 'How Sakhi Can Help',
          paragraphs: [
            'Sakhi can help businesses understand and manage applicable tax and statutory compliance requirements.'
          ]
        }
      ],

      relatedService: 'Tax Compliance',
      relatedServiceLink: '/services'
    },


    // =====================================================
    // BUSINESS COMPLIANCE
    // =====================================================

    {
      slug: 'business-compliance-checklist',
      category: 'Compliance',
      title: 'Business Compliance Checklist for Small Businesses',
      excerpt:
        'A practical overview of the registrations, filings and routine compliance responsibilities that businesses should keep organized.',
      date: 'August 26, 2026',
      readTime: '7 min read',
      image: 'assets/business_compliance.png',

      introduction:
        'Running a business involves several registrations, filings and recurring responsibilities. Keeping these activities organized can make day-to-day business management easier.',

      sections: [
        {
          heading: 'Start With Your Registrations',
          paragraphs: [
            'Businesses should identify the registrations and licenses that apply to their activities and keep the relevant records organized.'
          ]
        },

        {
          heading: 'Track Recurring Filings',
          paragraphs: [
            'Depending on the business, recurring tax and statutory filings may need to be monitored throughout the year.'
          ],
          points: [
            'GST compliance',
            'Income tax filing',
            'TDS / TCS compliance',
            'License renewals',
            'Other applicable statutory requirements'
          ]
        },

        {
          heading: 'How Sakhi Can Help',
          paragraphs: [
            'Sakhi provides practical compliance support so business owners can focus on their core business while keeping important requirements organized.'
          ]
        }
      ],

      relatedService: 'Tax Compliance',
      relatedServiceLink: '/services'
    },


    // =====================================================
    // PROJECT REPORT
    // =====================================================

    {
      slug: 'business-project-report',
      category: 'Business & Digital',
      title: 'Why a Strong Project Report Matters for Business Funding',
      excerpt:
        'Understand how project reports, financial projections and feasibility studies can help when preparing for business funding.',
      date: 'August 22, 2026',
      readTime: '5 min read',
      image: 'assets/project_report.png',

      introduction:
        'A well-prepared project report can help present a business idea, financial plan and funding requirement in a structured manner.',

      sections: [
        {
          heading: 'What is a Project Report?',
          paragraphs: [
            'A project report is a structured document that explains a proposed or existing business, its financial requirements, projections and overall feasibility.'
          ]
        },

        {
          heading: 'Where Can It Be Useful?',
          paragraphs: [
            'Project reports may be prepared for different business planning and funding purposes.'
          ],
          points: [
            'Bank loan CMA data',
            'Government subsidy DPR',
            'Financial projections',
            'Feasibility reports'
          ]
        },

        {
          heading: 'How Sakhi Can Help',
          paragraphs: [
            'Sakhi can help businesses organize relevant business and financial information into a structured project report based on their requirements.'
          ]
        }
      ],

      relatedService: 'Project Report',
      relatedServiceLink: '/services'
    },


    // =====================================================
    // WEBSITE
    // =====================================================

    {
      slug: 'business-website-guide',
      category: 'Business & Digital',
      title: 'Why Your Business Needs a Professional Website',
      excerpt:
        'A professional website can help your business establish credibility, explain its services and make it easier for customers to connect with you.',
      date: 'August 18, 2026',
      readTime: '5 min read',
      image: 'assets/business_web.png',

      introduction:
        'For many businesses, a website is an important part of their digital presence. It gives potential customers a place to understand the business, explore its services and find contact information.',

      sections: [
        {
          heading: 'Build Business Credibility',
          paragraphs: [
            'A well-structured website can give customers a clear understanding of who you are, what you offer and how they can contact you.'
          ]
        },

        {
          heading: 'What Should a Business Website Include?',
          paragraphs: [
            'The exact structure depends on the business, but a professional website commonly includes clear information about the business and its services.'
          ],
          points: [
            'Business introduction',
            'Services',
            'Contact information',
            'Clear calls to action',
            'Mobile-friendly design',
            'Relevant business information'
          ]
        },

        {
          heading: 'How Sakhi Can Help',
          paragraphs: [
            'Sakhi provides web development support for businesses that want a modern online presence designed around their customers and business requirements.'
          ]
        }
      ],

      relatedService: 'Web Development',
      relatedServiceLink: '/services'
    }

  ];


  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      const slug = params.get('slug');

      this.insight = this.insights.find(
        insight => insight.slug === slug
      );

      if (!this.insight) {
        this.router.navigate(['/insights']);
      }

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    });

  }


}
