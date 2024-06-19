<p align="center"> <img src="https://github.com/stevendemer/the-wild-oasis/assets/47676542/fca73202-afb1-4552-a5d8-aad3077b6b90" alt="The Wild Oasis" /> </p>



The Wild Oasis is an internal hotel management application, intended to be used only by the employees for viewing bookings and managing the cabins. 

## Installation

```bash
git clone <repo>
cd <folder>
npm i
npm run dev
```

## Commands

```javascript
npm run build

npm run dev

npm run lint

npm run start
```

## About the project

I wanted to put to the test everything i have learned so far in React and web development, and decided to go for a project
that combines a plethora of libraries. For the styling i used ShadCN/UI with Tailwindcss, Supabase for storage and authentication, React Query for server state management and Zustand for global state management. For the dashboard, i used the Recharts library.

## Key features



*  Users of the app are hotel employees. They need to be logged into the application to perform tasks

*  New users can only be signed up inside the applications (to guarantee that only actual hotel employees can get accounts)

*   Users should be able to upload an avatar, and change their name and password

*  App needs a table view with all cabins, showing the cabin photo, name, capacity, price, and current discount

* Users should be able to update or delete a cabin, and to create new cabins (including uploading a photo)

*    App needs a table view with all bookings, showing arrival and departure dates, status, and paid amount, as well as cabin and guest data

*   The booking status can be "unconfirmed" (booked but not yet checked in), "checked in", or "checked out". The table should be filterable by this important status

*   Other booking data includes: number of guests, number of nights, guest observations, whether they booked breakfast, breakfast price

*   Users should be able to delete, check in, or check out a booking as the guest arrives

*   Bookings may not have been paid yet on guest arrival. Therefore, on check in, users need to accept payment (outside the app), and then confirm that payment has been received (inside the app)

*   On check in, the guest should have the ability to add breakfast for the entire stay, if they hadn't already

*   Guest data should contain: full name, email, national ID, nationality, and a country flag for easy identification

*   The initial app screen should be a dashboard, to display important information for the last 7, 30, or 90 days:

    *       A list of guests checking in and out on the current day. Users should be able to perform these tasks from here

    *      Statistics on recent bookings, sales, check ins, and occupancy rate

    *     A chart showing all daily hotel sales, showing both "total" sales and "extras" sales (only breakfast at the moment)

    *     A chart showing statistics on stay durations, as this is an important metric for the hotel

*   Users should be able to define a few application-wide settings: breakfast price, min and max nights/booking, max guests/booking

*   Dark mode


### Author
Steven Demertzis


<h3 align="left">Languages and tools: </h3>


<p align="left">
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />

<img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"  />

<img src="https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white" />

<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />

<img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" />

<img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white" />

<img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />
</p>


## Screenshots

<p align="center">
<img src="https://github.com/stevendemer/the-wild-oasis/assets/47676542/0cd75289-4d80-422e-ab35-128276ac1e5c" />
<img src="https://github.com/stevendemer/the-wild-oasis/assets/47676542/dc2cd3a7-1029-4745-a574-a969b8d15208" />
<img src="https://github.com/stevendemer/the-wild-oasis/assets/47676542/5d05e72a-18ce-4e3b-829a-573bdf3a0395" />
</p>




## License

[MIT](https://choosealicense.com/licenses/mit/)
