
# **Password Manager**


A **secure and user-friendly password manager** built with **Next.js**, **Clerk for authentication**, and **Supabase for database storage**. This application allows users to securely store, manage, and retrieve their passwords with ease.

---

## **Features**

- **Secure Authentication**: Sign up, log in, and manage your account using **Clerk**.
- **Password Encryption**: Passwords are encrypted before being stored in the database.
- **Save Passwords**: Store passwords for websites, apps, and services.
- **Generate Secure Passwords**: Automatically generate strong, random passwords.
- **View Saved Passwords**: Retrieve and view saved passwords securely.
- **Edit and Delete Passwords**: Update or remove saved passwords as needed.
- **Copy Passwords**: Easily copy passwords to the clipboard.
- **Dark Mode**: Supports dark mode for a better user experience.

---

## **Tech Stack**

- **Frontend**: Next.js, Tailwind CSS
- **Authentication**: Clerk
- **Database**: Supabase
- **Encryption**: CryptoJS
- **Icons**: React Icons

---

## **Getting Started**

Follow these steps to set up and run the project locally.

### **Prerequisites**

- Node.js (v16 or higher)
- npm or yarn
- Supabase account (for database)
- Clerk account (for authentication)

### **Installation**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rajm012/password-manager.git
   cd password-manager
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory and add the following variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
   CLERK_SECRET_KEY=your-clerk-secret-key
   NEXT_PUBLIC_ENCRYPTION_KEY=your-encryption-key
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open the app**:
   Visit `http://localhost:3000` in your browser.

---

## **Folder Structure**

```
password-manager/
├── app/
│   ├── auth/
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── dashboard/
│   │   ├── save-password/
│   │   └── saved-passwords/
│   └── layout.tsx
├── components/
│   ├── auth/
│   └── Header.tsx
├── lib/
│   ├── encryption.ts
│   ├── passwordGenerator.ts
│   └── supabase.ts
├── styles/
│   └── globals.css
├── README.md
├── package.json
└── ...
```

---

## **Usage**

### **1. Sign Up / Log In**
- Use the **Sign Up** button to create a new account.
- Use the **Log In** button to access your account.

### **2. Add a Password**
- Navigate to the **Add Password** page.
- Enter the website name, username, and password.
- Click **Add Password** to store the password securely.

### **3. Generate a Secure Password**
- Click the **Generate** button to create a strong, random password.
- Copy the generated password and paste it into the password field.

### **4. View Saved Passwords**
- Navigate to the **Saved Passwords** page.
- View all your saved passwords.
- Click the **Copy** button to copy a password to the clipboard.

### **5. Edit or Delete Passwords**
- Use the **Edit** button to update a saved password.
- Use the **Delete** button to remove a saved password.

---

## **Contributing**

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

---

## **License**

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## **Acknowledgements**

- **Clerk**: For providing seamless authentication.
- **Supabase**: For the powerful database and backend services.
- **Tailwind CSS**: For the utility-first CSS framework.
- **React Icons**: For the beautiful icons.

---

## **Support**

If you encounter any issues or have questions, feel free to open an issue on GitHub or reach out to me at [rajmahimaurya@gmail.com](mailto:rajmahimaurya@gmail.com).

---

## **Demo**

Check out the live demo of the project: [https://password-manager-demo.com](https://password-manager-demo.com)

---

Enjoy using the **Password Manager**! 🚀

---