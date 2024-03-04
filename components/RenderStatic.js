import Head from 'next/head'
import {
  useStoryblok,
  useStoryblokState,
  StoryblokComponent
} from "@storyblok/react"

const RenderStatic = ({ story, slug, version }) => {
  const staticStory = useStoryblokState(story, undefined, undefined)
  const dynamicStory = useStoryblok(slug, { version }, undefined)

  const renderStory = dynamicStory?.content
    ? dynamicStory
    : staticStory

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

export default RenderStatic
