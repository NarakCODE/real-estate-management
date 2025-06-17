import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/landing/properties/$propertiesId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { propertiesId } = Route.useParams()

  return (
    <div className='container mx-auto p-6'>
      <h1 className='mb-4 text-3xl font-bold'>Property Details</h1>
      <p className='text-lg'>Property ID: {propertiesId}</p>

      {/* Add your actual property details content here */}
      <div className='mt-6 rounded-lg bg-white p-6 shadow-md'>
        <h2 className='mb-4 text-xl font-semibold'>Property Information</h2>
        <p>This is the detailed view for property: {propertiesId}</p>
        {/* Fetch and display actual property data */}
      </div>
    </div>
  )
}
