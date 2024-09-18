# 🏪 NEXT.JS CHALLENGE | FSJ 01👔

## 🛒 Introduction
In this project, I built an e-commerce store that features a product browsing system with pagination, detailed product views, and robust error handling. This experience allowed me to dive into essential web development concepts such as server-side rendering and efficient data fetching, all while ensuring a smooth and engaging user experience for exploring products and handling potential issues.

## 🤖 Technologies
- Next.js: Framework for building the React application with server-side rendering
- React: Utilized React's state management with useState for handling the image gallery
- CSS3: Styling with Tailwind CSS for a utility-first approach
- Error Boundaries: Implemented error boundaries or similar mechanisms to manage and display errors gracefully during data fetching
- API: E-commerce product data provided through vercel

## Setup Instructions 🚀
Requirements - Ensure you have Node.js installed.

1. Clone the Repository & Open Terminal
2. Install Dependencies: `npm install`
3. Start the Development Server: `npm run dev`
4. View the Live App: Follow the provided link to see the application in action.

## Usage Examples 🛍️
### Home Page 🏠
The main page functions as the landing page for the shopping app, featuring a welcoming heading and a description of the store. It includes a prominent `Shop Now` button that directs users to a page displaying a list of products.

### Products Page 🛒
This page presents a grid of 20 product cards. Each card features the product’s image, title, description, price, and category, along with a `View Details` button. Clicking this button takes you to a page with comprehensive information about the product.

### Pagination
Use the pagination controls to navigate through product pages. The URL updates to show the current page, and the page number is displayed next to the navigation buttons.

### Product Detail Page 📃
To access the detail page, click on the `View Details` button from the products page . This page displays the product image on the left (with scrolling controls for multiple images) and includes the title, brand, description, price, category, tags, rating, and stock availability on the right. Below this, the reviews section lists each reviewer's name, the date the review was added, the comment, and the rating given.

### Error Handling ❗
Loading State: A loading indicator is shown while fetching data.
Error Messages: Friendly error messages are displayed if product data fails to load.