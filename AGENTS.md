# Project: E-Commerce Cart (Full-Stack - NO ORM)

## Tech Stack Overview
- **Frontend:** Angular 21 (Single Page Application)
- **Backend:** .NET 9 Web API (Minimal APIs, C# 13)
- **Database:** MS SQL Server via Pure ADO.NET (`Microsoft.Data.SqlClient`)
- **Infrastructure:** Frontend on `http://localhost:4200`, Backend on `https://localhost:7001`

## Full-Stack Integration & Business Rules
- **Contract Matching:** Map .NET PascalCase properties to Angular camelCase properties.
- **Trust No Client (Checkout):** The `CheckoutComponent` will only send an array of `ProductId` and `Quantity`. The backend MUST independently query the database for the current prices and calculate the total order price. Do NOT trust frontend pricing data.
- **Data Fetching:** Use `httpResource()` in Angular for Signal-integrated API calls.
- **Error Handling:** Backend returns `ProblemDetails` (RFC 7807); Frontend maps these to accessible Signal-based error states.

## .NET 9 Backend Standards (STRICT NO-ORM)
- **NO ORMs:** Entity Framework Core, Dapper, and any other mapping libraries are strictly forbidden.
- **Data Access:** All database interactions must use pure ADO.NET (`SqlConnection`, `SqlCommand`, `SqlDataReader`).
- **Architecture:** Use the Repository Pattern to encapsulate all raw SQL logic.
- **Security:** Always use parameterized queries (e.g., `@ProductId`) to prevent SQL injection.
- **Endpoints:** Use Minimal APIs (`app.MapGet`, `app.MapPost`). Keep endpoints clean by delegating database logic to repositories.


## TypeScript Best Practices
- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices
- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images. `NgOptimizedImage` does not work for inline base64 images.

## Components & Templates
- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.
- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.

## State Management & Services
- Use signals for local component state AND global state (e.g., Shopping Cart items).
- Use `computed()` for derived state (e.g., Cart Total, Item Count).
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead
- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

## Accessibility Requirements
- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.