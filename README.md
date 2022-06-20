# Sound Board

A React Native project.

Choose, download, record samples and play them with pads.

## Installation

Install dependencies

```bash
  cd app
  npm install // or yarn
  cd ../nest-api
  npm install // or yarn
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

expo app .env file

`FREESOUND_TOKEN=[YOUR FREESOUND API KEY]`

## Features

### Sampler pads

#### Taping on a pad triggers the configured sample

![App Screenshot](https://i.ibb.co/VDQb8Fp/Screenshot-54.png)

### Long taping on a pad opens a pop up with Settings, FreeSound and Record

#### The current pad sample can be chosen and trimmed

![App Screenshot](https://i.ibb.co/nMX06Md/Screenshot-55.png)
![App Screenshot](https://i.ibb.co/SxQ1L89/Screenshot-60.png)

### Free sound sample downloading

#### A sample can be searched in the Free sound database and saved locally

![App Screenshot](https://i.ibb.co/jby5chc/Screenshot-56.png)

### A sample can be recorded with the device microphone and saved locally

![App Screenshot](https://i.ibb.co/WftcFWd/Screenshot-57.png)

### List of samples

#### A list to view all available samples and delete one (if it's a downloaded or recorded sample)

![App Screenshot](https://i.ibb.co/mCTnB2t/Screenshot-58.png)

### The samples list can also be filtered to view only FreeSound or Recorded samples or both.

![App Screenshot](https://i.ibb.co/2cYNWdG/Screenshot-59.png)

## Disclaimer

** The project was not tested with macOS / iOS therefore unforeseen bugs can occur, feel free to open issues **

The published expo app (on the releases section) won't work in iOS devices due to Apple limitation.
