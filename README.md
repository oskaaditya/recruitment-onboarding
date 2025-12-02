# Recruitment Onboarding

A modern, multi-step onboarding wizard built with Next.js that helps recruitment companies create and customize their company profile. The application features a live preview that updates in real-time as users configure their brand identity.

## 🚀 Features

- **Multi-Step Onboarding Flow**: Intuitive 4-step wizard to collect company information
  - **Step 1: Company Details** - Company name, tagline, and industry selection
  - **Step 2: Brand Style** - Customize brand aesthetic, colors, and typography
  - **Step 3: Inspiration** - Add inspiration links and images
  - **Step 4: Review** - Review and confirm all entered information

- **Live Preview**: Real-time website preview that updates as you customize your brand
- **State Persistence**: Form data is automatically saved to localStorage using Zustand
- **Form Validation**: Robust form validation using React Hook Form and Zod
- **Responsive Design**: Fully responsive layout that works on all device sizes
- **Modern UI**: Built with Radix UI primitives and Tailwind CSS for a polished experience

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) with persistence middleware
- **Form Management**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) primitives (via shadcn/ui)
- **File Upload**: [React Dropzone](https://react-dropzone.js.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📋 Prerequisites

- Node.js 18+ 
- pnpm (recommended), npm, yarn, or bun

## 🏃 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd recruitment-onboarding
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
recruitment-onboarding/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Main onboarding page
│   ├── preview/           # Standalone preview page
│   │   └── page.tsx
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── onboarding/        # Onboarding step components
│   │   ├── step-company-details.tsx
│   │   ├── step-brand-style.tsx
│   │   ├── step-inspiration.tsx
│   │   ├── step-review.tsx
│   │   ├── live-branding-preview.tsx
│   │   └── website-preview.tsx
│   ├── ui/                # Reusable UI components (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── stepper.tsx
│   │   └── textarea.tsx
│   └── kibo-ui/           # Custom UI components
│       └── dropzone/
├── lib/
│   ├── store.ts           # Zustand store for state management
│   └── utils.ts           # Utility functions
└── public/                # Static assets
```

## 📜 Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint to check for code issues

## 🎨 Key Features Explained

### State Management

The application uses Zustand with persistence middleware to manage onboarding data. The store automatically saves to localStorage, so users can refresh the page without losing their progress.

```typescript
// Store location: lib/store.ts
import { useOnboardingStore } from '@/lib/store'
```

### Form Validation

Each step uses React Hook Form with Zod schemas for type-safe validation:

- Company Details: Validates required fields (company name, industry)
- Brand Style: Provides default values for all brand settings
- Inspiration: Optional step for adding links and images

### Live Preview

The preview component (`LiveBrandingPreview`) subscribes to the Zustand store and updates in real-time as users modify their brand settings. It renders a complete website preview with:

- Hero section with gradient background
- About section
- Services section with interactive cards
- Contact section

### Brand Customization

Users can customize:
- **Brand Aesthetic**: Modern, Corporate, Playful, or Minimal
- **Colors**: Primary and secondary color pickers
- **Typography**: Sans-serif, Serif, Monospace, or Display fonts

## 🔧 Development

### Adding New Steps

1. Create a new component in `components/onboarding/`
2. Add the step to the `steps` array in `app/page.tsx`
3. Update the `renderStepContent()` function
4. Add validation logic to `canProceed()` if needed
5. Update the store interface in `lib/store.ts` if new data fields are needed

### Customizing UI Components

UI components are based on shadcn/ui and can be customized by editing files in `components/ui/`. The components use Tailwind CSS for styling.

## 🚢 Deployment

The easiest way to deploy this Next.js application is using [Vercel](https://vercel.com):

1. Push your code to a Git repository
2. Import your repository on Vercel
3. Vercel will automatically detect Next.js and configure the build settings
4. Deploy!

For more deployment options, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## 📝 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. For questions or suggestions, please contact the project maintainers.
