import React, { Fragment, useState } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useActions } from '../hooks/useActions'
import styles from './RepositoriesList.module.css'

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState('')
  const { searchRepositories } = useActions()
  const { data, error, loading } = useTypedSelector(state => state.repositories)

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    searchRepositories(term)
  }

  return (
    <Fragment>
      <form onSubmit={onSubmit} className={styles.SearchForm}>
        <input value={term} onChange={e => setTerm(e.target.value)} />
        <button>Search</button>
      </form>
      {error && <h3 className={styles.Error}>{error}</h3>}
      {loading && <h3 className={styles.Loading}>Loading...</h3>}
      {!error && !loading &&
        data.map(name => <div key={name} className={styles.PackageInfo}>{name}</div>)
      }
    </Fragment>
  )
}

export default RepositoriesList
