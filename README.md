# 476-Frontend

This project is the frontend of the **Drop Logger** system, created as part of a demonstration of the **CQRS (Command Query Responsibility Segregation)** design pattern in the context of the game **Old School Runescape**. It allows users to interact with the backend by performing both **commands** (write operations) and **queries** (read operations) related to monsters and their drops.

## Features

- **Add Monster**: Users can create a new monster with a name and combat level.
- **Add Drop**: Users can add drops for a specific monster by specifying the item and quantity.
- **Fetch Drops by Monster Name**: Users can fetch the list of drops associated with a specific monster by providing the monster's name.

The frontend interacts with a backend built using Express and PostgreSQL that implements the CQRS design pattern to handle commands and queries separately.

## Technologies Used

- **React**: The main framework used to build the user interface.
- **Formik**: Used for form handling, including adding new monsters and drops.
- **Yup**: For form validation, ensuring user input is valid before sending data to the backend.
- **Axios**: Used to make HTTP requests to the backend API.
- **Material UI**: Provides the design and layout for the forms and components.

## Pages and Components

### 1. **CreateMonster.js**
This page allows users to create a new monster by providing a name and combat level. The form is validated using **Formik** and **Yup**, and upon successful submission, it sends a `POST` request to the backend to add the monster.

### 2. **AddDrop.js**
Users can add a drop for an existing monster. The form collects the item name, quantity, and monster name. Upon submission, it sends a `POST` request to the backend to add the drop for the specified monster.

### 3. **GetDrops.js**
This component allows users to fetch and display drops associated with a specific monster by providing the monster's name. It sends a `GET` request to the backend to retrieve the drops, which are displayed in a list format.

## How to Run the Project

### Prerequisites

- **Node.js**: Ensure that you have Node.js installed on your system. You can download it from [here](https://nodejs.org/).
- **npm or Yarn**: This project uses npm to manage dependencies.

### Clone the Repository

Clone the repository from GitHub:

```bash
git clone https://github.com/Untraditional/476-frontend.git
