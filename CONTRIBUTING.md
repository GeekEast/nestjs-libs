# Contributing to @future.ai Libraries

Thank you for your interest in contributing to @future.ai libraries! This guide will help you get started.

## Development Setup

1. Fork and clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Creating a New Library

To create a new library package:

```bash
./scripts/create-package.sh your-library-name
```

This creates a new package with all necessary configuration files.

## Development Workflow

1. Make your changes in the appropriate package
2. Write/update tests
3. Run tests to ensure everything works:
   ```bash
   npm test
   ```
4. Build the package:
   ```bash
   npm run build
   ```
5. Lint your code:
   ```bash
   npm run lint
   ```

## Testing

- Write unit tests for all new functionality
- Place tests in the `test` directory of the package
- Run tests with `npm test`
- Aim for high code coverage

## Code Style

- We use ESLint and Prettier for code formatting
- Run `npm run format` to format your code
- Follow NestJS best practices and conventions

## Commit Messages

We follow conventional commits specification:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Test additions or modifications
- `chore:` Maintenance tasks

Example:
```
feat(common): add new validation decorator
```

## Pull Request Process

1. Update documentation if needed
2. Ensure all tests pass
3. Update the README.md with details of changes if applicable
4. Submit a pull request with a clear description

## Publishing

Only maintainers can publish packages. The process is:

1. Merge PR to main branch
2. Run `./scripts/publish.sh`
3. Lerna handles versioning and publishing

## Questions?

If you have questions, please open an issue for discussion.