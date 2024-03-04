import "../styles/globals.css";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import Feature from "../components/Feature";
import Grid from "../components/Grid";
import Page from "../components/Page";
import Teaser from "../components/Teaser";

const components = {
  feature: Feature,
  grid: Grid,
  teaser: Teaser,
  page: Page,
};

console.log('bridge active', process.env.NEXT_PUBLIC_VERSION !== 'published')

storyblokInit({
  accessToken: "Hm9iCy1Q3FTCnbXzzWR3XQtt",
  use: [apiPlugin],
  components,
  apiOptions: {
    region: ''
  },
  bridge: process.env.NEXT_PUBLIC_VERSION !== 'published'
});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
