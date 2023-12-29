#!/bin/bash

# This will check if NVM is installed, if not it will install it
if [ -z "$(command -v nvm)" ]; then
    echo "NVM is not installed. Installing NVM..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
    echo "NVM installed successfully."
fi

# Now it will check and install Node.js version 20.10.0 if not already in use
if [ "$(nvm current)" != "v20.10.0" ]; then
    echo "Installing Node.js version 20.10.0..."
    nvm install 20.10.0
    nvm use 20.10.0
    echo "Node.js version 20.10.0 installed and activated."
else
    echo "Node.js version 20.10.0 is already in use. No action needed."
fi

# Now it will check and install npm version 10.2.5 if not already installed
if [ -z "$(npm list -g | grep 'npm@10.2.5')" ]; then
    echo "Installing npm version 10.2.5..."
    npm install -g npm@10.2.5
    echo "npm version 10.2.5 installed."
else
    echo "npm version 10.2.5 is already installed. No action needed."
fi

echo "Node.js version: $(node -v)"
echo "npm version: $(npm -v)"
echo "Adding a little suspense to the setup, because why not?" 
display_loader
echo "Installing now the dependencies" 
npm install
echo "Dependencies installed successfully."


function display_loader() {
    local count=0
    while [ $count -lt 10 ]; do
        printf "."
        sleep 0.3
        ((count++))
    done
    echo
}
