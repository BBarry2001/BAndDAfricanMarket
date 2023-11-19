README - B&D African Market Admin App

This README is meant to outline the rationale behind omitting specific files in this app from the public GitHub repository of the Admin Application for the B&D African Market project. My primary goal is to maintain a high standard of security and privacy, especially as this project is intended to be deployed as a live website.

Omitted Files and Their Functionalities:
Due to the sensitive nature of certain functionalities, I decided not to include some specific files in the public repository. These files pertain to administrative controls and user data management, and their inclusion could potentially expose sensitive implementation details or security practices.

1) UserViewSet (Admin Controls)

- File Description: The UserViewSet class in Django provides robust admin-level functionalities. It allows for operations such as modifying user data, changing passwords, locking/unlocking user accounts, and handling bulk actions on users.

- Reason for Omission: The capabilities offered by this viewset are sensitive, as they directly affect user accounts and data. Revealing this code could provide undue insights into the system's administrative controls and potentially expose security practices. I may be acting too paranoid here but one can never be too careful when it comes to security. 

- General Functionality: Without revealing specific code, the UserViewSet:
Facilitates various CRUD operations on user accounts.
Allows for detailed user data filtering and manipulation.
Implements secure methods for sensitive operations like password changes and account status updates.


2) AdminUserViewsetSerializer and AdminUserEditSerializer
- File Description: These serializers are tied to the UserViewSet and handle the serialization and validation of user data for administrative purposes.

- Reason for Omission: The serializers deal with sensitive user data, including password management and personal information. Their inclusion could reveal the specifics of data validation and manipulation techniques used in the application.

- General Functionality:
AdminUserViewsetSerializer manages the representation of user data in various admin operations.
AdminUserEditSerializer handles the validation and updating of user data, including password changes.

3) Security and Privacy Consideration
The decision to omit these files stems from my commitment to security and privacy:

- Security: I prioritize the security of the application and user data. By not disclosing certain implementation details, I reduce the risk of potential vulnerabilities.
- Privacy: We adhere to strict data privacy practices, ensuring that user data is handled responsibly and ethically.

4) Future Employers and Collaborators or anyone seeing this
For potential employers and collaborators reviewing this repository:

Code Quality: While specific files are not included, the rest of the repository showcases my commitment to clean, efficient, and well-documented code.

Open for Discussion: I am  open to discussing the methodologies and practices used in these omitted files in a more secure setting or through private channels if need be.
