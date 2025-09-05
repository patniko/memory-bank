## Rules
Always capture architecture changes or new implementations with diagrams, requirements and specification to go with features and tasks. When you complete all tasks move the document to a completed folder under tasks and any feature files related to it under a completed folder in the features folder. Make sure architecture, technical, vision, performance and issues documents are updated with important context information.

To learn more about the project and its document structure refer to folder-structure.md and important-conventions.md

Always update .gitignore if there are files or folders added to the repo that should not be committed

Create or update a agent-memory-bank.md document with critical instructions for developers making code changes to this project if there is information that will speed up other feature implementations

## General Conventions
- Always use typesafe languages when available. When using javascript always use typescript.
- If existing standards for testing, authentication, api key storage, etc are used in the project than follow them consistently instead of trying to introduce new ones

## File Naming Conventions

- Use lowercase with hyphens: `file-name.md`
- Be descriptive and specific: `auth-standards.md` not `auth.md`
- Include version dates for major updates: `api-v2-2024.md`
- Use consistent prefixes for related files: `perf-optimization.md`, `perf-benchmarks.md`
- Features and task files should use a `{DDMMYY-name.md}` format

## Content Guidelines

### File Size Limits
- Maximum 1500 lines per file
- Split large documents into logical sections
- Use cross-references between related files

### Format Standards
- Use Markdown format (.md)
- Include clear headings and table of contents
- Use consistent formatting across all documents
- Include last updated dates and change logs

### Cross-References
- Link related documents using relative paths
- Maintain bidirectional references where appropriate
- Use consistent link text and formatting