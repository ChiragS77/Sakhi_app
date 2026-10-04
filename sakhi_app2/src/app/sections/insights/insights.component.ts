import { Component } from '@angular/core';


interface Insight {
  id: number;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  featured?: boolean;
  image: string;
}

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css']
})
export class InsightsComponent {
 // =====================================================
  // SEARCH & CATEGORY
  // =====================================================

  searchTerm = '';
  selectedCategory = 'All';

  categories = [
    'All',
    'Business Registration',
    'GST & Tax',
    'Compliance',
    'Business & Digital'
  ];

  // =====================================================
  // DEFAULT FALLBACK IMAGE
  // =====================================================

  defaultImage = 'assets/business_compliance.png';

  // =====================================================
  // INSIGHTS DATA
  // =====================================================

  insights: Insight[] = [

    {
      id: 1,
      slug: 'gst-registration-guide',
      category: 'GST & Tax',
      title: 'GST Registration: A Simple Guide for Businesses',
      excerpt:
        'Understand GST registration, eligibility and the basic steps businesses should know before getting started.',
      date: 'September 5, 2026',
      readTime: '6 min read',
      featured: true,
      image: 'assets/gst_returning.png'
    },

    {
      id: 2,
      slug: 'udyam-msme-registration',
      category: 'Business Registration',
      title: 'Udyam Registration: Why MSME Registration Matters',
      excerpt:
        'Learn how Udyam registration can help small businesses access recognition, benefits and business opportunities.',
      date: 'September 1, 2026',
      readTime: '5 min read',
      image: 'assets/udyam.png'
    },

    {
      id: 3,
      slug: 'fssai-license-guide',
      category: 'Business Registration',
      title: 'FSSAI License: What Food Businesses Should Know',
      excerpt:
        'A practical overview of FSSAI registration, licensing requirements and common compliance responsibilities.',
      date: 'August 28, 2026',
      readTime: '6 min read',
      image: 'assets/fssai.png'
    },

    {
      id: 4,
      slug: 'iec-registration-guide',
      category: 'Business Registration',
      title: 'IEC Registration: A Guide for Importers and Exporters',
      excerpt:
        'Understand the basics of Import Export Code registration and what businesses should know before trading internationally.',
      date: 'August 25, 2026',
      readTime: '5 min read',
      image: 'assets/iec.png'
    },

    {
      id: 5,
      slug: 'gst-return-filing-guide',
      category: 'GST & Tax',
      title: 'GST Return Filing: What Businesses Need to Know',
      excerpt:
        'Understand the basics of GST return filing and the importance of keeping your business records organized.',
      date: 'August 20, 2026',
      readTime: '6 min read',
      image: 'assets/gst_returning.png'
    },

    {
      id: 6,
      slug: 'gst-lut-guide',
      category: 'GST & Tax',
      title: 'GST LUT: When Is It Useful for Businesses?',
      excerpt:
        'Understand how a Letter of Undertaking can be useful for eligible businesses making zero-rated supplies.',
      date: 'August 16, 2026',
      readTime: '5 min read',
      image: 'assets/gst_lut.png'
    },

    {
      id: 7,
      slug: 'itr-filing-business-guide',
      category: 'GST & Tax',
      title: 'ITR Filing for Businesses: What Should You Prepare?',
      excerpt:
        'A practical guide to preparing your records and information before filing your income tax return.',
      date: 'August 12, 2026',
      readTime: '6 min read',
      image: 'assets/itr.png'
    },

    {
      id: 8,
      slug: 'business-tax-compliance',
      category: 'Compliance',
      title: 'Business Tax Compliance: What Should You Keep Track Of?',
      excerpt:
        'From TDS and TCS to advance tax and statutory requirements, understand the common compliance areas businesses need to monitor.',
      date: 'August 30, 2026',
      readTime: '7 min read',
      image: 'assets/tax_compliance.png'
    },

    {
      id: 9,
      slug: 'business-compliance-checklist',
      category: 'Compliance',
      title: 'Business Compliance Checklist for Small Businesses',
      excerpt:
        'A practical overview of the registrations, filings and routine compliance responsibilities that businesses should keep organized.',
      date: 'August 26, 2026',
      readTime: '7 min read',
      image: 'assets/business_compliance.png'
    },

    {
      id: 10,
      slug: 'business-project-report',
      category: 'Business & Digital',
      title: 'Why a Strong Project Report Matters for Business Funding',
      excerpt:
        'Understand how project reports, financial projections and feasibility studies can help when preparing for business funding.',
      date: 'August 22, 2026',
      readTime: '5 min read',
      image: 'assets/project_report.png'
    },

    {
      id: 11,
      slug: 'business-website-guide',
      category: 'Business & Digital',
      title: 'Why Your Business Needs a Professional Website',
      excerpt:
        'Learn how a professional website can improve your business presence, credibility and digital reach.',
      date: 'August 18, 2026',
      readTime: '5 min read',
      image: 'assets/business_web.png'
    }

  ];

  // =====================================================
  // FEATURED INSIGHT
  // =====================================================

  get featuredInsight(): Insight | undefined {
    return this.insights.find(
      insight => insight.featured === true
    );
  }

  // =====================================================
  // FILTERED INSIGHTS
  // =====================================================

  get filteredInsights(): Insight[] {

    const search = this.searchTerm.trim().toLowerCase();

    return this.insights.filter(insight => {

      const matchesCategory =
        this.selectedCategory === 'All' ||
        insight.category === this.selectedCategory;

      const matchesSearch =
        !search ||
        insight.title.toLowerCase().includes(search) ||
        insight.excerpt.toLowerCase().includes(search) ||
        insight.category.toLowerCase().includes(search);

      return matchesCategory && matchesSearch;
    });
  }

  // =====================================================
  // LATEST INSIGHTS
  // =====================================================

  get latestInsights(): Insight[] {

    return this.filteredInsights.filter(
      insight => !insight.featured
    );

  }

  // =====================================================
  // CATEGORY
  // =====================================================

  selectCategory(category: string): void {

    this.selectedCategory = category;

  }

  // =====================================================
  // SEARCH
  // =====================================================

  clearSearch(): void {

    this.searchTerm = '';

  }

  // =====================================================
  // IMAGE FALLBACK
  // =====================================================

  onImageError(event: Event): void {

    const image = event.target as HTMLImageElement;

    if (!image) {
      return;
    }

    // Prevent infinite loop if fallback itself fails
    if (image.src.includes(this.defaultImage)) {
      return;
    }

    image.src = this.defaultImage;

  }
}
