README - B&D African Market User App

This README is dedicated to the User App of the B&D African Market project and serves to explain why specific files have been omitted from the public GitHub repository. The primary focus is to maintain the highest standards of application security and user privacy, particularly as the project is slated for live deployment. I can't be too careful when it comes to security.

1) CustomAuthentication Class:

Description: Implements a custom authentication mechanism in Django, managing JWT token verification, and user authentication.

Reason for Omission: The authentication class is a crucial part of the security infrastructure. Revealing its details and the way it was implemented could potentially expose sensitive security practices and vulnerabilities.

Functionality Overview:
Manages JWT token authentication and validation.
Incorporates robust security checks and token handling procedures.

2) User Model (models.py)

Description: Defines the User model, including fields for user details and methods for user management.
Reason for Omission: The token_payload function and other parts of the model could reveal sensitive information about token structure and security measures.

Functionality Overview:
Manages user attributes like email, roles, and authentication status.
Includes mechanisms for managing user permissions and roles.

Pseudo-Code:
User model with fields for email, name, roles, etc.
Custom manager for user creation.
Methods for token payload generation and user representation.

3) Token Blacklist Management

Description: Handles the blacklisting of JWT tokens using Redis.

Functionality Overview:
Blacklists and validates tokens.
Provides functions for checking token status and clearing blacklist data.

4) Security and Privacy Considerations
The decision to omit these files is driven by a commitment to:

Security: Prioritizing the security of the application and user data.

Privacy: Adhering to strict data privacy practices.

5) Note for Employers and Collaborators
Code Quality Assurance: The repository showcases my commitment to clean, efficient, and well-documented code.
Open for Discussions: Willing to discuss methodologies and practices used in these omitted files in secure settings or private channels.

DB Schema (Pseudo-Code):
User Table: Includes fields for personal details, authentication status, roles, etc.
Address Table: Linked to the User table, includes fields for address details.
Role Choices: Enumeration of user roles.
