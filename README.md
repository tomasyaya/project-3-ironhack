# Project Name
Guide Me
## Description

Guide me is an app that allow users to search for guides by location and add them to their favorites to use when ever they want. Guides are made by locals. Users an creat their own Guides and upload them to the community.
## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the platform so that I can start using the app
-  **Login:** As a user I can login to the platform so that I can using the app
-  **Logout:** As a user I can logout from the platform so no one else can use my profile
-  **Add City Guides** As a user I can add a city guides so that I can share it with the community
-  **List Guides** As a user I want to see the guides so that I can choose one to use
-  **Search Guides** As a user I want to search guides by location so that I know if it´s already in the platform
-  **Add to favorites** As a user I want to add a guide to favorite so that I can save the guide that I liked the most
-  **See my favorites** As a user I want to see my favorite guides so that I can see the ones I liked the most

## Backlog

User profile:
- see my profile
- upload my profile picture
- see other users profile
- redux
- sockets
- maps
- chat

Geo Location:
- add geolocation to guides when creating
- show guides places in a map in guide detail page
- show all places in a map in the guide list page


  
# Client

## Routes
| Method | Path | Component | Permissions | Behavior | 
|--------|------|--------|--| -------|
| `get`  | `/` | HomePageComponent| user | show search guide / favorites link and admin link
| `post` | `/auth/signup` | SignupPageComponent| anon only| signup form, link to login, navigate to homepage after signup|
| `post` | `/auth/login` | LoginPageComponent | anon only |login form, link to signup, navigate to homepage after login |
| `post` | `/auth/logout` | n/a| anon only | navigate to homepage after logout, expire session |
| `get`  | `/guides` | GuideListPageComponent| user only | shows all guides, links to details, search guides by location
| `post` | `/guides` | GuideCreatePageComponent | user only | creates a new guide, navigates to guide's detail page after creation
| `put` | `/guide/:id` | GuideDetailPageComponent  | user | details of one guide, edit the guide by user owner
| `delete` | `/guide/:id` | na | user only | delete guide
| `get` | `/admin` | AdminPageComponent | user only |  create guides, guides created by me
| `get` | `**` | NotFoundPageComponent | public | 




## Components

-Navbar Component
-Search Component
-GuideList Component
-GuideCard Component
-CreateForm Component
-EditForm Component



## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
- Guide Service
  - Guide.list()
  - Guide.search(terms)
  - Guide.create(data)
  - Guide.detail(id)
  - Guide.addFavorite(id)
  - Guide.removeFavorite(id)   

# Server

## Models

User model

```
username - String // required
email - String // required & unique
password - String // required
favorites - [ObjectID<Guides>]
Guides - [ObjectID<Guides>]
```

Guide model

```
creator - ObjectID<User> // required
name - String // required
address - String
places: [
  {
    name: Sting,
    location: String,
    description: String
  }
]
```

## API Endpoints (backend routes)

- GET /auth/me
  - 404 if no user in session
  - 200 with user object
- POST /auth/signup
  - 401 if user logged in
  - body:
    - username
    - email
    - password
  - validation
    - fields not empty (422)
    - user not exists (409)
  - create user with encrypted password
  - store user in session
  - 200 with user object
- POST /auth/login
  - 401 if user logged in
  - body:
    - username
    - password
  - validation
    - fields not empty (422)
    - user exists (404)
    - passdword matches (404)
  - store user in session
  - 200 with user object
- POST /auth/logout
  - body: (empty)
  - 204
- POST /user/me/favorite
  - body:
    - guideId
  - validation
    - id is valid (404)
    - id exists (404)
  - add to favorites if not there yet
  - updates user in session
- DELETE /user/me/favorite/:guideId
  - validation
    - id is valid (404)
    - id exists (404)
  - body: (empty - the user is already stored in the session)
  - remove from favorites
  - updates user in session
- GET /guide?terms=foo
  - use search criteria if terms provided
  - 200 with array of guides
- POST /guide
  - body:
    - name
    - address
  - validation
    - fields not empty
  - create guide
  - 200 with guide object
- GET /guide/:id

  

## Links

### Trello/Kanban

KANBAN

### Git

The url to your repository and to your deployed project

[Client repository Link](http://github.com)
[Server repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)