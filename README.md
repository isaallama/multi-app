# **Multi-App**

This repository contains a collection of web applications built using React.js, each with a specific functionality. Below are the applications included in this suite:

1. **Todo App**
2. **IP Address Finder**
3. **Language Translator**
4. **Movie Search Engine**
5. **Quiz App**
6. **QR Code Generator**

## **Installation**

To run these applications locally, follow the instructions below:

### **1. Clone the Repository**

```bash
git clone https://github.com/isaallama/multi-app.git
cd .\projeto\
```

### **2. Install Dependencies**

```bash
npm install react react-dom react-scripts axios qrcode.react jsonwebtoken bcryptjs express lodash
```
### **3.  Run the Applications**

```bash
npm start
```
The application will be available at http://localhost:3000 in your browser.

# About the applications

## Todo App
A simple and intuitive Todo application that allows users to manage their tasks.

### Features:
- Add, edit, and delete tasks.
- Persistent storage using an API service.
- Real-time updates and error handling for API interactions.

### Usage:
- Add a task by typing in the input field and clicking "Add Task".
- Edit or delete a task using the corresponding buttons next to each task.



## IP Address Finder
Find detailed information about an IP address, including location and ISP.

### Features:
- Input an IP address to retrieve its information.
- Error handling for invalid IP addresses or API issues.

### Usage:
- Enter an IP address in the input field and click "Find IP".
- The details of the IP will be displayed below the input field.



## Language Translator
Translate text between different languages using an external translation API.

### Features:
- Select source and target languages.
- Translate text with a single click.
- Basic error handling for failed translation attempts.

### Usage:
- Select the source and target languages from the dropdowns.
- Enter the text to be translated and click "Translate".



## Movie Search Engine
Search for movies using the OMDb API and view basic details.

### Features:
- Search for movies by title.
- Display results with movie posters and release years.
- Handle API errors gracefully.

### Usage:
- Enter a movie title in the search field and click "Search".
- The results will be displayed as a list of movie cards.



## Quiz App
A simple quiz application to test your knowledge with multiple-choice questions.

### Features:
- Answer questions and get immediate feedback.
- Track your score as you progress through the quiz.

### Usage:
- Answer the questions by selecting an option.
- Your score will be displayed at the end of the quiz.



## QR Code Generator
Generate a QR code for any text input.

### Features:
- Enter text and instantly generate a corresponding QR code.
- The QR code updates dynamically as you type.

### Usage:
- Enter text in the input field.
- The QR code will appear below as you type.
