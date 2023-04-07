# Fortal
> Fortal is a Social media platform focus on find friend to do activities and hobbies Build with React Native
>> Backend of Fortal [here](https://github.com/Maszz/FortalBackend) (Cloned version of Backend for remove real api key)

> this repository is no longer maintained 

## Painpoint
	- No friend doing activities together.
	- Wat to have a activities, but don't know what activities should do.
	- No tool for organism simple event.

## Feature
	- Authentication system with Jwt token.
	- Searching
		- Geo Location Searching
		- User Searching
		- Event Searching
	- Event System
		- Create Event
		- Socket Chat group
		- Note and commenting in Event Group(look like line group feature)
	- Profile System
		- My Profile and other user profile layout.
		- Can change visibility of my profile(Public / private)
		- Follower / Following system.
		- if user profile is private need following request for following.
		- Profile image(Buggy very not stable)
	- In-app Notification system
	- Registration Onboard.
	- My Activities Screen.
		- Show joined Event
		- Show created Event
	- Home Screen 
		- Show random event.

## Not Implemented
	[x] Organizer Account and Organizer rich support feature
	[x] Donation and payment
	[x] Other.
	[x] Event type filtering.

## TechStack
	- Nest.js as Backend.
	- React native(Mobile) for front-end.
		- Native base for base design components.
		- Redux as state manager.
	- Graphql and rest for api.
	- Redis as cache server.
	- MongoDb as database.
	- Prisma as ORM.

## Demo


Onboard(Gender)             |  Onboard (Event Select) | Home page  |
:-------------------------:|:-------------------------:|:-------------------------:
![150x300](images/fortal_gif1.gif)  |  ![150x300](images/fortal_gif2.gif) | ![150x300](images/fortal_gif3.gif) 

Searching            |  Create Event | Join Event Modal
:-------------------------:|:-------------------------:|:-------------------------:
![150x300](images/fortal_gif4.gif)  |  ![150x300](images/fortal_gif5.gif) | ![150x300](images/fortal_image3.png) 

My profile            |  Edit MyProfile | Following/Follower List
:-------------------------:|:-------------------------:|:-------------------------:
![150x300](images/fortal_image1.png)  |  ![150x300](images/fortal_image2.png) | ![150x300](images/fortal_image4.png) 

Notification            |  Group Chat | Group Note
:-------------------------:|:-------------------------:|:-------------------------:
![150x300](images/fortal_image5.png)  |  ![150x300](images/fortal_image6.png) | ![150x300](images/fortal_image7.png)

Login Screen            |  Register | Login
:-------------------------:|:-------------------------:|:-------------------------:
![150x300](images/fortal_image10.png)  |  ![150x300](images/fortal_image8.png) | ![150x300](images/fortal_image9.png)

## Authors

- [Maszz](https://github.com/Maszz)
