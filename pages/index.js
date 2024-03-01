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

  const dynamicStory = useStoryblok(slug, { version: "draft" })

  const story2 = dynamicStory?.name ? dynamicStory : staticStory

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StoryblokComponent blok={story2.content} />
    </div>
  )
}

export async function getStaticProps() {
  let slug = "home"

  let sbParams = {
    version: "draft", // or 'published'
  }

  const storyblokApi = getStoryblokApi()
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams)

  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    },
    revalidate: 3600,
  }
}
