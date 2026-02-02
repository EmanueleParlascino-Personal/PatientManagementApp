# Patient Management Application

## Overview
This is a full-stack application with a .NET 8 Web API backend and a React frontend. The goal of the project was to implement a clean separation between the client and server while maintaining a fast, asynchronous data flow.

## Structure

/PatientManagementApi: ASP.NET Core Web API following a simplified Clean Architecture.

/patient-management-ui: React SPA focused on a responsive UI.


### Installation & Setup
1. **Clone the repository:**
   git clone https://github.com/EmanueleParlascino-Personal/PatientManagementApp.git

2. **Build and run Backend:**
    cd PatientManagementApi
    dotnet restore
    dotnet build
    dotnet ef migrations add InitialCreate
    dotnet ef database update
    dotnet run

2. **Build and run Frontend:**
    cd patient-management-ui
    npm install
    npm start


## Future Improvements
Given more time, I would implement the following features:
* **Authentication & Authorization:** Integration of JWT (JSON Web Tokens) or ASP.NET Core Identity for secure resource access.
* **Dockerization:** Adding a `Dockerfile` and `docker-compose.yml` to simplify deployment and environment consistency.
* **CI/CD Pipeline:** Setting up GitHub Actions for automated linting, testing, and deployment.
* **Refactoring** Restructuting some complexity out of the controllers and move constants into config files or DB.