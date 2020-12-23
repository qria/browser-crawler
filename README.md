# Browser Crawller

Chrome browser extension to crawl in the local browser.


## Building

Following command builds and turns on the watch mode to watch any changes.

```
yarn build
```

## Applying to local chrome

After building, open `chrome://extensions/` and check `Developer Mode` on.

Then, click on `Load unpacked extension` and select the `build` folder.

## webpack auto-reload

```
yarn start
```