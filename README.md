# Sound-Scout
Discover music people really listen to! React Native x Django application.

## Overview
Sound Scout utilized React Native/Expo in conjunction with Django. The whole goal of Sound Scout was to manipulate popular music service APIs to create a streamlined method of discovering music. We wanted to create a familiar, TikTok adjacent interface and this was perhaps our most pronounced success. We focused on incorporating the Spotify API into the project due to it's ease of integration. Upon completion of a prototype we experimented with deployment using Zappa and AWS. 

## Features
* TikTok Adjacent interface
* Profiles & Friends
* Direct Messages (text & tracks)
* Discovery & Search Interface
* Django Rest API backend
* React Native / Expo Go frontend
* Spotify API integration

## Setup Locally

### Install
```bash
git clone https://github.com/j03m4r/Sound-Scout.git
```

### Quickstart
1. Navigate to the backend folder and activate virtual environment on one terminal
```bash
cd backend-env/ && source bin/activate
```
3. Install requirements
```bash
pip3 install -r requirements.txt
```
5. Start up Django API (see [run development server on local ip](https://docs.djangoproject.com/en/4.2/ref/django-admin/#django-admin-runserver) if using on physical mobile device. *NOTE:* Must include local IP address in Django's accepted IPs and update frontend's API variables)
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
