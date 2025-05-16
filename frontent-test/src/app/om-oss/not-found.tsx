import { NotFoundError } from '@/components/common'

export default function NotFound() {
  return (
    <NotFoundError
      title="Sidan hittades inte"
      message="Sidan du letar efter finns inte eller har flyttats."
    />
  )
} 