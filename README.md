# Contact-Book
This is a simple front end that takes addresses and saves them into a table for you to see all the contacts you meet.

You can interact with the deployed application at [contacts.communitydayaccelerator.com/](https://contacts.communitydayaccelerator.com/).

# Load up the Project!

To run this project you will need to have an AWS account to generate the API routes. To deploy your code to the live site you will need AWS CLI credentials.

## Create a .env file

Store your restapi_id, region, stage_name in a .env file under the respective names REACT_APP_REST_API_ID, REACT_APP_REGION, REACT_APP_STAGE_NAME.

When using create react app, the convention for .env files is to include REACT_APP_ at the beginning of each variable name so that the application can find the variables. 

Example of the final API Endpoint URL: https://{restapi_id}.execute-api.{region}.amazonaws.com/{stage_name}/

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run deploy-dev`

Run this command to deploy your code to the live site. To add your credentials to the AWS CLI install the VSCode extension "AWS CLI Configure". Once this is installed login into your aws account, head to "Command line or programmatic access", and copy the AWS credentials file (Short-term credentials). Add these credentials to the AWS CLI credential file in vscode with "CMD + shift + p"(mac) or "CTRL + shift + p"(windows). Be sure to save the file. 

Now update the script, add your profile name, found in the square brackets at the top of your credential file.

Example of the final script:     

"deploy-dev": "aws s3 sync build/ s3://contacts.communitydayaccelerator.com --cache-control max-age=86400 --profile 1234567_ThisIsMy_DeveloperUserAccess --region us-east-2"

# Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


