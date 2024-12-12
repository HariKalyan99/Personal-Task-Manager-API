# Task Management API

This is a Task Management API built with Node.js, Express, and Sequelize ORM for handling tasks with the ability to filter by priority, due date, and status.

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
  - [Create Task](#create-task)
  - [Get All Tasks](#get-all-tasks)
- [Notes](#notes)

---

## Setup Instructions

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn (for package management)
- PostgreSQL (or another database supported by Sequelize)

### Step 1: Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/HariKalyan99/Personal-Task-Manager-API.git
cd Personal-Task-Manager-API


### Install Dependencies
npm install


.env

APP_PORT=""
NODE_ENV=""

# DB Credtentials
DB_USERNAME=""
DB_PASSWORD=""
DB_DATABASE=""
DB_HOST=""
DB_PORT=""

#jwt 
JWT_SECRET=""
JWT_EXPIRES_IN=""

# database

npx sequelize-cli db:migrate

npm start

enjoy!!!!