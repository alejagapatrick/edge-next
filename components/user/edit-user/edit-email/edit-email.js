import { useState, useEffect } from 'react'
import API from '@lib/api/api-endpoints'
import fetch from '@lib/fetcher'
import Button from '@components/generic/button/button'

export default function ({ user, ...props }) {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const [fields, setFields] = useState({})

  const url = `${API.users}/${user.id}/email`

  const request = (data) => {
    setLoading(true)
    setSuccess(false)
    setError(false)

    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((result) => {
        setLoading(false)
        setSuccess(true)
        setError(false)
        setFields({})
      })
      .catch((err) => {
        setLoading(false)
        setSuccess(false)
        setError('Error updating your email, this email is already taken.')
      })
  }

  const handleFieldChange = (name) => (value) => {
    setFields({
      ...fields,
      [name]: value,
    })

    setError('')
  }

  const onSubmit = (ev) => {
    ev.preventDefault()
    const email = ev.currentTarget.email.value

    if (email.length < 3) {
      setError('Invalid email')
      return
    }

    request({
      email,
    })
  }

  // Set default data
  useEffect(() => {
    setFields({
      email: user.email,
    })
  }, [user])

  return (
    <>
      <div className="change-password">
        <form onSubmit={onSubmit}>
          <div className="block-settings">
            <p>A new email will require e-mail validation</p>
            <div className={`input-group required ${error ? 'error' : ''}`}>
              <input
                type="text"
                placeholder="Email"
                name="email"
                required
                onChange={(ev) => handleFieldChange('email')(ev.target.value)}
                value={fields.email}
              />
            </div>
          </div>
          <div className="actions">
            <div className="info">
              {error && <div className="error-message">{error}</div>}
              {loading && <div className="loading-message">Loading...</div>}
              {success && (
                <div className="success-message">
                  Email updated correctly. Please check your email inbox to
                  verify your new address.
                </div>
              )}
            </div>
            <Button loading={loading}>Change email</Button>
          </div>
        </form>
      </div>
      <style jsx>
        {`
          .actions {
            padding-top: var(--empz-gap);
            display: flex;
            justify-content: flex-end;
          }

          .info {
            padding-right: var(--empz-gap);
          }
        `}
      </style>
    </>
  )
}
