import styled from '@emotion/styled'
import { ChangeEvent, FormEvent, useState } from 'react'
import { GENERICS } from '../component/GlobalStyle'
import { Wrapper } from '../component/wrapper'
import { useLoginMutation } from '../generated/graphql'

export const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [submitLogin, { error }] = useLoginMutation()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      submitLogin({
        variables: {
          ...form,
        },
      })
      console.log('FORM', form)
    } catch (error) {
      console.error(error)
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })
  return (
    <Wrapper center={true}>
      <FormWrapper className="login-container">
        <div className="left-side">
          <img
            src="https://businesstemplates.co.nz/wp-content/uploads/2020/12/login-concept-illustration_114360-739.jpg"
            alt="login"
          />
        </div>
        <div className="right-side">
          <div>
            <img
              src="https://www.freeiconspng.com/uploads/evernote-icon-2.png"
              alt=""
            />
            <h2>Nevernote</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="login-email"></label>
              <input
                id="login-email"
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={onChangeHandler}
              />
            </div>

            <div>
              <label htmlFor="login-password"></label>
              <input
                id="login-password"
                type="text"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={onChangeHandler}
              />
            </div>

            {error && <div>{JSON.stringify(error)}</div>}

            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </FormWrapper>
    </Wrapper>
  )
}

const FormWrapper = styled('div')`
  display: flex;
  align-items: center;
  border: ${GENERICS.border};
  border-radius: 5px;
  padding: 50px;
  user-select: none;
  gap: 20px;

  > div {
    flex: 0.5;
  }

  .left-side {
    img {
      width: 200px;
    }
  }

  .right-side {
    > div:first-of-type {
      text-align: center;
      img {
        width: 50px;
        border-radius: 10px;
      }
      margin-bottom: 20px;
    }

    form {
      div {
        margin-bottom: 10px;

        input {
          border: 2px solid gray;
          border-radius: 5px;
          padding: 10px 20px;
          outline: none;
          transition: 0.5s;
          &:focus {
            border-color: blue;
          }
        }

        button {
          border-radius: 5px;
          width: 100%;
          color: white;
          background-color: ${GENERICS.primaryColor};
          padding: 8px 20px;

          &:disabled {
            background-color: #ccc;
          }
        }
        small.error-message {
          color: red;
        }
      }

      p {
        font-size: 12px;
        a {
          color: ${GENERICS.primaryColor};
        }
      }
    }
  }
`
