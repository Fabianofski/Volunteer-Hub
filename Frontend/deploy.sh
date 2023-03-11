echo "Switching to branch main"
git checkout main

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r dist/* fabi@volunteer-hub.de:/var/www/html/

echo "Done!"


