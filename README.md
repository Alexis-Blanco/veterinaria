# 🐾 Happy Paws Veterinary System

An interactive JavaScript-based application to manage pets and their owners for a veterinary clinic. Built entirely with **vanilla JavaScript**, it demonstrates core programming concepts such as **modularity**, **callbacks**, **promises**, and **async/await** without relying on any external libraries or persistent storage.

---

## 📂 Project Structure

```
📁 project-root
├── index.html          # Main HTML page
├── script.js           # Modular and interactive logic
└── README.md           # Project documentation
```

---

## 💡 Features

### 👤 Owner Management

* Register a new owner with validated information.
* Each owner has:

  * `id` (auto-generated UUID)
  * `name`, `ID number (cedula)`, `phone`, and `email`

### 🐶 Pet Management

* Register a new pet linked to an existing owner.
* Each pet has:

  * `id`, `name`, `species`, `age`, `weight`, `health status`, `owner id`
* Search pets by name.
* View all pets.
* Update pet health status.
* Delete a pet by name.
* View all pets belonging to a specific owner.

---

## ⚙️ User Interaction

All user interaction is handled via:

* `prompt()` – input
* `alert()` – notifications
* `console.log()` – output listing

No graphical UI frameworks or forms are used.

---

## 🚀 Asynchronous Simulation

Certain features simulate processing delays using `setTimeout`, `callbacks`, `promises`, and `async/await`:

| Feature                  | Async Technique        | Delay       |
| ------------------------ | ---------------------- | ----------- |
| Register owner           | Callback + setTimeout  | 1.5 seconds |
| Register pet             | Callback + setTimeout  | 2 seconds   |
| Search pet by name       | Promise                | 1.5 seconds |
| Update pet health status | Async/Await            | 1 second    |
| Delete pet               | Promise + Confirmation | 2 seconds   |
| View pets by owner       | Async/Await            | 2 seconds   |

---

## 🛠️ Technologies Used

* HTML5
* JavaScript
* Asynchronous JavaScript (callbacks, promises, async/await)

---

## 🧠 Code Architecture

* Modular design with separate functions for each feature
* UUIDs for data integrity
* Inline validation of input fields
* Simple and efficient data structures

---

## 🎯 How to Use

1. Open `index.html` in a browser.
2. Click on **Gestión Usuarios** to launch the interactive menu.
3. Use the on-screen prompts to register and manage owners and pets.
4. All data is stored in memory only (will reset on reload).

---

## 📸 Preview

![Preview Screenshot](assets/preview.gif)

---

## 📌 Example Menu Flow

```
1. Register owner
2. Register pet
3. List pets
4. Search pet
5. Update health
6. Delete pet
7. View owner's pets
8. Exit
```

---

## 👨‍💻 Developed by

**\[Alexis Blanco]**

> A project made with ❤️ for asynchronous JavaScript mastery

---

## 🧪 Future Improvements (Optional)

* LocalStorage support for persistence
* Web UI interface using forms
* Filter/search options by species or status
* Export data as JSON
