import { useContentTypes, usePermission } from '../../lib/hooks'

import Avatar from '../../components/user/avatar/avatar'
import Button from '../../components/generic/button/button'
import ContentListView from '../../components/content/read-content/content-list-view/content-list-view'
import DropdownMenu from '../../components/generic/dropdown-menu/dropdown-menu'
import Layout from '../../components/layout/normal/layout'
import UserActivity from '../../components/user/activity/activity'
import config from '../../lib/config'
import fetch from '../../lib/fetcher'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const Profile = (props) => {
  const router = useRouter()
  const { userId } = router.query
  
  const visibleContentTypes = useContentTypes(['read', 'admin'])
  const permissions = usePermission(
    userId ? ['user.read', 'user.admin'] : null,
    '/',
    (u) => u.id === userId,
    userId
  )

  const { data, error } = useSWR( userId ? `/api/users/` + userId : null, fetch)
  const finished = Boolean(data) || Boolean(error)

  // Loading
  if (!finished || !permissions.finished) {
    return (
      <Layout title="Profile">
        <h1>Profile</h1>
        <div>Loading...</div>
      </Layout>
    )
  }

  if (!data) {
    // Redirect to 404 if the user is not found
    router.push('/404')
  }

  return (
    <Layout title="Profile">
      <div className="profile-user-info">
        <div className="avatar">
          <Avatar src={data ? data.profile.picture : null} />
        </div>
        <div className="name">
          <div className="title">
            <div className="title-left">
              <h2>
                {data
                  ? data.profile.displayName || data.username
                  : 'User Profile'}
              </h2>
            </div>
            <div className="title-right">
              <div className="item">
                <Button href={`/settings/${data ? data.id : ''}`}>
                  Edit Profile
                </Button>
              </div>

              <div className="item">
                <DropdownMenu align={'right'}>
                  <ul>
                    <li>Report</li>
                  </ul>
                </DropdownMenu>
              </div>
            </div>
          </div>
          <div className="dashboar-bar"></div>
        </div>
      </div>

      <div className="content-container">
        <div className="content-types">
          {visibleContentTypes.map((cData) => {
            return (
              <div className="content-block">
                <h3>User's {cData.title.en}s</h3>
                <ContentListView
                  infiniteScroll={false}
                  type={cData}
                  query={`author=${data ? data.id : null}`}
                />
              </div>
            )
          })}
        </div>

        {config.activity.enabled && (
          <div className="activity-report">
            <h3>Recent activity</h3>
            {data && <UserActivity user={data} />}
          </div>
        )}
      </div>
      <style jsx>
        {`
          .profile-user-info {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 60px;
            align-items: center;
          }

          .name {
            flex: 1;
          }

          h2 {
            font-size: 30px;
          }

          h3 {
            margin-bottom: var(--empz-gap-double);
          }

          .avatar {
            width: 100px;
            margin-right: var(--empz-gap-double);
          }

          .title {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            margin-bottom: var(--empz-gap);
          }

          .title-right {
            display: flex;
          }

          .title-right .item {
            margin-left: var(--empz-gap);
          }

          .content-container {
            display: flex;
            flex-wrap: wrap;
            background: var(--accents-2);
            border-top: var(--light-border);
            margin-top: var(--empz-gap-double);
            padding: var(--empz-gap);
          }

          @media (max-width: 900px) {
            .content-container {
              display: block;
              padding: 0;
              margin-top: var(--empz-gap);
            }
          }

          .content-types,
          .activity-report {
            flex: 1;
            transform: translateY(-75px);
            padding: var(--empz-gap);
          }

          @media (max-width: 600px) {
            .content-types,
            .activity-report {
              transform: none;
              flex: 1;
            }
          }

          .content-block {
            margin-bottom: var(--empz-gap-double);
          }

          .content-summary-content {
            padding: var(--empz-gap);
            border-radius: var(--empz-radius);
            background: var(--empz-foreground);
          }
        `}
      </style>
    </Layout>
  )
}

export default Profile
