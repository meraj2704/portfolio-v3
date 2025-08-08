'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { login } from '@/lib/auth' // Client component calling a Server Action

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const result = await login(password)
    if (result.success) {
      toast({
        title: 'Login Successful',
        description: 'Redirecting to admin dashboard.',
        variant: 'default',
      })
      router.push('/admin/dashboard')
    } else {
      toast({
        title: 'Login Failed',
        description: result.error || 'Please check your password.',
        variant: 'destructive',
      })
    }
    setIsLoading(false)
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background text-foreground">
      <Card className="w-full max-w-sm bg-card border-border">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>Enter your password to access the admin panel.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <Input
              id="password"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground"
            />
            <Button type="submit" className="w-full bg-accent-primary hover:bg-accent-secondary" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
