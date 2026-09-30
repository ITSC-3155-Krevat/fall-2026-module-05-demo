---
name: pr-review
description: Conducts a structured, rigorous code review on git diffs or pull requests. Use when reviewing code changes, checking PRs, or analyzing git diffs for bugs, security risks, and style.
---

# PR Review Skill

Perform an expert-level code review on the provided diff or pull request. Focus on bug prevention, security vulnerabilities, performance bottlenecks, and adherence to clean code principles.

## Review Workflow

Follow these steps sequentially. Do not skip any step.

1. **Context & Intent Gathering**: Read the diff to understand *what* changed and *why*.
2. **Security & Vulnerability Scan**: Check for hardcoded secrets, SQL injection, unsafe deserialization, missing input sanitization, and OWASP Top 10 issues.
3. **Correctness & Logic Check**: Look for off-by-one errors, unhandled promise rejections, race conditions, null/undefined pointer risks, or broken business logic.
4. **Performance & Scalability**: Identify $O(N^2)$ loops, N+1 query problems, memory leaks, or unindexed database operations.
5. **Maintainability & Testability**: Check if edge cases are covered by tests and evaluate overall code clarity.

## Output Format Constraints

You MUST output your review in the following Markdown structure:

### 1. Executive Summary
A 2-3 sentence overview of the PR's goal and overall quality assessment.

### 2. Critical Blockers (Must Fix)
- [ ] **[File Path : Line Number]** Description of critical bug or security flaw.
*(If none, state "No critical blockers found.")*

### 3. Suggestions & Refactorings (Nice to Have)
- **[File Path : Line Number]** Description of performance, readability, or minor issue.

### 4. Review Verdict
State clearly: **APPROVE**, **NEEDS_CHANGES**, or **COMMENT**.

## Gotchas & Rules
- Do NOT critique formatting or indentation unless it violates language syntax or alters execution logic.
- Always provide concrete, corrected code snippets for any identified issue.
- Maintain a constructive, peer-level professional tone.
