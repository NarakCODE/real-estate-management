import { Model, FilterQuery } from "mongoose";

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

export async function paginate<T>(
  model: Model<T>,
  filter: FilterQuery<T>,
  page: number,
  limit: number
): Promise<PaginatedResult<T>> {
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    model.find(filter).skip(skip).limit(limit),
    model.countDocuments(filter),
  ]);
  return {
    data,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}
