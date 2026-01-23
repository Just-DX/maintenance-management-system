JustMT CMMS — Business Context Document

1. Business Purpose

JustMT CMMS is being built as a Minimum Viable Product (MVP) to help organizations manage maintenance activities in a simple, reliable, and practical way. The business goal is to deliver a system that focuses on Preventive Maintenance (PM) as the primary driver of value, while supporting organizations that operate across multiple sites.

The product intentionally avoids enterprise-level complexity and instead prioritizes clarity, automation, and usability.

2. Business Problem Being Solved

Organizations with physical assets often face the following problems:

Preventive maintenance is performed inconsistently or too late

Maintenance is reactive instead of planned

Asset usage (hours, cycles, distance) is not linked to maintenance

Multi-site operations suffer from data mixing and poor visibility

Existing CMMS tools are overly complex, slow, or expensive

Technicians need mobile-friendly tools to execute work in the field

JustMT CMMS addresses these problems by providing automated preventive maintenance, clear asset structure, and strict site-based data separation, all accessible across web, desktop, and mobile.

3. Target Use Case

The system is designed for organizations that:

Operate one or more physical sites

Maintain assets and equipment that require routine service

Need basic but reliable maintenance tracking

Want preventive maintenance driven by time or usage

Require technicians to work from mobile devices

Do not need advanced analytics or complex workflows in the first version

4. Core Business Concept

The core business concept of JustMT CMMS MVP is:

Automatically generating maintenance work based on time schedules or asset usage, while keeping data isolated by site and easy to execute by technicians.

Preventive Maintenance is the central workflow. Everything else (assets, meters, work orders, users) exists to support this workflow.

5. Multi-Site Business Model

The system supports multiple sites within a single organization.

Each site’s data is fully isolated

Users are assigned to one or more sites

Users can only view and operate on data from their assigned sites

A site is selected via a dropdown, and all data shown belongs to that site

This ensures operational clarity and prevents data leakage between sites.

6. Asset & Location Business Structure

Assets are organized using a simple 2-level hierarchy:

Location → represents a physical area (e.g., building, floor, zone)

Asset → represents maintainable equipment within a location

Each asset contains basic identifying information and supports meter readings (such as hours, cycles, or kilometers). These meters represent real-world usage and are critical for driving maintenance decisions.

7. Preventive Maintenance Business Logic

Preventive Maintenance can be triggered in two ways:

Schedule-Based

Maintenance occurs at fixed time intervals (daily, weekly, monthly, yearly)

Meter-Based

Maintenance occurs when an asset’s meter reaches a defined threshold

When a preventive maintenance condition is met, the system automatically creates a work order. Preventive Maintenance can be defined using reusable templates that include predefined task lists.

This automation reduces missed maintenance and shifts the organization from reactive to proactive maintenance.

8. Work Execution via Work Orders

Maintenance work is executed through Work Orders, which can be:

Preventive (automatically generated)

Corrective (manually created)

Work orders follow a simple business lifecycle:

Open

In Progress

Completed

Each work order contains tasks that technicians complete, along with optional attachments such as files or photos. Mobile users can capture images directly from their device camera.

9. User Roles and Responsibilities

Users authenticate into the system and are assigned roles that define responsibility:

Administrator: full system control

Manager: manages assets, PM schedules, and work orders

Technician: executes assigned work orders

Users are always restricted by site assignment, ensuring access aligns with organizational responsibility.

10. Platform and Delivery Context

The MVP is delivered as a cross-platform product:

Web application

Desktop application

Mobile application

All platforms serve the same business workflows and must behave consistently. The backend provides a single source of truth for business data.

11. Business Definition of Success

From a business perspective, the MVP is successful if:

Preventive maintenance work orders are generated automatically

Maintenance can be driven by both time and asset usage

Data is correctly isolated by site

Managers can structure assets and schedules easily

Technicians can execute work efficiently, especially on mobile

The system feels simple, predictable, and reliable
