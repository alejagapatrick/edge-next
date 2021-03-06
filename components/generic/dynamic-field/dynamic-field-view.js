import { FIELDS } from '@lib/config/config-constants'
import Image from '../image/image'
import MarkdownIt from 'markdown-it'
import MarkdownRead from '../markdown-read/markdown-read'
import ReactPlayer from 'react-player'
import TagsField from '../tags-field/tags-field'
const md = MarkdownIt({
  html: false,
  linkify: true,
})

function Field({ field, value, contentType }) {
  const getField = (field, value) => {
    const datatestId = `${field.type}-${field.name}`

    switch (field.type) {
      case FIELDS.TEXTAREA:
        return (
          <p data-testid={datatestId} style={{ wordBreak: 'break-all' }}>
            {value}
          </p>
        )
      case FIELDS.MARKDOWN:
        const htmlString = md.render(value || '')
        return (
          <div data-testid={datatestId} style={{ wordBreak: 'break-all' }}>
            <MarkdownRead htmlString={htmlString} />
          </div>
        )
      case FIELDS.IMAGE:
        if (value && Array.isArray(value) && value.length > 0) {
          const transformedValues = value.map((i) =>
            i.isFile ? i.src : i.path
          )

          return (
            <div
              data-testid={datatestId}
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <Image srcs={transformedValues} />
            </div>
          )
        } else {
          return null
        }

      case FIELDS.NUMBER:
        return <p data-testid={datatestId}>{value}</p>

      case FIELDS.FILE:
        if (value && Array.isArray(value) && value.length > 0) {
          const transformedValues = value.map((i) =>
            i.isFile ? i.file.name : i.name
          )

          return (
            <div data-testid={datatestId}>
              {value.map((i) => (
                <div key={i.isFile ? i.file.name : i.path}>
                  <a href={i.isFile ? i.file.src : i.path}>
                    {i.isFile ? i.file.name : i.name}
                  </a>
                </div>
              ))}
            </div>
          )
        } else {
          return null
        }

      case FIELDS.TAGS:
        return (
          <div data-testid={datatestId}>
            <TagsField tags={value} type={contentType} />
          </div>
        )

      case FIELDS.VIDEO_URL:
        return value ? (
          <div data-testid={datatestId}>
            <ReactPlayer url={value} />
          </div>
        ) : null

      case FIELDS.RADIO:
        return value ? (
          <div data-testid={datatestId}>
            {(Array.isArray(value) ? value : [value]).map((i) => (
              <span>{field.options.find((o) => o.value === i).label}</span>
            ))}
            <style jsx>{`
              span {
                padding-right: 5px;
              }
            `}</style>
          </div>
        ) : null
      default:
        return <p data-testid={datatestId}>{value}</p>
        break
    }
  }

  return (
    <div className={`field-view`}>
      {field.label && field.showLabel && <label>{field.label}</label>}

      {getField(field, value)}
      <style jsx>{`
        label {
          font-weight: bold;
        }
      `}</style>
    </div>
  )
}

export default Field
