export interface Property {
  _id: string
  title: string
  description: string
  propertyType: string
  status: string
  availability: string
  price: number
  currency: string
  location: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
    coordinates: {
      lat: number
      lng: number
    }
    _id: string
  }
  features: {
    bedrooms: number
    bathrooms: number
    area: number
    lotSize: number
    yearBuilt: number
    parkingSpots: number
    _id: string
  }
  images: string[]
  videoTourUrl: string
  agentId: {
    _id: string
    email: string
    name: string
    phone: string
    avatarUrl: string
  }
  isFeatured: boolean
  views: number
  createdAt: string
  updatedAt: string
  slug: string
  reviews: Review[]
}

export interface Author {
  _id: string
  name: string
  roleId: string
  avatarUrl: string | null
}

export interface Review {
  _id: string
  authorId: Author
  propertyId: string
  rating: number
  comment: string
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
}
export interface PropertiesResponse {
  message: string
  data: Property[]
  pagination: {
    currentPage: number
    totalPages: number
    totalCount: number
    hasNextPage: boolean
    hasPrevPage: boolean
    limit: number
  }
  filters: {
    propertyName: string | null
    status: string | null
    propertyType: string | null
    sortBy: string
    sortOrder: 'asc' | 'desc'
  }
}

export interface PropertiesFilter {
  propertyName?: string
  status?: string
  propertyType?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

export interface Pagination {
  currentPage: number
  totalPages: number
  totalCount: number
  hasNextPage: boolean
  hasPrevPage: boolean
  limit: number
}

export interface Amenity {
  _id: string
  name: string
  description?: string
  iconUrl?: string
  createdAt: string
  updatedAt: string
}

export interface AmenitiesResponse {
  message: string
  data: Amenity[]
}
