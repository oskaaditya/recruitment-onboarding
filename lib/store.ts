import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type BrandAesthetic = 'modern' | 'corporate' | 'playful' | 'minimal'
export type FontStyle = 'sans-serif' | 'serif' | 'monospace' | 'display'

export interface OnboardingData {
  // Step 1: Company Details
  companyName: string
  tagline: string
  industry: string

  // Step 2: Brand Style
  brandAesthetic: BrandAesthetic
  primaryColor: string
  secondaryColor: string
  fontStyle: FontStyle

  // Step 3: Inspiration
  inspirationLinks: string[]
  inspirationImages: Array<{ id: string; url: string; file: File | null }>
}

interface OnboardingStore {
  data: OnboardingData
  currentStep: number
  setCurrentStep: (step: number) => void
  updateData: (data: Partial<OnboardingData>) => void
  addInspirationLink: (link: string) => void
  removeInspirationLink: (index: number) => void
  addInspirationImage: (image: { id: string; url: string; file: File | null }) => void
  removeInspirationImage: (id: string) => void
  reset: () => void
}

const defaultData: OnboardingData = {
  companyName: '',
  tagline: '',
  industry: '',
  brandAesthetic: 'modern',
  primaryColor: '#3b82f6',
  secondaryColor: '#8b5cf6',
  fontStyle: 'sans-serif',
  inspirationLinks: [],
  inspirationImages: [],
}

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      data: defaultData,
      currentStep: 1,
      setCurrentStep: (step) => set({ currentStep: step }),
      updateData: (newData) =>
        set((state) => ({
          data: { ...state.data, ...newData },
        })),
      addInspirationLink: (link) =>
        set((state) => ({
          data: {
            ...state.data,
            inspirationLinks: [...state.data.inspirationLinks, link],
          },
        })),
      removeInspirationLink: (index) =>
        set((state) => ({
          data: {
            ...state.data,
            inspirationLinks: state.data.inspirationLinks.filter((_, i) => i !== index),
          },
        })),
      addInspirationImage: (image) =>
        set((state) => ({
          data: {
            ...state.data,
            inspirationImages: [...state.data.inspirationImages, image],
          },
        })),
      removeInspirationImage: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            inspirationImages: state.data.inspirationImages.filter((img) => img.id !== id),
          },
        })),
      reset: () => set({ data: defaultData, currentStep: 1 }),
    }),
    {
      name: 'onboarding-storage', // unique name for localStorage key
      skipHydration: false, // enable hydration
    }
  )
)

