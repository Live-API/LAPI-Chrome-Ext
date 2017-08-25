# LiveAPI
Successful apps are built on data. As developers, we don’t always have access to the data that would help make our app successful. While the internet is a nearly-bottomless source of public data in the form of websites, that data is not always structured or available programmatically through an API. Time spent building an extraction algorithm and server is time not spent building your app.

We’re developing LiveAPI, a developer tool to turn any website’s public data into an API in a few minutes. LiveAPI has two parts: a Chrome Extension to select data to extract and a user-hostable server that extracts data and serves up the user-created API endpoints.

The following three-part guide that walks through how to get started and use LiveAPI.

* [Part 1: Installation](https://medium.com/@brett.beekley/using-liveapi-part-1-installation-ba1aa13bc73b)
* [Part 2: Authentication](https://medium.com/@pennwu/liveapi-a-visual-data-extraction-tool-part-2-17a1d32b2d52)
* [Part 3: Using the Chrome Extension](https://medium.com/@melissjs/liveapi-a-visual-data-extraction-tool-part-3-e9d60c9ab28d)

#Installation Guide
A primary goal of ours when building LiveAPI is to make setup painless. Installing the Chrome Extension only takes two clicks on the Chrome Web Store. You can now start using the LiveAPI extension on any site by clicking the icon in the top-right Chrome Menu and following the Using the Chrome Extension part of this guide. Setting up a server generally isn’t as simple. Keeping to our goal, we’ve automated the server installation process through a script that installs all of the necessary prerequisites, builds the code and starts the LiveAPI services. This script can be executed in one shell command: 

sudo curl -shttps://raw.githubusercontent.com/live-API/LAPI-Server/master/bin/pull.sh | bash -s 

This command is tested for MacOS and Amazon Linux, but should work on other flavors of RHEL and on Ubuntu. If you have any setup or compatibility issues, let us know on Github. We’re still early in determining our compatibility and would love your feedback. 

#Port Setup
LiveAPI server runs on port 4000 (http) and 4443 (https) by default and is accessible by adding the port to the domain (e.g. liveapi.yoursite.com:4443). To serve and access LiveAPI over the standard http and https ports, you can update the HTTP_PORT and HTTPS_PORT variables in server.js. 

If using AWS to host LiveAPI, EC2 requires the application to have root access to run on ports under 1000. To avoid running a web server like LiveAPI as root, you can use iptables to forward port 443 to LiveAPI’s 4443. See this guide for more information. What We’re Asking to Sudo 

The setup command grabs a shell script from github and runs it as the root. Since we don’t recommend executing unfamiliar code as root, we’ll outline what the scripts do. The pull.sh script is relatively simple and does the following:

Installs git
Pulls the latest LiveAPI server code from github
Starts the installation script (start.sh) 

The installation script, start.sh, contains everything else need to install and start the server:
Installs NodeJS/npm
Installs MongoDB
Installs Node module dependencies
Builds and bundles the front-end JS
Generates self-signed SSL certificates
Starts the server 

Starting the server using npm start does the following:
Starts the Mongo daemon
Starts LiveAPI
Manual Installation 

Alternatively, LiveAPI can be installed and started manually. Make sure to do each of the steps listed in the bullets above. If you are bringing your own SSL certs, such as from a CA, you can drop the certificate (cert.pem) and private key (key.pem) in the SSL folder in the root of LiveAPI. 

The minimum NodeJS version required for LiveAPI is 7, but there may be other requirements we have not found yet. We have tested on NodeJS >8.1.4 and MongoDB >3.4.4, but let us know on Github if you have any problems with these or other versions. 

Using LiveAPI Part 2: Creating Users and Authentication
If you have not installed the LiveAPI server on your computer, or a cloud-hosting solution like AWS, read Part 1 to setup the server. 

By now, here is what you have completed: 
[x] Installation on AWS / Locally 
[x] Setup SSL Certificate 
[x] Start the LiveAPI server 

We built authorization into LiveAPI to allow you to control the endpoints created. First, create the admin account. 

#Creating an Admin Account
Go to https://localhost:4443/config. If your SSL Certificate is working correctly, you will see the above sign-in bar. Create the admin account by entering your login credentials. This will create a cookie in the browser, and bring you to the new page. 

If you get an error, your SSL certificate is not working. Visit Part 1: Installation on instructions to create an SSL certificate! 

Invite additional users
When you want multiple people accessing the created endpoints, use invitation links to create their account. This gives the admin control over who has access to the endpoints created, and the corresponding data that is scraped.Entering the invitation link will prompt a username and password. 

Using LiveAPI Part 3: Chrome Extension
If you have not installed the LiveAPI server on your computer, or a cloud-hosting solution like AWS, read Part 1 to setup the server. 

If you have not created one or more user accounts on your server, read Part 2 on authentication. 

Once steps one and two are finished, install the LiveAPI Chrome Extension from the Chrome Extension webstore.To activate the extension, navigate to the target URL you wish to scrape and click the browser action icon (right side on browser top bar). The UI bar will move you through the necessary steps for designing your endpoint. 

Step 1:
Click on a DOM element of your choice that contains one of the properties that you want in your data objects; you will see your selection highlighted in yellow. Select another of the same kind on the page and if the elements are structurally similar, LiveAPI will highlight the remaining items of that kind on the page. Deselect anything you do not wish to include. Enter a name for your new property (such as “title”) then click “Save”. Repeat as desired for additional elements. 

Note:
Use names with no spaces that are camelCased or snake_cased. Please do not use spaces or special characters besides dashes. These will be your keys in your key value pairs of each object. 

Step 2 and 3 are not functional at the moment and are in development. 

Step 4:
Authenticate yourself with the credentials you created on the LiveAPI server. The address field is where you indicate the URL and port of your server. In most cases the port will be 4443. 

Step 5:
Create a name for your endpoint. Observe the same rules for naming as above because this name will be part of your endpoint URI. Enter an interval measured in seconds and click “Create Endpoint”. You will then have the choice to navigate to your endpoint to verify accuracy of your data or you can elect to begin another endpoint design. 

And that’s it!
Because data should be open and free.
LiveAPI is and always will be open source. We welcome contributions from other developers.
