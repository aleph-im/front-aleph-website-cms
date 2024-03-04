import "../styles/globals.css";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import Feature from "../components/Feature";
import Grid from "../components/Grid";
import Page from "../components/Page";
import Teaser from "../components/Teaser";


function loadBridge(callback) {
  const existingScript = document.getElementById("storyblokBridge");
  if (!existingScript) {
    const script = document.createElement("script");
    script.src = "//app.storyblok.com/f/storyblok-v2-latest.js";
    script.id = "storyblokBridge";
    document.body.appendChild(script);
    script.onload = () => {
      callback();
    };
  } else {
    callback();
  }
}

function initBridge() {
  const { StoryblokBridge, location } = window
  const storyblokInstance = new StoryblokBridge()
}

if(typeof window === 'object' && window.location.search.includes('_storyblok')) {
  // load the bridge only inside of Storyblok
  loadBridge(initBridge)
}

const components = {
  feature: Feature,
  grid: Grid,
  teaser: Teaser,
  page: Page,
};

storyblokInit({
  accessToken: "Hm9iCy1Q3FTCnbXzzWR3XQtt",
  use: [apiPlugin],
  components,
  apiOptions: {
    region: ''
  }
});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
