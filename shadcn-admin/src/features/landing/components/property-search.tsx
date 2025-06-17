import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const propertySearchSchema = z.object({
  propertyName: z.string(),
  status: z.enum(['For Sale', 'For Rent', '']),
  propertyType: z.enum([
    'Apartment',
    'House',
    'Condo',
    'Land',
    'Commercial',
    '',
  ]),
})

// Infer the form values type from the Zod schema to ensure compatibility
type PropertySearchValues = z.infer<typeof propertySearchSchema>

const statusOptions = ['For Sale', 'For Rent']
const propertyTypeOptions = [
  'Apartment',
  'House',
  'Condo',
  'Land',
  'Commercial',
]

export const PropertySearch = () => {
  const navigate = useNavigate()
  const form = useForm<PropertySearchValues>({
    resolver: zodResolver(propertySearchSchema),
    defaultValues: {
      propertyName: '',
      status: 'For Sale',
      propertyType: 'Apartment',
    },
  })

  function onSubmit(values: PropertySearchValues) {
    const params: Record<string, string> = {}

    if (values.propertyName) params.propertyName = values.propertyName
    if (values.status) params.status = values.status
    if (values.propertyType) params.propertyType = values.propertyType

    navigate({
      to: '/landing/properties',
      search: params,
    })

    form.reset({
      propertyName: '',
      status: 'For Sale',
      propertyType: 'Apartment',
    })
  }

  return (
    <Card className='bg-background w-full backdrop-blur-sm'>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid grid-cols-1 items-end gap-4 md:grid-cols-2 lg:grid-cols-4'
          >
            <FormField
              control={form.control}
              name='propertyName'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className='flex items-center space-x-2'>
                      <Input
                        placeholder='Enter keyword...'
                        {...field}
                        className='w-full'
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select Status' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='propertyType'
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select Type' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {propertyTypeOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size={'lg'} type='submit' className='w-full'>
              <Search className='mr-2 h-4 w-4' />
              Search
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default PropertySearch
