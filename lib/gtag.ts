export const TRACKING_ID = process.env.NEXT_GA_TRACKING_ID

export const pageview = (url: string) => {
  if (typeof window.gtag == 'undefined') return

  window.gtag('config', TRACKING_ID as string, {
    page_path: url,
  })
}

interface GTagEventProps {
  action: string
  category: string
  label: string
  value: number
}

export const event = ({ action, category, label, value }: GTagEventProps) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  })
}
