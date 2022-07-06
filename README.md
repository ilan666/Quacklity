# Quacklity whiskey web-store project

# Installation - IMPORTANT
- Download zip
- Open folder
- Open terminal and write "npm install"
- After installation write "cd Quacklity/App/API" and then "dotnet run"
- Open another terminal and write "cd Quacklity/App/API" and then "ng serve"
- Enjoy

# Introduction:
Hi, Project tester!
My name is Ilan Cherniavsky, A student graduated from HackerU company.
Before i will start explaining about this project ,I'd like you'd take
Some notes about the progress it made.

1. This project created and started at 15th' April (So i had like 4 months to work on it)
But,
I am currently serving at the IDF (Dismissing in about 2 months) so don't expect to see
A masterpiece when you know that i'm working on this project for about 4 months.
I had to Serve, Work, and in the small time i have left - Develope this project.

2. The grade does not interest me.
I rather getting an F with 20 notes to work on than an A with nothing to work on
So please pay attention to note me on improvements and errors than giving me a grade
And i wouldn't know for what.

# Website introduction
This project currently stands for non-responsive luxury whiskey web-store.
The main idea was to create a web-store that supports all kinds of alcoholic beverages.

Since i am the only JUNIOR developer, i had to minimize the work to focus on
1 beverage.

The project will continue developing as a startup to stand for all kinds of beverages.

* IMPORTANT
The data in the database is taken from another database online. Cards, Components and
other technical code is based on this data but it is not compatible with the store abilities (Such as filtering)
(See at store component)

# Tutorial for the project tester:
Follow the next steps to see all components and full potential of the website.
This tutorial is optional but recommended to check all dark corners of this project.

1. Prelog:
You can travel along the website without logging in, View the store and check everything out.
You can't rate/ order/ add to wish list any bottle because you do not have any data about you.
If you will try to do any of those actions (or any other actions that require user data)
You will be redirected to the login component.

2. Register
Register your data into the website, You can sign any Email you want because it
doesn't contain Google login (I know the risks, its just for the developement mode).
The input data fields will guide you via ReactiveForms for data validations.

3. Account management
Now that you have registered you can see your account at the top left corner.
Click it and a dropdown will appear.
You have 3 options: Profile, Orders, LogOut.
Go to profile and look throughout your profile using the tabs.
When finished click on "Edit Profile" button.
You can see that all of your known data already been filled in the edit mode,
You can add/edit your data by your self - Its a good start to change the profile picture
(Background is not working).
If you finished editing your data don't forget to save it (Don't worry the website will
notify you if you forget)

4. Website store and cards
Hop over the store using the nav bar
As i said - Filtering does not work due incompatible data so right now the
Only thing working is the search field, Try searching something.
You can add to cart any bottle you'd like by clicking "Add to cart" button.
You can also click on the bottle/card you wanted and see more data about the bottle.
Every bottle as its own details page where you can rate and add to cart the bottle.
Once you've rated the bottle it will automatically will be added to you Top & latest
Rated bottles so other users can view your choices.

5. Checkout
When you've finished with shopping hop to your cart using the nav bar or the action
Bars.
You will see a summary of all your cart items and pricing, You can increase, decrease or remove the 
Selected items.
If all good click on check out... Uh oh something is not good..
You have some billing data missing.
Go to your profile > Edit profile > Billing tab and add your Country, City, HomeAddress
So we will know where to send the package (Don't forget to save changes).
Go back to your cart and checkout.

6. Orders summary
After you've checked out you will get a recipt of your order with the needed details.
you can view all your orders in the "Orders" action in the profile dropdown menu

You're done!
This is what the project is about, More features is coming soon but this is the idea.
I Hope you have some notes to give me than liking it because i know i need to improve.
Thank you!
# API
The API contains the next controllers:

1. Account Controller (Stand alone controller)
- Role:
Taking care of user registeration
- Methods:
Login(), Register(), UserExists()

2. Buggy Controller (Stand alone controller)
- Role:
Taking care of the possible HTML errors

3. Orders Controller (Contains repositories)
- Role:
Taking care of users shopping cart, Adding to cart, Removing from cart,
Orgenizing user orders and checking out
- Methods:
AddToCart(), GetCart(), GetUserOrders(), CheckOut(), GetUserOrder()

4. Rating Controller (Contains repositories)
- Role:
Taking care of Receiving user rate to a bottle, Removing user rate
And Orgenizing user rates
- Methods
AddRating(), RemoveRating(), GetUserRates()

5. Users Controller (Contains repositories)
- Role:
Taking care of returning user data from the database, Updating user
And uploading a photo
- Methods:
GetUser(), UpdateUser(), UploadPhoto()

6. Whiskey Controller (Contains repositories)
- Role:
Taking care of returning Whiskey data from the database, Orgenizing rated
Whiskeys and orgenizing user rated whiskeys
- Methods:
GetUserRatedWhiskey(), GetTopRated(), GetWhiskeyData(), GetWhiskeyListData()

# API Included
1. Extensions
2. MiddleWare
3. Paginations (Helpers folder)
4. AutoMapper (Helpers folder)
5. Cloudinary Service
6. SSL + Certificate

# Client Side Components
1. Login
2. Register
3. Bottle Details
4. Bottle Cards
5. Cart
6. Errors (Server an not found)
7. Home
8. Nav bar
9. Order Details
10. Orders
11. Shop
12. User Profile
13. User Profile edit

# Client side included
1. Interceptors
2. Guards
3. Services
4. Pipes
5. Modules
6. Models

Thank you for your attention!
