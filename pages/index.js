import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Layout from '../components/Layout'
import TopCollections from '../components/TopCollections'
import dynamic from 'next/dynamic'
import NFTCollectionCategoryHelper from "../backendHelpers/NFTCollectionCategoryHelper";

const Slider = dynamic(
  () => {
    return import('../components/Slider')
  },
  { ssr: false }
)



export default function Home({ categories }) {
  return (
    <div>
      <Layout>
        <Hero />
        <TopCollections/>
        <Slider props={{ categories: categories }} />
        
      </Layout>
    </div>
  )
}

export async function getStaticProps(context) {
    const NFTCategories = new NFTCollectionCategoryHelper();
    const categories = await NFTCategories.findMany({});
    return {
        props: {categories: JSON.stringify(categories) }, // will be passed to the page component as props
    }
}
