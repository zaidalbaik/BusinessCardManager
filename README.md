# Business Card Manager

## Project Name and Description

The project name is **Business Card Manager**.  
It is intended to easily manage business cards through our web application.

## Purpose and Features of the App

- Easily manage business cards.
- User-friendly web interface.

## Required Packages

The application requires the following packages:

- `"@lottiefiles/lottie-player": "^2.0.4"`
- `"@types/file-saver": "^2.0.7"`
- `"bootstrap": "^5.3.3"`

## How to Operate the Application

### 1. Angular Frontend Integration

The Angular frontend requires the Base URL of this API project. Copy the Base URL (or domain) of this project and paste it into the Angular project configuration as the base URL.

Replace the TypeScript code in `AppConstants` with your base URL:

```typescript
export class AppConstants {
  static readonly baseURL: string = "http://localhost:YOUR_PORT";
}
```

### 2. Run the Business Card Manager API Project

### 3. Start the Angular Application

Run the following command to start the application using vs code Terminal:

```
ng serve -o
```
