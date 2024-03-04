import Head from 'next/head'
import {
  useStoryblok,
  StoryblokComponent
} from "@storyblok/react"

const RenderDynamic = ({ slug, version, preview }) => {
  const renderStory = useStoryblok(slug, { version }, preview || undefined)

  if (!renderStory?.content) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Head>
        <title>{renderStory?.name || "My Site"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StoryblokComponent blok={renderStory.content} />
    </>
  )
}

export default RenderDynamic
