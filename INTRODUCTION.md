# Multi-Agent Coordination Setup for Software Development

This repository provides a structured framework for coordinating multiple AI coding agents (Cline, Claude, Roo, Kilo, etc.) on software development projects. It establishes clear conventions, shared knowledge management, and agent-specific guidance to enable efficient collaborative development.

## 🎯 Purpose

Modern software development often involves multiple AI agents working together on complex projects. This setup solves common coordination challenges by providing:

- **Structured Knowledge Management**: Centralized documentation that all agents can reference and update
- **Agent-Specific Guidance**: Individual instruction files that prevent conflicts and ensure consistency
- **Shared Standards**: Common conventions for code, documentation, and project organization
- **Memory Persistence**: Agents can build on each other's work through shared documentation

## 🏗️ Architecture Overview

### Agent Coordination System

```
├── .cline/           # Cline-specific instructions
├── .claude/          # Claude-specific instructions  
├── .roo/             # Roo-specific instructions
├── .kilo/            # Kilo-specific instructions
├── AGENTS.md         # Core coordination rules for all agents
└── docs/             # Shared knowledge base
```

### Documentation Structure

The `docs/` folder provides domain-specific organization:

```
docs/
├── agent-guidance/     # Agent-specific development guidance
├── vision/            # Strategic direction and goals
├── features/          # Feature specifications and requirements
├── standards/         # Technical standards and conventions
├── architecture/      # System design documentation
├── performance/       # Optimization guidelines and benchmarks
├── tooling/          # Development tools and configurations
├── legal/            # Compliance and security requirements
├── issues/           # Problem tracking and solutions
└── tasks/            # Active task management and tracking
```

## 🚀 Key Benefits

### For Individual Agents
- **Clear Boundaries**: Each agent knows exactly what they can/cannot modify
- **Consistent Context**: Access to shared project knowledge on every session
- **Guided Decision Making**: Structured documentation helps make informed choices
- **Memory Continuity**: Previous work is preserved and accessible

### For Multi-Agent Collaboration
- **Prevents Conflicts**: Agent-specific instructions prevent overwriting each other's work
- **Enables Handoffs**: Structured documentation allows seamless work transitions
- **Maintains Quality**: Shared standards ensure consistent code and documentation quality
- **Tracks Progress**: Centralized task management keeps all agents aligned

### For Development Teams
- **Accelerated Onboarding**: New agents quickly understand project context
- **Reduced Discovery Time**: Well-organized documentation minimizes exploration needed
- **Consistent Output**: Standardized conventions across all agent interactions
- **Audit Trail**: Clear documentation of decisions and changes

## 📋 Core Conventions

### File Organization
- **Compact Files**: Maximum 1,500 lines per file for easy navigation
- **Logical Grouping**: Related functionality organized into discoverable folders
- **Consistent Naming**: Lowercase with hyphens (`feature-name.md`)
- **Cross-References**: Bidirectional links between related documents

### Development Standards
- **Type Safety**: Use TypeScript over JavaScript when possible
- **Consistency**: Follow existing patterns rather than introducing new ones
- **Documentation**: Update relevant docs when making changes
- **Testing**: Maintain existing test patterns and coverage

### Agent Behavior
- **Read First**: Always read `AGENTS.md` at session start
- **Update Memory**: Keep `agent-memory-bank.md` current with important changes
- **Reflect Before Completion**: Review documentation for additional needed updates
- **Preserve Instructions**: Never modify agent instruction files

## 🔄 Workflow

### Session Initialization
1. Agent reads `AGENTS.md` for core guidance
2. Reviews relevant documentation in `docs/`
3. Checks `agent-memory-bank.md` for project context
4. Identifies current task and required knowledge

### Development Process
1. **Plan**: Create or update task documentation before implementation
2. **Implement**: Follow established standards and conventions
3. **Document**: Update relevant documentation during development
4. **Reflect**: Review and update `agent-memory-bank.md` before completion

### Knowledge Management
- **Live Updates**: Documentation updated as changes are made
- **Domain Separation**: Each doc folder managed by appropriate expertise
- **Conflict Resolution**: Clear authority hierarchy for different domains
- **Human Oversight**: All changes require human approval before commit

## 🎯 Use Cases

### Perfect For:
- **Multi-Agent Projects**: Multiple AI agents working on the same codebase
- **Long-Running Development**: Projects spanning multiple sessions/conversations  
- **Complex Systems**: Applications requiring consistent architecture decisions
- **Team Coordination**: Mixed human-AI development teams
- **Knowledge-Heavy Projects**: Domains with significant context and conventions

### Ideal Scenarios:
- Building full-stack applications with multiple AI agents
- Maintaining large codebases with consistent patterns
- Onboarding new agents to existing projects
- Managing complex feature development across sessions
- Coordinating different AI capabilities (coding, testing, documentation)

## 🛠️ Getting Started

### For New Projects
1. Copy this setup to your project root
2. Customize `AGENTS.md` with project-specific guidance
3. Populate `docs/` folders with your project's requirements
4. Create initial `agent-memory-bank.md` with project overview

### For Existing Projects
1. Add agent instruction folders (`.cline/`, `.claude/`, etc.)
2. Create `AGENTS.md` with current project conventions
3. Migrate existing documentation to `docs/` structure
4. Update agents to follow new coordination pattern

### For AI Agents
1. Read `AGENTS.md` at session start
2. Reference `docs/` for project-specific context
3. Follow established patterns and conventions
4. Update documentation as you make changes

## 📚 Best Practices

- **Start Small**: Begin with core documentation and expand as needed
- **Stay Consistent**: Follow existing patterns rather than creating new ones
- **Document Decisions**: Capture architectural choices and rationale
- **Regular Maintenance**: Keep documentation current with code changes
- **Human Review**: Always have human oversight on significant changes

## 🤝 Contributing

When adding new agents or extending this setup:
1. Follow the established folder structure
2. Maintain consistent instruction patterns
3. Update this README with new capabilities
4. Test coordination with existing agents

---

This setup transforms chaotic multi-agent development into organized, efficient collaboration. By providing structure, standards, and shared memory, it enables AI agents to build on each other's work effectively while maintaining code quality and project coherence.
