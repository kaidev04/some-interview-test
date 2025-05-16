import { NotFoundError } from '@/components/common'

export default function NotFound() {
  return (
    <NotFoundError
      title="Sidan hittades inte"
      message="Kontaktsidan du letar efter finns inte eller har flyttats."
    />
  )
} 