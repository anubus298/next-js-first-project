<h1 align="center">
  <br>
  <img src="https://github.com/anubus298/SafoMart/blob/SafoMart/images/safoMart.png" alt="SafoMart" width="400"/>
  <br>
  SafoMart
  <br>
</h1>
 
<p align="start">SafoMart is a modern FullStack personal project E-commerce Website designed for selling a wide range of electronic devices, including laptops, mobiles, tablets, and more. It utilizes React for the Front-End, Next.js for SSR, and PocketBase (Sql lite) for the backend.</p>

<h2  align="center"><a href="https://safomart.vercel.app/">Visit the website</a></h2>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#security-measures">Security Measures</a> •
  <a href="#additional-features">Additional Features</a> •
  <a href="#built-with">Built With</a> •
  <a href="#my-journey">My Journey</a> •
</p>

<p align="center">
  <img src="https://github.com/anubus298/SafoMart/blob/SafoMart/images/homePage.gif" width="600" />
</p>

## Key Features

- **User Authentication:** Secure registration and login functionality.
- **User Dashboard:** Personalized dashboard for order tracking and management.
- **Shopping Cart and Wishlist:** Effortless product management for a streamlined checkout.
- **Notifications and Inbox:** Real-time updates and message management for users.
- **Product Interaction:** Commenting on product pages for user engagement.
- **Categories Pages:** Intuitive navigation with organized product listings.
- **Support Page:** Dedicated support resources, FAQs, and contact options.
- **Responsive Design:** Ensures a seamless experience across devices.

## Security Measures

- **Encryption and Hashing:** SSL certificates for secure data transmission and PocketBase for secure password storage.
- **User Authentication:** PocketBase uses JWT tokens for secure session management.
- **Role-Based Access Control:** Restricts access based on user roles through PocketBase API Rules.
- **Secure API Endpoints:** The project uses Next.js to hide the database, preventing common vulnerabilities like SQL injection.

## Additional Features

- Customizable user profiles.
- Social media integration for sharing products and reviews: Facebook and Twitter share API (coming soon).
- Dynamic and interactive user interfaces: Tailwind breakpoints.

## Built With

This Project uses the following open source frameworks/libraries/Packages:

