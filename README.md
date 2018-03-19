Running the project:

1. Download Node from https://nodejs.org/en/, choose 8.10 LTS version.
2. Install it, you will have a ready-to-use node + npm environment.
3. Download Python 3.6
4. Install it, you will have a ready-to-use Python + pip environment.
5. Go to the main directory of the project.
6. Run the front-end (by React.js, hosted on Node)
  - `cd` to `client/`, type `npm install` to install all the dependencies (details see report).
  - after completing the installation, type `npm start` to start the frontend server.
7. Run the back-end (by Flask, Python)
  - `cd` to the project main directory. Type `pip install -r requirements.txt` to install the server side dependencies.
  - `cd` to `server/`, type `python app.py` to start the server that hosts our APIs.
8. To ensure everything works fine, refresh the webpage (should be localhost:3000).
9. The web portal is designed in a straightforward way, you can then easily discover the usage!
10. Let us know if you have any problem on running the project. 

jyang7@ualberta.ca
ltong2@ualberta.ca

You can also read the instructions below, which is as same as it in the report.

## Another detailed instruction.

The entire project has two parts: the client side and the server side. We will introduce how to run the project on your own computer, and also, a detailed description of how to use the web portal.

To run the project on a localhost (i.e., your PC or *nix system), we recommend you to use the latest LTS node.js (version $> 8.9$), a node package manager (version $> 5.6)$ should come with it. Then you need to have a Python installed, with version $3.5+$. I have extracted the configuration into config files for both the front and back end.

To run the server-side code, you will need to go to the project main directory (not the server directory) and enter "pip install -r requirements.txt" to install the server environment. After that, you can go to server directory and enter "python app.py" to start the server. Open another terminal, move to the client directory and enter "npm install" to setup the front-end dependencies. Then, enter "npm start" to start the front-end virtual server. You should now be able to play with the web portal.
