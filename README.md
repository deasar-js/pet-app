# Take-A-Paws web app (find a pet sitter near you)

[Check out the hosted version](https://pet-app-beta.vercel.app/)

## Our goal was to build a MVP within 9 days

This project is a React JS web app which uses Firebase for authentication, firestore database and storage. Our overall aim was to achieve an intuitive and user-friendly web interface which allowed pet sitters to display their services and for pet owners to browse by proximity, have sufficient information about pet sitters, and be able to directly communicate with a pet sitter.

## How I worked on this project

- We built this app based on wireframes [see here](https://user-images.githubusercontent.com/86922213/162636092-deb67815-7b07-4eb6-a661-1b2275da8549.png)
- I worked with tasks on kanban board [see here](https://user-images.githubusercontent.com/86922213/162636107-31355822-8e17-4901-a5cf-40d731b56c52.png)
- We used agile practices and had daily stand-ups [view stand-up lead table](https://user-images.githubusercontent.com/86922213/162636102-4dedd5f2-0260-49a0-95ec-a56456f710c1.png)
- I used feature branches and pull requests [see here](https://user-images.githubusercontent.com/86922213/162636109-d00ccaa7-13c1-4703-ba6b-d8f1a836e5f0.png) & [here](https://user-images.githubusercontent.com/86922213/162636111-b74ec9ee-de8f-4eca-ada0-8a9c30afbfba.png)

## How to navigate this project

- Stateful logic [see here](https://user-images.githubusercontent.com/86922213/162636112-89b8b6fc-0da6-46b0-96df-1e48bbfd076d.png)
- Interfacing with Firebase collections [see here](https://user-images.githubusercontent.com/86922213/162636103-4ca57665-c501-4544-9b7f-39639c914b13.png)
- Filtering results by properties and proximity [see here](https://user-images.githubusercontent.com/86922213/162636105-b091276e-a1a3-4d0c-9d42-d7991ba4675c.png)

## Why we built the project this way

- React components allow us to separate our app into independent and reusable units
- We were able to create a fast and user-friendly sign-in process using firebase authentication with the choice of email and password or a google account
- Firestore allows us to store data in the cloud, sync and retrieve data with expressive queries without having to worry about managing servers.

## If I had more time I would change this

- Replace the filtering of large data-sets to more precise api queries to speed up load time
- Add listing features and date-picker for availability and more detailed search
- Order messages so most recent user interacted with is first