- [React](https://react.dev/)
- [Next.js](https://nextjs.org/)
- [PocketBase](https://pocketbase.io/)
- [ESlint](https://eslint.org/)
- [Material UI](https://mui.com)
- [Swiper.js](https://swiperjs.com/)
- [Tailwind](https://tailwindcss.com/)
- [Ant Design](https://ant.design/)
- [Tailwind Headless UI](https://headlessui.com/)
- [Radix UI](https://www.radix-ui.com/)
- [FontAwesome icons](https://fontawesome.com/)
- [Jotai-states management](https://github.com/arvida/emoji-cheat-sheet.com)
- [Autoprefixer](https://autoprefixer.github.io/)
- [Framer Motion](https://www.framer.com/motion/)
- [Zod](https://zod.dev/)
- [React Hook form]
- [react simple star rating]
- [react medium image zoom]
- [react loader spinner]
- [react image zoom]
- [react headroom]
- [react confetti]
- [paypal js sdk]

## My Journey

### Routing

Thanks to Next.js, tasks have become simplified. I began by defining the website's layout, including the navbar and footer. Each essential feature was given its page route, and group routes were instrumental in organizing the files effectively. Dynamic routes, particularly those associated with ID-related data, were implemented seamlessly.

To enhance user experience, I incorporated a loading UI with a ring animation between pages and an error UI to notify users when an error occurs. Middleware, initially perplexing, revealed itself as a vital proxy between the user and the server. I utilized it to block unauthorized access, redirecting users to login pages for account-related data accessible only to registered users, such as 'my cart' and 'user info' pages. Additionally, middleware was crucial for pages not accessible to already registered users, like login and sign-in pages. It played a pivotal role in managing requests requiring user registration, such as adding items to the cart.

Moreover, middleware served to refresh the authentication store data, ensuring users remained authenticated throughout their interactions with the website. The discovery of middleware as a protective intermediary has proven instrumental in enhancing security and overall user experience.

### Handling Data

I adhered to two fundamental rules in my development approach. Firstly, each page file autonomously fetched data, excluding ones that show static data. Secondly, for database updates, I employed API routes. Unfortunately, at that time, I wasn't aware of the new 'server actions' feature, a more simplified method for handling forms.

Utilizing the PocketBase JS SDK for Next.js posed some challenges in terms of caching behavior. Initially, navigating caching proved intricate, and simply refreshing the page didn't suffice, resulting in the same data being displayed despite changes in the database. It was only later that I discovered the use of route segments, essentially public variables capable of altering caching behavior. To address this, I explicitly opted out from caching, employing techniques like forcing no caching on pages such as 'my cart' and 'commands'—pages where data freshness is crucial. In contrast, I strategically employed caching on the homepage and categories' products for enhanced performance and reduced data consumption.

To ensure real-time updates, I employed route.refresh(), dynamically refreshing the UI when necessary—such as when users added or deleted items from their cart or favorites. This meticulous approach allowed me to strike a balance between caching for performance and ensuring fresh data where required.

### User Interface

The UI design process was challenging but crucial; a good, simple UI is paramount for an intuitive user experience. Drawing inspiration from various sources, including other e-commerce websites, illustrations, and Dribbble concepts, I strived to achieve a distinctive and straightforward design for my pages.

Tailwind CSS served as my primary tool, streamlining the application of design principles, enhancing productivity, making the UI responsive, reducing complexity, and affording complete control over the design. Leveraging third-party components like Ant Design for interactive elements, Radix UI, Headless UI, Material UI, and SwiperJs for slides, along with animations from CSS classics and Framer Motion, I'm committed to continuous enhancement and the integration of even more dynamic animations in the future.

### Authentefication and Security

Authentication posed a significant challenge for me, especially given that it was my first time working with it and in the context of server-side rendering. The intricacies of using auth cookies in this setup made the process particularly tricky.

Initially, I implemented a straightforward sign-up page that collected user email and password for registration in the database. I integrated an SMTP service to send email validations. The login page followed suit, accepting email and password inputs. Over time, I bolstered security by adding a stringent validation pattern for both client and server sides.

To manage user authentication states, I employed Jotai state, allowing the UI to dynamically respond to the user's logged-in status. The navbar utilized this state, toggling between a login button and displaying the user's avatar, name, and cart.

I encountered a persistent hydration error, particularly with components using this Jotai state. The resolution involved ensuring that these components loaded post-hydration, indicated by a loading ring in the top right of the navbar after the initial page display.

The auth cookie presented a formidable challenge, as the 'Pocketbase' module I utilized didn't persist the auth store between pages. This meant the auth cookies weren't accessible to my server/client components. After some research and perseverance, I discovered a solution: creating a new 'Pocketbase' for each main request, feeding the module with the auth cookie, and performing the necessary requests.

I implemented rigorous API rules in PocketBase to safeguard user-sensitive data, including their cart, favorites, personal information, payment history, and more. These rules ensure that only the authenticated user has access to their individual data, reinforcing privacy and security.

To facilitate secure payments, I integrated a robust PayPal gateway with stringent validation processes between order creation and capture. This meticulous approach ensures a smooth and secure transaction process, prioritizing the integrity and reliability of payment transactions for a seamless user experience.

## Thank You

It took a significant amount of time to complete the project, but the learning experience was invaluable. I take pride in the work I've accomplished. If you have any comments or questions, feel free to contact me through:
[araristaf@gmail.com](mailto:araristaf@gmail.com) or [LinkedIn - Safouane el arari](https://www.linkedin.com/in/safouane-el-arari/).
