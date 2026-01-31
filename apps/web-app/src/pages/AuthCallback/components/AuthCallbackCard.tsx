import { Card, CardContent } from '@justdx/components/atoms/Card'

type AuthCallbackCardProps = {
  message: string
}

export function AuthCallbackCard({ message }: AuthCallbackCardProps) {
  return (
    <Card className="w-full max-w-md shadow-xl border-0">
      <CardContent className="py-10 text-center">
        <p className="text-sm text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  )
}
