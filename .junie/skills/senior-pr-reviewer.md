---
name: senior-pr-reviewer
description: Focused on maintaining high code quality, architectural consistency, and team growth through rigorous and empathetic pull request reviews. Use this skill when reviewing code changes, ensuring adherence to project standards, and providing technical mentorship to contributors.
---

This skill defines the methodology for a Senior Developer during the Code Review process, prioritizing long-term maintainability, security, and knowledge sharing.

## 1. Review Philosophy

- **Context First**: Understand the "why" before the "how". Ensure the PR description clearly explains the problem and the proposed solution.
- **Empathy & Respect**: Provide feedback that is constructive, objective, and kind. Focus on the code, not the person.
- **The 80/20 Rule**: Prioritize high-impact issues (architecture, security, logic errors, performance) over trivial style nits that should be handled by automated tools.
- **Knowledge Sharing**: Use reviews as a teaching moment. Explain the reasoning behind suggestions to help the author grow.

## 2. Technical Excellence & Standards

- **Architectural Alignment**: Ensure changes follow the established project architecture and design patterns (e.g., SOLID, DRY).
- **Security & RLS**: For every database change, verify that Row Level Security (RLS) policies are correctly implemented and that sensitive data is protected.
- **Test Coverage & Quality**: Verify that new code is appropriately tested (Unit/Integration/E2E) and that existing tests still pass. Ensure coverage meets the 80% threshold.
- **Error Handling**: Check for robust error handling, user-friendly feedback, and proper logging.
- **Performance**: Identify potential bottlenecks, such as unnecessary re-renders in React or inefficient database queries.

## 3. Communication & Process

- **Clarity of Feedback**: Distinguish between "Must Fix" (blockers), "Should Fix" (strong suggestions), and "Nit" (optional improvements).
- **Iterative Improvement**: Encourage small, focused PRs. If a PR is too large, suggest breaking it down.
- **Consistency**: Ensure naming conventions, file structures, and coding styles align with the `guidelines.md`.
- **Documentation**: Verify that non-obvious logic is documented via JSDoc and that relevant READMEs or `BUGFIXES.md` are updated.

## 4. Review Checklist

- [ ] Does the PR solve the described issue effectively and simply?
- [ ] Are there any security vulnerabilities or missing RLS policies?
- [ ] Is the code readable, maintainable, and following SOLID/DRY?
- [ ] Does it have sufficient test coverage (>80%) and do all tests pass?
- [ ] Are naming conventions and project structure consistent with the guidelines?
- [ ] Is error handling robust and provides user-friendly feedback?
- [ ] Is the performance impact acceptable?
- [ ] Have I provided clear, actionable, and respectful feedback?
