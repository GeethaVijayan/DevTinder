# React + Vite

create React + vite project
Remove unneccessary code and add hello world

//Install tailwind in web project 
1.npm install tailwindcss @tailwindcss/vite
2.open vite.config.ts plugin 
     tailwindcss(), inside import tailwindcss from '@tailwindcss/vite'
     plugins along with react add tailwind
     import tailwindcss from '@tailwindcss/vite'
3. insde  src/index.scss    - @import "tailwindcss";
4.src/main.tsx. -import './index.css'
5.inside function app.jsx 
/**
use tailwind 
className="min-h-screen bg-gray-900 flex items-center justify-center"
eg:claassNaame : 
 */
Install tailwind version 4 to get l
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

--
Install daisyUI & its relateed components
Add navBar componnet to app.jsx
Create a navBar.jsx to seperate Component file
Install react Router Dom
create BrowserRouter > Routes >    Route =/Body >RouteChildren
Create an Outllet in your Body Component
create a footer

create a login Page


Componnet Level Design for DevTinder

Body 
  -NavBar
  Route = / =>Feed Page
  Route =/login =>login Page
  Route =/connections  =>ConnectionsPage
  Route =/profile =>profile Pge
