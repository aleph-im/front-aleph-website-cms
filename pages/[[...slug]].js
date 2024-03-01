import Head from "next/head"
import {
  getStoryblokApi,
  useStoryblokState,
  useStoryblok,
  StoryblokComponent
} from "@storyblok/react"
import { useRouter } from "next/router"

export default function Home({ story }) {
  const staticStory = useStoryblokState(story)
  const router = useRouter()

  let slug = (router.pathname === "/"
    ? "home"
    : router.pathname.replace("/", ""))

  const dynamicStory = useStoryblok(slug, { version: process.env.VERSION })

  const story2 = dynamicStory?.name ? dynamicStory : staticStory

  return (
    <div >
      <Head>
        <title>{story2 ? story2.name : "My Site"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <StoryblokComponent blok={story2.content} />
    </div>
  );
}

export async function getStaticProps({ params }) {
  let slug = params.slug && params.slug.length ? params.slug.join("/") : "home";

  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
    version: process.env.VERSION
  });
 
  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get("cdn/links/" ,{
    version: process.env.VERSION
  });
 
  let paths = [];
  Object.keys(data.links).forEach((linkKey) => {
    if (data.links[linkKey].is_folder) {
      return;
    }

    if (data.links[linkKey].slug === "home") {
      paths.push({ params: { slug: [] } });
      return 
    }
 
    const slug = data.links[linkKey].slug;
    let splittedSlug = slug.split("/");
 
    paths.push({ params: { slug: splittedSlug } });
  });
 
  return {
    paths: paths,
    fallback: false,
  };
}