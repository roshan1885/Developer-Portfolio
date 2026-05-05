# SYSTEM INFORMATION
___

## Requirements
- Node Js V20-22

## How To Run
### Local Host / VPS Host

Install Node JS
- ```
  sudo update
  curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
  sudo apt install -y nodejs
  ```

Install Dependencies
- ``` npm i ```

Build Project 
- ``` npm run build ```

Run Project 
- ``` npm run start ```

Deploy the Project
- ``` npm run deploy ```

### Run On Hosting Panel
1. Get a NodeJS Server (v22)
2. Install the required packages
3. Build the project and export it
4. Fill the correct port received by your server management in package.json
5. Run the project


### Run on Github Pages
1. Build the repo and export it
2. Deploy the repo
3. Go to github Pages and set the source to `gh-pages`