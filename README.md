# divisor-client

divisor-client is a showcase app for [divisor](https://www.npmjs.com/package/divisor) package. This app provides a calculator that you can calculate divisors, common divisors, greatest common divisor (gcd) and least common multiple (lcm) of natural numbers.

## Project setup

### Installation

Please make sure that all dependencies installed before running the project.

```bash
npm i
```

### Development

Runs development environment with hot-reload.

```bash
npm run serve
```

### Production Build

Compiles and minifies app for production.

```bash
npm run build
```

### Tests

Runs unit tests.

```bash
npm run test:unit
```

Run end-to-end tests.

```bash
npm run test:e2e

# With gui
npm run test:e2e-gui
```

### Lints and fixes files

Checks source code for programmatic and stylistic errors.

```bash
npm run lint
```

## Contributing

Please review [code of conduct](.github/CODE_OF_CONDUCT.md) and [contributing guide](.github/CONTRIBUTING.md) so that you can understand what actions will and will not be tolerated.

### Pull Request Guidelines

- The `main` branch is just a snapshot of the latest stable release. All development should be done in development branches. **Do not submit PRs against the `main` branch.**
- Work in the `src` folder and **DO NOT** checkin `dist` in the commits.
- It's OK to have multiple small commits as you work on the PR
- If adding a new feature add accompanying test case.
- If fixing bug,
  - Add accompanying test case if applicable.
  - Provide a detailed description of the bug in the PR.
  - If you are resolving an opened issue add issue number in your PR title.

## License

divisor-client is [MIT licensed](./LICENSE).
