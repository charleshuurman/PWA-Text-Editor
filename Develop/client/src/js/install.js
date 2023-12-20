const butInstall = document.getElementById('buttonInstall');

let deferredPrompt; // Allows to show the install prompt

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    event.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = event;
    // Update UI to notify the user they can add to home screen
    butInstall.style.display = 'block';
  });

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // Hide our user interface that shows our A2HS button
    butInstall.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    // Clear the deferred prompt so it can be garbage collected
    deferredPrompt = null;
  });

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Log install to analytics
    console.log('PWA was installed', event);
  });
