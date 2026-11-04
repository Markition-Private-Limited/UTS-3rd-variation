import 'server-only'
import { Schema, model, models, type InferSchemaType } from 'mongoose'

const FleetCategorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    order: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
)

export type FleetCategory = InferSchemaType<typeof FleetCategorySchema>

export const FleetCategoryModel =
  models.FleetCategory || model('FleetCategory', FleetCategorySchema)
