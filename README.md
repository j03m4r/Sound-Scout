# Sound-Scout
Discover music people really listen to! React Native x Django application.

## Features
* TikTok Adjacent interface
* Profiles & Friends
* Direct Messages (text & tracks)
* Discovery & Search Interface
* Django Rest API backend
* React Native / Expo Go frontend
* Spotify API integration

*Deployment is currently *unavailable* :(*

## Setup Locally

### Install
```git clone https://github.com/j03m4r/Sound-Scout.git```

### Quickstart
1. Navigate to the backend folder and activate virtual environment on one terminal
```bash
cd backend-env/ && source bin/activate
```
3. Install requirements
```bash
pip3 install -r requirements.txt
```
5. Start up Django API (see https://docs.djangoproject.com/en/4.2/intro/tutorial01/ if want to run on local internet (necessary if using on physical mobile device). *NOTE:* Must include local IP address in Django's accepted IPs and update frontend's API variables)
```bash
cd backend/ && python3 manage.py runserver
```
7. Navigate to frontend folder and install dependencies on another terminal
```bash
cd sound-scout/ && npm install
```
9. Start Expo Project
```bash
npx expo start
```
11. Follow Expo Go's startup instructions in terminal to open the application
