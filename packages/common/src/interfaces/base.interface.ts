export interface BaseEntity {
  id: string | number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SoftDeletableEntity extends BaseEntity {
  deletedAt?: Date;
}

export interface WithTimestamps {
  createdAt: Date;
  updatedAt: Date;
}