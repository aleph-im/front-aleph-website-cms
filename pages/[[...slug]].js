import { getStoryblokApi } from "@storyblok/react"
import RenderDynamic from '../components/RenderDynamic'
import RenderStatic from '../components/RenderStatic'

export default function SlugPage({ slug, version, preview, story }) {
  return (
    preview
      ? <RenderDynamic {...{ slug, version, preview }} />
      : <RenderStatic {...{ story, slug, version }} />
  )
}

export async function getStaticProps({ params }) {
  let slug = params.slug && params.slug.length ? params.slug.join("/") : "home"

  const version = process.env.NEXT_PUBLIC_VERSION
  const preview = version === 'draft' ? {} : null

  const storyblokApi = getStoryblokApi()
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, { version })

  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
      slug,
      version,
      preview
    },
    revalidate: 3600,
  }
}

export async function getStaticPaths() {
  const version = process.env.NEXT_PUBLIC_VERSION

  const storyblokApi = getStoryblokApi()

  let { data } = await storyblokApi.get("cdn/links/", { version })
  let paths = []

  Object.keys(data.links).forEach((linkKey) => {
    if (data.links[linkKey].is_folder) {
      return
    }

    if (data.links[linkKey].slug === "home") {
      paths.push({ params: { slug: [] } })
      return
    }

    const slug = data.links[linkKey].slug
    let splittedSlug = slug.split("/")

    paths.push({ params: { slug: splittedSlug } })
  })

  return {
    paths: paths,
    fallback: false,
  }
}