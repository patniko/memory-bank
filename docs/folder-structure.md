# Documentation Folder Structure

This document defines the organizational structure for this projects knowledge base.

## Overview

The documentation is organized into domain-specific folders, each managed by one or more entities that are responsible for keeping the content useful and easy to understand for readers. This structure enables efficient agent coordination and maintains clear separation of concerns.

## Folder Structure

```
docs/
├── agent-guidance/           # Agent specific guidance that is helpful
├── vision/                 # Strategic direction
│   ├── application-scope.md
│   ├── project-goals.md
│   └── roadmap.md
├── features/               # Feature specifications. Updated when new features are planned or implemented
│   ├── specifications.md
│   └── requirements.md
├── standards/              # Technical standards. Updated when big coding standards or implementations are added
│   ├── auth-standards.md
│   ├── storage-access.md
│   ├── code-style.md
│   └── architecture-standards.md
├── architecture/           # System design. Updated when new implementations are planned or implemented.
│   ├── technical-architecture.md
│   └── system-design.md
├── performance/            # Optimization. Updated when additional optimizations or benchmarks that have been implemented or can be implemented to improve performance.
│   ├── optimization.md
│   └── benchmarks.md
├── tooling/               # Team preferences. Updated when new tools are added to the project. If there are existing tools that do a job than they should be used again instead of new tools being added.
│   ├── team-preferences.md
│   └── tool-configurations.md
├── legal/                 # Compliance. Specific considerations for different compliance needs. 
│   ├── compliance.md
│   └── authentication.md
├── issues/                # Problem tracking. Updated when common issues are identified with no solution or a solution that has been identifed. Files are removed when a common problem or correction is removed.
│   ├── common-problems.md
│   └── corrections.md
└── tasks/                 # Task management. Updated right before an agent begins working on a feature. Used to track steps and reqiurements for a feature so work can be tracked while features are being implemented. 1 file per feature.
    ├── feature-implementation-tasks.md
    └── completed-feature-implementation-tasks.md

```

## File Naming Conventions

- Use lowercase with hyphens: `file-name.md`
- Be descriptive and specific: `auth-standards.md` not `auth.md`
- Include version dates for major updates: `api-v2-2024.md`
- Use consistent prefixes for related files: `perf-optimization.md`, `perf-benchmarks.md`

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

## Agent Coordination

### File Ownership
- Each file has a primary agent responsible for maintenance
- Secondary agents can suggest changes through the consensus process
- All changes require human approval before committing

### Update Triggers
- Code changes in relevant areas trigger agent analysis
- Agents propose updates based on their domain expertise
- Multi-agent verification ensures consistency

### Conflict Resolution
- Standards have override authority for technical consistency
- Vision has override authority for strategic alignment
- Security and performance have authority over vision and standards
- Human review required for unresolved conflicts

## Maintenance

### Regular Reviews
- Monthly review of folder structure effectiveness
- Quarterly assessment of agent performance
- Annual reorganization if needed

### Quality Metrics
- Documentation coverage of codebase
- Agent suggestion accuracy rates
- Human approval/rejection ratios
- Cross-reference integrity

### Evolution
- Structure adapts based on project growth
- New agents can be added with corresponding folders
- Deprecated areas can be archived or removed
