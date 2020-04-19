import { useContentOwner, usePermission } from '../../../lib/hooks'

import API from '../../../lib/api/api-endpoints'
import ContentForm from '../../../components/content/write-content/content-form/content-form'
import Layout from '../../../components/layout/normal/layout'
import fetch from '../../../lib/fetcher'
import { getContentTypeDefinition } from '../../../lib/config'
import styles from './[slug].module.scss'
import { useRouter } from 'next/router'
import useSWR from 'swr'

function LoadingView() {
  return <h1>Loading...</h1>
}

const EditContent = () => {
  const router = useRouter()
  const {
    query: { slug, type },
  } = router

  if (!slug || !type) {
    return <LoadingView />
  }

  const contentType = getContentTypeDefinition(type)

  // Load data
  const { data } = useSWR(API.content[type] + '/' + slug, fetch)
  console.log('THE DATA?', data)
  const isOwnerPermission = useContentOwner(data, '/404')

  const onSaved = (newItem) => {
    // Router.go to /content/slug/id
  }

  return (
    isOwnerPermission && (
      <Layout title="Edit content" className={styles['edit-page']}>
        <h1 className={styles.h1}>Edit: {data.title}</h1>

        <ContentForm type={contentType} onSaved={onSaved} content={data}/>
      </Layout>
    )
  )
}

export default EditContent