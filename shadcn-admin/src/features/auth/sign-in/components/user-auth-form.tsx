// src/features/auth/sign-in/components/user-auth-form.tsx
import { HTMLAttributes } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { IconLoader2 } from '@tabler/icons-react'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/authStore'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'
import { login } from '../../api/authAPI'
import { loginSchema } from '../../schemas'

type UserAuthFormProps = HTMLAttributes<HTMLFormElement>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const navigate = useNavigate()
  const { redirect }: { redirect?: string } = useSearch({
    from: '/(auth)/sign-in',
  })
  const { setUser, setAuthenticated } = useAuthStore()

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      toast.success('Login successful! Welcome back.')
      setUser(user)
      setAuthenticated(true)
      // Redirect to the intended page or dashboard
      navigate({ to: redirect || '/' })
    },
    onError: (error) => {
      toast.error(
        error.message || 'Login failed. Please check your credentials.'
      )
    },
  })

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  function onSubmit(data: z.infer<typeof loginSchema>) {
    mutation.mutate(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-3', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='name@example.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
              <Link
                to='/forgot-password'
                className='text-muted-foreground absolute -top-0.5 right-0 text-sm font-medium hover:opacity-75'
              >
                Forgot password?
              </Link>
            </FormItem>
          )}
        />
        <Button className='mt-2' disabled={mutation.isPending}>
          {mutation.isPending && (
            <IconLoader2 className='mr-2 h-4 w-4 animate-spin' />
          )}
          {mutation.isPending ? 'Logging in...' : 'Login'}
        </Button>

        {/* ... Social login buttons ... */}
      </form>
    </Form>
  )
}
