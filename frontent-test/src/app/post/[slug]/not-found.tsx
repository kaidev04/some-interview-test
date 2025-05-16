import { NotFoundError } from '@/components/common'

export default function NotFound() {
  return (
    <NotFoundError
      title="Inlägget hittades inte"
      message="Det inlägg du letar efter finns inte eller har flyttats."
    />
  )
} 