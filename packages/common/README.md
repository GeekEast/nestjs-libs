# @future.ai/common

Common utilities, decorators, and interfaces for NestJS applications.

## Installation

```bash
npm install @future.ai/common
```

## Features

- 🎯 **Decorators**: Useful decorators for NestJS controllers and services
- 🛠️ **Utilities**: Helper functions for common tasks
- 📋 **Interfaces**: Reusable TypeScript interfaces

## Usage

### Decorators

#### @Public()

Mark routes as public (skip authentication):

```typescript
import { Public } from '@future.ai/common';

@Controller('auth')
export class AuthController {
  @Public()
  @Post('login')
  login() {
    // This route is public
  }
}
```

#### @ApiStandardResponse()

Standardize API responses with Swagger documentation:

```typescript
import { ApiStandardResponse } from '@future.ai/common';

@Controller('users')
export class UsersController {
  @Get()
  @ApiStandardResponse(UserDto, 'Returns list of users')
  findAll() {
    return this.usersService.findAll();
  }
}
```

### Utilities

#### Response Utils

Create standardized API responses:

```typescript
import { createSuccessResponse, createErrorResponse } from '@future.ai/common';

// Success response
const response = createSuccessResponse(data, 'Operation successful');

// Error response
const error = createErrorResponse('Something went wrong', { code: 'ERR001' });
```

#### Pagination Utils

Handle paginated results:

```typescript
import { createPaginatedResult, PaginationOptions } from '@future.ai/common';

const options: PaginationOptions = {
  page: 1,
  limit: 10,
  sortBy: 'createdAt',
  sortOrder: 'DESC'
};

const result = createPaginatedResult(items, totalCount, options);
```

### Interfaces

Common interfaces for entities:

```typescript
import { BaseEntity, SoftDeletableEntity, WithTimestamps } from '@future.ai/common';

interface User extends BaseEntity {
  email: string;
  name: string;
}

interface Product extends SoftDeletableEntity {
  name: string;
  price: number;
}
```

## API Reference

### Decorators

- `@Public()` - Mark route as public
- `@ApiStandardResponse(model, description?)` - Swagger response decorator

### Utils

- `createSuccessResponse<T>(data: T, message?: string)` - Create success response
- `createErrorResponse(message: string, error?: any)` - Create error response
- `createPaginatedResult<T>(items: T[], total: number, options: PaginationOptions)` - Create paginated result

### Interfaces

- `BaseEntity` - Base entity with id and timestamps
- `SoftDeletableEntity` - Entity with soft delete support
- `WithTimestamps` - Interface for timestamp fields

## License

MIT © Future AI