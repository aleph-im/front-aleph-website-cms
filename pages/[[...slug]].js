import Head from "next/head"
import {
  getStoryblokApi,
  useStoryblokState,
  useStoryblok,
  StoryblokComponent
} from "@storyblok/react"

export default function SlugPage({ slug, version, preview, story }) {
  const staticStory = useStoryblokState(story, undefined, false)
  const dynamicStory = useStoryblok(slug, { version }, preview)

  const renderStory = preview
    ? dynamicStory
    : dynamicStory?.name
      ? dynamicStory
      : staticStory

  return (
    <div >
      <Head>
        <title>{renderStory?.name || "My Site"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {renderStory?.name ? <StoryblokComponent blok={renderStory.content} /> : null}
    </div>
  );
}

export async function getStaticProps({ params }) {
  let slug = params.slug && params.slug.length ? params.slug.join("/") : "home";

  const version = process.env.VERSION || preview ? "draft" : "published"
  const preview = version === 'draft' ? {} : undefined

  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, { version });

  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
      slug,
      version,
      preview
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const version = process.env.VERSION

  const storyblokApi = getStoryblokApi();

  let { data } = await storyblokApi.get("cdn/links/", { version });
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