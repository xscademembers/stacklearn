# Stack Learn Website - Setup Instructions

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to `http://localhost:3000`

## Project Overview

This is a Next.js 14 application built with:
- TypeScript for type safety
- Tailwind CSS for styling
- React Icons for icons
- App Router for routing

## Key Features Implemented

✅ Complete header with all navigation menus and dropdowns
✅ Comprehensive footer with all links and contact information
✅ Home page with all 9 sections as specified
✅ About Us page with mission, vision, and values
✅ Destinations pages (parent + UK subpage as example)
✅ Services page with all service cards
✅ Study Abroad Steps page with complete journey
✅ Test Preparation page
✅ Scholarships page with filters
✅ Success Stories page
✅ Blog/Resources page
✅ Contact Us page with form
✅ Apply Now multi-step form
✅ Payment Gateway page
✅ Schedule Meeting page
✅ Trainings page with categories
✅ Branches page
✅ Certificate verification page
✅ Chat Window component
✅ Dynamic Scroll Updates component
✅ Leads Generation Popup

## API Routes Created

- `/api/leads` - For lead generation
- `/api/contact` - For contact form submissions
- `/api/applications` - For application submissions

## Next Steps for Backend Integration

1. **Database Setup**
   - Set up PostgreSQL/MySQL database
   - Create tables for leads, applications, payments, certificates, etc.

2. **Email Service**
   - Integrate email service (SendGrid, AWS SES, etc.)
   - Set up email templates

3. **Payment Gateway**
   - Integrate Razorpay/PayU/Stripe
   - Set up webhook handlers

4. **File Storage**
   - Set up cloud storage (AWS S3, Cloudinary) for documents
   - Implement file upload handlers

5. **Authentication**
   - Add admin authentication
   - Protect admin routes

6. **Google Maps**
   - Add Google Maps API key
   - Integrate map components

## Environment Variables Needed

Create a `.env.local` file:

```
DATABASE_URL=your_database_url
EMAIL_SERVICE_API_KEY=your_email_key
PAYMENT_GATEWAY_KEY=your_payment_key
GOOGLE_MAPS_API_KEY=your_maps_key
```

## Building for Production

```bash
npm run build
npm start
```

## Notes

- All pages are responsive and mobile-friendly
- Forms include basic validation
- API routes are stubbed and ready for backend integration
- Images use placeholder URLs - replace with actual images
- Some features like calendar integration need additional libraries

## Support

For questions or issues, contact:
- Email: info@stacklearn.com
- Phone: +91-9606031842
