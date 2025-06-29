import { createPaginatedResult, createSuccessResponse, createErrorResponse } from '../src';

describe('Utils', () => {
  describe('Pagination', () => {
    it('should create paginated result with default values', () => {
      const items = [1, 2, 3];
      const total = 100;
      const result = createPaginatedResult(items, total, {});

      expect(result).toEqual({
        items,
        total: 100,
        page: 1,
        limit: 10,
        totalPages: 10,
        hasNext: true,
        hasPrevious: false,
      });
    });

    it('should calculate pagination correctly', () => {
      const items = ['a', 'b'];
      const result = createPaginatedResult(items, 25, { page: 3, limit: 5 });

      expect(result).toEqual({
        items,
        total: 25,
        page: 3,
        limit: 5,
        totalPages: 5,
        hasNext: true,
        hasPrevious: true,
      });
    });
  });

  describe('Response Utils', () => {
    it('should create success response', () => {
      const data = { id: 1, name: 'Test' };
      const response = createSuccessResponse(data, 'Custom message');

      expect(response.success).toBe(true);
      expect(response.data).toEqual(data);
      expect(response.message).toBe('Custom message');
      expect(response.timestamp).toBeDefined();
    });

    it('should create error response', () => {
      const response = createErrorResponse('Error occurred', { code: 'ERR001' });

      expect(response.success).toBe(false);
      expect(response.message).toBe('Error occurred');
      expect(response.error).toEqual({ code: 'ERR001' });
      expect(response.timestamp).toBeDefined();
    });
  });
});